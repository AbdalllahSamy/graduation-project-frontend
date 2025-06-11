import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { data, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "@/context/Authcontext/Authcontext";
import {
  Auth,
  AuthAxiosInstance,
  axiosInstance,
} from "@/services/apisUrls/apisUrls";
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
import { FaSpinner } from "react-icons/fa";

export default function Login() {
  let { saveLoginData } = useContext(AuthContext);
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await AuthAxiosInstance.post(Auth.login, data);
      toast.success("Login Successfully");
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
      saveLoginData();
      navigate("/dashboard");
      console.log(response);
    } catch (error) {
      toast.error("");
      console.log(error);
    }
  };

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
      <div className="py-5 md:w-[50%] w-[90%] flex flex-col  gap-5 mx-auto mt-[20px]">
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

        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 "
        >
          <div className="flex flex-col">
            <Input
              type="email"
              label="Email"
              placeholder="Please enter your email"
              className={"w-full"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email is not valid",
                },
              })}
            />
            {errors?.email && (
              <span className="text-red-500 mt-2">
                {errors?.email?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col  mt-1">
            <Input
              label="Password"
              type="password"
              className={"w-full"}
              {...register("password", {
                required: "Password is required",
                // pattern: {
                //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                //   message: "Password must contain at least one letter and one number",
                // }
              })}
              error={errors.password}
            />
            {errors?.password && (
              <span className="text-red-500 mt-2">
                {errors?.password?.message}
              </span>
            )}
          </div>
          <div className="flex gap-3 items-center mt-1">
            <input type="checkbox" />
            <p>Remember me</p>
          </div>
          <div className="w-[100%] mt-2">
            <button
              disabled={isSubmitting}
              type="submit"
              title={"Login"}
              className="w-[100%] font-family-sec bg-black rounded-[30px] text-white px-10 py-2 cursor-pointer disabled:bg-gray-400 hover:transform hover:scale-105 transition-all duration-300"
            >
              {isSubmitting ? (
              <>
                Submiting ...
              </>
            ) : (
              'Login'
            )}
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center">
          <p className="font-family-sec">
            Don’t have an account?
            <Link
              className="text-primary cursor-pointer font-bold ms-2"
              to="/register"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
