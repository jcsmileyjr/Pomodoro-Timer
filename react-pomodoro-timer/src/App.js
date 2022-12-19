import "./App.css";
import Gear from "./assets/gear.svg";
import React, { useState, useEffect, useCallback } from "react";

/**
 *
 * @returns
 *
 * TODO:
 * Setup initial basic HTML
 * Style with initial  CSS
 * Add basic JavaScript for timer from 15 minutes
 * Add functionality to start/stop to timer
 * Add functionality when timer stops, alert message is shown
 * Add functionality where gear icon is click and user can chage minutes and seconds
 * HARD PART: Ring around timer should go from red to green.
 */
function App() {
  const [counter, setCounter] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);

  // Decrease the seconds and minute every second.
  const decliningTimer = useCallback(() => {
    if (minutes <= 0 && seconds <= 0) {
      setCounter(false);
      setSeconds("00");
      setMinutes(0);
      return;
    }
    setSeconds(seconds - 1);
    if (seconds <= 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    }
  }, [seconds, minutes]);

  useEffect(() => {
    const timer = counter && setInterval(() => decliningTimer(), 1000);
    return () => clearInterval(timer);
  }, [seconds, minutes, decliningTimer, counter]);

  // Allow the user to stop and start the timer
  const timerControl = () => {
    if (counter) {
      setCounter(false);
    } else {
      setCounter(true);
    }
  };

  return (
    <div className="App">
      <div className="clock--container">
        <div className="timer--container">
          <p id="minutes">{minutes}</p>
          <p>:</p>
          <p id="seconds">{seconds}</p>
        </div>
        <button className="clock__primaryButton--style" type="button" onClick={()=> timerControl()}>
          START
        </button>
        <button className="clock__gearButton--style" type="button">
          <img
            src={Gear}
            className="clock__gearIcon--style"
            alt="Gear icon"
          ></img>
        </button>
      </div>
    </div>
  );
}

export default App;
