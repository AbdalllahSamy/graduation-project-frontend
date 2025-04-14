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
  // const navigate = useNavigate();
  // const { loginData, saveLoginData } = useContext(AuthContext);

  // const {
  //   register,
  //   formState: { isSubmitting, errors },
  //   handleSubmit,
  // } = useForm();

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await AuthAxiosInstance.post(Auth.login, data);
  //     const accessToken = response?.data?.data?.accessToken;

  //     localStorage.setItem('token', accessToken);
  //     saveLoginData();

  //     toast.success(response.data.message || 'Login successfully');

  //     const user = jwtDecode(accessToken);
  //     if (user.role === 'Instructor') {
  //       navigate('/dashboard');
  //     } else if (user.role === 'Student') {
  //       navigate('/learner');
  //     }
  //   } catch (error) {
  //     toast.error('Login failed');
  //   }
  // };

  return (
    <div>
     
    </div>
  );
}
