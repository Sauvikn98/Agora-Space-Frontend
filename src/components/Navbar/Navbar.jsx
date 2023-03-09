import React, { useState, useEffect } from 'react'
import logo from "../../assets/logo.png"
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/atoms/userAtoms';

function Navbar({ handleOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useRecoilValue(authState);

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      if (!isTop) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${isScrolled
      ? 'bg-slate-900 bg-opacity-80 shadow-lg'
      : 'bg-slate-100'
      } transition-all duration-500 ease-in-out fixed sticky top-0 z-50 shadow-lg backdrop-filter backdrop-blur-lg backdrop-saturate-150`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a className={`${isScrolled
          ? 'font-bold text-white lg:text-2xl'
          : 'font-bold lg:text-2xl'
          }`} href="#">
          <img class="w-auto mr-6 h-12 lg:ml-2" src={logo} alt="" />
        </a>
        <div className='lg:w-2/6'>
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-6">
              <svg className="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                height="30" viewBox="0 0 30 30">
                <path
                  d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                </path>
              </svg>
            </span>
            <input
              className="w-full py-2 px-14 shadow-lg tracking-wider lg:w-full bg-white placeholder:font-italitc border border-slate-300 rounded-full  focus:outline-none"
              placeholder="Enter your keyword to search" type="text" />
          </label>
        </div>
        <div className="block lg:hidden flex justify-between items-center">
          <button className={`${isScrolled
            ? 'hidden lg:block inline-flex items-center text font-medium text-center text-white hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400'
            : 'hidden lg:block inline-flex items-center text font-medium text-center text-gray-900 hover:text-gray-500 focus:outline-none dark:hover:text-white dark:text-gray-400'
            }`}>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
            <div className="relative flex">
              <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
            </div>
          </button>
          <button className="ml-3 flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-violet-500 appearance-none focus:outline-none">
            <svg className="fill-current h-5 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        {isAuthenticated ? (
          <></>
        ) : (
          <div className="hidden lg:block">
            <ul className="inline-flex items-center">
              <li><button onClick={() => handleOpenModal('signin')} className={`${isScrolled
                ? 'uppercase border-2 border-indigo-500 rounded-full px-6 py-2 text-gray-100 ml-4'
                : 'uppercase border-2 border-indigo-500 rounded-full px-6 py-2 text-gray-900 ml-4'
                }`}>Sign In</button></li>
              <li><button onClick={() => handleOpenModal('signup')} className="border-2 border-indigo-500 uppercase bg-indigo-500 rounded-full px-6 py-2 text-gray-100 ml-6">Sign Up</button></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar