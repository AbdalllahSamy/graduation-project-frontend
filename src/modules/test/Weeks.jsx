import React from "react";
import week from "../../assets/images/week.png";
import { useNavigate } from "react-router-dom";
const weeksData = [
  { weekNumber: 1, image: week },
  { weekNumber: 2, image: week },
  { weekNumber: 3, image: week },
  { weekNumber: 4, image: week },
];
export default function Weeks() {
    const navigate = useNavigate();
    const handleClick=()=>{
        navigate('/dashboard')
    }
  return (
    <div>
      <div className="weeks-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {weeksData.map((week) => (
          <div
            key={week.weekNumber}
            className="weeks-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105"
          >
            <img
              src={week.image}
              alt={`Week ${week.weekNumber}`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-center text-xl font-semibold mb-4 text-gray-800">
              Week {week.weekNumber}
            </h2>

            {/* Progress bar to indicate progress */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${week.progress}%` }}
              ></div>
            </div>

            {/* View Button */}
            <button
              onClick={() => handleClick()}
              className="w-full bg-primary text-white p-3 cursor-pointer rounded-lg font-semibold hover:bg-gradient-to-l transition-all duration-300"
            >
              View Week Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
