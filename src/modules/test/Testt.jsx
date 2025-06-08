import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

const bfpData = [
  { name: 'Mon', value: 18.3 },
  { name: 'Tue', value: 18.2 },
  { name: 'Wed', value: 18.1 },
  { name: 'Thu', value: 18.1 },
  { name: 'Fri', value: 18.0 },
  { name: 'Sat', value: 17.9 },
  { name: 'Sun', value: 17.8 },
];

export default function Testt() {
  const [date, setDate] = useState(new Date());


  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 p-6 bg-[#f8fafc]">
      {/* Left column */}
      <div className="xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Stats Cards */}
        {[
          {
            title: 'Calories (To Burn)',
            value: '1800 kcal/day',
            color: 'text-orange-600',
            stroke: '#f97316',
            data: caloriesData,
          },
          {
            title: 'Water Intake',
            value: '2.5 L/day',
            color: 'text-sky-600',
            stroke: '#0ea5e9',
            data: caloriesData,
          },
          {
            title: 'Protein Intake',
            value: '105 g/day',
            color: 'text-purple-600',
            stroke: '#9333ea',
            data: proteinData,
          },
          {
            title: 'BMI',
            value: '21.8',
            color: 'text-emerald-600',
            stroke: '#10b981',
            data: bmiData,
          },
          {
            title: 'Body Fat % (BFP)',
            value: '17.8%',
            color: 'text-rose-500',
            stroke: '#f43f5e',
            data: bfpData,
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">{item.title}</p>
            <p className={`text-2xl font-semibold ${item.color}`}>
              {item.value}
            </p>
            <ResponsiveContainer width="100%" height={50}>
              <LineChart data={item.data}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={item.stroke}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}

        {/* Activity Chart */}
        <div className="bg-white p-4 rounded-xl shadow col-span-2 sm:col-span-2 xl:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-gray-700">Activity Tracking</p>
            <p className="text-sm text-gray-500">Weekly</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f97316"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-center text-sm text-gray-500 mt-2">
            Avg Speed: 24 kmph
          </div>
        </div>

        {/* Running Card */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
          <div>
            <img
              src="https://i.imgur.com/RP3hklr.png"
              alt="Runner"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <p className="font-semibold text-gray-700">
              Running with resistance band
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>12 km Today's distance</p>
            <p>428 km Total distance covered</p>
          </div>
        </div>

        {/* Diet Plan */}
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Fruits only',
              desc: 'It contains most water content.',
              day: 'Day 1',
            },
            {
              title: 'Vegetables only',
              desc: 'Rich in fiber and minerals.',
              day: 'Day 2',
            },
            {
              title: 'Fruits and Vegetables',
              desc: 'Balanced diet with hydration.',
              day: 'Day 3',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow">
              <p className="font-semibold text-orange-500 mb-2">{item.title}</p>
              <p className="text-sm text-gray-500 mb-2">{item.desc}</p>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div className="min-h-screen  flex flex-col items-center p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 w-full max-w-md">
          <img
            src="https://i.imgur.com/TkIrScD.png"
            alt="Lionel Messi"
            className="w-14 h-14 rounded-full object-cover border-2 "
          />
          <div className="flex-1">
            <p className="font-semibold text-lg ">Lionel Messi</p>
            <p className="text-sm text-gray-500">@itsworks</p>
          </div>
          <button className="text-2xl ">⋮</button>
        </div>

        {/* Info Cards */}
        <div className="flex justify-between w-full max-w-md text-center text-sm font-medium">
          {[
            { label: 'Weight', value: '75 kg' },
            { label: 'Height', value: '180 cm' },
            { label: 'Age', value: '26 yrs' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl px-4 py-3 flex-1 mx-1 border"
            >
              <p className="text-gray-500">{item.label}</p>
              <p className="text-lg font-semibold">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="w-full max-w-md bg-white border border-blue-200 rounded-xl p-4 shadow-sm">
          <p className="text-blue-800 font-semibold mb-2">December 2022</p>
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
                  return 'bg-green-400 text-white font-bold rounded-full';
                if (
                  dates.orange.includes(date.getDate()) &&
                  date.getMonth() === 11
                )
                  return 'bg-orange-400 text-white font-bold rounded-full';
                if (
                  dates.red.includes(date.getDate()) &&
                  date.getMonth() === 11
                )
                  return 'bg-red-400 text-white font-bold rounded-full';
              }
              return null;
            }}
          />
        </div>

        {/* Schedule List */}
        <div className="w-full max-w-md text-gray-800">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-blue-800">Scheduled</p>
            <button className="text-sm text-blue-500 hover:underline">
              View All
            </button>
          </div>

          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 mb-3 flex items-center gap-4 shadow-md border border-gray-100"
            >
              <img
                src="https://img.freepik.com/free-photo/group-people-gym-fitness_1303-23452.jpg"
                alt="Workout"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <span className="bg-pink-500 text-xs px-2 py-1 rounded text-white">
                  Fitness
                </span>
                <p className="text-sm font-semibold mt-1 text-gray-800">
                  Cardio Workshop
                </p>
                <p className="text-xs text-gray-500">
                  Strengthens your muscles
                </p>
                <p className="text-xs text-blue-500">17-21 Dec</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
