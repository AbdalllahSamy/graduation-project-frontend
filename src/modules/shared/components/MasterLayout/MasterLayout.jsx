  import { Outlet, useParams } from 'react-router-dom';
  import Navbar from '../Navbar/Navbar';
import SideBar from '../SideBar/SideBar';
  // import SideBar from '../SideBar/SideBar';

export default function MasterLayout() {
    const { id } = useParams();

  return (
    <>
      <div className='flex'>
       
          <SideBar id={id}/>
        
        <div className='w-full '>
          <Outlet />
        </div>
      </div>
    </>
  );
}
