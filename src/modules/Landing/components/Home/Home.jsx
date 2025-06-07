import React from "react";
import heroImg from "../../../../assets/images/Hero.png";
import userDash from "../../../../assets/images/userDash.png";
export default function Home() {
  return (
    <div>
      <div className="hero h-screen flex flex-col justify-center items-center text-center ">
        <div className="hero-content flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold font-family-pri text-white">
            Welcome to Health Advisor
          </h1>
          <p className="py-6 font-family-sec text-white">
            Your journey to a healthier life starts here. Explore our features
            and take the first step towards better health.
          </p>
          <div>
            <button className="btn btn-primary text-white font-family-sec px-8 py-3 rounded-full hover:bg-primary transition duration-300 bg-primary cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="feature-section flex flex-col items-center justify-center py-20 ">
        <div className="content">
          <div>
            <h1 className="text-4xl font-bold font-family-pri text-center mb-6">
              What Health Advisor Offers
            </h1>
            <p className="max-w-3xl text-center">
              Our platform provides a comprehensive approach to fitness,
              combining expert coaching, personalized training, and nutritional
              guidance to help you achieve your goals.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 p-8">
          <div className="feature-card  p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 ">Personalized Coaching</h2>
            <p>
              Get tailored fitness plans and one-on-one coaching to meet your
              unique health goals.
            </p>
          </div>
          <div className="feature-card bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Nutrition Guidance</h2>
            <p>
              Receive expert nutritional advice to complement your fitness
              routine and enhance your results.
            </p>
          </div>
          <div className="feature-card bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Progress Tracking</h2>
            <p>
              Monitor your progress with our advanced tracking tools and stay
              motivated on your journey.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 p-8">
          <div className="feature-card  p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 ">Personalized Coaching</h2>
            <p>
              Get tailored fitness plans and one-on-one coaching to meet your
              unique health goals.
            </p>
          </div>
          <div className="feature-card bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Nutrition Guidance</h2>
            <p>
              Receive expert nutritional advice to complement your fitness
              routine and enhance your results.
            </p>
          </div>
          <div className="feature-card bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Progress Tracking</h2>
            <p>
              Monitor your progress with our advanced tracking tools and stay
              motivated on your journey.
            </p>
          </div>
        </div>
      </div>
      <div className="user-dashboard  py-1">
        <h1 className="text-4xl font-bold font-family-pri text-center mb-6">
          User Dashboard Preview
        </h1>
        <div className="dashboard-preview flex justify-center items-center">
          <div>
            <img
              src={userDash}
              alt="Dashboard Preview"
              className="w-full max-w-[400px] rounded-lg "
            />
          </div>
          <div className="dashboard-description ml-8 flex flex-col justify-start items-start">
            <h2 className="text-2xl font-bold mb-4">Track Your Progress</h2>
            <p className="mb-4 max-w-2xl">
              Get a detailed overview of your fitness journey with our
              comprehensive dashboard. Monitor your workouts, nutrition, and
              progress over time with interactive charts and data visualization.
            </p>
            <button className="btn btn-primary text-white font-family-sec px-8 py-3 rounded-full hover:bg-primary transition duration-300 bg-primary cursor-pointer">
              Explore Dashboard
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-20 flex-col">
        <h2 className="text-3xl font-bold font-family-pri text-center mb-4">
          Ready to Transform Your Life?
        </h2>
        <p>
          Join Health Advisor today and start your journey towards a healthier,
          happier you.
        </p>
        <button className="btn btn-primary text-white font-family-sec px-8 py-3 rounded-full hover:bg-primary transition duration-300 bg-primary cursor-pointer mt-4">
          Start Your Transformation
        </button>
      </div>
      <footer class="bg-gray-900 text-white p-12">
        <div class="container mx-auto grid grid-cols-3 gap-20">
          <div>
            <h2 class="text-5xl font-bold mb-4 font-family-pri">Health Advisor</h2>
            <p class="text-sm font-family-sec">
              Your AI-powered fitness companion. Personalized workouts and
              nutrition plans — completely free.
            </p>
          </div>

          <div className="font-family-sec">
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#features" class="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#dashboard" class="hover:underline">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#tools" class="hover:underline">
                  Tools
                </a>
              </li>
              <li>
                <a href="#faqs" class="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="font-family-sec">
            <h3 class="text-lg font-semibold mb-4">Useful Tools</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#bmi-calculator" class="hover:underline">
                  BMI Calculator
                </a>
              </li>
              <li>
                <a href="#water-intake" class="hover:underline">
                  Water Intake Guide
                </a>
              </li>
              <li>
                <a href="#progress-tracker" class="hover:underline">
                  Progress Tracker
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div class="border-t border-gray-700 mt-8 py-4 text-center text-xs">
          <p className="font-family-sec">
            &copy; {new Date().getFullYear()} Health Advisor Coach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
