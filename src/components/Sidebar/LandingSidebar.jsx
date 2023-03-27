import React, { useEffect, useState } from 'react'
import landingImage from "../../assets/vector-image.png"
import { Reveal } from 'react-awesome-reveal';
import { fadeInDownShorter, fadeInLeft } from '../../utils/keyframes';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtoms';
import TopTabs from '../Tabs/TopTabs';
import ProfileTooltip from '../Tooltip/ProfileTooltip';
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedAtom } from '../../recoil/atoms/authAtom';
import NotificationTooltip from '../Tooltip/NotificationTooltip';
import { categories } from '../Cards/CategoryCard';
import { API_SPACES_CREATE } from '../../api/api';
import Toast from '../Toast/Toast';
import axios from 'axios';

function LandingSidebar({ handleOpenModal }) {
    const user = useRecoilValue(userAtom);
    const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
    const [currentTab, setCurrentTab] = useState('Create a Post');
    const [tooltipStatus, setTooltipStatus] = useState(0);
    const navigate = useNavigate();
    const [newComment, setNewComment] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastProps, setToastProps] = useState({ success: false, message: '' });

    const handleNavigate = () => {
        navigate('/settings');
    };

    const handleTabClick = (tab) => {
        setCurrentTab(tab);
    };

    useEffect(() => {
        console.log("User state changed: ", user);
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(API_SPACES_CREATE, {
                name,
                description,
                creator: user.userDetails._id,
                category,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.data) {
                setShowToast(true);
                setToastProps({ success: false, message: 'Space could not be created, Try Again!' });
                throw new Error("Failed to create space");
            }
            const space = res.data;
            console.log(space); // do something with the created space
            setShowToast(true);
            setToastProps({ success: true, message: 'Space Created Successfully!' });
        } catch (error) {
            console.error(error);
            setShowToast(true);
            setToastProps({ success: false, message: 'Space could not be created, Try Again!' });
            // show error message to user
        }
    };

    return (
        <div className='hidden lg:block'>
            <aside className='h-[92.4vh] sticky flex top-[3.52rem] bottom-[3.1rem]'>
                <div className={`bg-white flex flex-col items-center py-10 ${isAuthenticated ? 'w-24' : 'w-32'}`}>
                    <nav className="flex flex-col items-center flex-1 space-y-8 ">
                        <a href="#" className="p-1.5 inline-block text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </a>
                        <a href="#" className="p-1.5 inline-block text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg dark:text-blue-400 dark:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                        </a>
                        <a href="#" className="p-1.5 inline-block text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                            </svg>
                        </a>

                        {isAuthenticated && (
                            <>
                                <div className="cursor-pointer relative" >
                                    <button class="inline-block relative" onClick={() => { setTooltipStatus(prevStatus => prevStatus === 0 ? 1 : 0); setNewComment(true) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        {newComment ? (
                                            <></>
                                        ) : (<span class="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-red-400 bg-red-600"></span>)}

                                    </button>
                                    {tooltipStatus == 1 && (
                                        <div role="tooltip" className="z-50 -bottom-[140px] w-64 absolute transition duration-150 ease-in-out left-0 ml-8 p-4 rounded">

                                            <NotificationTooltip toolTipClose={() => setTooltipStatus(0)} />
                                        </div>
                                    )}
                                </div>

                                <button onClick={() => handleNavigate()} className="p-1.5 inline-block text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </nav>
                    <div className="flex flex-col items-center space-y-8 mb-20">
                        {isAuthenticated ? (<>
                            <div className="relative" onMouseEnter={() => setTooltipStatus(2)} onMouseLeave={() => setTooltipStatus(0)}>
                                <div className="object-cover w-10 h-10 rounded-full cursor-pointer">
                                    <img
                                        src={`https://avatars.dicebear.com/api/adventurer/${user.userDetails._id}.svg`}
                                        alt="user avatar"
                                    />
                                    <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                </div>
                                {tooltipStatus == 2 && (
                                    <div role="tooltip" className="z-50 -bottom-[140px] w-64 absolute transition duration-150 ease-in-out left-0 ml-8 p-4 rounded">
                                        <svg className="absolute left-2 bottom-0 top-0 h-full" width="9px" height="16px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <g id="Page-2" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="gray">
                                                    <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
                                                        <g id="Group-2" transform="translate(24.000000, 0.000000)">
                                                            <polygon id="Triangle" transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) " points="4.5 57.5 12.5 66.5 -3.5 66.5" />
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <ProfileTooltip />
                                    </div>
                                )}
                            </div>
                            <button onClick={() => handleOpenModal('signout')} className='text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg></button>
                        </>
                        ) : (<></>)}
                    </div>
                </div>
                {isAuthenticated ? (
                    <div className="w-full bg-gradient-to-r bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900 via-indigo-400 to-indigo-900 dark:bg-gray-900 dark:border-gray-700">
                        <div className="">
                            <TopTabs
                                tabs={['Create a Post', 'Create a Space']}
                                currentTab={currentTab}
                                onTabClick={handleTabClick}
                            />
                        </div>
                        {currentTab === 'Create a Post' && (
                            <div className="mt-20 px-5">
                                <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                                    <h2 className="mb-5 text-4xl font-bold text-white text-left">
                                        Create a Post
                                    </h2>
                                </Reveal>
                                <Reveal keyframes={fadeInDownShorter} duration={1000} delay={400}>
                                    <input
                                        onClick={() => handleOpenModal('post')}
                                        className="outline-none bg-white rounded-lg text-gray-800 w-full h-12 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        placeholder="What's on your mind.."
                                    ></input>
                                </Reveal>
                            </div>
                        )}
                        {currentTab === 'Create a Space' && (
                            <div className="mt-20 px-5">
                                <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                                    <h2 className="mb-5 text-4xl font-bold text-white text-left">
                                        Create a Space
                                    </h2>
                                </Reveal>
                                <Reveal keyframes={fadeInDownShorter} duration={1000} delay={400}>
                                    <input
                                        className="outline-none bg-white rounded-lg text-gray-800 w-full px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></input>
                                    <textarea
                                        maxlength="50"
                                        className="resize-none outline-none bg-white rounded-lg text-gray-800 w-full mt-4 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        placeholder="Description"
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                    <select
                                        id="categories"
                                        className="mt-3 outline-none bg-white rounded-lg text-gray-800 w-full px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Choose a category</option>
                                        {categories.map(category => (
                                            <option value={category.name}>{category.name}</option>
                                        ))}
                                    </select>
                                </Reveal>
                                <Reveal keyframes={fadeInDownShorter} duration={1000} delay={400}>
                                    <button onClick={handleSubmit} className="font-bold bg-gray-800 text-white mt-4 flex items-center px-8 py-3 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-700 hover:text-white shadow-lg focus:outline-none">
                                        Create
                                    </button>
                                </Reveal>

                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-gradient-to-r bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900 via-indigo-400 to-indigo-900 dark:bg-gray-900 dark:border-gray-700">
                        <img
                            src={landingImage}
                            className="mt-10 lg:ml-2 ml-1 md:ml-6 md:mr-6 object-contain h-48 w-72"
                            alt="landing"
                        />
                        <div className="lg:ml-6 ml-7 md:ml-10">
                            <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                                <h2 className="text-4xl font-bold text-white text-left">
                                    Discover, Learn & Discuss
                                </h2>
                            </Reveal>
                            <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                                <h3 className="mt-4 text-2xl text-gray-200 text-left">
                                    Empower your mind, ignite your passion through discussion
                                </h3>
                            </Reveal>

                            <Reveal keyframes={fadeInDownShorter} duration={1000} delay={400}>
                                <button onClick={() => handleOpenModal('signup')} className="font-bold bg-white mt-8 text-gray-900 flex items-center px-8 py-3  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white shadow-lg focus:outline-none">Get Started</button>
                            </Reveal>
                        </div>
                    </div>
                )}
                {showToast && (
                    <div className="absolute inset-4 z-100 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
                            <Toast success={toastProps.success} message={toastProps.message} showToast={showToast} setShowToast={setShowToast} />
                        </div>
                    </div>
                )}
            </aside>
        </div>
    )
}

export default LandingSidebar
