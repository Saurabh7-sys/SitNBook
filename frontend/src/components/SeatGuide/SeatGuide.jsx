import React from 'react'
import { MdCheckCircle, MdCancel, MdTouchApp } from "react-icons/md";
import style from './seatGuide.module.css'

const SeatGuide = () => {
  return (
    <div className={style.seatGuideSection}>
      <section>
        <span>
          <div className={style.Available}></div>
          <h3><MdCheckCircle /> Available</h3>
        </span>
        <span>
          <div className={style.Selected}></div>
          <h3><MdTouchApp /> Selected</h3>
        </span>
        <span>
          <div className={style.Booked}></div>
          <h3><MdCancel /> Booked</h3>
        </span>
        <span>
          <h2 className={style.desktopText}>
            Click a seat to select
          </h2>
        </span>
      </section>
      <h2 className={style.mobileText}>
        Tap a seat to select
      </h2>
    </div>
  )
}

export default SeatGuide
