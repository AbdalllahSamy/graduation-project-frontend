import {
  ChevronLeft,
  ChevronRight,
  House,
  LogOut,
  SquareChartGantt,
} from 'lucide-react';
import { useState } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/White.svg';

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  let navigate = useNavigate();

  return (
    <>
      <Sidebar
        className="uppercase text-[#787878] font-bold bg-black min-h-screen"
        collapsed={isCollapsed}
      >
        <div className="mb-8 mt-4 mx-2 flex items-center  justify-between rounded-2xl p-2">
          <div className="hidden sm:block">
            <img src={logo} alt="logo" className="w-[60%] object-contain" />
          </div>
          <div
            className="p-0.5 bg-yellow-700 cursor-pointer rounded-xl "
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? (
              <ChevronRight className="text-[#FFC662]" />
            ) : (
              <ChevronLeft className="text-[#FFC662]" />
            )}
          </div>
        </div>
        <Menu>
          <div className="ps-4  text-[#fefefe] font-family-sec ">Dashboard</div>
          <MenuItem icon={<House />}> Home </MenuItem>
          <MenuItem icon={<SquareChartGantt />}> Analasis </MenuItem>
          <div className="mt-5">
            <div className="ps-4  text-[#fefefe] font-family-sec ">Plan</div>
            <MenuItem icon={<House />}> Gym Plan </MenuItem>
            <SubMenu label="Diet Plan" icon={<SquareChartGantt />}>
              <MenuItem> This Week </MenuItem>
              <MenuItem> Next Week </MenuItem>
              <MenuItem> Last Week </MenuItem>
            </SubMenu>
            <MenuItem
              icon={<LogOut />}
              onClick={() => {
                localStorage.clear();
                navigate('/login');
              }}
            >
              LogOut
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </>
  );
}
