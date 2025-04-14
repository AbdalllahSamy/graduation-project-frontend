import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "@/context/Authcontext/Authcontext";
import { Auth, AuthAxiosInstance } from "@/services/apisUrls/apisUrls";
import {
  EMAIL_VALIDATION,
  GetRequiredMessage,
} from "@/services/validation/validation";
import { Key, User, UserPlus } from "lucide-react";
import AuthButton from "@/components/ui/AuthButton";
import google from "../../../../assets/images/google 1.png";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold font-family-pri">Welcome Again</h1>
        <p className="mt-2 font-family-sec">
          Welcome to Health Advisor. dashboard Community
        </p>
      </div>

      {/* <div className='border-2 border-gray-300 rounded-lg p-5 mt-10 w-[400px] mx-auto flex justify-center items-center gap-3'>
        <img src={google} alt="" />
        <p className='font-family-sec'>Continue With Google</p>
      </div> */}
      <div className="py-5 w-[50%] flex flex-col  gap-5 mx-auto mt-[20px]">
        <GoogleOAuthProvider clientId="619608490846-m2rtc2bj47moa3ucfpnh5e2bt45pti6c.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>

        <div className="w-[50%] mx-auto relative my-[20px]">
          <hr className="border-[#AFA8A8] " />
          <div className="font-family-sec absolute inset-0  w-full flex items-center justify-center text-center ">
            <div className="w-fit bg-white p-2">
              <p>Or</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
