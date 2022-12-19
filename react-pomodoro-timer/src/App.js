import "./App.css";
import Gear from "./assets/gear.svg";
import Check from "./assets/check.svg";
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
  const [showGears, setShowGears] = useState(false);

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
        <div className={`timer--container ${showGears ? "hide" : ""}`}>
          <p id="minutes">{minutes}</p>
          <p>:</p>
          <p id="seconds">{seconds}</p>
        </div>
        <button
          className={`clock__primaryButton--style ${showGears ? "hide" : ""}`}
          type="button"
          onClick={() => timerControl()}
        >
          START
        </button>
        <button
          className={`clock__gearButton--style ${showGears ? "hide" : "show"}`}
          type="button"
          onClick={() => setShowGears(!showGears)}
        >
          <img
            src={Gear}
            className="clock__gearIcon--style"
            alt="Gear icon"
          ></img>
        </button>
        <button
          className={`clock__gearButton--style ${showGears ? "show" : "hide"}`}
          type="button"
          onClick={() => setShowGears(!showGears)}
        >
          <img
            src={Check}
            className="clock__checkIcon--style"
            alt="Check icon"
          ></img>
        </button>
        <div className={`gearInputs--container ${showGears ? "show" : "hide"}`}>
          <label htmlFor="updateMinute">Minutes</label>
          <input
            id="updateMinute"
            type="number"
            value={minutes}
            onChange={(event) => setMinutes(event.target.value)}
          />
          <label htmlFor="updateSeconds">Seconds</label>
          <input id="updateSeconds" type="number" />
        </div>
      </div>
    </div>
  );
}

export default App;
