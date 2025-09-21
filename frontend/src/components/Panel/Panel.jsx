import React, { useEffect, useContext } from "react";
import BookingContext from "../../context/bookingContext";
import style from "./panel.module.css";

const Panel = () => {
  const { selectSeats, setSelectSeats } = useContext(BookingContext);

  const seats = Array.from({ length: 64 }, (_, i) => ({ id: i + 1 }));

  // Example booked seats (you can later fetch these from backend)
  const bookedSeats = [5, 12, 18, 25, 40, 52, 60];

  const handleSeatSelect = (id) => {
    if (bookedSeats.includes(id)) return; // don't allow clicking booked seats
    setSelectSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    console.log("Selected seats:", selectSeats);
  }, [selectSeats]);

  return (
    <div className={style.PanelSection}>
      <div className={style.leftSection}>
        {seats.slice(0, 32).map((s) => (
          <div
            key={s.id}
            className={`${style.seat} 
              ${selectSeats.includes(s.id) ? style.selected : ""} 
              ${bookedSeats.includes(s.id) ? style.booked : ""}`}
            onClick={() => handleSeatSelect(s.id)}
          >
            <span className={style.seatNumber}>{s.id}</span>
          </div>
        ))}
      </div>

      <div className={style.rightSection}>
        {seats.slice(32, 64).map((s) => (
          <div
            key={s.id}
            className={`${style.seat} 
              ${selectSeats.includes(s.id) ? style.selected : ""} 
              ${bookedSeats.includes(s.id) ? style.booked : ""}`}
            onClick={() => handleSeatSelect(s.id)}
          >
            <span className={style.seatNumber}>{s.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Panel;
