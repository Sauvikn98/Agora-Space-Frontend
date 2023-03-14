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
      <div className="container mx-auto px-4 py-1 flex justify-between items-center">
        <a className={`${isScrolled
          ? 'font-bold text-white lg:text-2xl'
          : 'font-bold lg:text-2xl'
          }`} href="#">
          <img class="w-auto mr-6 h-12 lg:ml-2" src={logo} alt="" />
        </a>
        <div className='lg:w-2/6'>
          <label for="default-search" class=" text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="default-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your Keyword to search" required />
          </div>
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