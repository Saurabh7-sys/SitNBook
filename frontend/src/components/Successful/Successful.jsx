import React from "react";
import { motion } from "framer-motion";
import style from "./Successful.module.css";

const Successful = ({ paymentId, orderId, seats, showTime }) => {
  return (
    <div className={style.successWrapper}>
      <motion.div
        className={style.successCard}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Payment Successful!</h2>
        <p>Your ticket has been booked</p>

        <div className={style.details}>
          <div><strong>Payment ID:</strong> {paymentId}</div>
          <div><strong>Order ID:</strong> {orderId}</div>
          <div><strong>Seats:</strong> {seats.join(", ")}</div>
          <div><strong>Show Time:</strong> {showTime}</div>
        </div>

        <div className={style.actions}>
          <button className={style.refundBtn}>Request Refund</button>
          <button className={style.downloadBtn}>Download Ticket</button>
        </div>
      </motion.div>
    </div>
  );

};

export default Successful;
