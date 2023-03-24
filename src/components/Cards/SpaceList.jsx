import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from 'recoil';
import { API_SPACES_GET_ALL, API_SPACES_JOIN_SPACE, API_SPACES_LEAVE_SPACE } from '../../api/api';
import { spacesState } from '../../recoil/atoms/spaceAtoms';
import axios from "axios";
import LatestSpacePost from './LatestSpacePost';
import { userAtom } from '../../recoil/atoms/userAtoms';
import { isAuthenticatedAtom } from '../../recoil/atoms/authAtom';
import Toast from '../Toast/Toast';
import CategoryCard from './CategoryCard';
import spaceSocket from '../../utils/socket';

function SpaceList({ handleOpenModal }) {
    const [isLoading, setIsLoading] = useState(true);
    const [spaces, setSpaces] = useRecoilState(spacesState);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const user = useRecoilValue(userAtom)
    const isAuthenticated = useRecoilValue(isAuthenticatedAtom)
    const [isHovering, setIsHovering] = useState([])
    const [showToast, setShowToast] = useState(false);
    const [toastProps, setToastProps] = useState({ success: false, message: '' });


    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigate = (spaceName) => {
        const modifiedSpaceName = spaceName.replace(/\s/g, '');
        navigate(`/agora/${modifiedSpaceName}`, { state: spaces.find(space => space.name === spaceName) });
    };

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(API_SPACES_GET_ALL)
            .then(response => {
                setSpaces(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const handleJoinSpace = async (spaceId) => {
        try {
            const response = await axios.put(
                API_SPACES_JOIN_SPACE(spaceId),
                { spaceId },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (response.status === 200) {
                setSpaces((prev) => {
                    return prev.map((space) => {
                        if (space._id === spaceId) {
                            return {
                                ...space,
                                members: [...space.members, user.userDetails._id],
                            };
                        } else {
                            return space;
                        }
                    });
                });
                setShowToast(true);
                setToastProps({ success: true, message: 'Successfully joined Space!' });
                setTimeout(() => setShowToast(false), 5000);
                const notification = {
                    userId: user.userDetails._id,
                    notificationType: 'new-member of space',
                    seen: false,
                    intent: {
                        action: "/space",
                        parameters: {
                            memberName: user.userDetails.userName,
                            receivers: members(spaceId)
                        }
                    }
                };
                spaceSocket.emit('joinSpace', { spaceId, notification });
            } else {
                console.error(`Failed to join space: ${response.data.error}`);
                setShowToast(true);
                setToastProps({ success: false, message: 'Failed to Join Space, Try Again !' });
                setTimeout(() => setShowToast(false), 5000);
            }
        } catch (error) {
            console.error(error);
            setShowToast(true);
            setToastProps({ success: false, message: 'Failed to Join Space, Try Again !' });
            setTimeout(() => setShowToast(false), 5000);
        }
    };


    const handleLeaveSpace = async (spaceId) => {
        try {
            const response = await axios.delete(API_SPACES_LEAVE_SPACE(spaceId), {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.status === 200) {
                setSpaces((prev) => {
                    return prev.map((space) => {
                        if (space._id === spaceId) {
                            return {
                                ...space,
                                members: space.members.filter((memberId) => memberId !== user.userDetails._id),
                            };
                        } else {
                            return space;
                        }
                    });
                });
                console.log(response.data.message);
                setShowToast(true);
                setToastProps({ success: true, message: 'Successfully Left the Space !' });
                setTimeout(() => setShowToast(false), 5000);
            } else {
                console.error(`Failed to leave space: ${response.data.error}`);
                setShowToast(true);
                setToastProps({ success: false, message: 'Failed to Leave Space, Try Again !' });
                setTimeout(() => setShowToast(false), 5000);
            }
        } catch (error) {
            console.error(error);
            setShowToast(true);
            setToastProps({ success: false, message: 'Failed to Leave Space, Try Again !' });
            setTimeout(() => setShowToast(false), 5000);
        }
    };


    const isMember = (spaceId) => {
        const space = spaces.find((space) => space._id === spaceId);
        return space.members.includes(user.userDetails._id);
    }

    const members = (spaceId) => {
        const space = spaces.find((space) => space._id === spaceId);
        return space.members
    }




    return (
        <div>
            <div className="lg:mr-2">
                <div className='mt-6'>
                    <div className=" flex  ml-8 lg:ml-7">
                        <button
                            className="rounded-lg font-bold bg-white text-gray-900 flex items-center px-4 py-1  transition ease-in duration-200  hover:bg-gray-800 hover:text-white shadow-lg focus:outline-none"
                            onClick={handleClick}
                        >
                            <div className='flex justify-center items-center'>
                                <h1 className='mr-1'>Hot</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </button>

                        <button
                            className="ml-5 rounded-lg font-bold bg-white text-gray-900 flex items-center px-4 py-1  transition ease-in duration-200  hover:bg-gray-800 hover:text-white shadow-lg focus:outline-none"
                            onClick={handleClick}
                        >
                            <div className='flex'>

                                <h1 className='mr-1'>Trending</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 00-5.45 5.174.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.694 12.694 0 015.68-4.973l1.086-.484-4.251-1.631a.75.75 0 01-.432-.97z" clip-rule="evenodd" />
                                </svg>


                            </div>
                        </button>

                        <button
                            className="ml-5 rounded-lg font-bold bg-white text-gray-900 flex items-center px-4 py-1  transition ease-in duration-200  hover:bg-gray-800 hover:text-white shadow-lg focus:outline-none"
                            onClick={handleClick}
                        >
                            <div className='flex'>

                                <h1 className='mr-1'>Best</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clip-rule="evenodd" />
                                    <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                                </svg>
                            </div>
                        </button>
                        <button
                            className="ml-auto mr-5 rounded-lg font-bold bg-white text-gray-900 flex items-center px-4 py-1  transition ease-in duration-200  hover:bg-gray-800 hover:text-white shadow-lg focus:outline-none"
                            onClick={handleClick}
                        >
                            <div className='flex justify-center items-center'>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                                </svg>


                            </div>
                        </button>

                    </div>
                    {isOpen && <CategoryCard />}
                    <div>

                    </div>
                </div>
                {isLoading ? (
                    <div class="fixed inset-0 flex items-center justify-center">
                        <div
                            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span
                                class="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span
                            >
                        </div>
                    </div>
                ) : (
                    <div>
                        {spaces.map(space => (
                            <div key={space._id} className="transition duration-500 ease-in-out transform hover:-translate-y-1 relative">
                                <div className="shadow-xl hover:outline outline-offset-2 pb-4 outline-blue-500 bg-white rounded-lg lg:ml-7 mr-5 mb-6 mt-6 lg:mt-6 ml-6 space-y-2">
                                    <div className='bg-gray-100 border-b-2 p-2 border-gray-200 flex justify-between items-center mr-5 lg:mr-0'>
                                        <div className='flex justify-center'>
                                            <a href="#" class="relative block">
                                                <img alt="profile" src="https://avatars.githubusercontent.com/u/46704901?v=4" class="mx-auto object-cover rounded-full h-6 w-6 " />
                                            </a>
                                            <h3 onClick={() => handleNavigate(space.name)} className="hover:underline text-sm font-bold text-gray-700 ml-2"><span className='text-indigo-700'>agora/</span>{space.name}</h3>
                                        </div>
                                        {isAuthenticated && isMember(space._id) ? (
                                            <button
                                                onMouseEnter={() => setIsHovering({ ...isHovering, [space._id]: true })}
                                                onMouseLeave={() => setIsHovering({ ...isHovering, [space._id]: false })}
                                                onClick={() => handleLeaveSpace(space._id)}
                                                className='inline-flex text-sm bg-gray-700 text-white items-center px-3 py-1 rounded-md hover:bg-red-700 hover:text-white shadow-lg focus:outline-none mr-4 lg:mr-10'
                                            >
                                                {isHovering[space._id] ? "Leave" : "Joined"}
                                            </button>
                                        ) : (
                                            <button onClick={() => handleJoinSpace(space._id)} className='inline-flex text-sm bg-indigo-700 text-white items-center px-3 py-1 transition ease-in duration-200 rounded-md hover:bg-gray-700 hover:text-white shadow-lg focus:outline-none mr-4 lg:mr-10'>
                                                Join Space
                                            </button>
                                        )}
                                    </div>
                                    <div className='pl-5 pr-16 lg:pr-0'>
                                        <LatestSpacePost spaceId={space._id} spaceName={space.name} handleOpenModal={handleOpenModal} handleNavigate={handleNavigate} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {showToast && (
                            <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
                                <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
                                    <Toast success={toastProps.success} message={toastProps.message} showToast={showToast} setShowToast={setShowToast} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SpaceList