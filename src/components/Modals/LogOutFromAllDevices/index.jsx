import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from '../../../recoil/atoms/userAtoms';
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedAtom } from '../../../recoil/atoms/authAtom';
import {socket} from '../../../utils';
import { API_REFRESH_TOKEN_DELETE } from '../../../lib/api';
import axios from 'axios';


function LogoutFromAllDevices({ onRequestClose }) {
    const setisAuthenticated = useSetRecoilState(isAuthenticatedAtom);
    const user = useRecoilValue(userAtom)
    const setUserData = useSetRecoilState(userAtom)
    const navigate = useNavigate();

    const handleLogoutAllSessions = async () => {
        try {
            // Make a request to the server to logout from all sessions
            await axios.post(API_REFRESH_TOKEN_DELETE, null, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            localStorage.removeItem('recoil-persist')
            // Clear the user state to log out the user
            setUserData({ accessToken: null, refreshToken: null, userDetails: null });
            navigate('/');
            window.location.reload();
        } catch (error) {
            // Handle error response
            console.error(error);
        }
    };

    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            onRequestClose();
        }
    };
    return (
        <div class="py-12 px-12 m-auto bg-white shadow-xl rounded-2xl dark:bg-gray-800">
            <div class="min-h-full h-full w-full flex justify-center items-center text-center">
                <div class="flex flex-col justify-between h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="40" height="40" class="w-12 h-12 m-auto mt-4 text-red-500" fill="none">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <p class="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
                        Logout
                    </p>
                    <p class="px-6 py-2 text-xs text-gray-600 dark:text-gray-400">
                        Are you sure you want to Logout From All Devices?
                    </p>
                    <div class="flex items-center justify-between w-full gap-4 mt-8">
                        <button onClick={handleLogoutAllSessions} type="button" class="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Yes
                        </button>
                        <button onClick={onRequestClose} type="button" class="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-red-500 focus:ring-offset-red-200 text-red-500 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LogoutFromAllDevices