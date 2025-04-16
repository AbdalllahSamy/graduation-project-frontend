import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { data, Link, useNavigate } from "react-router-dom";
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
import Input from "@/components/ui/Input";

export default function Login() {
  let {register,handleSubmit,formState:{errors}} = useForm()
  const onSubmit = (data)=>{
    console.log(data);
  }

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

        <form action="" onSubmit={handleSubmit(onSubmit())} className="flex flex-col gap-5">
          <div className="flex flex-col">
          <input
              type="email"
              placeholder="Please enter your email"
              className="  rounded-lg p-2 mt-3 placeholder-gray-500 outline-1 outline-gray-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email is not valid",
                },
              })}
            />
            {errors?.email && (
              <span className="text-red-500 mt-2">{errors?.email?.message}</span>
            )}
          </div>
          <div className="flex flex-col  mt-1">
          <input
              type="password"
              placeholder="Please enter your password"
              className="  rounded-lg p-2 mt-3 placeholder-gray-500 outline-1 outline-gray-500"
              {...register("password", {
                required: "Password is required",
                pattern:{
                  value:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                  message:"Password must contain at least one letter and one number",
                }
              })}
            />
              {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex gap-3 items-center mt-1">
            <input type="checkbox" />
            <p>Remember me</p>
          </div>
          <div className="w-[100%] mt-2">
            <AuthButton title={"Login"} classname={'w-[100%] font-family-sec cursor-pointer'} />
          </div>
        </form>
        <div className="flex justify-center items-center">
          <p className="font-family-sec">
          Don’t have an account?
          <Link className="text-primary cursor-pointer font-bold ms-2" to="/register">
          Sign Up
          </Link> 
          </p>
        </div>
      </div>
      
    </div>
  );
}
