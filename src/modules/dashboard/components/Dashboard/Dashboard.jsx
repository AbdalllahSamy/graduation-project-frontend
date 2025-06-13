import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import CustomDialog from "@/components/ui/CustomDialog";
import { axiosInstance } from "@/services/apisUrls/apisUrls";

import img1 from "./../../../../assets/images/auth-pic.png";
import meal1 from "./../../../../assets/images/pre-prepared-food-showcasing-ready-eat-delicious-meals-go (1).jpg";
import meal2 from "./../../../../assets/images/pre-prepared-food-showcasing-ready-eat-delicious-meals-go.jpg";
import vegetables from "./../../../../assets/images/711c3d80-42c6-49da-bd0f-ca5702967ff5.jpg";
import protin from "./../../../../assets/images/d709c2d3-03b0-4bf2-b636-df60fe0d43b6.jpg";
import juice from "./../../../../assets/images/fc98aeab-20cc-435c-ac6b-8ae96c091be5.jpg";

export default function Dashboard() {
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState(() => {
    const savedDay = localStorage.getItem('selectedDay');
    return savedDay ? parseInt(savedDay) : 0;
  });
  const [completedTrainingsByDay, setCompletedTrainingsByDay] = useState({});
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [doneMeals, setDoneMeals] = useState([]);
  const [plan, setPlan] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentDay, setCurrentDay] = useState(() => {
    const lastUpdate = localStorage.getItem('lastUpdateDate');
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const savedDay = localStorage.getItem('currentDay');
    const currentDayValue = savedDay ? parseInt(savedDay) : 0;

    // If last update was not today, increment the day
    if (lastUpdate !== todayString) {
      const newDay = currentDayValue + 1;
      localStorage.setItem('currentDay', newDay);
      localStorage.setItem('lastUpdateDate', todayString);
      return newDay;
    }
    return currentDayValue;
  });

  const getPlan = async () => {
    try {
      const res = await axiosInstance.get(`/weeks-plans/${id}`);
      setPlan(res.data.data.plan);
    } catch (err) {
      console.error("Error fetching plan:", err);
    }
  };

  useEffect(() => {
    getPlan();
  }, [id]);

  // Save selectedDay to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedDay', selectedDay);
  }, [selectedDay]);

  // Check for midnight and update currentDay
  useEffect(() => {
    const updateDayIfMidnight = () => {
      const now = new Date();
      const todayString = now.toISOString().split('T')[0];
      const lastUpdate = localStorage.getItem('lastUpdateDate');

      if (lastUpdate !== todayString) {
        setCurrentDay((prev) => {
          const newDay = prev + 1;
          localStorage.setItem('currentDay', newDay);
          localStorage.setItem('lastUpdateDate', todayString);
          return newDay;
        });
      }

      // Schedule next check for midnight
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const msUntilMidnight = tomorrow - now;

      const timeout = setTimeout(updateDayIfMidnight, msUntilMidnight);
      return () => clearTimeout(timeout);
    };

    updateDayIfMidnight(); // Check immediately on mount
    const interval = setInterval(updateDayIfMidnight, 60 * 60 * 1000); // Check hourly
    return () => clearInterval(interval);
  }, []);

  const mealsByCategory = plan
    ? plan.diet_recommendation
        .split(";")
        .map((category, catIndex) => {
          const [key, value] = category.split(":").map((s) => s.trim());
          if (!key || !value) return null;
          const items = value
            .replace(/[()]/g, "")
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item);
          return {
            category: key,
            items: items.map((item, itemIndex) => ({
              id: `${catIndex}-${itemIndex}`,
              img: itemIndex % 2 === 0 ? vegetables : meal2,
              name: item,
              description: `A nutritious ${item.toLowerCase()} from ${key.toLowerCase()}`,
              calories: key.includes("Juice")
                ? 150
                : key.includes("Vegetables")
                ? 100
                : 300,
            })),
          };
        })
        .filter(Boolean)
    : [];

  const days = plan
    ? plan.weekly_workout_plan.map((day, index) => ({
        id: index,
        day: day.day,
        muscle: day.muscle_group,
        trainings: day.exercises.map((exercise, i) => ({
          id: i,
          img: img1,
          name: exercise.name,
          sets: parseInt(exercise.reps.split("x")[0]) || 3,
          reps: parseInt(exercise.reps.split("x")[1]) || 10,
        })),
      }))
    : [];

  const toggleTrainingDone = (dayId, trainingId) => {
    setCompletedTrainingsByDay((prev) => {
      const current = prev[dayId] || [];
      const updated = current.includes(trainingId)
        ? current.filter((id) => id !== trainingId)
        : [...current, trainingId];
      return { ...prev, [dayId]: updated };
    });
  };

  const toggleMealDone = (id) => {
    setDoneMeals((prev) =>
      prev.includes(id) ? prev.filter((mealId) => mealId !== id) : [...prev, id]
    );
  };

  const currentDayData =
    days.find((d) => d.id === selectedDay) || { trainings: [], muscle: "", day: "" };
  const currentDayTrainings = currentDayData.trainings || [];
  const completedForDay = completedTrainingsByDay[selectedDay] || [];
  const allTrainingsDone =
    currentDayTrainings.length > 0 &&
    completedForDay.length === currentDayTrainings.length;

  const categoryImages = {
    Juice: juice,
    Vegetables: vegetables,
    ProteinIntake: protin,
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-950">
      <div className="flex flex-col w-full lg:w-[75%] p-8">
        {/* Title & Days */}
        <h1 className="text-5xl font-extrabold mb-6 text-white text-center font-family-pri">
          Weekly Training
        </h1>

        <div className="flex items-center justify-center gap-4 flex-wrap mb-8 font-family-sec">
          {days.map((day) => {
            const isFuture = day.id > currentDay;
            return (
              <button
                key={day.id}
                onClick={() => !isFuture && setSelectedDay(day.id)}
                disabled={isFuture}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ease-in-out ${
                  selectedDay === day.id
                    ? "bg-gradient-to-r from-primary to-black text-white scale-105 border-2 border-white"
                    : isFuture
                    ? "bg-black/10 text-gray-500 cursor-not-allowed"
                    : "bg-black/10 text-gray-300 hover:bg-primary hover:text-white border-2 border-white shadow-md hover:scale-105"
                }`}
              >
                {day.day}
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <p className="text-lg font-semibold text-center mb-4 text-gray-300 font-family-sec">
          Training Progress for {currentDayData.day}: {completedForDay.length} /{" "}
          {currentDayTrainings.length}
        </p>
        <div className="w-full bg-gray-600 rounded-full h-3 mb-6">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
            style={{
              width: `${
                currentDayTrainings.length
                  ? (completedForDay.length / currentDayTrainings.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>

        {/* Trainings List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {currentDayTrainings.map((training) => {
            const isDone = completedForDay.includes(training.id);
            return (
              <div
                key={training.id}
                className={`relative flex flex-col gap-4 p-8 rounded-2xl shadow-xl transition-all duration-500 ease-in-out transform hover:scale-[1.05] ${
                  isDone
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                    : "bg-black/10 text-gray-300 border border-white/20 backdrop-blur-md"
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={training.img}
                    alt={training.name}
                    className="w-20 h-20 rounded-md object-cover shadow-lg"
                  />
                  <button
                    onClick={() => toggleTrainingDone(selectedDay, training.id)}
                    className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                      isDone
                        ? "bg-white text-green-600"
                        : "bg-gradient-to-r from-primary to-black text-white border-2 border-white"
                    }`}
                  >
                    {isDone ? "Done ✅" : "Mark as Done"}
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold uppercase">{training.name}</p>
                  <p className="text-md text-gray-500">Muscle: {currentDayData.muscle}</p>
                  <p className="text-sm text-gray-400">
                    Sets: {training.sets} · Reps: {training.reps}
                  </p>
                  <p className="text-sm mt-4 text-gray-500">Don’t forget to stretch!</p>
                </div>
                {isDone && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-md z-10">
                    <span className="bg-green-500 text-white text-xl font-semibold px-4 py-2 rounded-full">
                      Done
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Rating Dialog */}
        {allTrainingsDone && (
          <div className="flex justify-center mt-8">
            <CustomDialog
              dialogClassName="relative z-[999999]"
              title="Rate"
              btnClassName="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg cursor-pointer hover:bg-gray-800"
              contentClassName="bg-white text-black"
            >
              <div className="flex flex-col items-center space-y-6 p-8">
                <p className="text-lg font-semibold">
                  How was your full workout for {currentDayData.day}?
                </p>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer text-4xl ${
                        (hoverRating || rating) >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
                <p className="text-sm">You rated this: {rating} ⭐</p>
              </div>
            </CustomDialog>
          </div>
        )}
      </div>

      {/* Meals Sidebar */}
      <div className="bg-black/10 shadow-xl w-full lg:w-[25%] p-6 border-l border-white font-family-sec">
        <h2 className="text-4xl font-family-pri font-bold text-center mb-6 text-white">
          Daily Meals
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {mealsByCategory.map((category) => (
            <button
              key={category.category}
              onClick={() =>
                setSelectedCategory((prev) =>
                  prev === category.category ? null : category.category
                )
              }
              className={`px-6 py-2 rounded-full font-semibold text-sm border-2 transition-all duration-300 ${
                selectedCategory === category.category
                  ? "bg-primary text-white border-white"
                  : "bg-black/20 text-gray-300 border-gray-500 hover:bg-primary hover:text-white"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Meal Cards */}
        <div className="flex flex-col gap-8">
          {(selectedCategory
            ? mealsByCategory.filter((c) => c.category === selectedCategory)
            : mealsByCategory
          ).map((category) => (
            <div key={category.category} className="flex flex-col gap-4">
              <h3 className="text-2xl font-semibold text-white border-b border-gray-500 pb-2">
                {category.category}
              </h3>
              {category.items.map((meal) => {
                const isDone = doneMeals.includes(meal.id);
                return (
                  <div
                    key={meal.id}
                    className={`relative rounded-xl p-6 transition-all duration-300 ${
                      isDone
                        ? "border-green-500 border scale-[1.02] bg-white text-black"
                        : "bg-black/10 hover:bg-white/10 text-white border border-white"
                    }`}
                  >
                    <img
                      src={
                        categoryImages[category.category.replace(/\s+/g, "")] || meal2
                      }
                      alt={meal.name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h4 className="text-lg font-semibold">{meal.name}</h4>
                    <p className="text-sm text-gray-400">{meal.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Calories: {meal.calories}
                    </p>
                    {!isDone && (
                      <button
                        onClick={() => toggleMealDone(meal.id)}
                        className="mt-4 px-8 py-3 text-sm font-semibold rounded-full bg-gradient-to-r from-primary to-black text-white border-2 border-white hover:bg-primary/80"
                      >
                        Mark as Done
                      </button>
                    )}
                    {isDone && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-full">
                        Done
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}