import AuthButton from '@/components/ui/AuthButton';
import CustomProgressBar from '@/components/ui/CustomProgressBar';
import Input from '@/components/ui/Input';
import {
  Auth,
  AuthAxiosInstance,
  axiosInstance,
} from '@/services/apisUrls/apisUrls';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaBirthdayCake, FaTransgenderAlt } from 'react-icons/fa';
import { GiBodyHeight, GiWeight } from 'react-icons/gi';
import actor1 from './../../../../assets/images/6dbde96d619fa2275584886db44d81a4.png';
import musclar from './../../../../assets/images/muscle.png';
import cardio from './../../../../assets/images/cardio.png';
import flex from './../../../../assets/images/flex.png';
import level1 from './../../../../assets/images/level-1.png';
import beginner from './../../../../assets/images/beg.png';
import intermediate from './../../../../assets/images/inter.jpg';

export default function Register() {
  const [token, setToken] = useState('');
  const [page, setPage] = React.useState(1);
  const [formData, setFormData] = useState({
    sex: '',
    age: 0,
    height: 0,
    weight: 0,
    hyperTension: 'No',
    diabetes: 'No',
    level: '',
    fitness_goal: '',
    fitness_type: 'Muscular Fitness',
  });
  useEffect(() => {
    console.log(page);
    console.log('Form Data:', formData);
  }, [page, formData]);
  // const { token, setToken } = React.useContext(AuthContext);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken || '');
    if (storedToken) {
      console.log('Stored Token:', storedToken);
    }
  }, []);
  const sendAnswers = async () => {
    console.log('Token:', token); // Check token presence

    try {
      const res = await axiosInstance.post('/answer-questions', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const handleNext = () => {
    setPage((prev) => {
      const nextPage = prev + 1;
      console.log('Setting page to:', nextPage);
      return nextPage;
    });
  };
  return (
    <div className="w-full flex justify-center gap-3">
      <div className="flex flex-col gap-3 w-[60%] ">
        {page === 1 && <RegisterFirstPage setPage={setPage} page={page} />}
        {page === 3 && (
          <RegisterSecondPage
            setPage={setPage}
            page={page}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {page === 2 && (
          <RegisterThirdPage
            setPage={setPage}
            page={page}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {page === 5 && (
          <RegisterFourthPage
            setPage={setPage}
            page={page}
            formData={formData}
            setFormData={setFormData}
            sendAnswers={sendAnswers}
          />
        )}
        {page === 4 && (
          <RegisterFifthPage
            setPage={setPage}
            page={page}
            formData={formData}
            setFormData={setFormData}
            sendAnswers={sendAnswers}
          />
        )}
      </div>
    </div>
  );
}
export function RegisterFirstPage({ setPage, page }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch('password');
  // const { token, setToken } = React.useContext(AuthContext);
  const registerUser = async (data) => {
    console.log('Form Data:', data);
    // setPage(page + 1);
    try {
      const res = await AuthAxiosInstance.post(Auth.register, {
        ...data,
      });
      console.log('Response:', res);
      setPage(page + 1);
      const resToken = res.data.token;
      localStorage.setItem('token', resToken);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-8 justify-center  h-[400px]">
        <div className="flex justify-center">
          <CustomProgressBar progress={0} />
        </div>
        <form
          onSubmit={handleSubmit(registerUser)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="col-span-2">
            <Input
              className="w-full "
              label="name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          {/* <div className="flex flex-col">
            <Input
              label="Last Name"
              className="w-full"
              {...register('lastName', { required: 'Last Name is required' })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div> */}
          <div className="col-span-2 ">
            <Input
              className="w-full"
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          {/* <div className="flex flex-col col-span-2 w-full">
            <Input
              label="Phone Number"
              className="w-full"
              {...register('phoneNumber', {
                required: 'Phone Number is required',
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div> */}
          <div className="col-span-2">
            <Input
              className="w-full"
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                validate: {
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    'Password must have at least one uppercase letter',
                  hasLowercase: (value) =>
                    /[a-z]/.test(value) ||
                    'Password must have at least one lowercase letter',
                  hasNonAlphanumeric: (value) =>
                    /[^a-zA-Z0-9]/.test(value) ||
                    'Password must have at least one non-alphanumeric character',
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {/* <div className="col-span-2">
            <Input
              className="w-full"
              label="Confirm Password"
              type="password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                validate: (value) =>
                  value === password || 'Passwords do not match',

                hasUppercase: (value) =>
                  /[A-Z]/.test(value) ||
                  'Password must have at least one uppercase letter',
                hasLowercase: (value) =>
                  /[a-z]/.test(value) ||
                  'Password must have at least one lowercase letter',
                hasNonAlphanumeric: (value) =>
                  /[^a-zA-Z0-9]/.test(value) ||
                  'Password must have at least one non-alphanumeric character',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div> */}

          {/* <div className="col-span-2">
            <Input
              className="w-full"
              label="Username"
              type="text"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div> */}
          <div className="flex justify-center col-span-2 mt-4">
            <AuthButton
              title="Next"
              type="submit"
              onclick={() => setPage(page + 1)}
            />
          </div>
        </form>
      </div>
    </>
  );
}
export function RegisterSecondPage({ setPage, page, formData, setFormData }) {
  const goals = [
    { id: 'lose', label: 'LOSS\nWEIGHT', goal: 'weight_loss' },
    { id: 'fitness', label: 'General\nfitness', goal: 'general_fitness' },
    { id: 'muscle', label: 'Muscle\nGain', goal: 'muscle_gain' },
    { id: 'other', label: 'other' },
  ];
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [customGoal, setCustomGoal] = useState('');

  return (
    <>
      <div className="flex justify-center">
        <CustomProgressBar progress={50} />
      </div>
      <div>
        <h2 className="font-family-pri font-bold text-center text-4xl  my-2 ">
          What is your goal?
        </h2>
      </div>
      <div className="grid grid-cols-2 justify-center gap-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            onClick={() => {
              setSelectedGoal(goal.id);
              setFormData((prev) => ({
                ...prev,
                fitness_goal: goal.goal || customGoal,
              }));
            }}
            className={`relative cursor-pointer ${
              selectedGoal === goal.id
                ? 'bg-gradient-to-t from-primary/55 to-white border-yellow-500'
                : 'bg-gradient-to-t from-[#F4F4F4] to-white border-black'
            } border py-5 h-[175px] rounded-[20px] flex justify-between px-2 w-full overflow-hidden transition-all duration-300`}
          >
            <div className="flex items-start justify-start">
              <input
                type="radio"
                checked={selectedGoal === goal.id}
                onChange={() => setSelectedGoal(goal.id)}
                className="accent-primary w-5 h-5 mt-1"
              />
            </div>

            <div
              className="absolute bottom-0 -start-8 -translate-x-[6%]"
              style={{ zIndex: 999 }}
            >
              <img
                src={actor1}
                alt=""
                className="object-contain w-full hover:scale-110 transition-all duration-300"
              />
            </div>

            <div className="flex items-center">
              <h2 className="font-family-pri text-[43px] leading-10 whitespace-pre-line">
                {goal.label}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {selectedGoal === 'other' && (
        <div className="mt-4">
          <input
            type="text"
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            placeholder="Enter your goal"
            className="w-full border border-gray-400 rounded-lg p-2"
          />
        </div>
      )}

      <div className="flex justify-center md:justify-between w-full my-5 gap-5 ">
        <AuthButton
          title={'Prev'}
          onclick={() => setPage((prev) => prev - 1)}
        />
        <AuthButton
          title={'Next'}
          onclick={() => setPage((prev) => prev + 1)}
        />
      </div>
    </>
  );
}
export function RegisterThirdPage({ setPage, page }) {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const trainingLevels = [
    { id: 1, label: 'Normal', image: beginner },
    { id: 2, label: 'Intermediate', image: intermediate },
  ];

  return (
    <>
      <div className="flex justify-center">
        <CustomProgressBar progress={25} />
      </div>
      <div>
        <h3 className="font-family-pri font-bold text-center text-4xl mt-3">
          What is your training level?
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-4 justify-center">
        {trainingLevels.map((level) => {
          const isSelected = selectedLevel === level.id;

          return (
            <div
              key={level.id}
              className={`relative border py-5 h-[295px] rounded-[20px] flex justify-center items-center px-2 w-full overflow-hidden transition-all duration-500 group cursor-pointer
        ${
          isSelected
            ? 'bg-gradient-to-t from-primary/55 to-white border-yellow-500'
            : 'border-black hover:bg-gradient-to-t hover:from-primary hover:to-white'
        }`}
              onClick={() => setSelectedLevel(level.id)}
            >
              <img
                src={level.image}
                alt={level.label}
                className={`absolute top-0 left-0 w-full h-full object-cover rounded-[20px] transition-all duration-300
          ${isSelected ? 'opacity-70' : 'opacity-100 group-hover:opacity-40'}`}
              />
              <h3 className="relative font-family-pri text-[43px] leading-10 text-white text-center z-10">
                {level.label}
              </h3>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center md:justify-between w-full my-5 gap-5">
        <AuthButton
          title={'prev'}
          onclick={() => setPage((prev) => prev - 1)}
        />
        <AuthButton
          title={'Next'}
          onclick={() => setPage((prev) => prev + 1)}
        />
      </div>
    </>
  );
}
export function RegisterFourthPage({
  setPage,
  page,
  formData,
  setFormData,
  sendAnswers,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  return (
    <>
      <div className="flex justify-center">
        <CustomProgressBar progress={100} />
      </div>
      <h2 className="font-family-pri font-bold text-center text-4xl tracking-wider my-2 ">
        Body Information
      </h2>
      <form
        className="flex flex-col gap-6 "
        onSubmit={formData && handleSubmit(sendAnswers)}
      >
        {/* Height */}
        <div className="flex items-center gap-3">
          <GiBodyHeight className=" text-lg" />

          <Input
            label={'Height'}
            placeholder="Height (cm)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            {...register('height', {
              required: 'Height is required',
              onChange: (e) =>
                setFormData((prev) => ({ ...prev, height: e.target.value })),
            })}
          />
          {errors.height && (
            <p className="text-red-500 text-sm">{errors.height.message}</p>
          )}
        </div>

        {/* Weight */}
        <div className="flex items-center gap-3">
          <GiWeight className=" text-lg" />

          <Input
            label={'Weight'}
            placeholder="Weight (kg)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            {...register('weight', {
              required: 'Weight is required',
              onChange: (e) =>
                setFormData((prev) => ({ ...prev, weight: e.target.value })),
            })}
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight.message}</p>
          )}
        </div>

        {/* Age */}
        <div className="flex items-center gap-3">
          <FaBirthdayCake className="text-lg" />

          <Input
            label={'Age'}
            type="number"
            placeholder="Age"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            {...register('age', {
              required: 'Age is required',
              onChange: (e) =>
                setFormData((prev) => ({ ...prev, age: e.target.value })),
            })}
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Gender */}

        <div className="flex justify-between">
          <label className="text-sm font-medium text-gray-700 mb-2 flex  items-center gap-2">
            <FaTransgenderAlt className=" text-lg" />
            Gender
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-indigo-50 transition">
              <input
                type="radio"
                name="sex"
                value="male"
                className="accent-primary"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    sex: e.target.value,
                  }))
                }
              />
              <span className="text-sm text-gray-700">Male</span>
            </label>

            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-indigo-50 transition">
              <input
                type="radio"
                name="sex"
                value="female"
                className="accent-primary"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    sex: e.target.value,
                  }))
                }
              />
              <span className="text-sm text-gray-700">Female</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4 ">
          <h3 className="md:text-lg text-sm font-bold text-yellow-800 mb-2 md:mb-0 ">
            Do you have any medical conditions?
          </h3>
          <div className="flex justify-between gap-5 md-gap-0">
            <p>Hypertension</p>
            <div className="flex gap-3 ">
              <div className="flex gap-3">
                <label htmlFor="hypertension">Yes</label>
                <input
                  type="radio"
                  name="hypertension"
                  value="yes"
                  className="accent-primary w-5 h-5 border-white"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hypertension: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex gap-3">
                <label htmlFor="hypertension">No</label>
                <input
                  type="radio"
                  name="hypertension"
                  value="no"
                  className="accent-primary w-5 h-5 border-white"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hypertension: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <p>Diabetes</p>
            <div className="flex gap-3 ">
              <div className="flex gap-3">
                <label htmlFor="diabetes">Yes</label>
                <input
                  type="radio"
                  name="diabetes"
                  value="yes"
                  className="accent-primary w-5 h-5 border-white"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      diabetes: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex gap-3">
                <label htmlFor="diabetes">No</label>
                <input
                  type="radio"
                  name="diabetes"
                  value="no"
                  className="accent-primary w-5 h-5 border-white"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      diabetes: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full gap-5 md:gap-0">
          <AuthButton
            title={'prev'}
            onclick={() => setPage((prev) => prev - 1)}
          />
          <AuthButton title={'Submit'} type={'submit'} />
        </div>
      </form>
    </>
  );
}
export function RegisterFifthPage({ setPage, page, formData, setFormData }) {
  const [selectedFitness, setSelectedFitness] = useState(formData.fitness_type || null);

  const fitnessTypes = [
    { id: 'muscular', label: 'Muscular Fitness', image: musclar },
    { id: 'cardio', label: 'Cardio Fitness', image: cardio },
    { id: 'flexibility', label: 'Flexibility', image: flex },
  ];

  const handleSelect = (type) => {
    setSelectedFitness(type.label);
    setFormData((prev) => ({ ...prev, fitness_type: type.label }));
  };

  return (
    <>
      <div className="flex justify-center">
        <CustomProgressBar progress={75} />
      </div>
      <h2 className="font-family-pri font-bold text-center text-4xl tracking-wider my-2">
        What is your fitness type?
      </h2>

      <div className="grid grid-cols-1 gap-8 mt-4 justify-center">
        {fitnessTypes.map((type) => {
          const isSelected = selectedFitness === type.label;
          return (
            <div
              key={type.id}
              onClick={() => handleSelect(type)}
              className={`relative border py-5 h-[295px] rounded-[20px] flex justify-center items-center px-2 w-full overflow-hidden transition-all duration-500 group cursor-pointer
              ${isSelected ? 'bg-gradient-to-t from-primary/55 to-white border-yellow-500' : 'border-black hover:bg-gradient-to-t hover:from-primary hover:to-white'}`}
            >
              <img
                src={type.image}
                alt={type.label}
                className={`absolute top-0 left-0 w-full h-full object-cover rounded-[20px] transition-all duration-300
                ${isSelected ? 'opacity-70' : 'opacity-100 group-hover:opacity-40'}`}
              />
              <h3 className="relative font-family-pri text-[43px] leading-10 text-white text-center z-10">
                {type.label}
              </h3>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between w-full mt-6">
        <AuthButton title={'Prev'} onclick={() => setPage((prev) => prev - 1)} />
        <AuthButton title={'Next'} onclick={() => setPage((prev) => prev + 1)} />
      </div>
    </>
  );
}
