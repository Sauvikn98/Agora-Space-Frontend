import React from 'react'
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/create-profile");
  };
  return (
    <nav>
      <div className=" lg:ml-3 container mx-auto px-4 py-5 flex justify-between items-center">
        <a className="font-bold text-2xl lg:text-2xl" href="#">
          AGORA SPACE
        </a>
        <div className="block lg:hidden flex justify-between items-center">
          <button className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-black dark:text-gray-500" type="button">
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
            <div className="relative flex">
              <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
            </div>
          </button>

          <button className="ml-3 flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-violet-500 appearance-none focus:outline-none">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>

        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex items-center">
            <li>
              <button className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                <div className="relative flex">
                  <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
                </div>
              </button>
            </li>
            <li><a href="" onClick={handleNavigate} className="border-2 border-indigo-500 rounded-md p-2 text-gray-900 ml-4">Sign In</a></li>
            <li><a href="" className="bg-indigo-500 rounded-md p-2 text-gray-100 ml-6">Sign Up</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar