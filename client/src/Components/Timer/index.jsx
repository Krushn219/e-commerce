import React from 'react'
import { useState } from 'react'

const Timer = () => {

  const[currentDate, setcurrentDate] = useState(new Date())

  setInterval(() => {
    setcurrentDate(new Date())
  }, 1000)

  const d = new Date(2022, 11, 19, 13, 10, 10)
  let diffTime = Math.abs(d - currentDate)
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
  let hours = Math.floor((d - currentDate % 864e5) / 36e5) % 24;
  let minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.round(diffTime / 1000) % 60;

  return (
    <div className="tabproductmain-timer timeLoaded" data-end-time="2023-04-07 00:00:00">
      <div className="product-timer-wrapper">
        <div className="tabproductmain-timer-wrapper tabproductmain-timer-box tabproductmain-time-days">
          <div className="days">{diffDays < 10 ? `0${diffDays}` : diffDays}</div>
          <div className="product-timer-name">day</div>
        </div>
        <span className="product-timer-dot">:</span>
        <div className="tabproductmain-timer-wrapper tabproductmain-timer-box tabproductmain-time-hours">
          <div className="hours">{hours < 10 ? `0${hours}` : hours}</div>
          <div className="product-timer-name">hour</div>
        </div>
        <span className="product-timer-dot">:</span>
        <div className="tabproductmain-timer-wrapper tabproductmain-timer-box tabproductmain-time-minutes">
          <div className="minutes">{minutes < 10 ? `0${minutes}` : minutes}</div>
          <div className="product-timer-name">min</div>
        </div>
        <span className="product-timer-dot">:</span>
        <div className="tabproductmain-timer-wrapper tabproductmain-timer-box tabproductmain-time-seconds">
          <div className="seconds">{seconds < 10 ? `0${seconds}` : seconds}</div>
          <div className="product-timer-name">sec</div>
        </div>
      </div>
    </div>
  )
}

export default Timer