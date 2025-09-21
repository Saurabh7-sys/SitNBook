import React, { useState, useContext } from "react";
import BookingContext from "../../context/bookingContext";
import Successful from "../Successful/Successful";
import style from "./checkout.module.css";

const Checkout = () => {
  const { selectSeats } = useContext(BookingContext);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState("");

  const seatPrice = 100;
  const subtotal = selectSeats.length * seatPrice;
  const serviceFee = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + serviceFee;

  const today = new Date();
  const invoiceId = `INV-${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}-${Math.floor(
    Math.random() * 9000 + 1000
  )}`;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (subtotal === 0) return;

    setLoading(true);
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      // 1. Create order on backend
      const orderRes = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 100 }),
      });
      const order = await orderRes.json();

      const options = {
        key: "rzp_test_RKHI4h7mdDBtMK",
        amount: order.amount,
        currency: "INR",
        name: "SitNBook",
        description: "Seat Booking Payment",
        order_id: order.id,
        handler: async function (response) {
          // 2. Verify payment with backend
          await fetch("http://localhost:5000/api/payment/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setPaymentId(response.razorpay_payment_id);
                setOrderId(response.razorpay_order_id);
                setPaymentSuccess(true);
              } else {
                alert("Payment verification failed ❌");
              }
            });
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong with payment.");
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <Successful
        paymentId={paymentId}
        orderId={orderId}
        seats={selectSeats}
        showTime="7:30 PM, 21 Sept 2025"
      />
    );
  }

  return (
    <aside className={style.CheckoutSection} aria-label="Checkout receipt">
      <header className={style.header}>
        <div className={style.brand}>
          <div className={style.logo}>SNB</div>
          <div>
            <h4 className={style.title}>SitNBook</h4>
            <div className={style.subtitle}>Seat Booking Receipt</div>
          </div>
        </div>

        <div className={style.meta}>
          <div className={style.invoiceId}>{invoiceId}</div>
          <div className={style.date}>{today.toLocaleDateString()}</div>
        </div>
      </header>

      <div className={style.body}>
        <div className={style.sectionTitle}>Selected seats</div>

        <div className={style.seatList}>
          {selectSeats.length === 0 ? (
            <div className={style.empty}>No seats selected</div>
          ) : (
            selectSeats.map((s) => (
              <span key={s} className={style.seatPill}>
                {s}
              </span>
            ))
          )}
        </div>

        <div className={style.breakdown}>
          <div className={style.row}>
            <span>Subtotal</span>
            <span>{subtotal} ₹</span>
          </div>
          <div className={style.row}>
            <span>Service fee</span>
            <span>{serviceFee} ₹</span>
          </div>
          <div className={style.rowTotal}>
            <strong>Total</strong>
            <strong>{total} ₹</strong>
          </div>
        </div>

        <div className={style.actions}>
          <button
            className={style.checkoutBtn}
            onClick={handlePayment}
            disabled={subtotal === 0 || selectSeats.length === 0 || loading}
          >
            {subtotal === 0 || selectSeats.length === 0
              ? "Select seats to checkout"
              : loading
              ? "Processing..."
              : "Pay Now"}
          </button>
        </div>
      </div>

      <footer className={style.footer}>
        <small>
          Terms: Seats are subject to availability. Refund rules apply.
        </small>
      </footer>
    </aside>
  );
};

export default Checkout;
