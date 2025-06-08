import { useState, useEffect } from 'react';
import img1 from './../../../../assets/images/auth-pic.png';
import meal1 from './../../../../assets/images/pre-prepared-food-showcasing-ready-eat-delicious-meals-go (1).jpg';
import meal2 from './../../../../assets/images/pre-prepared-food-showcasing-ready-eat-delicious-meals-go.jpg';
import { FaStar } from 'react-icons/fa';
import CustomDialog from '@/components/ui/CustomDialog';

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedTrainingsByDay, setCompletedTrainingsByDay] = useState({});
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [doneMeals, setDoneMeals] = useState([]);

  const days = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    day: `Day ${i + 1}`,
    muscle: ['Chest', 'Back', 'Legs', 'Arms', 'Core'][i % 5],
    trainings: [
      { id: 1, img: img1, name: 'Bench Press', sets: 4, reps: 12 },
      { id: 2, img: img1, name: 'Incline Dumbbell Press', sets: 3, reps: 10 },
      { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
    ],
  }));

  const meals = [
    {
      id: 1,
      img: meal1,
      name: 'Chicken Salad',
      description: 'A healthy salad with grilled chicken, mixed greens, and vinaigrette.',
      calories: 350,
    },
    {
      id: 2,
      img: meal2,
      name: 'Quinoa Bowl',
      description: 'A nutritious bowl with quinoa, black beans, corn, and avocado.',
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
  const allTrainingsDone = currentDayTrainings.length > 0 && completedForDay.length === currentDayTrainings.length;

  // const totalTrainings = days.reduce((acc, day) => acc + day.trainings.length, 0);
  // const totalCompletedTrainings = Object.values(completedTrainingsByDay).reduce(
  //   (acc, ids) => acc + ids.length, 0
  // );
  // const trainingProgress = (totalCompletedTrainings / totalTrainings) * 100;

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
      <div className="flex flex-col w-full lg:w-[75%]">
        <div className="w-full px-6 pt-6">
          <h1 className="text-3xl font-bold mb-4">🏋️ Weekly Training</h1>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
            {days.map((day) => {
              const isFuture = day.id > currentDay;
              return (
                <button
                  key={day.id}
                  onClick={() => !isFuture && setSelectedDay(day.id)}
                  disabled={isFuture}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition
                    ${selectedDay === day.id
                      ? 'bg-primary text-white'
                      : isFuture
                        ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer'
                    }
                  `}
                >
                  {day.day}
                </button>
              );
            })}
          </div>

          <p className="text-sm font-medium text-center mb-2 text-gray-700">
            Training Progress for {currentDayData.day}  : {completedForDay.length} / {currentDayTrainings.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedForDay.length / currentDayTrainings.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full">
          {currentDayData.trainings.map((training) => {
            const isDone = completedForDay.includes(training.id);

            return (
              <div
                key={training.id}
                className={`relative flex flex-col gap-4 p-6 rounded-xl shadow-sm transition-all duration-300
        ${isDone
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-800 hover:shadow-md hover:scale-[1.01]'}
      `}
              >
                <div className="flex justify-between items-center">
                  <img src={training.img} alt={training.name} className="w-12 h-12 rounded-md object-cover" />

                  <button
                    onClick={() => toggleTrainingDone(selectedDay, training.id)}
                    className={`px-4 py-1 text-sm font-semibold rounded-full transition cursor-pointer text-nowrap
            ${isDone
                        ? 'bg-white text-green-600'
                        : 'bg-primary text-white hover:bg-primary/80'}
          `}
                  >
                    {isDone ? 'Done ✅' : 'Mark as Done'}
                  </button>
                </div>

                <p className="text-md font-bold uppercase text-nowrap">🏷 {training.name}</p>
                <p className="text-md">💪 Muscle: {currentDayData.muscle}</p>
                <p className="text-sm text-gray-400">Sets: {training.sets} · Reps: {training.reps}</p>
                <div className="text-sm mt-4">🧘 Don’t forget to stretch!</div>

                {isDone && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-md z-10">
                    {/* <CustomDialog
                      dialogClassName="relative z-[999999]"
                      title="Rate"
                      btnClassName="bg-black text-white px-6 py-2 rounded-full font-semibold text-lg cursor-pointer hover:bg-gray-800 transition"
                      contentClassName="bg-white text-black"
                    >
                      <div className="flex flex-col items-center space-y-4 p-4">
                        <p className="text-lg font-semibold">How was your workout?</p>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`cursor-pointer text-3xl ${(hoverRating || rating) >= star
                                ? 'text-yellow-500'
                                : 'text-gray-300'
                                }`}
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                            />
                          ))}
                        </div>
                        <p className="text-sm">You rated this: {rating} ⭐</p>
                      </div>
                    </CustomDialog> */}
                    <span className=" bg-green-500 text-white text-xl font-semibold px-2 py-1 rounded-full">
                      Done
                    </span>
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {allTrainingsDone && (
          <div className="flex justify-center mt-6">
            <CustomDialog
              dialogClassName="relative z-[999999]"
              title="Rate"
              btnClassName="bg-black text-white px-6 py-2 rounded-full font-semibold text-lg cursor-pointer hover:bg-gray-800 transition"
              contentClassName="bg-white text-black"
            >
              <div className="flex flex-col items-center space-y-4 p-4">
                <p className="text-lg font-semibold">How was your full workout for {currentDayData.day}?</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer text-3xl ${(hoverRating || rating) >= star
                        ? 'text-yellow-500'
                        : 'text-gray-300'
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

      <div className="bg-white shadow-inner w-full lg:w-[25%] p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">🍽 Daily Meals</h2>
        <div className="flex flex-col gap-4">
          {meals.map((meal) => {
            const isDone = doneMeals.includes(meal.id);
            return (
              <div
                key={meal.id}
                className={`relative rounded-xl p-4 shadow-md transition duration-300 border border-gray-200 ${isDone
                  ? 'border-green-500 bg-green-50 scale-[1.01]'
                  : 'bg-gray-50 hover:bg-gray-100'
                  }`}
              >
                <img
                  src={meal.img}
                  alt={meal.name}
                  className="w-full h-36 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold">{meal.name}</h3>
                <p className="text-sm text-gray-600">{meal.description}</p>
                <p className="text-sm text-gray-500 mt-1">🔥 Calories: {meal.calories}</p>

                {!isDone && (
                  <button
                    onClick={() => toggleMealDone(meal.id)}
                    className="mt-3 px-4 py-1 text-sm font-semibold rounded-full bg-primary text-white hover:bg-primary/80 transition cursor-pointer"
                  >
                    Mark as Done
                  </button>
                )}

                {isDone && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
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
