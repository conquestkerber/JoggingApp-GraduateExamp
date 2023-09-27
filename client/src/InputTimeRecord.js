import React, { useState } from "react";

const TimeInputForm = ({onBringVo2Max}) => {
  const [timeInput, setTimeInput] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [distance, setDistance] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTimeInput((prevTimeInput) => ({
      ...prevTimeInput,
      [name]: value,
    }));
  };

  const distanceHandler = (e) => {
    setDistance(e.target.value);
  };

  function calculateVDOT(raceTime, raceDistance) {
    // Will be converted to minutes inside the function call
    const [hours, minutes, seconds] = raceTime.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const totalDistance = Number(raceDistance);

    const VO2Max = calculatePercentageVO2Max(totalSeconds, true);
    raceTime = totalSeconds / 60;
    const proba = raceTime / (VO2Max / 1000);
    const vDOT =
      (-4.6 +
        0.182258 * (totalDistance / raceTime) +
        0.000104 * Math.pow(totalDistance / raceTime, 2)) /
      VO2Max;
    // return Math.round(vDOT);
    // console.log(vDOT);
    // console.log(proba);
    const vo2 = Math.round(vDOT);
    // console.log(vo2);
    onBringVo2Max(vo2);
    // console.log(Math.round(vDOT));
  }

  function calculatePercentageVO2Max(raceTime, doNotFormat) {
    // Equation from JackDaniels Tables
    // The JackDaniels function is expecting the raceTime to be in minutes
    raceTime = raceTime / 60;
    const percentageVO2Max =
      0.8 +
      0.1894393 * Math.exp(-0.012778 * raceTime) +
      0.2989558 * Math.exp(-0.1932605 * raceTime);
    if (doNotFormat) {
      return percentageVO2Max;
    }
    //   return roundNumber(percentageVO2Max * 100);
    return Math.round(percentageVO2Max * 100);
  }

  const saveTime = () => {
    const { hours, minutes, seconds } = timeInput;
    // const isValid = validateTimeFormat(timeInput);

    // if (isValid) {
    const time = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    calculateVDOT(time, distance);

    // Send the time to the backend for saving in the database
    /*  fetch("/save-time", {
        method: "POST",
        headers: {
          "Content-applicationType": "application/json",
        },
        body: JSON.stringify({ time: timeInput }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // You can handle the response from the backend here
        })
        .catch((error) => {
          console.error("Error:", error);
        }); */
    // } else {
    //   alert("Invalid time format. Please enter time in 'hh:mm:ss' format.");
    // }
  };
  const padZero = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div>
      <label htmlFor="distance">Distance:</label>
      <select
        name="distance"
        id="distance"
        defaultValue=""
        onChange={distanceHandler}
      >
        <option value="" disabled hidden>
          Distance
        </option>
        <option value={1500}>1500m</option>
        <option value={3000}>3000m</option>
        <option value={5000}>5000m</option>
        <option value={10000}>10000m</option>
        <option value={21097}>21097m</option>
        <option value={42195}>42195m</option>
      </select>
      <div>
        <label htmlFor="timeInput">Enter time (hh:mm:ss):</label>
        <input
          type="number"
          id="hours"
          name="hours"
          placeholder="H"
          min={0}
          max={10}
          value={timeInput.hours}
          onChange={handleInputChange}
        />
        <input
          type="number"
          id="minutes"
          name="minutes"
          placeholder="min"
          min={0}
          max={59}
          value={timeInput.minutes}
          onChange={handleInputChange}
        />
        <input
          type="number"
          id="seconds"
          name="seconds"
          placeholder="sec"
          min={0}
          max={59}
          value={timeInput.seconds}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={saveTime}>Save Time</button>
    </div>
  );
};

export default TimeInputForm;

/*  za izracunavanje VO2max
function calculateVDOT(raceTime, raceDistance) {
  // Will be converted to minutes inside the function call
  const VO2Max = calculatePercentageVO2Max(raceTime, true);
  raceTime = raceTime / 60;
  const vDOT =
    (-4.6 +
      0.182258 * (raceDistance / raceTime) +
      0.000104 * Math.pow(raceDistance / raceTime, 2)) /
    VO2Max;
  //   return roundNumber(vDOT);
  return Math.round(vDOT);
}

function calculatePercentageVO2Max(raceTime, doNotFormat) {
  // Equation from JackDaniels Tables
  // The JackDaniels function is expecting the raceTime to be in minutes
  raceTime = raceTime / 60;
  const percentageVO2Max =
    0.8 +
    0.1894393 * Math.exp(-0.012778 * raceTime) +
    0.2989558 * Math.exp(-0.1932605 * raceTime);
  if (doNotFormat) {
    return percentageVO2Max;
  }
  //   return roundNumber(percentageVO2Max * 100);
  return Math.round(percentageVO2Max * 100);
}

const nesto = calculateVDOT(3003, 10000); //when u send a value you send in sec and bring back in min
console.log(nesto);
 */
