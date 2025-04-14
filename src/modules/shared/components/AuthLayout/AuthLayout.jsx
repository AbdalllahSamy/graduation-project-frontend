import { Outlet } from 'react-router-dom';
import auth_pic from '../../../../assets/images/89000b92253dca26e577a35a03740603.jpg';
import logo from '../../../../assets/images/PicsArt_04-14-06.00.31.jpg';

export default function AuthLayout() {
  return (
    <>
      <div className="flex   gap-10  w-screen h-screen ps-10 overflow-auto overflow-y-hidden">
        <div className='w-[60%] pt-5'>
          <div className="text-white  flex justify-start items-start ">
            <img src={logo} alt="logo"  className='object-contain w-[30%]'/>
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
