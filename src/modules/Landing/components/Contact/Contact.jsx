import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { axiosInstance } from '@/services/apisUrls/apisUrls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/contact', formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('❌ Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      toast.error('🚫 Failed to send message.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full bg-[#121212] flex items-center justify-center px-6 py-10"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-[#1e1e1e] text-white p-8 rounded-2xl shadow-lg border border-[#2c2c2c] space-y-6"
      >
        <h2 className="text-4xl font-bold text-[#daac00] text-center mb-6 font-family-pri">Contact Us</h2>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-bold text-xl text-[#daac00]">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#daac00]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-bold text-xl text-[#daac00]">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#daac00]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 font-bold text-xl text-[#daac00]">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#daac00]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#daac00] text-black py-3 rounded-lg font-bold hover:bg-[#c29800] transition-all"
        >
          Send Message
        </button>
      </form>

      {/* Toast container لازم يتحط داخل الـ component */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="dark" />
    </motion.div>
  );
}
