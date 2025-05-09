import AuthButton from '@/components/ui/AuthButton';
import CustomProgressBar from '@/components/ui/CustomProgressBar';
import Input from '@/components/ui/Input';
import { Auth, AuthAxiosInstance } from '@/services/apisUrls/apisUrls';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaBirthdayCake, FaTransgenderAlt } from 'react-icons/fa';
import actor1 from './../../../../assets/images/6dbde96d619fa2275584886db44d81a4.png';
import beginner from './../../../../assets/images/beg.png';
import intermediate from './../../../../assets/images/inter.jpg';
import advanced from './../../../../assets/images/prof.jpg';
import { GiBodyHeight } from "react-icons/gi";
import { GiWeight } from "react-icons/gi";

export default function Register() {
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    console.log(page);
  }, [page]);
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
        {page === 2 && <RegisterSecondPage setPage={setPage} page={page} />}
        {page === 3 && <RegisterThirdPage setPage={setPage} page={page} />}
        {page === 4 && <RegisterFourthPage setPage={setPage} page={page} />}
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
  const registerUser = async (data) => {
    console.log('Form Data:', data);
    // setPage(page + 1);
    try {
      const res = await AuthAxiosInstance.post(Auth.register, {
        ...data,
        role: 'Trainee',
        isAgree: true,
      });
      setPage(page + 1);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 justify-center  h-[400px]">
        <div className="flex justify-center">
          <CustomProgressBar progress={25} />
        </div>
        <form
          onSubmit={handleSubmit(registerUser)}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex flex-col">
            <Input
              label="First Name"
              className="w-full"
              {...register('firstName', { required: 'First Name is required' })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              label="Last Name"
              className="w-full"
              {...register('lastName', { required: 'Last Name is required' })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div className="col-span-2">
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
          <div className="flex flex-col col-span-2 w-full">
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
          </div>
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
          <div className="col-span-2">
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
          </div>

          <div className="col-span-2">
            <Input
              className="w-full"
              label="Username"
              type="text"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="flex justify-center col-span-2">
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
export function RegisterSecondPage({ setPage, page }) {
  const goals = [
    { id: 'lose', label: 'LOSS\nWEIGHT' },
    { id: 'fitness', label: 'General\nfitness' },
    { id: 'muscle', label: 'Muscle\nGain' },
    { id: 'other', label: 'other' },
  ];
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [customGoal, setCustomGoal] = useState('');

  return (
    <>
      <div className="flex justify-center">
        <CustomProgressBar progress={50} />
      </div>

      <div className="grid grid-cols-2 justify-center gap-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            onClick={() => setSelectedGoal(goal.id)}
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

      <div className="flex justify-between w-full mt-6">
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
  return (
    <>
      <div className="flex justify-center">
        <CustomProgressBar progress={75} />
      </div>
      <div>
        <h3 className="font-family-pri font-bold text-center text-4xl mt-3">
          What is your training level ?
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-4 justify-center">
        <div className="relative border py-5 h-[295px] rounded-[20px] flex justify-between px-2 w-full overflow-hidden transition-all duration-1000 group hover:bg-gradient-to-t from-primary/55 to-white border-yellow-500">
          <img
            src={beginner}
            alt=""
            className="object-contain w-full h-[295px] rounded-[20px]"
          />
          <h3 className="absolute bottom-1/4 left-[25%] font-family-pri text-[43px] leading-10 whitespace-pre-line text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Beginner
          </h3>
        </div>
        <div className="relative border py-5 h-[295px] rounded-[20px] flex justify-between px-2 w-full overflow-hidden transition-all duration-1000 group hover:bg-gradient-to-t from-primary/55 to-white border-yellow-500">
          <img
            src={intermediate}
            alt=""
            className="object-contain w-full h-[295px] rounded-[20px]"
          />
          <h3 className="absolute bottom-1/4 left-[8%] font-family-pri text-[43px] leading-10 whitespace-pre-line text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Intermediate
          </h3>
        </div>

        {/* Third card on a new row and centered */}
        <div className="relative border py-5 h-[295px] rounded-[20px]  px-2 w-full overflow-hidden transition-all duration-1000 group hover:bg-gradient-to-t from-primary/55 to-white border-yellow-500 col-span-2 sm:col-span-1 flex justify-center">
          <img
            src={advanced}
            alt=""
            className="object-contain w-full h-[295px] rounded-[20px]"
          />
          <h3 className="absolute bottom-1/4 left-[20%] font-family-pri text-[43px] leading-10 whitespace-pre-line text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Advanced
          </h3>
        </div>
      </div>
      <div className="flex justify-between w-full my-5">
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
export function RegisterFourthPage({ setPage, page }) {
  return (
    <>
      <div className="flex justify-center">
        <CustomProgressBar progress={100} />
      </div>
      <h2 className="text-2xl font-bold text-center my-2 ">Gym Information</h2>
      <form className="flex flex-col gap-6 ">
        {/* Height */}
        <div className="flex items-center gap-3">
          <GiBodyHeight className=" text-lg" />
          
          <input
            type="number"
            placeholder="Height (cm)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Weight */}
        <div className="flex items-center gap-3">
          <GiWeight className=" text-lg" />
          <input
            type="number"
            placeholder="Weight (kg)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Age */}
        <div className="flex items-center gap-3">
          <FaBirthdayCake className="text-lg" />
          <input
            type="number"
            placeholder="Age"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
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
                name="gender"
                value="male"
                className="accent-indigo-600"
              />
              <span className="text-sm text-gray-700">Male</span>
            </label>

            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-indigo-50 transition">
              <input
                type="radio"
                name="gender"
                value="female"
                className="accent-indigo-600"
              />
              <span className="text-sm text-gray-700">Female</span>
            </label>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <AuthButton
            title={'prev'}
            onclick={() => setPage((prev) => prev - 1)}
          />
          <AuthButton title={'Submit'} />
        </div>
      </form>
      
    </>
  );
}
