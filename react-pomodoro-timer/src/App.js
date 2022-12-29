import "./App.css";
import Gear from "./assets/gear.svg";
import Check from "./assets/check.svg";
import React, { useState, useEffect, useCallback } from "react";

/**
 * Basic pomodoro timer that displays a decreasing minutes and seconds
 * while someone work on a problem.
 *
 * TODO:
 * Setup initial basic HTML
 * Style with initial  CSS
 * Add basic JavaScript for timer from 15 minutes
 * Add functionality to start/stop to timer
 * Add functionality when timer stops, alert message is shown
 * Add functionality when the gear icon is clicked, user can change minutes and seconds
 * Add functionaliyt when the gear icon is clicked, the input elements are blank
 * HARD PART: Ring around timer should go from red to green.
 */
function App() {
  const [counter, setCounter] = useState(false); // Start & Stop the timer
  const [minutes, setMinutes] = useState(15); // stores the number of remaining minutes
  const [seconds, setSeconds] = useState(0); // stores the number of remaining seconds
  const [showGears, setShowGears] = useState(false); // Show & Hide the "set new time" using the gear icon.

  // 
  /**
   * Decrease the seconds and minute on the Pomorodoro timer every second.
   */
  const decliningTimer = useCallback(() => {
    if (minutes <= 0 && seconds <= 0) {
      setCounter(false);
      setSeconds("0");
      setMinutes(0);
      return;
    }
    setSeconds(seconds - 1);
    if (seconds <= 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    }
  }, [seconds, minutes]);

  /**
   * This is the countdown functionality that updates seconds and minutes based on a declining interval
   */
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

  // Clear the inputs within the Gears timer control inputs
  const clearInputs = () => {
    setSeconds(0);
    setMinutes(15);
    setCounter(false);
  }

  return (
    <div className="App">
      <div className={`clock--container ${seconds==='0' && minutes=== 0?'finishedColor':'tickingColor'}`}>
        <div className={`timer--container ${showGears ? "hide" : ""}`}>
          <p id="minutes">{minutes}</p>
          <p>:</p>
          {/* Displays an extra "0" in front of seconds that are less then ten */}
          <p id="seconds">{seconds < 10 && 0}{seconds}</p>
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
          onClick={() => {setShowGears(!showGears); clearInputs();}}
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
          onClick={() => {setShowGears(!showGears); setCounter(true);}}
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
          <input id="updateSeconds" type="number" value={seconds} onChange={(event) => setSeconds(event.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default App;
