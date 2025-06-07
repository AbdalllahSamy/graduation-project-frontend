import { useState } from 'react';

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [activeTab, setActiveTab] = useState('bmi');

  // States for results of each calculator
  const [bmiResult, setBmiResult] = useState(null);
  const [waterResult, setWaterResult] = useState(null);
  const [proteinResult, setProteinResult] = useState(null);
  const [bfpResult, setBfpResult] = useState(null);
  const [caloriesResult, setCaloriesResult] = useState(null);

  const tabs = [
    { id: 'bmi', label: 'BMI BODY MASS' },
    { id: 'water', label: 'WATER INTAKE' },
    { id: 'protein', label: 'PROTEIN INTAKE' },
    { id: 'bfp', label: 'BFP BODY FAT' },
    { id: 'calories', label: 'CALORIES TO BURN' }, // التاب الجديد
  ];

  const quizData = [
    {
      question: 'What is the capital of France?',
      answer: 'The capital of France is Paris.',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      answer: 'Mars is known as the Red Planet.',
    },
    {
      question: 'What is the largest mammal?',
      answer: 'The blue whale is the largest mammal.',
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answer: "William Shakespeare wrote 'Romeo and Juliet'.",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bmi':
        return (
          <div className="mt-20 mx-14">
            <section className="bg-[#151515] py-16">
              <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">
                  {/* BMI Chart Table */}
                  <div className="lg:w-1/2 w-full">
                    <div className="mb-6">
                      <span className="text-orange-500 uppercase text-sm">
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
                            ['Below 18.5', 'Underweight'],
                            ['18.5 - 24.9', 'Healthy'],
                            ['25.0 - 29.9', 'Overweight'],
                            ['30.0 - and Above', 'Obese'],
                          ].map(([bmi, status], idx) => (
                            <tr
                              key={idx}
                              className={idx % 2 === 1 ? 'bg-[#111111]' : ''}
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
                      <span className="text-orange-500 uppercase text-sm">
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
                            let status = '';
                            if (bmi < 18.5) status = 'Underweight';
                            else if (bmi < 25) status = 'Healthy';
                            else if (bmi < 30) status = 'Overweight';
                            else status = 'Obese';

                            setBmiResult({ bmi, status });
                          } else {
                            setBmiResult(null);
                            alert('Please enter valid height and weight.');
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
                          className="w-full bg-[#f36100] text-white font-bold uppercase py-3 mt-2"
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

      case 'water':
        return (
          <div className="mt-20 mx-14 text-white">
            <section className="bg-[#151515] py-16 px-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-orange-500 uppercase text-sm">
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
                    alert('Please enter a valid weight.');
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
                  className="w-full bg-[#f36100] text-white font-bold uppercase py-3"
                >
                  Calculate
                </button>
              </form>
              {waterResult !== null && (
                <p className="mt-6 text-white bg-[#222] p-4 rounded text-center">
                  You should drink approximately{' '}
                  <strong>{waterResult} liters</strong> of water per day.
                </p>
              )}
            </section>
          </div>
        );

      case 'protein':
        return (
          <div className="mt-20 mx-14 text-white">
            <section className="bg-[#151515] py-16 px-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-orange-500 uppercase text-sm">
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
                  if (activity === 'low') multiplier = 0.8;
                  else if (activity === 'moderate') multiplier = 1.2;
                  else if (activity === 'high') multiplier = 1.6;

                  if (!isNaN(weight) && weight > 0) {
                    const protein = (weight * multiplier).toFixed(1);
                    setProteinResult(protein);
                  } else {
                    setProteinResult(null);
                    alert('Please enter a valid weight.');
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
                  className="w-full bg-[#f36100] text-white font-bold uppercase py-3"
                >
                  Calculate
                </button>
              </form>
              {proteinResult !== null && (
                <p className="mt-6 text-white bg-[#222] p-4 rounded text-center">
                  You need approximately <strong>{proteinResult} grams</strong>{' '}
                  of protein per day.
                </p>
              )}
            </section>
          </div>
        );

      case 'bfp':
        return (
          <div className="mt-20 mx-14 text-white">
            <section className="bg-[#151515] py-16 px-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-orange-500 uppercase text-sm">
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
                    gender === 'female' ? parseFloat(e.target.hip.value) : 0;

                  if (
                    !isNaN(waist) &&
                    waist > 0 &&
                    !isNaN(neck) &&
                    neck > 0 &&
                    !isNaN(height) &&
                    height > 0 &&
                    (gender === 'male' ||
                      (gender === 'female' && !isNaN(hip) && hip > 0))
                  ) {
                    // Using U.S. Navy Method formula (simplified)
                    let bodyFat = 0;
                    if (gender === 'male') {
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
                    alert('Please enter valid measurements.');
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
                  className="w-full bg-[#f36100] text-white font-bold uppercase py-3"
                >
                  Calculate
                </button>
              </form>
              {bfpResult !== null && (
                <p className="mt-6 text-white bg-[#222] p-4 rounded text-center">
                  Your estimated body fat percentage is{' '}
                  <strong>{bfpResult}%</strong>.
                </p>
              )}
            </section>
          </div>
        );

      case 'calories':
        return (
          <div className="mt-20 mx-14 text-white">
            <section className="bg-[#151515] py-16 px-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-orange-500 uppercase text-sm">
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
                    (gender === 'male' || gender === 'female') &&
                    !isNaN(weight) &&
                    weight > 0 &&
                    !isNaN(height) &&
                    height > 0 &&
                    !isNaN(age) &&
                    age > 0
                  ) {
                    // Calculate BMR using Mifflin-St Jeor Equation
                    let bmr = 0;
                    if (gender === 'male') {
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
                    alert('Please enter valid inputs.');
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
                  className="w-full bg-[#f36100] text-white font-bold uppercase py-3"
                >
                  Calculate
                </button>
              </form>
              {caloriesResult !== null && (
                <p className="mt-6 text-white bg-[#222] p-4 rounded text-center">
                  Your estimated daily calories burned:{' '}
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
      <section
        id="health-tools"
        className="px-4 py-6  bg-[#151515] "
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Health & Fitness Tools
        </h1>
        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-md font-semibold border-2 ${
                activeTab === id
                  ? 'bg-orange-600 border-orange-600 text-white'
                  : 'border-gray-600 text-gray-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Render the active tab content */}
        {renderTabContent()}
      </section>
      <section className=" py-12">
        <div className=" mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">English Quiz</h2>

          {quizData.map((item, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-300 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full px-6 py-4 bg-white flex justify-between items-center text-left focus:outline-none"
              >
                <span className="font-medium text-gray-800">
                  {item.question}
                </span>
                <svg
                  className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
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
                <div className="px-6 py-4 bg-gray-50 text-gray-700">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
