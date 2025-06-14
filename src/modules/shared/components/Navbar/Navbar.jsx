import { BellRing, Search } from 'lucide-react'
import React from 'react'
import logo from '../../../../assets/images/White.svg';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
     <nav className="bg-black/60 backdrop-blur-lg shadow-md border-b border-white/10 fixed top-0 left-0 w-full z-50">
        <div className=" mx-auto px-sm md:px-md lg:px-lg py-5 flex justify-between items-center">
          {/* <div className=" text-3xl md:text-4xl font-extrabold font-family-sec bg-gradient-to-r from-primary to-yellow-200 bg-clip-text text-transparent">
            Health Advisor
          </div> */}
          <img src={logo} alt="" className="w-32 h-16 object-contain" />
          <ul className="hidden md:flex space-x-10 text-white font-medium tracking-wide">
            {['Home', 'Services', 'About', 'Contact'].map((item) => {
              let path = '#';
              if (item === 'Home') path = '/home';
              else if (item === 'About') path = '/about';
              else if (item === 'Contact') path = '/contact';
              else if (item === 'Services') path = '/services';

              return (
                <li key={item} className="group relative">
                  <Link
                    to={path}
                    className="relative hover:text-yellow-300 transition duration-300"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Link
              to="/login"
              className="bg-primary hover:bg-prfrom-primary text-black font-bold py-2 px-5 rounded-xl shadow-lg transition duration-300"
            >
              Login
            </Link>
          </div>

          <button className="md:hidden text-white focus:outline-none">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  )
}
