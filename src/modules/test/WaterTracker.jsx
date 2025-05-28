import React from "react";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function WaterTracker() {
  const goal = 8;
  const [cups, setCups] = useState(() => {
    const savedCups = localStorage.getItem("cups");
    return savedCups ? parseInt(savedCups) : 0;
  });

  const handleDrink = () => {
    if (cups < goal) {
      const newCount = cups + 1;
      setCups(newCount);
      localStorage.setItem("cups", newCount.toString());
    }
  };

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("track-date");
    if (savedDate !== today) {
      setCups(0);
      localStorage.setItem("cups", "0");
      localStorage.setItem("track-date", today);
    }
  }, []);

  const percentage = (cups / goal) * 100;

  return (
    <div className="h-screen  flex flex-col justify-center items-center  text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-10 font-family-pri">
        Water Tracker
      </h1>

      <div className="w-64 h-64 mb-8 font-family-pri">
        <CircularProgressbar
          value={percentage}
          text={`${cups} / ${goal} cups`}
          styles={buildStyles({
            pathColor: "#3b82f6",
            textColor: "#1e40af",
            trailColor: "#bfdbfe",
            textSize: "16px",
          })}
        />
        <h2 className="my-4 text-5xl">{percentage}%</h2>
      </div>

      <button
        onClick={handleDrink}
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 px-6 rounded-full shadow-md transition font-family-pri cursor-pointer mt-10"
      >
        Drink
      </button>
    </div>
  );
}
