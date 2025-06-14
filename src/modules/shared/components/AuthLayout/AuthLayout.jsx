import { Outlet } from 'react-router-dom';
import auth_pic from '../../../../assets/images/89000b92253dca26e577a35a03740603.jpg';
import logo from '../../../../assets/images/White.svg';
// import logo from './../../../../assets/images/PicsArt_05-29-02.53.50.png';
export default function AuthLayout() {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full min-h-screen bg-black text-white">
        <div className="w-full md:w-[60%] px-6 py-8 flex flex-col justify-start bg-black">
          <div className="mb-10">
            <img
              src={logo}
              alt="logo"
              className="object-contain md:w-[20%] w-[40%]"
            />
          </div>

          <div className="flex-grow">
            <Outlet />
          </div>
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
