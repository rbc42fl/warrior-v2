import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Header() {
  const [pageState, setPageState] = useState('Sign in');
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState('profile');
      } else {
        setPageState('Sign in');
      }
    });
  }, [auth]);

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="header bg-white border-b sticky top-0  z-40 shadow-sm text-center">
      <div>
        <h2
          onClick={() => navigate('/')}
          className=" text-md text-red-400 cursor-pointer "
        >
          BEING STEADFAST
        </h2>
        <h3 className="text-sm ">Best viewed on medium size screen</h3>
      </div>

      <header className="flex justify-center items-center px-3 max-w-6xl mx-auto sticky ">
        <div>
          <ul className="flex space-x-10">
            <li
              className={` cursor-pointer py-3 text-sm font-semi-bold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute('/instructions') && 'text-black border-b-red-500'
              }`}
              onClick={() => navigate('/instructions')}
            >
              Instructions
            </li>

            <li
              className={` cursor-pointer py-3 text-sm font-semi-bold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute('/') && 'text-black border-b-red-500'
              }`}
              onClick={() => navigate('/')}
            >
              Home
            </li>

            <li
              className={` cursor-pointer py-3 text-sm font-semi-bold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute('/sign-in') ||
                (pathMatchRoute('/profile') && 'text-black border-b-red-500')
              }`}
              onClick={() => navigate('/profile')}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
