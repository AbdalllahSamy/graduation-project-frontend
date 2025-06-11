import React from "react";
import heroImg from "../../../../assets/images/Hero.png";
import workImg from "../../../../assets/images/workImg.png";
import cardioImg from "../../../../assets/images/cardio.jpg";
import bodyImg from "../../../../assets/images/body.jpg";
import endImg from "../../../../assets/images/nut.jpg";
import { useState } from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import userDash from "../../../../assets/images/userDash.png";
import "swiper/css";
import "swiper/css/pagination";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [activeTab, setActiveTab] = useState("bmi");

  // States for results of each calculator
  const [bmiResult, setBmiResult] = useState(null);
  const [waterResult, setWaterResult] = useState(null);
  const [proteinResult, setProteinResult] = useState(null);
  const [bfpResult, setBfpResult] = useState(null);
  const [caloriesResult, setCaloriesResult] = useState(null);

  const tabs = [
    { id: "bmi", label: "BMI BODY MASS" },
    { id: "water", label: "WATER INTAKE" },
    { id: "protein", label: "PROTEIN INTAKE" },
    { id: "bfp", label: "BFP BODY FAT" },
    { id: "calories", label: "CALORIES TO BURN" }, // التاب الجديد
  ];

  const quizData = [
    {
      question: "What is the capital of France?",
      answer: "The capital of France is Paris.",
    },
    {
      question: "Which planet is known as the Red Planet?",
      answer: "Mars is known as the Red Planet.",
    },
    {
      question: "What is the largest mammal?",
      answer: "The blue whale is the largest mammal.",
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answer: "William Shakespeare wrote 'Romeo and Juliet'.",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "bmi":
        return (
          <div className="mt-20 mx-14">
            <section className="bg-black py-16">
              <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-1/2 w-full">
                    <div className="mb-6">
                      <span className="text-primary uppercase text-sm">
                        check your body
                      </span>
                      <h2 className="text-white text-3xl font-bold mt-2">
                        BMI CALCULATOR CHART
                      </h2>
                    </div>
                    <div className="overflow-x-auto border border-[#363636]">
                      <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-[#060606] text-white uppercase">
                          <tr className="border-b border-[#363636]">
                            <th className="px-6 py-4 border-r border-[#363636]">
                              BMI
                            </th>
                            <th className="px-6 py-4 border-r border-[#363636]">
                              Weight Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["Below 18.5", "Underweight"],
                            ["18.5 - 24.9", "Healthy"],
                            ["25.0 - 29.9", "Overweight"],
                            ["30.0 - and Above", "Obese"],
                          ].map(([bmi, status], idx) => (
                            <tr
                              key={idx}
                              className={idx % 2 === 1 ? "bg-[#111111]" : ""}
                            >
                              <td className="px-6 py-4 border-r border-[#363636]">
                                {bmi}
                              </td>
                              <td className="px-6 py-4 border-r border-[#363636]">
                                {status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* BMI Form */}
                  <div className="lg:w-1/2 w-full">
                    <div className="mb-6">
                      <span className="text-primary uppercase text-sm">
                        check your body
                      </span>
                      <h2 className="text-white text-3xl font-bold mt-2">
                        CALCULATE YOUR BMI
                      </h2>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-6">
                        أدخل الطول بالكيلوغرام والوزن بالكيلوغرام لحساب مؤشر
                        كتلة الجسم.
                      </p>
                      <form
                        className="space-y-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const heightCm = parseFloat(e.target.height.value);
                          const weightKg = parseFloat(e.target.weight.value);
                          if (
                            !isNaN(heightCm) &&
                            heightCm > 0 &&
                            !isNaN(weightKg) &&
                            weightKg > 0
                          ) {
                            const heightM = heightCm / 100;
                            const bmi = (
                              weightKg /
                              (heightM * heightM)
                            ).toFixed(2);
                            let status = "";
                            if (bmi < 18.5) status = "Underweight";
                            else if (bmi < 25) status = "Healthy";
                            else if (bmi < 30) status = "Overweight";
                            else status = "Obese";

                            setBmiResult({ bmi, status });
                          } else {
                            setBmiResult(null);
                            alert("Please enter valid height and weight.");
                          }
                        }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="number"
                            step="any"
                            name="height"
                            placeholder="Height / cm"
                            className="bg-transparent border border-[#363636] text-gray-300 placeholder-gray-400 px-4 py-3 w-full"
                            required
                          />
                          <input
                            type="number"
                            step="any"
                            name="weight"
                            placeholder="Weight / kg"
                            className="bg-transparent border border-[#363636] text-gray-300 placeholder-gray-400 px-4 py-3 w-full"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-primary text-white font-bold uppercase py-3 mt-2"
                        >
                          Calculate
                        </button>
                      </form>
                      {bmiResult && (
                        <div className="mt-6 text-white bg-[#222] p-4 rounded">
                          <p>
                            Your BMI: <strong>{bmiResult.bmi}</strong>
                          </p>
                          <p>
                            Status: <strong>{bmiResult.status}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case "water":
        return (
          <div className="mt-20 mx-14 text-white">
            <section className="bg-[#151515] py-16 px-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-primary uppercase text-sm">
                  stay hydrated
                </span>
                <h2 className="text-3xl font-bold mt-2">
                  WATER INTAKE CALCULATOR
                </h2>
                <p className="text-gray-400 mt-4">
                  Calculate how much water your body needs daily based on your
                  weight.
                </p>
              </div>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const weight = parseFloat(e.target.weight.value);
                  if (!isNaN(weight) && weight > 0) {
                    const ml = weight * 35;
                    const liters = (ml / 1000).toFixed(2);
                    setWaterResult(liters);
                  } else {
                    setWaterResult(null);
                    alert("Please enter a valid weight.");
                  }
                }}
              >
                <input
                  type="number"
                  name="weight"
                  placeholder="Enter your weight in kg"
                  className="w-full bg-transparent border border-[#363636] text-gray-300 placeholder-gray-400 px-4 py-3"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold uppercase py-3"
                >
                  Calculate
                </button>
              </form>
              {waterResult !== null && (
                <p className="mt-6 text-white bg-[#222] p-4 rounded text-center">
                  You should drink approximately{" "}
                  <strong>{waterResult} liters</strong> of water per day.
                </p>
              )}
            </section>
          </div>
        );

      case "protein":
        return (
          <div className="mt-20 mx-14 text-white">
            <section className="bg-[#151515] py-16 px-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-primary uppercase text-sm">
                  build your body
                </span>
                <h2 className="text-3xl font-bold mt-2">
                  PROTEIN INTAKE CALCULATOR
                </h2>
                <p className="text-gray-400 mt-4">
                  Calculate your daily protein needs based on your weight and
                  activity level.
                </p>
              </div>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const weight = parseFloat(e.target.weight.value);
                  const activity = e.target.activity.value;
                  let multiplier = 1;
                  if (activity === "low") multiplier = 0.8;
                  else if (activity === "moderate") multiplier = 1.2;
                  else if (activity === "high") multiplier = 1.6;

                  if (!isNaN(weight) && weight > 0) {
                    const protein = (weight * multiplier).toFixed(1);
                    setProteinResult(protein);
                  } else {
                    setProteinResult(null);
                    alert("Please enter a valid weight.");
                  }
                }}
              >
                <input
                  type="number"
                  name="weight"
                  placeholder="Enter your weight in kg"
                  className="w-full bg-transparent border border-[#363636] text-gray-300 placeholder-gray-400 px-4 py-3"
                  required
                />
                <select
                  name="activity"
                  className="w-full bg-transparent border border-[#363636] text-gray-300 px-4 py-3"
                  required
                >
                  <option value="">Select activity level</option>
                  <option value="low">Low (little/no exercise)</option>
                  <option value="moderate">Moderate (light exercise)</option>
                  <option value="high">High (daily/hard training)</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold uppercase py-3"
                >
                  Calculate
                </button>
              </form>
              {proteinResult !== null && (
                <p className="mt-6 text-white bg-[#222] p-4 rounded text-center">
                  You need approximately <strong>{proteinResult} grams</strong>{" "}
                  of protein per day.
                </p>
              )}
            </section>
          </div>
        );

      case "bfp":
        return (
          <div className="mt-20 mx-14 text-white">
            <section className="bg-[#151515] py-16 px-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-primary uppercase text-sm">
                  know your body
                </span>
                <h2 className="text-3xl font-bold mt-2">
                  BODY FAT PERCENTAGE CALCULATOR
                </h2>
                <p className="text-gray-400 mt-4">
                  Calculate your body fat percentage using waist, neck, and
                  height measurements.
                </p>
              </div>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const gender = e.target.gender.value;
                  const waist = parseFloat(e.target.waist.value);
                  const neck = parseFloat(e.target.neck.value);
                  const height = parseFloat(e.target.height.value);
                  const hip =
                    gender === "female" ? parseFloat(e.target.hip.value) : 0;

                  if (
                    !isNaN(waist) &&
                    waist > 0 &&
                    !isNaN(neck) &&
                    neck > 0 &&
                    !isNaN(height) &&
                    height > 0 &&
                    (gender === "male" ||
                      (gender === "female" && !isNaN(hip) && hip > 0))
                  ) {
                    // Using U.S. Navy Method formula (simplified)
                    let bodyFat = 0;
                    if (gender === "male") {
                      bodyFat =
                        495 /
                          (1.0324 -
                            0.19077 * Math.log10(waist - neck) +
                            0.15456 * Math.log10(height)) -
                        450;
                    } else {
                      bodyFat =
                        495 /
                          (1.29579 -
                            0.35004 * Math.log10(waist + hip - neck) +
                            0.221 * Math.log10(height)) -
                        450;
                    }
                    setBfpResult(bodyFat.toFixed(2));
                  } else {
                    setBfpResult(null);
                    alert("Please enter valid measurements.");
                  }
                }}
              >
                <div>
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      defaultChecked
                    />
                    Male
                  </label>
                  <label className="ml-6">
                    <input type="radio" name="gender" value="female" />
                    Female
                  </label>
                </div>
                <input
                  type="number"
                  step="any"
                  name="waist"
                  placeholder="Waist circumference (cm)"
                  className="w-full bg-transparent border border-[#363636] text-gray-300 placeholder-gray-400 px-4 py-3"
                  required
                />
                <input
                  type="number"
                  step="any"
                  name="neck"
                  placeholder="Neck circumference (cm)"
                  className="w-full bg-transparent border border-[#363636] text-gray-300 placeholder-gray-400 px-4 py-3"
                  required
                />
                <input
                  type="number"
                  step="any"
                  name="height"
                  placeholder="Height (cm)"
                  className="w-full bg-transparent border border-[#363636] text-gray-300 placeholder-gray-400 px-4 py-3"
                  required
                />
                {/* Hip only if female */}
                <input
                  type="number"
                  step="any"
                  name="hip"
                  placeholder="Hip circumference (cm) - For females only"
                  className="w-full bg-transparent border border-[#363636] text-gray-300 placeholder-gray-400 px-4 py-3"
                  // Not required, but needed for females
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold uppercase py-3"
                >
                  Calculate
                </button>
              </form>
              {bfpResult !== null && (
                <p className="mt-6 text-white bg-[#222] p-4 rounded text-center">
                  Your estimated body fat percentage is{" "}
                  <strong>{bfpResult}%</strong>.
                </p>
              )}
            </section>
          </div>
        );

      case "calories":
        return (
          <div className="mt-20 mx-14 text-white">
            <section className="bg-[#151515] py-16 px-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-primary uppercase text-sm">
                  burn it off
                </span>
                <h2 className="text-3xl font-bold mt-2">
                  CALORIES TO BURN CALCULATOR
                </h2>
                <p className="text-gray-400 mt-4">
                  Calculate how many calories you burn per day based on your
                  Basal Metabolic Rate (BMR) and activity level.
                </p>
              </div>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const gender = e.target.gender.value;
                  const weight = parseFloat(e.target.weight.value);
                  const height = parseFloat(e.target.height.value);
                  const age = parseInt(e.target.age.value, 10);
                  const activity = e.target.activity.value;

                  if (
                    (gender === "male" || gender === "female") &&
                    !isNaN(weight) &&
                    weight > 0 &&
                    !isNaN(height) &&
                    height > 0 &&
                    !isNaN(age) &&
                    age > 0
                  ) {
                    // Calculate BMR using Mifflin-St Jeor Equation
                    let bmr = 0;
                    if (gender === "male") {
                      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
                    } else {
                      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
                    }

                    // Activity factor multipliers
                    const activityFactors = {
                      sedentary: 1.2,
                      light: 1.375,
                      moderate: 1.55,
                      active: 1.725,
                      veryActive: 1.9,
                    };

                    const caloriesBurned = (
                      bmr * activityFactors[activity]
                    ).toFixed(0);

                    setCaloriesResult(caloriesBurned);
                  } else {
                    setCaloriesResult(null);
                    alert("Please enter valid inputs.");
                  }
                }}
              >
                <div>
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      defaultChecked
                    />
                    Male
                  </label>
                  <label className="ml-6">
                    <input type="radio" name="gender" value="female" />
                    Female
                  </label>
                </div>
                <input
                  type="number"
                  step="any"
                  name="weight"
                  placeholder="Weight (kg)"
                  className="w-full bg-transparent border border-[#363636] text-gray-300 placeholder-gray-400 px-4 py-3"
                  required
                />
                <input
                  type="number"
                  step="any"
                  name="height"
                  placeholder="Height (cm)"
                  className="w-full bg-transparent border border-[#363636] text-gray-300 placeholder-gray-400 px-4 py-3"
                  required
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age (years)"
                  className="w-full bg-transparent border border-[#363636] text-gray-300 placeholder-gray-400 px-4 py-3"
                  required
                />
                <select
                  name="activity"
                  className="w-full bg-transparent border border-[#363636] text-gray-300 px-4 py-3"
                  required
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">
                    Sedentary (little or no exercise)
                  </option>
                  <option value="light">
                    Lightly active (light exercise/sports 1-3 days/week)
                  </option>
                  <option value="moderate">
                    Moderately active (moderate exercise/sports 3-5 days/week)
                  </option>
                  <option value="active">
                    Very active (hard exercise/sports 6-7 days a week)
                  </option>
                  <option value="veryActive">
                    Super active (very hard exercise & physical job)
                  </option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold uppercase py-3"
                >
                  Calculate
                </button>
              </form>
              {caloriesResult !== null && (
                <p className="mt-6 text-white bg-[#222] p-4 rounded text-center">
                  Your estimated daily calories burned:{" "}
                  <strong>{caloriesResult} kcal</strong>.
                </p>
              )}
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <nav className="bg-black/60 backdrop-blur-lg shadow-md border-b border-white/10 fixed top-0 left-0 w-full z-50">
        <div className=" mx-auto px-sm md:px-md lg:px-lg py-5 flex justify-between items-center">
          <div className="text-white text-3xl md:text-4xl font-extrabold font-family-sec bg-gradient-to-r from-primary to-yellow-200 bg-clip-text text-transparent">
            Health Advisor
          </div>

          <ul className="hidden md:flex space-x-10 text-white font-medium tracking-wide">
            {["Home", "Services", "About", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative hover:text-yellow-300 transition duration-300"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link
              to="/login"
              className="bg-primary hover:bg-prfrom-primary text-black font-bold py-2 px-5 rounded-xl shadow-lg transition duration-300"
            >
              Login
            </Link>
          </div>

          <button className="md:hidden text-white focus:outline-none">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

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
            <button className="btn btn-primary text-black font-semibold font-family-sec px-8 py-3 rounded-full hover:bg-primary transition duration-300 bg-primary cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <section className="bg-black px-sm md:px-md lg:px-lg h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold mb-4 text-white font-family-sec">
              What Health Advisor Offers
            </h1>
            <p className="text-gray-400 text-sm max-w-3xl mx-auto">
              Our platform provides a comprehensive approach to fitness,
              combining expert coaching, personalized training, and nutritional
              guidance to help you achieve your goals.
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ el: ".custom-swiper-pagination", clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              grabCursor={true}
              spaceBetween={30}
              slidesPerView={3}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              className="custom-swiper flex items-stretch h-[200px] "
            >
              {[
                {
                  title: "Personalized Coaching",
                  text: "Get tailored fitness plans and one-on-one coaching to meet your unique health goals.",
                },
                {
                  title: "Nutrition Guidance",
                  text: "Receive expert nutritional advice to complement your fitness routine and enhance your results.",
                },
                {
                  title: "Progress Tracking",
                  text: "Monitor your progress with our advanced tracking tools and stay motivated on your journey.",
                },
                {
                  title: "Community Support",
                  text: "Connect with like-minded fitness enthusiasts and share your journey for extra motivation.",
                },
                {
                  title: "Flexible Scheduling",
                  text: "Plan your workouts around your lifestyle with our flexible session scheduling.",
                },
                {
                  title: "Expert Webinars",
                  text: "Attend live webinars with health experts covering fitness, nutrition, and wellness tips.",
                },
              ].map((item, idx) => (
                <SwiperSlide key={idx} className="flex">
                  <div className="feature-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white/10 backdrop-blur-md backdrop-brightness-125 border border-white/20 text-white w-full h-full flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4 text-primary">
                      {item.title}
                    </h2>
                    <p className="text-white">{item.text}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="custom-swiper-pagination mt-6 flex justify-center" />
          </div>
        </div>
      </section>

      <div className="user-dashboard px-sm md:px-md lg:px-lg py-20 bg-black text-white ">
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
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Track Your Progress
            </h2>
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

      <div className="relative ">
        <motion.div
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(270deg, #daac00, #b08f00,  #1a1a10, #000000,#daac00)",
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 100%", "100% 100%", "0% 100%"],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        <div className="relative z-10 flex justify-center items-center py-10 flex-col bg-white/10 backdrop-blur-3xl">
          <h2 className="text-3xl font-bold font-family-pri text-center mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-center text-lg">
            Join Health Advisor today and start your journey towards a
            healthier, happier you.
          </p>
          <button className="btn btn-primary text-black font-semibold font-family-sec px-8 py-3 rounded-full hover:bg-primary transition duration-300 bg-primary cursor-pointer mt-4">
            Start Your Transformation
          </button>
        </div>
      </div>

      <section
        id="health-tools"
        className="px-sm md:px-md lg:px-lg py-20  bg-black "
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Health & Fitness Tools
        </h1>
        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-md font-semibold border-2 cursor-pointer ${
                activeTab === id
                  ? "bg-primary border-primary text-white"
                  : "border-gray-600 text-gray-400 hover:bg-prfrom-primary hover:border-yellow-bg-prfrom-primary hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </section>

      <section className="px-sm md:px-md lg:px-lg py-20 bg-black text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-5xl font-bold text-center mb-12 font-family-pri bg-gradient-to-r to-yellow-600 from-orange-200 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>

          {quizData.map((item, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-700 rounded-lg overflow-hidden bg-[#151515] backdrop-blur-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none hover:bg-[#222] transition-colors duration-200"
              >
                <span className="font-semibold text-lg text-white font-family-sec">
                  {item.question}
                </span>
                <svg
                  className={`w-6 h-6 text-primary transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="px-6 py-4 bg-[#1a1a1a] text-gray-300 font-family-sec text-base"
                >
                  {item.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="works flex justify-center items-center gap-16 px-sm md:px-md lg:px-lg py-y bg-black text-white">
        <div className="content flex flex-col items-start justify-start">
          <h2 className="text-5xl font-bold font-family-pri bg-gradient-to-r to-yellow-600 from-orange-200 bg-clip-text text-transparent  mb-6">
            How It Works
          </h2>
          <div className="flex justify-center flex-col items-center">
            <div className="flex justify-center items-center gap-8 mb-8">
              <img
                src={bodyImg}
                alt=""
                className="w-[100px] h-[100px] rounded-3xl"
              />
              <div>
                <h2 className="text-2xl font-family-sec font-semibold">
                  Body Training
                </h2>
                <p className="max-w-2xl font-family-sec text-sm text-gray-500">
                  Personalized workout routines are designed to build strength
                  and muscle, tailored to your fitness level and goals. Whether
                  it's lifting, bodyweight exercises, or resistance training,
                  we've got you covered.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-8 mb-8">
              <img
                src={cardioImg}
                alt=""
                className="w-[100px] h-[100px] rounded-3xl"
              />
              <div>
                <h2 className="text-2xl font-family-sec font-semibold">
                  Cardio Training
                </h2>
                <p className="max-w-2xl font-family-sec text-sm text-gray-500">
                  Engage in heart-pumping cardio exercises, from running and
                  cycling to high-intensity interval training (HIIT). Improve
                  your cardiovascular health and endurance with our tailored
                  programs.{" "}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-8 mb-8">
              <img
                src={endImg}
                alt=""
                className="w-[100px] h-[100px] rounded-3xl"
              />
              <div>
                <h2 className="text-2xl font-family-sec font-semibold">
                  Nutrition Plans
                </h2>
                <p className="max-w-2xl font-family-sec text-sm text-gray-500">
                  Based on your weight, height, and fitness goals, our nutrition
                  plans are designed to fuel your body for performance and
                  recovery. Track your calories, macros, and get daily meal
                  suggestions.
                </p>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-primary text-black font-semibold font-family-sec px-8 py-3 rounded-full hover:bg-primary transition duration-300 bg-primary cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
        <div>
          <img
            src={workImg}
            alt=""
            className="max-w-[500px] object-contain shadow-[10px_10px_10px_0px_rgba(251,191,36,0.5)] rounded-3xl "
          />
        </div>
      </div>
      <footer className="relative bg-black/95 backdrop-blur-3xl  text-white py-16">
        <div className="absolute inset-0 z-0 blur-md overflow-hidden">
          <motion.div
            initial={{ y: -30, x: -30 }}
            animate={{ y: 50, x: 50 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              repeatType: "reverse",
            }}
            className="absolute w-64 h-64 bg-gradient-to-r from-primary to-yellow-200/30 rounded-full opacity-40 animate-float top-10 left-10"
          ></motion.div>
          <motion.div
            initial={{ y: -30, x: 30 }}
            animate={{ y: 50, x: -50 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              repeatType: "reverse",
            }}
            className="absolute w-96 h-96 bg-gradient-to-r from-primary to-yellow-200/20 rounded-full opacity-15 animate-float-slow top-1/2 right-20"
          ></motion.div>
          <motion.div
            initial={{ y: -30, x: -30 }}
            animate={{ y: 50, x: 50 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              repeatType: "reverse",
            }}
            className="absolute w-48 h-48 bg-gradient-to-r from-primary to-yellow-200/25 rounded-full opacity-25 animate-float-fast bottom-20 left-1/3"
          ></motion.div>
        </div>

        <div className="relative container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 z-10">
          <div>
            <h2 className="text-4xl font-bold mb-4 font-family-pri bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Health Advisor
            </h2>
            <p className="text-sm font-family-sec text-gray-300 max-w-xs">
              Your AI-powered fitness companion. Personalized workouts and
              nutrition plans — completely free.
            </p>
          </div>

          <div className="font-family-sec">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {["Features", "Dashboard", "Tools", "FAQs"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-yellow-400 transition duration-300 relative group"
                  >
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="font-family-sec">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Useful Tools
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { text: "BMI Calculator", href: "#bmi-calculator" },
                { text: "Water Intake Guide", href: "#water-intake" },
                { text: "Progress Tracker", href: "#progress-tracker" },
              ].map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-yellow-400 transition duration-300 relative group"
                  >
                    {item.text}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative border-t border-gray-700 mt-12 py-6 text-center text-xs z-10">
          <p className="font-family-sec text-gray-300">
            © {new Date().getFullYear()} Health Advisor Coach. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
