import { Outlet } from 'react-router-dom';
import auth_pic from '../../../../assets/images/89000b92253dca26e577a35a03740603.jpg';
// import logo from '../../../../assets/images/Logo.jpg';

export default function AuthLayout() {
  return (
    <>
      <div className="flex   gap-10  w-screen h-screen ps-10 overflow-auto overflow-y-hidden">
        <div className='w-1/2'>
          <div className="text-white mb-10 ">
            {/* <img src={logo} alt="logo" /> */}
          </div>
          <Outlet />
        </div>

        <div className= "w-1/2">
          <div className=" hidden   md:flex ">
            <img src={auth_pic} alt="auth-pic" className="object-cover " />
          </div>
        </div>
      </div>
    </>
  );
}
