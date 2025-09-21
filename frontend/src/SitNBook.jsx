import React from 'react'
import SeatGuide from './components/SeatGuide/SeatGuide'
import Panel from './components/Panel/Panel'

import style from './sitNBook.module.css'
import Checkout from './components/Checkout/Checkout'

const SitNBook = () => {
  return (
    <main className={style.mainPage}>
      <h1 className={style.mainHeading}>Book Your Seats</h1>

      <div className={style.layout}>
        <section className={style.guideSection}>
          <div className={style.guideInner}>
            <SeatGuide />
            <Checkout />
          </div>
        </section>

        <section className={style.panelSection}>
          <Panel />
        </section>
      </div>
    </main>
  )
}

export default SitNBook
