import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '@/context/Authcontext/Authcontext';
import { Auth, AuthAxiosInstance } from '@/services/apisUrls/apisUrls';
import {
  EMAIL_VALIDATION,
  GetRequiredMessage,
} from '@/services/validation/validation';
import { Key, User, UserPlus } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { loginData, saveLoginData } = useContext(AuthContext);

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await AuthAxiosInstance.post(Auth.login, data);
      const accessToken = response?.data?.data?.accessToken;

      localStorage.setItem('token', accessToken);
      saveLoginData();

      toast.success(response.data.message || 'Login successfully');

      const user = jwtDecode(accessToken);
      if (user.role === 'Instructor') {
        navigate('/dashboard');
      } else if (user.role === 'Student') {
        navigate('/learner');
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div>
      <div className="mt-[50px]">
        <h2 className="text-[#C5D86D] text-[25px]">
          Continue your learning journey with Gym!
        </h2>
      </div>

      <div className="flex gap-[50px] items-center mt-[30px]">
        <div className="bg-[#333333] text-white px-[53px] py-[20px] flex flex-col justify-between items-center rounded-[20px] border-4 border-[#C5D86D]">
          <User className="text-[40px] text-[#C5D86D]" />
          <p className="mt-5">Sign in</p>
        </div>

        <Link to="/register">
          <div className="bg-[#333333] text-white px-[53px] py-[20px] flex flex-col justify-between items-center rounded-[20px] border-4 border-[#0D1321] duration-150 hover:border-[#C5D86D] group">
            <UserPlus className="text-[40px] group-hover:text-[#C5D86D]" />
            <p className="mt-5">Sign up</p>
          </div>
        </Link>
      </div>

      <div className="text-white mt-[25px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email</label>
            <div className="mt-3 px-2 py-3 flex items-center justify-center border-[3px] border-white rounded-xl mb-5">
              <span className="px-3">
                <i className="bi bi-envelope text-xl"></i>
              </span>
              <input
                placeholder="Enter your email"
                className="bg-inherit w-full focus:outline-none"
                {...register('email', EMAIL_VALIDATION)}
              />
            </div>
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label>Password</label>
            <div className="mt-3 px-2 py-3 flex items-center justify-center border-[3px] border-white rounded-xl">
              <span className="px-3">
                <Key />
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                className="bg-inherit w-full focus:outline-none"
                {...register('password', {
                  required: GetRequiredMessage('Password'),
                })}
              />
            </div>
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              className="mt-10 rounded-lg bg-white text-black px-3 py-2 flex items-center font-bold"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging...' : 'Login'}
              <i className="bi bi-check-circle-fill ml-2 text-xl" />
            </button>

            <div className="mt-10">
              Forgot password?
              <Link
                to="/forget-Password"
                className="text-[#C5D86D] underline ml-1"
              >
                click here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
