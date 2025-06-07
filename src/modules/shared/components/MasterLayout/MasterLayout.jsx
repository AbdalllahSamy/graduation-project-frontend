  import { Outlet } from 'react-router-dom';
  import Navbar from '../Navbar/Navbar';
  // import SideBar from '../SideBar/SideBar';

  export default function MasterLayout() {
    return (
      <>
        <div className='flex'>
<<<<<<< HEAD
          {/* <div>
            <SideBar />
          </div> */}
=======
          <div>
            {/* <SideBar /> */}
          </div>
>>>>>>> 3b903819f7c45ae6ef64b0c84a5fe0fb4b2a6737
          <div className='w-full '>
            <Outlet />
          </div>
        </div>
      </>
    );
  }
