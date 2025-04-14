import { Outlet } from 'react-router-dom';
import auth_pic from '../../../../assets/images/auth-pic.png';
// import logo from '../../../../assets/images/Logo.jpg';

export default function AuthLayout() {
  return (
    <>
      <div className="grid md:grid-cols-2  bg-black  w-screen h-screen">
        <div>
          <div className="text-white mb-10">
            {/* <img src={logo} alt="logo" /> */}
          </div>
          <Outlet />
        </div>

        <div className=" ">
          <div className=" hidden  md:block">
            <img src={auth_pic} alt="auth-pic" className=" w-screen h-screen" />
          </div>
        </div>
      </div>
    </>
  );
}
