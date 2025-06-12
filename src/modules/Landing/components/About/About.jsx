import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaDumbbell, FaAppleAlt } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-[120vh] bg-gradient-to-br from-black via-gray-900 to-black text-white font-family-sec px-6 md:px-16 py-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Image Section */}
        <motion.div
          className="w-full lg:w-1/2 h-[450px] rounded-3xl overflow-hidden border-4 border-[#daac00]/30 shadow-[0_0_30px_#daac00]/10"
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* ضع هنا صورة عن طريق استبدال src */}
          <img
            src="/your-image-path.jpg"
            alt="About Health Advisor"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="w-full lg:w-1/2 space-y-8"
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-[#daac00] mb-4">
            About <span className="text-white">Health Advisor</span>
          </h1>
          <p className="text-gray-300 text-lg leading-8">
            We build smart fitness plans based on your <span className="text-[#daac00] font-semibold">weight</span>, <span className="text-[#daac00] font-semibold">height</span>, and <span className="text-[#daac00] font-semibold">goals</span>. You get weekly workouts and meal plans built just for you.
          </p>
          <p className="text-gray-400">
            After each week, your <span className="text-[#daac00] font-medium">feedback</span> helps us improve your plan — turning your journey into a smarter, more responsive path to success.
          </p>

          {/* Icons Row */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <div className="flex items-center gap-4">
              <FaHeartbeat className="text-[#daac00] text-3xl" />
              <span className="text-gray-200 text-md">Health Tracking</span>
            </div>
            <div className="flex items-center gap-4">
              <FaDumbbell className="text-[#daac00] text-3xl" />
              <span className="text-gray-200 text-md">Workout Plans</span>
            </div>
            <div className="flex items-center gap-4">
              <FaAppleAlt className="text-[#daac00] text-3xl" />
              <span className="text-gray-200 text-md">Healthy Meals</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 