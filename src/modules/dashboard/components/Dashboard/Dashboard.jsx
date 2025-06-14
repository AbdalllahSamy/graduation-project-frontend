import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  const [doneMeals, setDoneMeals] = useState([]);
  const [plan, setPlan] = useState(null);
  const [feedbacks,setFeddbacks]=useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ratedDays, setRatedDays] = useState(() => {
    const savedRatedDays = localStorage.getItem('ratedDays');
    return savedRatedDays ? JSON.parse(savedRatedDays) : {};
  });

  const getPlan = async () => {
    try {
      const res = await axiosInstance.get(`/weeks-plans/${id}`);
      setPlan(res.data.data.plan);
      console.log(res,'plan')
    } catch (err) {
      console.error("Error fetching plan:", err);
    }
  };

  useEffect(() => {
    getPlan();
  }, [id]);

  useEffect(() => {
    localStorage.setItem('selectedDay', selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    localStorage.setItem('ratedDays', JSON.stringify(ratedDays));
  }, [ratedDays]);

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
    ? plan.weekly_workout_plan.map((day) => ({
      id: day.id,
      day: day.day,
      day_id: day.id,
      feedback:day.feedback,
      muscle: day.muscle_group,
      trainings: day.exercises.map((exercise) => ({
        id: exercise.id,
        day_id: day.id,
        img: img1,
        is_done: exercise.is_done,
        name: exercise.name,
        sets: parseInt(exercise.reps.split("x")[0]) || 3,
        reps: parseInt(exercise.reps.split("x")[1]) || 10,
      })),
    }))
    : [];

  const toggleTrainingDone = async (dayId, trainingId) => {
    try {
      await axiosInstance.post(`/mark-exercise-done/${id}/${dayId}/${trainingId}`);
      setPlan((prevPlan) => {
        if (!prevPlan) return prevPlan;
        const updatedWeeklyWorkoutPlan = prevPlan.weekly_workout_plan.map((day) => {
          if (day.id === dayId) {
            return {
              ...day,
              exercises: day.exercises.map((exercise) => {
                if (exercise.id === trainingId) {
                  return { ...exercise, is_done: !exercise.is_done };
                }
                return exercise;
              }),
            };
          }
          return day;
        });
        return { ...prevPlan, weekly_workout_plan: updatedWeeklyWorkoutPlan };
      });
      setCompletedTrainingsByDay((prev) => {
        const current = prev[dayId] || [];
        const updated = current.includes(trainingId)
          ? current.filter((id) => id !== trainingId)
          : [...current, trainingId];
        return { ...prev, [dayId]: updated };
      });
    } catch (err) {
      console.error("Error marking exercise:", err);
    }
  };

  const currentDayData =
    days.find((d) => d.id === selectedDay) || { trainings: [], muscle: "", day: "" };

  const currentDayTrainings = currentDayData.trainings || [];
  const completedForDay = currentDayTrainings.filter((t) => t.is_done).length;

  const allTrainingsDone =
    currentDayTrainings.length > 0 &&
    completedForDay === currentDayTrainings.length;

  const toggleMealDone = (id) => {
    setDoneMeals((prev) =>
      prev.includes(id) ? prev.filter((mealId) => mealId !== id) : [...prev, id]
    );
  };

useEffect(() => {
  const hasFeedback = currentDayData.feedback !== null && currentDayData.feedback !== undefined;
  if (allTrainingsDone && !ratedDays[currentDayData.day_id] && !hasFeedback) {
    setIsDialogOpen(true);
  } else {
    setIsDialogOpen(false); // Ensure dialog is closed if conditions are not met
  }
}, [allTrainingsDone, ratedDays, currentDayData.day_id, currentDayData.feedback]);

  const categoryImages = {
    Juice: juice,
    Vegetables: vegetables,
    ProteinIntake: protin,
  };
  useEffect(() => {
    console.log("fucato", ratedDays, days.length);
    
  },[])
  const sendFeedBack = async (day_id, ratingValue) => {
    if (day_id && id) {
      try {
        await axiosInstance.post(`weekly-plan/${id}/day/${day_id}/feedback`, {
          rate: ratingValue,
          last_day: true
        });
        setRatedDays((prev) => ({ ...prev, [day_id]: true }));
        setIsDialogOpen(false);
        setRating(0);
        getPlan();
      } catch (err) {
        console.error("Feedback error:", err);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gray-950 overflow-hidden">
      <div className="flex flex-col w-full lg:w-[75%] p-8">
        <h1 className="text-5xl font-extrabold mb-6 text-white text-center font-family-pri">
          Weekly Training
        </h1>

        <div className="flex items-center justify-center gap-4 flex-wrap mb-8 font-family-sec">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => {
                setSelectedDay(day.id);
              }}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ease-in-out ${
                selectedDay === day.id
                  ? "bg-gradient-to-r from-primary to-black text-white scale-105 border-2 border-white"
                  : ratedDays[day.day_id]
                    ? "bg-green-600 text-white border-2 border-white opacity-75"
                    : "bg-black/10 text-gray-300 hover:bg-primary hover:text-white border-2 border-white shadow-md hover:scale-105"
              }`}
            >
              {day.day}
              {ratedDays[day.day_id] && " ✅"}
            </button>
          ))}
        </div>

        <p className="text-lg font-semibold text-center mb-4 text-gray-300 font-family-sec">
          Training Progress for {currentDayData.day}: {completedForDay} /{" "}
          {currentDayTrainings.length}
        </p>
        <div className="w-full bg-gray-600 rounded-full h-3 mb-6">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
            style={{
              width: `${
                currentDayTrainings.length
                  ? (completedForDay / currentDayTrainings.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 overflow-y-scroll hide-scrollbar">
          {currentDayTrainings.map((training) => (
            <div
              key={training.id}
              className={`relative flex flex-col gap-4 p-8 rounded-2xl shadow-xl transition-all duration-500 ease-in-out transform hover:scale-[1.05] ${
                training.is_done
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
                  onClick={() => toggleTrainingDone(training.day_id, training.id)}
                  className={`px-6 cursor-pointer py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    training.is_done
                      ? "bg-white text-green-600"
                      : "bg-gradient-to-r from-primary to-black text-white border-2 border-white"
                  }`}
                >
                  {training.is_done ? "Done ✅" : "Mark as Done"}
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
              {!!training.is_done && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-md z-10">
                  <span className="bg-green-500 text-white text-xl font-semibold px-4 py-2 rounded-full">
                    Done
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {isDialogOpen && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-blue-100/40 backdrop-blur-md z-10">
            <CustomDialog
              dialogClassName="w-full max-w-[40rem]"
              title="Rate"
              btnClassName="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg cursor-pointer hover:bg-gray-800"
              contentClassName="bg-white text-black w-[30rem] overflow-hidden"
            >
              <div className="flex flex-col items-center space-y-6 p-8 w-full">
                <p className="text-lg font-semibold">
                  How was your full workout for {currentDayData.day}?
                </p>
                <div className=" flex-col flex gap-3 justify-center items-center ">
                  <button
                    onClick={() => {
                      setRating(1);
                      sendFeedBack(currentDayData.day_id, 1);
                    }}
                    className="px-6 py-2 text-sm font-semibold rounded-full bg-black backdrop-blur-3xl text-white hover:bg-black/60"
                  >
                    Easy 
                  </button>
                  <button
                    onClick={() => {
                      setRating(3);
                      sendFeedBack(currentDayData.day_id, 3);
                    }}
                    className="px-6 py-2 text-sm font-semibold rounded-full bg-black backdrop-blur-3xl text-white hover:bg-black/60"
                  >
                    Medium 
                  </button>
                  <button
                    onClick={() => {
                      setRating(5);
                      sendFeedBack(currentDayData.day_id, 5);
                    }}
                    className="px-6 py-2 text-sm font-semibold rounded-full bg-black backdrop-blur-3xl text-white hover:bg-black/60"
                  >
                    Hard
                  </button>
                </div>
                <p className="text-sm">
                  {rating ? `You rated this: ${rating === 1 ? "Easy" : rating === 3 ? "Medium" : "Hard"} (${rating})` : "Select a difficulty"}
                </p>
              </div>
            </CustomDialog>
          </div>
        )}
      </div>

      <div className="bg-black/10 shadow-xl w-full lg:w-[25%] p-6 border-l border-white font-family-sec overflow-y-scroll hide-scrollbar">
        <h2 className="text-4xl font-family-pri font-bold text-center mb-6 text-white">
          Daily Meals
        </h2>

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