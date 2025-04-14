import { Outlet } from "react-router-dom";
import auth_pic from "../../../../assets/images/89000b92253dca26e577a35a03740603.jpg";
import logo from "../../../../assets/images/health (2) 4.png";

export default function AuthLayout() {
  return (
    <>
      <div className="flex   gap-10  w-screen h-screen ps-10 overflow-auto overflow-y-auto">
        <div className="w-[60%] pt-5">
          <div className="text-white mb-10 ">
            <img src={logo} alt="logo" className="object-contain w-[30%]" />
          </div>
          <Outlet />
        </div>

        <div className="w-1/2 overflow-y-hidden">
          <div className=" hidden   md:flex fixed ">
            <img src={auth_pic} alt="auth-pic" className="object-cover " />
          </div>
        </div>
      </div>
    </>
  );
}
