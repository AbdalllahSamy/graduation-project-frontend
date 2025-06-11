import { useState, useEffect } from "react";
import img1 from "./../../../../assets/images/auth-pic.png";
import meal1 from "./../../../../assets/images/pre-prepared-food-showcasing-ready-eat-delicious-meals-go (1).jpg";
import meal2 from "./../../../../assets/images/pre-prepared-food-showcasing-ready-eat-delicious-meals-go.jpg";
import { FaStar } from "react-icons/fa";
import CustomDialog from "@/components/ui/CustomDialog";

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedTrainingsByDay, setCompletedTrainingsByDay] = useState({});
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [doneMeals, setDoneMeals] = useState([]);

  const days = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    day: `Day ${i + 1}`,
    muscle: ["Chest", "Back", "Legs", "Arms", "Core"][i % 5],
    trainings: [
      { id: 1, img: img1, name: "Bench Press", sets: 4, reps: 12 },
      { id: 2, img: img1, name: "Incline Dumbbell Press", sets: 3, reps: 10 },
      { id: 3, img: img1, name: "Push Ups", sets: 3, reps: 15 },
    ],
  }));

  const meals = [
    {
      id: 1,
      img: meal1,
      name: "Chicken Salad",
      description:
        "A healthy salad with grilled chicken, mixed greens, and vinaigrette.",
      calories: 350,
    },
    {
      id: 2,
      img: meal2,
      name: "Quinoa Bowl",
      description:
        "A nutritious bowl with quinoa, black beans, corn, and avocado.",
      calories: 400,
    },
  ];

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

  const currentDay = 1;

  useEffect(() => {
    setSelectedDay(currentDay);
  }, []);

  const currentDayData = days.find((d) => d.id === selectedDay);
  const currentDayTrainings = currentDayData?.trainings || [];
  const completedForDay = completedTrainingsByDay[selectedDay] || [];
  const allTrainingsDone =
    currentDayTrainings.length > 0 &&
    completedForDay.length === currentDayTrainings.length;

  // const totalTrainings = days.reduce((acc, day) => acc + day.trainings.length, 0);
  // const totalCompletedTrainings = Object.values(completedTrainingsByDay).reduce(
  //   (acc, ids) => acc + ids.length, 0
  // );
  // const trainingProgress = (totalCompletedTrainings / totalTrainings) * 100;

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-950">
      <div className="flex flex-col w-full lg:w-[75%] p-8">
        <div className="w-full">
          <h1 className="text-5xl font-extrabold mb-6 text-white text-center transition-all ease-in-out duration-300 font-family-pri ">
            {" "}
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
                  className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ease-in-out
                ${
                  selectedDay === day.id
                    ? "bg-gradient-to-r from-primary to-black text-white transform scale-105 border-2 border-white"
                    : isFuture
                    ? "bg-black/10 text-gray-500 cursor-not-allowed"
                    : "bg-black/10 text-gray-300 hover:bg-primary hover:text-white cursor-pointer shadow-md hover:scale-105 border-2 border-white"
                }
              `}
                >
                  {day.day}
                </button>
              );
            })}
          </div>

          <p className="text-lg font-semibold text-center mb-4 text-gray-300 font-family-sec">
            Training Progress for {currentDayData.day}: {completedForDay.length}{" "}
            / {currentDayTrainings.length}
          </p>
          <div className="w-full bg-gray-600 rounded-full h-3 mb-6">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${
                  (completedForDay.length / currentDayTrainings.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {currentDayData.trainings.map((training) => {
            const isDone = completedForDay.includes(training.id);

            return (
              <div
                key={training.id}
                className={`relative flex font-family-sec flex-col gap-4 p-8 rounded-2xl shadow-xl transition-all duration-500 ease-in-out transform hover:scale-[1.05] ${
                  isDone
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                    : "bg-black/10 backdrop-blur-md backdrop-brightness-125 border border-white/20 text-gray-300  hover:scale-[1.05]   hover:shadow-xl hover:bg-white/20 hover:text-white "
                }`}
              >
                <div className="flex justify-between items-center flex-col gap-8">
                  <img
                    src={training.img}
                    alt={training.name}
                    className="w-20 h-20 rounded-md object-cover shadow-lg"
                  />

                  <button
                    onClick={() => toggleTrainingDone(selectedDay, training.id)}
                    className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out cursor-pointer
                  ${
                    isDone
                      ? "bg-white text-green-600"
                      : "bg-gradient-to-r from-primary to-black text-white hover:bg-primary/80 border-2 border-white hover:scale-105"
                  }`}
                  >
                    {isDone ? "Done ✅" : "Mark as Done"}
                  </button>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <p className="text-xl font-semibold uppercase text-center">
                    {training.name}
                  </p>
                  <p className="text-md text-gray-500">
                    {" "}
                    Muscle: {currentDayData.muscle}
                  </p>
                  <p className="text-sm text-gray-400">
                    Sets: {training.sets} · Reps: {training.reps}
                  </p>
                  <p className="text-sm mt-4 text-gray-500">
                    {" "}
                    Don’t forget to stretch!
                  </p>
                </div>

                {isDone && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-md z-10">
                    <span className="bg-green-500 text-white text-xl font-semibold px-2 py-1 rounded-full">
                      Done
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allTrainingsDone && (
          <div className="flex justify-center mt-8">
            <CustomDialog
              dialogClassName="relative z-[999999]"
              title="Rate"
              btnClassName="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg cursor-pointer hover:bg-gray-800 transition-all"
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

      <div className="bg-black/10 shadow-xl w-full lg:w-[25%] p-6 border-l-1 border-white flex flex-col font-family-sec">
        <h2 className="text-4xl font-family-pri font-bold text-center mb-6 text-white">
           Daily Meals
        </h2>
        <div className="flex flex-col gap-8">
          {meals.map((meal) => {
            const isDone = doneMeals.includes(meal.id);
            return (
              <div
                key={meal.id}
                className={`relative rounded-xl p-8 shadow-lg transition-all duration-300 transform ${
                  isDone
                    ? "border-green-500 border   scale-[1.02] text-black"
                    : "bg-black/10 hover:bg-white/10 border-1 border-white"
                }`}
              >
                <img
                  src={meal.img}
                  alt={meal.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-white">
                  {meal.name}
                </h3>
                <p className="text-sm text-gray-400">{meal.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                   Calories: {meal.calories}
                </p>

                {!isDone && (
                  <button
                    onClick={() => toggleMealDone(meal.id)}
                    className="mt-4 px-8 py-3 text-sm font-semibold rounded-full bg-gradient-to-r from-primary to-black cursor-pointer transform scale-105 border-2 border-white text-white hover:bg-primary/80 transition-all"
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
      </div>
    </div>
  );
}
