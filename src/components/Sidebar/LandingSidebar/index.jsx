import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../../recoil/atoms/userAtoms';
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedAtom } from '../../../recoil/atoms/authAtom';

function LandingSidebar({ handleOpenModal, handleOpenTooltip, onRequestClose }) {
    const user = useRecoilValue(userAtom);
    const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/settings');
    };

    const handleNavigateHome = () => {
        navigate('/')
    }

    useEffect(() => {
        console.log("User state changed: ", user);
    }, []);

    let hasNotification = false;

    return (
        <div className='hidden lg:block '>
            <aside className='h-[94vh] sticky flex top-[3.52rem] bottom-[3.1rem]'>
                <div className={`bg-white flex flex-col items-center py-10 w-16`}>
                    <nav className=" flex flex-col items-center flex-1 space-y-8 ">
                        <button onClick={()=> handleNavigateHome()} className="p-1.5 inline-block text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </button>
                        {isAuthenticated && (
                            <>
                                <div className="flex items-center justify-center ">
                                    <button className="text-gray-500" onClick={() => handleOpenTooltip('bookmarkTooltip')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="hover:text-blue-600 w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                        </svg>
                                    </button>
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
                            <div className="relative" onMouseEnter={() => handleOpenTooltip('profileTooltip')} onMouseLeave={() => onRequestClose()}>
                                <div className="object-cover w-10 h-10 rounded-full cursor-pointer">
                                    <img
                                        src={user.userDetails.avatar}
                                        alt="user avatar"
                                    />
                                    <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                </div>

                            </div>
                            <button onClick={() => handleOpenModal('signout')} className='text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg></button>
                        </>
                        ) : (<></>)}
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default LandingSidebar
