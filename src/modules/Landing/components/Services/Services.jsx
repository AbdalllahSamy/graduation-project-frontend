import React from 'react';
import { motion } from 'framer-motion';
import { FaRunning, FaUtensils, FaClipboardList, FaChartLine, FaUserCheck } from 'react-icons/fa';
import services from "../../../../assets/images/services.jpg"; // حط صورة مناسبة هنا

export default function Services() {
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
          <img
            src={services}
            alt="Our Services"
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
            Our <span className="text-white">Services</span>
          </h1>
          <p className="text-gray-300 text-lg leading-8">
            At <span className="text-[#daac00] font-semibold">Health Advisor</span>, we offer personalized services that adapt to your unique body and fitness goals. Whether you're just starting out or optimizing your current lifestyle, we’re here for every step of your journey.
          </p>

          {/* Service List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            <div className="flex items-start gap-4">
              <FaRunning className="text-[#daac00] text-3xl mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white">Custom Workout Plans</h3>
                <p className="text-gray-400 text-sm">Receive weekly exercise routines tailored to your current level and goals.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaUtensils className="text-[#daac00] text-3xl mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white">Meal Plans</h3>
                <p className="text-gray-400 text-sm">Enjoy healthy, goal-based meals—calculated for your weight and needs.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaClipboardList className="text-[#daac00] text-3xl mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white">Weekly Progress Check-ins</h3>
                <p className="text-gray-400 text-sm">Track your progress and share feedback to help us improve your plan.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaChartLine className="text-[#daac00] text-3xl mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white">Health Analytics</h3>
                <p className="text-gray-400 text-sm">Visualize your journey with charts and insights over time.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaUserCheck className="text-[#daac00] text-3xl mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white">Personalized Support</h3>
                <p className="text-gray-400 text-sm">Get tips and adjustments based on your performance and feedback.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
