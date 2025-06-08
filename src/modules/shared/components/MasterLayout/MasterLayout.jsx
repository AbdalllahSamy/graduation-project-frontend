  import { Outlet } from 'react-router-dom';
  import Navbar from '../Navbar/Navbar';
import SideBar from '../SideBar/SideBar';
  // import SideBar from '../SideBar/SideBar';

export default function MasterLayout() {
  return (
    <>
      <div className='flex'>
       
          <SideBar />
        
        <div className='w-full '>
          <Outlet />
        </div>
      </div>
    </>
  );
}
