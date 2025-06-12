import {
  BicepsFlexed,
  ChevronLeft,
  ChevronRight,
  House,
  LogOut,
  SquareChartGantt,
  TrainIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/White.svg';
import { GiSportMedal } from 'react-icons/gi';

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  let navigate = useNavigate();

  return (
    <Sidebar
      className="uppercase text-[#787878] font-bold bg-black min-h-screen"
      collapsed={isCollapsed}
    >
      {/* Logo and Toggle Button */}
      <div className="mb-8 mt-4 mx-2 flex items-center justify-between rounded-2xl p-2">
        {!isCollapsed && (
          <div className="hidden sm:block">
            <img src={logo} alt="logo" className="w-[60%] object-contain" />
          </div>
        )}
        <div
          className="p-1 bg-[#daac00] cursor-pointer rounded-xl"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          {isCollapsed ? (
            <ChevronRight className="text-black" />
          ) : (
            <ChevronLeft className="text-black" />
          )}
        </div>
      </div>

      <Menu>
        {/* Section Title */}
        <div
          className={`ps-4 font-family-sec transition-all duration-300 ${
            isCollapsed
              ? 'text-[8px] text-[#999]' // collapsed style
              : 'text-lg text-[#fefefe]' // expanded style
          }`}
        >
          Dashboard
        </div>

        <MenuItem icon={<House />}> Home </MenuItem>
        <MenuItem icon={<SquareChartGantt />}> Analysis </MenuItem>

        {/* Another Section */}
        <div
          className={`ps-4 mt-5 font-family-sec transition-all duration-300 ${
            isCollapsed
              ? 'text-sm text-[#999]'
              : 'text-lg text-[#fefefe]'
          }`}
        >
          Plan
        </div>
        

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

        <div
          className={`ps-4 mt-5 font-family-sec transition-all duration-300 ${
            isCollapsed
              ? 'text-sm text-[#999]'
              : 'text-lg text-[#fefefe]'
          }`}
        >
          User Guide
        </div>
                <MenuItem icon={<BicepsFlexed />} onClick={()=>{navigate('exercises')}}> Exercises </MenuItem>

      </Menu>
    </Sidebar>
  );
}
