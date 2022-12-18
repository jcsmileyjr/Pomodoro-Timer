import "./App.css";
import Gear from "./assets/gear.svg";

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
  return (
    <div className="App">
      <div className="clock--container">
        <div className="timer--container">
          <p id="minutes">15</p>
          <p>:</p>
          <p id="seconds">00</p>
        </div>
        <button className="clock__primaryButton--style" type="button">
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
