import { axiosInstance } from '@/services/apisUrls/apisUrls';
import { useEffect, useState } from 'react';
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const activityData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 60 },
  { name: 'May', value: 70 },
  { name: 'Jun', value: 100 },
  { name: 'Jul', value: 80 },
  { name: 'Aug', value: 90 },
  { name: 'Sep', value: 70 },
  { name: 'Oct', value: 80 },
];

const caloriesData = [
  { name: 'Mon', value: 1700 },
  { name: 'Tue', value: 1800 },
  { name: 'Wed', value: 1750 },
  { name: 'Thu', value: 1850 },
  { name: 'Fri', value: 1780 },
  { name: 'Sat', value: 1800 },
  { name: 'Sun', value: 1820 },
];

const proteinData = [
  { name: 'Mon', value: 90 },
  { name: 'Tue', value: 95 },
  { name: 'Wed', value: 92 },
  { name: 'Thu', value: 100 },
  { name: 'Fri', value: 102 },
  { name: 'Sat', value: 105 },
  { name: 'Sun', value: 103 },
];

const bmiData = [
  { name: 'Mon', value: 22.3 },
  { name: 'Tue', value: 22.2 },
  { name: 'Wed', value: 22.1 },
  { name: 'Thu', value: 22.0 },
  { name: 'Fri', value: 22.0 },
  { name: 'Sat', value: 21.9 },
  { name: 'Sun', value: 21.8 },
];

export default function Testt() {
  //water
  const goal = 8;
  const [cups, setCups] = useState(() => {
    const savedCups = localStorage.getItem('cups');
    return savedCups ? parseInt(savedCups) : 0;
  });

  const handleDrink = () => {
    if (cups < goal) {
      const newCount = cups + 1;
      setCups(newCount);
      localStorage.setItem('cups', newCount.toString());
    }
  };

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('track-date');
    if (savedDate !== today) {
      setCups(0);
      localStorage.setItem('cups', '0');
      localStorage.setItem('track-date', today);
    }
  }, []);

  const percentage = (cups / goal) * 100;
  //water

  const [date, setDate] = useState(new Date());
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [userAnalysis, setUserAnalysis] = useState([]);

  const getAnalysis = async () => {
    try {
      let response = await axiosInstance.get('/analysis');
      setDataAnalysis(response.data);
      setUserAnalysis(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnalysis();
  }, []);

  const dietPlans = [
    { title: 'Breakfast', desc: 'Oats, Banana, and Peanut Butter', day: 'Mon' },
    {
      title: 'Lunch',
      desc: 'Grilled Chicken, Brown Rice, Veggies',
      day: 'Mon',
    },
    { title: 'Dinner', desc: 'Salmon, Sweet Potato, Salad', day: 'Mon' },
  ];

  const primaryColor = '#daac00';
  const primaryStrokeColor = '#8f7517';
  const bgDark = 'bg-[#121212]';
  const cardDark = 'bg-[#1e1e1e]';
  const textLight = 'text-gray-100';
  const textMuted = 'text-gray-400';

  return (
    <div className={`grid grid-cols-3 gap-6 p-4 sm:p-6 ${bgDark} min-h-screen`}>
      <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-4">
          {[
            {
              key: 'bmr',
              title: 'Calories (To Burn)',
              color: 'text-primary',
              stroke: primaryStrokeColor,
              data: caloriesData,
              format: (val) => `${val} kcal/day`,
            },
            {
              key: 'water',
              title: 'Water Intake',
              color: 'text-primary',
              stroke: primaryStrokeColor,
              data: caloriesData,
              format: (val) => `${val} L/day`,
            },
            {
              key: 'protein',
              title: 'Protein Intake',
              color: 'text-primary',
              stroke: primaryStrokeColor,
              data: proteinData,
              format: (val) => `${val} g/day`,
            },
            {
              key: 'bmi',
              title: 'BMI',
              color: 'text-primary',
              stroke: primaryStrokeColor,
              data: bmiData,
              format: (val) => val,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1a1a1a] p-5 rounded-2xl shadow-md shadow-[#4d4c4c] flex flex-col justify-around"
            >
              <p className="font-bold  text-lg text-[#ededed] font-family-sec">
                {item.title}
              </p>
              <p className={`text-2xl font-semibold ${item.color}`}>
                {item.format(dataAnalysis?.[item.key] ?? 0)}
              </p>
              <div className="h-[30px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={item.data}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={item.stroke}
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`${cardDark} p-4 rounded-xl shadow col-span-2 sm:col-span-2 xl:col-span-3`}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-gray-200">Activity Tracking</p>
            <p className="text-sm text-gray-500">Weekly</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={primaryColor}
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-center text-sm text-gray-400 mt-2">
            Avg Speed: 24 kmph
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {dietPlans.map((item, idx) => (
            <div key={idx} className={`${cardDark} p-4 rounded-xl shadow`}>
              <p className="font-semibold text-[${primaryColor}] mb-2">
                {item.title}
              </p>
              <p className="text-sm text-gray-300 mb-2">{item.desc}</p>
              <span className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6 xl:space-y-8 w-full h-full overflow-y-auto px-2">
        <div className="flex items-center gap-4 w-full">
          <img
            src="https://i.imgur.com/TkIrScD.png"
            alt="Lionel Messi"
            className="w-14 h-14 rounded-full object-cover border-2 border-[${primaryColor}]"
          />
          <div className="flex-1">
            <p className="font-bold  font-family-sec   text-gray-100 text-lg">
              {userAnalysis.name || 'ziad yasser'}
            </p>
            <p className="text-sm text-gray-400">
              {userAnalysis.email || 'ziad55@gmail.com'}
            </p>
          </div>
          <button className="text-2xl text-[${primaryColor}]">⋮</button>
        </div>

        <div className="flex w-full text-center text-sm font-medium border border-gray-700 rounded-xl overflow-hidden">
          {[
            { label: 'Height', key: 'height', unit: 'cm' },
            { label: 'Weight', key: 'weight', unit: 'kg' },
            { label: 'Goal', key: 'fitnessGoal', unit: '' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`w-1/3 ${cardDark} px-4 py-3 border-l border-gray-600 ${
                idx === 0 ? 'border-l-0' : ''
              }`}
            >
              <p className="text-gray-100 font-family-sec font-semibold mb-1 text-lg">
                {item.label}
              </p>
              <p className="text- text-gray-400">
                {userAnalysis?.[item.key]
                  ? `${userAnalysis[item.key]} ${item.unit}`
                  : 'N/A'}
              </p>
            </div>
          ))}
        </div>

        {/* water */}

        <div className="  flex flex-col justify-center items-center  text-center">
          <h1 className="text-3xl font-bold text-primary mb-2 font-family-pri">
            Water Tracker
          </h1>

          <div className=" font-family-pri w-50">
            <CircularProgressbar
              value={percentage}
              text={`${cups} / ${goal} cups`}
              styles={buildStyles({
                pathColor: primaryColor,
                textColor:primaryColor,
                trailColor: '#bfdbfe',
                textSize: '16px',
                width:'20px'
              })}
            />
            <h2 className=" text-primary text-3xl my-2">{percentage}%</h2>
          </div>

          <button
            onClick={handleDrink}
            className="bg-primary  hover:bg-yellow-500 text-white py-2 px-4 rounded-full shadow-md transition font-family-sec font-semibold cursor-pointer text-sm"
          >
            Drink
          </button>
        </div>

        {/* water */}

        {/* 
        <div className="w-full ${cardDark} border border-[${primaryColor}] rounded-xl p-4 shadow-sm">
          <p className="text-[${primaryColor}] font-semibold mb-2">
            December 2022
          </p>
          <Calendar
            value={date}
            onChange={setDate}
            defaultView="month"
            tileClassName={({ date, view }) => {
              const dates = {
                green: [17, 18, 19, 21],
                orange: [23],
                red: [25],
              };
              if (view === 'month') {
                if (
                  dates.green.includes(date.getDate()) &&
                  date.getMonth() === 11
                )
                  return 'bg-green-600 text-white font-bold rounded-full';
                if (
                  dates.orange.includes(date.getDate()) &&
                  date.getMonth() === 11
                )
                  return 'bg-orange-600 text-white font-bold rounded-full';
                if (
                  dates.red.includes(date.getDate()) &&
                  date.getMonth() === 11
                )
                  return 'bg-red-600 text-white font-bold rounded-full';
              }
              return null;
            }}
          />
        </div> */}

        <div className="w-full text-white">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-[${primaryColor}]">Scheduled</p>
            <button className="text-sm text-[${primaryColor}] hover:underline">
              View All
            </button>
          </div>
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className={`${cardDark} rounded-xl p-4 mb-3 flex items-center gap-4 shadow-md border border-gray-600`}
            >
              <img
                src="https://img.freepik.com/free-photo/group-people-gym-fitness_1303-23452.jpg"
                alt="Workout"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <span className="bg-pink-600 text-xs px-2 py-1 rounded text-white">
                  Fitness
                </span>
                <p className="text-sm font-semibold mt-1 text-white">
                  Cardio Workshop
                </p>
                <p className="text-xs text-gray-400">
                  Strengthens your muscles
                </p>
                <p className="text-xs text-[${primaryColor}]">17-21 Dec</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
