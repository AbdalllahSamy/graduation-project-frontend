import { useState } from 'react';
import img1 from './../../../../assets/images/auth-pic.png';
import { FaStar } from 'react-icons/fa';
import CustomDialog from '@/components/ui/CustomDialog';
import index from 'toastify';

export default function Dashboard() {
  const [completedDays, setCompletedDays] = useState([]);
  const [done, setDone] = useState(false);
  const [rating, setRating] = useState(0); // <== Add rating state
  const [hoverRating, setHoverRating] = useState(0);
  const toggleDone = (index) => {
    setCompletedDays((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
    setRating(0);
  };

  const days = [
    {
      id: 1,
      day: 'Saturday',
      muscle: 'Chest',
      trainings: [
        { id: 1, img: img1, name: 'Bench Press', sets: 4, reps: 12 },
        { id: 2, img: img1, name: 'Incline Dumbbell Press', sets: 3, reps: 10 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
      ],
    },
    {
      id: 1,
      day: 'Saturday',
      muscle: 'Chest',
      trainings: [
        { id: 1, img: img1, name: 'Bench Press', sets: 4, reps: 12 },
        { id: 2, img: img1, name: 'Incline Dumbbell Press', sets: 3, reps: 10 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
      ],
    },
    {
      id: 1,
      day: 'Saturday',
      muscle: 'Chest',
      trainings: [
        { id: 1, img: img1, name: 'Bench Press', sets: 4, reps: 12 },
        { id: 2, img: img1, name: 'Incline Dumbbell Press', sets: 3, reps: 10 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
      ],
    },
    {
      id: 1,
      day: 'Saturday',
      muscle: 'Chest',
      trainings: [
        { id: 1, img: img1, name: 'Bench Press', sets: 4, reps: 12 },
        { id: 2, img: img1, name: 'Incline Dumbbell Press', sets: 3, reps: 10 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
      ],
    },
    {
      id: 1,
      day: 'Saturday',
      muscle: 'Chest',
      trainings: [
        { id: 1, img: img1, name: 'Bench Press', sets: 4, reps: 12 },
        { id: 2, img: img1, name: 'Incline Dumbbell Press', sets: 3, reps: 10 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
        { id: 3, img: img1, name: 'Push Ups', sets: 3, reps: 15 },
      ],
    },
    // Repeat as needed...
  ];

  return (
    <div className="grid grid-cols-3  gap-5 px-3 py-8">
      {days.map((day, index) => (
        <div
        onClick={()=>{ completedDays.includes(index)
          && toggleDone(index)
         }}
          key={index}
          className={`relative flex flex-col gap-4 p-6 rounded-xl shadow-md bg-primary text-white transition-opacity ${
            completedDays.includes(index) ? '' : 'opacity-100'
          }`}
        >
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold uppercase">🏷 {day.day}</p>
            <button
              onClick={() => toggleDone(index)}
              className={`px-3 py-1 text-sm font-medium rounded-full relative ${
                completedDays.includes(index)
                  ? 'bg-green-600'
                  : 'bg-white text-primary'
              }`}
            >
              {completedDays.includes(index) ? 'Done ✅' : 'Mark as Done'}
            </button>
          </div>

          <p className="text-lg">💪 Muscle: {day.muscle}</p>

          <div className="text-md font-medium">🏋 Trainings:</div>
          <ul className="space-y-2">
            {day.trainings.map((t) => (
              <li key={t.id} className="flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-md"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-200">
                    Sets: {t.sets} · Reps: {t.reps}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* <div className="flex items-center gap-1 mt-2">
            ⭐ Rating:
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} className="text-yellow-400" />
            ))}
          </div> */}

          <div className="text-sm mt-2 ">🧘 Don’t forget to stretch!</div>

          {completedDays.includes(index) && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-amber-200/40 backdrop-blur-md z-10">
              <CustomDialog
                dialogClassName={'relative z-[999999] '}
                title="Rate"
                btnClassName="bg-white text-black px-6 py-2 rounded-full font-family-pri font-semibold text-2xl tracking-wider relative z-[999999]"
                contentClassName="bg-white text-black"
              >
                <div className="flex flex-col items-center space-y-4 p-4">
                  <p className="text-lg font-semibold">How was your workout?</p>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer text-3xl ${
                          (hoverRating || rating) >= star
                            ? 'text-yellow-500'
                            : 'text-gray-400'
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
      ))}
    </div>
  );
}
