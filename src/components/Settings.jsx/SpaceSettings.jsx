import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtoms';
import axios from 'axios';
import { API_SPACES_UPDATE } from '../../api/api';


function SpaceSettings({ name, description }) {
    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const user = useRecoilValue(userAtom)
    const setUserData = useSetRecoilState(userAtom);
    const [formData, setFormData] = useState({

    });
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await axios.patch(API_SPACES_UPDATE, formData, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setUserData((prev) => ({
                ...prev,
                userDetails: response.data,
            }));
            setSuccessMessage('Your profile has been updated sucessfully');
            setErrorMessage('');
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response.data);
        }
        setIsLoading(false);
    };
    return (
        <aside className='h-[92.4vh] lg:sticky flex top-[3.52rem] bottom-[2.8rem]'>
            <div className="bg-white p-6 w-full h-screen">
                <div className='lg:w-2/3 lg:my-4 p-6 '>
                    <div className={`mb-10 ${!successMessage && ('hidden')}`}>
                        {successMessage &&
                            <div class="max-w-xs" role="alert">
                                <div class="flex p-4">
                                    <div class="flex-shrink-0">
                                        <svg class="h-4 w-4 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm text-gray-700 dark:text-gray-400">
                                            {successMessage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }
                        {errorMessage &&
                            <div class="max-w-xs" role="alert">
                                <div class="flex p-4">
                                    <div class="flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 text-red-500 mt-0.5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm text-gray-700 dark:text-gray-400">
                                            {errorMessage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="flex items-center justify-between ">
                        <div>
                            <label className="block text-gray-700 font-bold mr-4" htmlFor="username">
                                Space Name
                            </label>
                            {!showUsernameInput ? (
                                <div className='mr-4 mt-2'>
                                    <h1>{name}</h1>
                                </div>
                            ) : (
                                <></>
                            )}

                        </div>
                        {!showUsernameInput && (
                            <button
                                className="text-gray-500 hover:text-blue-500 focus:outline-none focus:text-blue-500"
                                onClick={() => setShowUsernameInput(true)}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                    {showUsernameInput && (
                        <div className="mb-4">
                            <input
                                className="mt-4 border-2 border-gray-900 bg-white rounded-lg text-gray-800 w-full px-4 py-2 placeholder-gray-400 focus:outline-none"
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={formData.userName} onChange={(event) =>
                                    setFormData({ ...formData, userName: event.target.value })
                                }
                            />
                        </div>
                    )}

                    <div className="mt-8 flex items-center justify-between">
                        <div>
                            <label className="block text-gray-700 font-bold mr-4" htmlFor="username">
                                Space Description
                            </label>
                            {!showEmailInput ? (
                                <div className='mr-4 mt-2'>
                                    <h1>{description}</h1>
                                </div>
                            ) : (
                                <></>
                            )}

                        </div>
                        {!showEmailInput && (
                            <button
                                className="text-gray-500 hover:text-blue-500 focus:outline-none focus:text-blue-500"
                                onClick={() => setShowEmailInput(true)}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                    {showEmailInput && (
                        <div className="mb-4">
                            <input
                                className="border-2 border-gray-900 mt-4 outline-none bg-white rounded-lg text-gray-800 w-full px-4 py-2 placeholder-gray-400 focus:outline-none"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email} onChange={(event) =>
                                    setFormData({ ...formData, email: event.target.value })
                                }
                            />
                        </div>
                    )}

                    <div className="mt-8 flex items-center justify-between">
                        <label className="block text-gray-700 font-bold mr-4" htmlFor="password">
                            Change Password
                        </label>
                        {!showPasswordInput && (
                            <button
                                className="text-gray-500 hover:text-blue-500 focus:outline-none focus:text-blue-500"
                                onClick={() => setShowPasswordInput(true)}
                            >
                                Edit
                            </button>
                        )}

                    </div>
                    {showPasswordInput && (
                        <div className="">
                            <input
                                className="border-2 border-gray-900 mt-4 outline-none bg-white rounded-lg text-gray-800 w-full px-4 py-2 placeholder-gray-400 focus:outline-none"
                                id="password"
                                type="password"
                                placeholder="Enter your new password"
                                value={formData.password} onChange={(event) =>
                                    setFormData({ ...formData, password: event.target.value })
                                }
                            />
                        </div>
                    )}

                </div>

                <button
                    onClick={() => handleSubmit()}
                    className="ml-5 bg-gray-800 text-white text-sm flex items-center px-6 py-3 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-700 hover:text-white shadow-lg focus:outline-none"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>

            </div>

        </aside>
    )
}

export default SpaceSettings