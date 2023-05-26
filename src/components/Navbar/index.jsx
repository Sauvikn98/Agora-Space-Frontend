import React, { useState, useEffect } from 'react'
import logo from "../../assets/logo.png"
import { useRecoilState, useRecoilValue } from 'recoil';
import { isAuthenticatedAtom } from '../../recoil/atoms/authAtom';
import axios from 'axios';
import { API_POSTS_SEARCH } from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { socket, timeAgo } from '../../utils';
import { notificationsState } from '../../recoil/atoms/notificationAtom';

function Navbar({ handleOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 800);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useRecoilState(notificationsState)

  const searchPosts = async (text) => {
    try {
      const response = await axios.get(API_POSTS_SEARCH(text));
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  socket.on('newPostNotification', (data) => {
    setNotifications(data)
  })

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCommentNavigate = (postTitle, event) => {
    const modifiedTitle = postTitle.replace(/\s+/g, '_');
    navigate(`/post/${modifiedTitle}`, {
      state: searchResults.find((post) => post.title === postTitle),
    });
  };

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

  useEffect(() => {
    console.log(notifications)
    if (debouncedSearchText) {
      searchPosts(debouncedSearchText);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchText]);

  socket.on('newPostNotification', (newPost) => {
    console.log(newPost)
  })

  return (
    <nav className={`${isScrolled
      ? 'bg-slate-900 bg-opacity-80 shadow-lg'
      : 'bg-slate-100'
      } transition-all duration-500 ease-in-out fixed sticky top-0 z-50 shadow-lg backdrop-filter backdrop-blur-lg backdrop-saturate-150`}>
      <div className=" px-4 py-1 flex justify-between items-center">
        <a className={`${isScrolled
          ? 'font-bold text-white lg:text-2xl'
          : 'font-bold lg:text-2xl'
          }`} href="#">
          <img class="w-auto mr-6 h-12 lg:ml-2" src={logo} alt="" />
        </a>
        <div className='w-full flex justify-end items-center'>
          {isAuthenticated && (
            <div>
              <button onClick={() => setShowNotifications(!showNotifications)} class="mx-4 relative inline-flex items-center p-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
                <span class="sr-only">Notifications</span>
                <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">20</div>
              </button>
              {showNotifications && (
                <div className="space-y-8 h-96 transform -translate-x-1/3 z-100 w-2/5 lg:w-[18.7%] absolute  w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300">
                  <div class="flex items-center mb-3">
                    <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">New notifications</span>
                    <button onClick={() => setShowNotifications(!showNotifications)} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-notification" aria-label="Close">
                      <span class="sr-only">Close</span>
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                  </div>

                 
                     <div class="flex items-center">
                     <div class="relative inline-block shrink-0">
                       <img class="w-12 h-12 rounded-full" src="https://source.unsplash.com/100x100/?portrait" alt="Jese Leos image" />
                       <span class="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                         <svg aria-hidden="true" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                         <span class="sr-only">Message icon</span>
                       </span>
                     </div>
                     <div class="ml-3 text-sm font-normal">
                       <div class="text-sm font-semibold text-gray-900 dark:text-white">{notifications.user}</div>
                       <div class="text-sm font-normal">{notifications.post.title}</div>
                       <span class="text-xs font-medium text-blue-600 dark:text-blue-500">{timeAgo(new Date(notifications.post.createdAt)) }</span>
                     </div>
                   </div>
                
                 

                  <div class="flex items-center">
                    <div class="relative inline-block shrink-0">
                      <img class="w-12 h-12 rounded-full" src="https://source.unsplash.com/100x100/?portrait" alt="Jese Leos image" />
                      <span class="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                        <svg aria-hidden="true" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Message icon</span>
                      </span>
                    </div>
                    <div class="ml-3 text-sm font-normal">
                      <div class="text-sm font-semibold text-gray-900 dark:text-white">Aloha</div>
                      <div class="text-sm font-normal">created a new post</div>
                      <span class="text-xs font-medium text-blue-600 dark:text-blue-500">a few seconds ago</span>
                    </div>
                  </div>

                  <div class="flex items-center">
                    <div class="relative inline-block shrink-0">
                      <img class="w-12 h-12 rounded-full" src="https://source.unsplash.com/100x100/?portrait" alt="Jese Leos image" />
                      <span class="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                        <svg aria-hidden="true" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Message icon</span>
                      </span>
                    </div>
                    <div class="ml-3 text-sm font-normal">
                      <div class="text-sm font-semibold text-gray-900 dark:text-white">David</div>
                      <div class="text-sm font-normal">upvoted your post</div>
                      <span class="text-xs font-medium text-blue-600 dark:text-blue-500">a few seconds ago</span>
                    </div>
                  </div>




                </div>
              )}
            </div>

          )}
          <div className='lg:w-2/6'>
            <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your Keyword to search" onChange={handleSearchInputChange} required />
            </div>
            {searchResults.length > 0 &&
              <div className="w-2/5 lg:w-[32.7%] absolute mt-2 bg-white border border-gray-300 dark:bg-gray-800 rounded-lg shadow-lg overflow-y-scroll h-72">
                <h1 className='pl-4 pt-4 pb-2'>Posts</h1>
                <ul>
                  {searchResults.map((post) => (
                    <li key={post._id} className="px-4 py-3 cursor-pointer hover:bg-indigo-600 hover:text-white hover:cursor-pointer">
                      <div onClick={() => handleCommentNavigate(post.title)} className="flex items-center space-x-4">
                        <img
                          src={`https://avatars.dicebear.com/api/adventurer/${post.author._id}.svg`}
                          alt="user avatar"
                          className="w-14 h-14 rounded-full"
                        />
                        <div>
                          <div className="flex space-x-3">
                            <h3 className="text-md font-bold">{post.title}</h3>
                          </div>
                          <h5 className="text-sm mb-1">{post.content}</h5>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            }

          </div>
          {isAuthenticated ? (
            <></>
          ) : (
            <div className="hidden lg:block">
              <ul className="inline-flex items-center">
                <li><button onClick={() => handleOpenModal('signin')} className={`${isScrolled
                  ? 'uppercase border-2 border-blue-600 rounded-lg px-6 py-1 text-gray-100 ml-4'
                  : 'uppercase border-2 border-blue-600 rounded-lg px-6 py-1 text-gray-900 ml-4'
                  }`}>Sign In</button></li>
                <li><button onClick={() => handleOpenModal('signup')} className="border-2 border-blue-600 uppercase bg-gradient-to-b from-blue-600 to-blue-700 rounded-lg px-6 py-1 text-white ml-6">Sign Up</button></li>
              </ul>
            </div>
          )}
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

      </div>
    </nav>
  )
}

export default Navbar