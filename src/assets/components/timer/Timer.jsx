import React, { useState, useRef, useEffect } from "react";
import "./timer.css";

const TimerConfig = {
  Hours: {
    value: "",
    placeholder: "HH",
    factor: 60 * 60 * 1000,
  },
  Minutes: {
    value: "",
    placeholder: "MM",
    factor: 60 * 1000,
  },
  Seconds: {
    value: "",
    placeholder: "SS",
    factor: 1000,
  },
  Milliseconds: {
    value: "",
    placeholder: "MS",
    factor: 1,
  },
};

const orderOfKeys = ["Hours", "Minutes", "Seconds", "Milliseconds"];

export default function Timer() {
  const [config, setConfig] = useState(TimerConfig);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef(null);
  const endTimeRef = useRef(0);

  const handleChange = (e, item) => {
    setConfig((prev) => ({
      ...prev,
      [item]: {
        ...prev[item],
        value: e.target.value,
      },
    }));
  };

  const calculateTotalTime = () => {
    let totalDelayInMs = 0;
    orderOfKeys.forEach((item) => {
      const itemData = config[item];
      const itemValue = itemData?.value;
      const itemFactor = itemData?.factor;
      if (itemValue && !isNaN(itemValue)) {
        totalDelayInMs += Number(itemValue) * itemFactor;
      }
    });
    return totalDelayInMs;
  };

  const handleStart = () => {
    if (isRunning) return;

    const totalDelayInMs = calculateTotalTime();
    if (totalDelayInMs <= 0) return;

    endTimeRef.current = Date.now() + totalDelayInMs;
    setTimeLeft(totalDelayInMs);
    setIsRunning(true);

    intervalIdRef.current = setInterval(() => {
      const now = Date.now();
      const remainingTime = endTimeRef.current - now;

      if (remainingTime <= 0) {
        clearInterval(intervalIdRef.current);
        setTimeLeft(0);
        setIsRunning(false);
      } else {
        setTimeLeft(remainingTime);
      }
    }, 10);
  };

  const handlePause = () => {
    if (!isRunning) return;
    clearInterval(intervalIdRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalIdRef.current);
    setTimeLeft(0);
    setIsRunning(false);
    setConfig(TimerConfig);
  };

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    const milliseconds = Math.floor(ms % 1000);

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
      milliseconds.toString().padStart(3, "0"),
    ].join(":");
  };

  return (
    <div className="timer-container">
      <div className="time-display">{formatTime(timeLeft)}</div>
      <div className="input-fields">
        {orderOfKeys.map((item) => (
          <input
            key={item}
            type="number"
            placeholder={config[item].placeholder}
            value={config[item]?.value}
            onChange={(e) => handleChange(e, item)}
            disabled={isRunning}
          />
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
