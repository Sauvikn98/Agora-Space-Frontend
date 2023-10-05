import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  MenuAlt1Icon,
  BellIcon,
  MoonIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import logo from "../../assets/logo.png"
import { useRecoilState, useRecoilValue } from 'recoil';
import { isAuthenticatedAtom } from '../../recoil/atoms/authAtom';
import axios from 'axios';
import { API_POSTS_SEARCH } from '../../lib/api';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { socket, timeAgo } from '../../utils';
import { notificationsState } from '../../recoil/atoms/notificationAtom';
import { userAtom } from "../../recoil/atoms/userAtoms";

export default function Navbar({ handleOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const user = useRecoilValue(userAtom);
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
    <nav className="relative z-20 border-b flex shrink-0 items-center space-x-2 bg-layer-2 py-3 px-4 sm:px-6">
      <div className="flex justify-center items-center md:space-x-20 space-x-3">
        <Link to={'/'} className="">
          <img src={logo} className="h-14 w-full" />
        </Link>
        <div>
          <label
            htmlFor="search"
            className="sr-only block text-sm font-semibold text-heading"
          >
            Search
          </label>
          <div className="relative flex">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-shrink-0 items-center pl-4 focus-within:z-20">
              <SearchIcon className="h-5 w-5 text-text" />
            </div>
            <input
              id="search"
              name="search"
              placeholder="Search"
              className="block w-full rounded-xl border-2 border-gray-400 bg-muted-1 px-4 py-2.5 pl-11 pr-14 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
              onChange={handleSearchInputChange}
            />
           
            {searchResults.length > 0 &&
              <div className="w-full top-10 absolute mt-2 bg-white border border-gray-300 dark:bg-gray-800 rounded-lg shadow-lg overflow-y-scroll h-72">
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
        </div>
      </div>

      <div className="flex-1" />
      {isAuthenticated ? (
            <div className="flex items-center space-x-3">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2.5 font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
            >
              <BellIcon className="h-7 w-7" />
            </button>
           
            <Menu as="div" className="relative">
              <Menu.Button type="button">
                <img
                  src={user.userDetails.avatar}
                  alt="avatar"
                  className="inline-block h-10 w-10 rounded-full"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white py-3 shadow-xl focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={()=>navigate('/settings/profile')}
                        className={`${active ? "bg-muted-1 text-heading" : "text-text"
                          } flex w-full cursor-pointer items-center px-4 py-2 text-sm font-semibold`}
                      >
                        Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={()=>navigate('/settings')}
                        className={`${active ? "bg-muted-1 text-heading" : "text-text"
                          } flex w-full cursor-pointer items-center px-4 py-2 text-sm font-semibold`}
                      >
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                      onClick={() => handleOpenModal('signout')}
                        className={`${active ? "bg-muted-1 text-heading" : "text-text"
                          } flex w-full cursor-pointer items-center px-4 py-2 text-sm font-semibold`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
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
      
    </nav>
  );
}
