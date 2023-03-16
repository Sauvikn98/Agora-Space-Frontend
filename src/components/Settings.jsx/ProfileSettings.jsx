import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtoms';
import axios from 'axios';
import { API_USERS_UPDATE } from '../../api/api';


function ProfileSettings() {
    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const user = useRecoilValue(userAtom)
    const setUserData = useSetRecoilState(userAtom);
    const [formData, setFormData] = useState({
        email: user.userDetails.email,
        userName: user.userDetails.userName,
        password: '',
    });

    const handleSubmit = async () => {
        try {
            const response = await axios.patch(API_USERS_UPDATE, formData, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setUserData((prev) => ({
                ...prev,
                userDetails: response.data,
            }));
            console.log('Profile updated successfully');
        } catch (error) {
            console.error(error.response.data);
        }
    };


    return (
        <aside className='h-[92.4vh] lg:sticky flex top-[3.52rem] bottom-[2.8rem]'>
            <div className="bg-white p-6 w-full h-screen">
                <h1 className="text-2xl font-medium mb-6">Profile Settings</h1>
                <div className='lg:w-2/6 lg:my-4 p-6 '>
                    <div class="flex justify-between items-center mb-6">
                        <label className="block text-gray-700 font-bold mr-4" htmlFor="username">
                            Change Avatar
                        </label>
                        <a href="#" class="hover:scale-150 hover:z-10 transform ease-in-out transition duration-500">
                            <img class="inline-block h-20 w-20 rounded-full object-cover ring-2 ring-indigo-500" src={`https://avatars.dicebear.com/api/adventurer/${user.userDetails._id}.svg`} alt="Guy" />
                        </a>
                    </div>
                    <div className="flex items-center justify-between ">
                        <div>
                            <label className="block text-gray-700 font-bold mr-4" htmlFor="username">
                                Username
                            </label>
                            {!showUsernameInput ? (
                                <div className='mt-2'>
                                    <h1>{user.userDetails.userName}</h1>
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
                                Email
                            </label>
                            {!showEmailInput ? (
                                <div className='mt-2'>
                                    <h1>{user.userDetails.email}</h1>
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



                <button onClick={() => handleSubmit()} className="ml-5 bg-gray-800 text-white text-sm flex items-center px-6 py-3 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-700 hover:text-white shadow-lg focus:outline-none">
                    Save Changes
                </button>
            </div>

        </aside>
    )
}

export default ProfileSettings