import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto sticky top-0 z-50">
        <div>
          <h2 className="text-2xl text-red-400 cursor-pointer">
            Gods Warriors
          </h2>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={` cursor-pointer py-3 text-sm font-semi-bold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute('/') && 'text-black border-b-red-500'
              }`}
              onClick={() => navigate('/')}
            >
              Home
            </li>
            <li
              className={` cursor-pointer py-3 text-sm font-semi-bold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute('/offers') && 'text-black border-b-red-500'
              }`}
              onClick={() => navigate('/offers')}
            >
              Offers
            </li>
            <li
              className={` cursor-pointer py-3 text-sm font-semi-bold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute('/sign-in') && 'text-black border-b-red-500'
              }`}
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
