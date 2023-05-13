import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Settings from "../../components/Settings";
import LandingSidebar from "../../components/Sidebar/LandingSidebar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../../recoil/atoms/userAtoms";
import axios from "axios";
import { API_REFRESH_TOKEN_DELETE, API_USERS_UPDATE } from "../../lib/api";
import Toast from "../../components/Toast";
import ChangeAvatarModal from "../../components/Modals/ChangeAvatarModal";
import { useNavigate } from "react-router-dom";
import LogoutFromAllDevices from "../../components/Modals/LogOutFromAllDevices";
import DeleteAccountModal from "../../components/Modals/DeleteAccountModal";

function SettingsPage() {
    const [activeTab, setActiveTab] = useState('account');
    const user = useRecoilValue(userAtom)
    const setUserData = useSetRecoilState(userAtom);
    const [showToast, setShowToast] = useState(false);
    const [toastProps, setToastProps] = useState({ success: false, message: '' });
    const [showModal, setShowModal] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        bio: user.userDetails.bio,
        avatar: user.userDetails.avatar,
        banner: selectedFile,
        firstName: user.userDetails.firstName,
        lastName: user.userDetails.lastName,
        email: user.userDetails.email,
        country: user.userDetails.country
    });
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (modal) => {
        setActiveModal(modal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
        setIsModalOpen(false);
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAvatarSelection = (avatar) => {
        setSelectedAvatar(avatar);
        setShowModal(false);
        setFormData((prevFormData) => ({
            ...prevFormData,
            avatar: avatar,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(API_USERS_UPDATE, formData, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setUserData((prev) => ({
                ...prev,
                bio: response.data,
            }));
            setShowToast(true);
            setToastProps({ success: true, message: 'Profile Updated Successfully!' });

        } catch (error) {
            console.log(error);
            setShowToast(true);
            setToastProps({ success: false, message: 'Profile could not be updated, Try Again!' });
        }
    };

   
    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            handleSubmit()
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return (
        <>
            <Navbar />
            {isModalOpen && (
                <div className="backdrop-blur-lg fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
                    {activeModal === 'logoutFromAllDevices' && <LogoutFromAllDevices onRequestClose={handleCloseModal} />}
                    {activeModal === 'deleteAccount' && <DeleteAccountModal onRequestClose={handleCloseModal} />}
                </div>
            )}
            <div className="fixed">
                <LandingSidebar />
            </div>
            <div className="flex flex-col min-h-screen">

                <nav className=" bg-blue-500">
                    <div className=" mx-auto px-4 sm:px-6 lg:px-44">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex">
                                <button
                                    className={`text-white px-3 py-2 font-medium ${activeTab === 'account' ? 'bg-blue-700' : ''
                                        }`}
                                    onClick={() => handleTabChange('account')}
                                >
                                    Account
                                </button>
                                <button
                                    className={`text-white px-3 py-2 font-medium ${activeTab === 'privacy' ? 'bg-blue-700' : ''
                                        }`}
                                    onClick={() => handleTabChange('privacy')}
                                >
                                    Privacy
                                </button>
                                <button
                                    className={`text-white px-3 py-2 font-medium ${activeTab === 'languages' ? 'bg-blue-700' : ''
                                        }`}
                                    onClick={() => handleTabChange('languages')}
                                >
                                    Languages
                                </button>
                                <button
                                    className={`text-white px-3 py-2 font-medium ${activeTab === 'preferences' ? 'bg-blue-700' : ''
                                        }`}
                                    onClick={() => handleTabChange('preferences')}
                                >
                                    Preferences
                                </button>
                                <button
                                    className={`text-white px-3 py-2 font-medium ${activeTab === 'notifications' ? 'bg-blue-700' : ''
                                        }`}
                                    onClick={() => handleTabChange('notifications')}
                                >
                                    Notification
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="flex-grow" >
                    <div className="mx-auto px-4 sm:px-6 lg:px-44 py-4">
                        {activeTab === 'account' && (
                            <div>

                                <div class="space-y-12">
                                    <div class="border-b border-gray-900/10 pb-12">
                                        <h2 class="text-base font-semibold leading-7 text-gray-900">Account</h2>
                                        <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div class="sm:col-span-4">
                                                <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                                <div class="mt-2">
                                                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                        <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">agora-space.com/</span>
                                                        <input type="text" name="username" id="username" autocomplete="username" class="outline-none  block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6" placeholder={user.userDetails.userName} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-span-full">
                                                <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Bio</label>
                                                <div class="mt-2">
                                                    <textarea id="about" name="about" rows="6" class="resize-none outline-none  block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formData.bio} onChange={(event) =>
                                                        setFormData({ ...formData, bio: event.target.value })
                                                    }></textarea>
                                                </div>
                                                <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Avatar
                                                </label>
                                                <div className="flex items-center gap-x-3">
                                                    {selectedAvatar ? (
                                                        <div>
                                                            <img className="w-16 h-16 rounded-full mt-2" src={selectedAvatar} alt="Selected Avatar" />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <img className="w-16 h-16 rounded-full mt-2" src={user.userDetails.avatar} alt="Selected Avatar" />
                                                        </div>
                                                    )}
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring hover:bg-gray-50"
                                                        onClick={() => setShowModal(true)}
                                                    >
                                                        Change
                                                    </button>
                                                </div>
                                            </div>

                                            <ChangeAvatarModal
                                                showModal={showModal}
                                                closeModal={() => setShowModal(false)}
                                                handleAvatarSelection={handleAvatarSelection}
                                            />

                                            {/* Display selected avatar */}


                                            <div class="col-span-3">
                                                <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Banner photo</label>
                                                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                    <div class="text-center">
                                                        <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                            <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                                        </svg>
                                                        <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                                            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                                <span>Upload a file</span>
                                                                <input id="file-upload" name="file-upload" type="file" class="sr-only" onChange={handleFileSelect} />
                                                            </label>
                                                            <p class="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="border-b border-gray-900/10 pb-12">
                                        <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                        <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div class="sm:col-span-3">
                                                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                                <div class="mt-2">
                                                    <input type="text" value={formData.firstName} onChange={(event) => setFormData({ ...formData, firstName: event.target.value })} name="first-name" id="first-name" autocomplete="given-name" class="outline-none p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-3">
                                                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                                <div class="mt-2">
                                                    <input type="text" value={formData.lastName} onChange={(event) => setFormData({ ...formData, lastName: event.target.value })} name="last-name" id="last-name" autocomplete="family-name" class="outline-none p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-4">
                                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                                <div class="mt-2">
                                                    <input disabled={true} placeholder={formData.email} id="email" name="email" type="email" autocomplete="email" class="p-4 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-3">
                                                <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
                                                <div class="mt-2">
                                                    <select id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                        <option>United States</option>
                                                        <option>Canada</option>
                                                        <option>Mexico</option>
                                                    </select>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                </div>

                                <div class="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                    <button onClick={() => handleSubmit()} class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                </div>

                            </div>
                        )}

                        {activeTab === 'privacy' && (
                            <div>
                                <div class="space-y-12">
                                    <div class="border-b border-gray-900/10 pb-12">
                                        <h2 class="text-base font-semibold leading-7 text-gray-900">Privacy Settings</h2>
                                        <p class="mt-1 text-sm leading-6 text-gray-600">Manage your account privacy preferences.</p>

                                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div class="sm:col-span-4">
                                                <label for="visibility" class="block text-sm font-medium leading-6 text-gray-900">Profile Visibility</label>
                                                <div class="mt-2">
                                                    <div class="flex items-center">
                                                        <input id="visibility" name="visibility" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                                                        <label for="visibility" class="ml-2 text-sm leading-5 text-gray-900">Allow others to view your profile</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="sm:col-span-4">
                                                <label for="notifications" class="block text-sm font-medium leading-6 text-gray-900">Email Notifications</label>
                                                <div class="mt-2">
                                                    <div class="flex items-center">
                                                        <input id="notifications" name="notifications" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                                                        <label for="notifications" class="ml-2 text-sm leading-5 text-gray-900">Receive email notifications for new posts and comments</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="sm:col-span-4">
                                                <label for="data-sharing" class="block text-sm font-medium leading-6 text-gray-900">Data Sharing</label>
                                                <div class="mt-2">
                                                    <div class="flex items-center">
                                                        <input id="data-sharing" name="data-sharing" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                                                        <label for="data-sharing" class="ml-2 text-sm leading-5 text-gray-900">Allow anonymous data sharing for analytics purposes</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="sm:col-span-4">
                                                <label for="block-users" class="block text-sm font-medium leading-6 text-gray-900">Block Users</label>
                                                <div class="mt-2">
                                                    <div class="flex items-center">
                                                        <input id="block-users" name="block-users" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                                                        <label for="block-users" class="ml-2 text-sm leading-5 text-gray-900">Block specific users from interacting with you</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div class="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                    <button class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                </div>
                                <div class=" space-y-6">
                                    <div>
                                        <h3 class="text-sm font-medium leading-6 text-gray-900">Log Out from All Devices</h3>
                                        <p class="mt-1 text-sm leading-5 text-gray-600">Terminate all active sessions and log out from all devices.</p>
                                    </div>

                                    <div class="flex items-center justify-start">
                                        <button onClick={()=> handleOpenModal('logoutFromAllDevices')} class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log Out from All Devices</button>
                                    </div>
                                </div>

                                <div class="mt-10 space-y-6">
                                    <div>
                                        <h3 class="text-sm font-medium leading-6 text-gray-900">Delete Account</h3>
                                        <p class="mt-1 text-sm leading-5 text-gray-600">Permanently delete your account and all associated data.</p>
                                    </div>

                                    <div class="flex items-center justify-start">
                                        <button onClick={()=>handleOpenModal('deleteAccount')} class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Delete Account</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'languages' && (
                            <div>
                                <div class="space-y-12">
                                    <div class="border-b border-gray-900/10 pb-12">
                                        <h2 class="text-base font-semibold leading-7 text-gray-900">Language Settings</h2>
                                        <p class="mt-1 text-sm leading-6 text-gray-600">Manage your preferred language for the app.</p>

                                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div class="sm:col-span-4">
                                                <label for="language" class=" block text-sm font-medium leading-6 text-gray-900">Preferred Language</label>
                                                <div class="mt-2">
                                                    <select id="language" name="language" class="p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm">
                                                        <option>English</option>
                                                        <option>Hindi</option>
                                                        <option>Assamese</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="sm:col-span-4">
                                                <label for="timezone" class="block text-sm font-medium leading-6 text-gray-900">Timezone</label>
                                                <div class="mt-2">
                                                    <select id="timezone" name="timezone" class="p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm">
                                                        <option>(GMT-12:00) International Date Line West</option>
                                                        <option>(GMT-11:00) Midway Island, Samoa</option>
                                                        <option>(GMT-10:00) Hawaii</option>
                                                        <option>(GMT-09:00) Alaska</option>
                                                        <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                                                        <option>(GMT-07:00) Mountain Time (US & Canada)</option>
                                                        <option>(GMT-06:00) Central Time (US & Canada)</option>
                                                        <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="sm:col-span-4">
                                                <label for="date-format" class="block text-sm font-medium leading-6 text-gray-900">Date Format</label>
                                                <div class="mt-2">
                                                    <select id="date-format" name="date-format" class="p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm">
                                                        <option>MM/DD/YYYY</option>
                                                        <option>DD/MM/YYYY</option>
                                                        <option>YYYY/MM/DD</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="sm:col-span-4">
                                                <label for="time-format" class="block text-sm font-medium leading-6 text-gray-900">Time Format</label>
                                                <div class="mt-2">
                                                    <select id="time-format" name="time-format" class="p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm">
                                                        <option>12-Hour</option>
                                                        <option>24-Hour</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                    <button class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                </div>
                            </div>
                        )}


                        {activeTab === 'preferences' && (
                            <div>
                                <div class="space-y-12">
                                    <div class="border-b border-gray-900/10 pb-12">
                                        <h2 class="text-base font-semibold leading-7 text-gray-900">Preferences</h2>
                                        <p class="mt-1 text-sm leading-6 text-gray-600">Select your preferred categories for the community.</p>

                                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div class="sm:col-span-6">
                                                <label class="block text-sm font-medium leading-6 text-gray-900">Category Preferences</label>
                                                <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4">
                                                    <label class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span>Gaming</span>
                                                    </label>
                                                    <label class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span>Sports</span>
                                                    </label>
                                                    <label class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span>Business</span>
                                                    </label>
                                                    <label class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span>Technology</span>
                                                    </label>
                                                    <label class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span>Art</span>
                                                    </label>
                                                    <label class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span>Anime</span>
                                                    </label>
                                                    <label class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span>Crypto</span>
                                                    </label>
                                                    <label class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span>Fashion</span>
                                                    </label>
                                                    <label class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span>Food and Drink</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                    <button class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div>
                                <div class="space-y-12">
                                    <div class="border-b border-gray-900/10 pb-12">
                                        <h2 class="text-base font-semibold leading-7 text-gray-900">Notification Settings</h2>
                                        <p class="mt-1 text-sm leading-6 text-gray-600">Manage your notification preferences.</p>

                                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div class="sm:col-span-6">
                                                <label class="block text-sm font-medium leading-6 text-gray-900">Email Notifications</label>
                                                <div class="mt-2 space-y-2">
                                                    <div class="flex items-center">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span class="ml-2 text-sm font-medium text-gray-900">New messages</span>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span class="ml-2 text-sm font-medium text-gray-900">New followers</span>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span class="ml-2 text-sm font-medium text-gray-900">Space updates</span>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span class="ml-2 text-sm font-medium text-gray-900">Community announcements</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="sm:col-span-6">
                                                <label class="block text-sm font-medium leading-6 text-gray-900">Push Notifications</label>
                                                <div class="mt-2 space-y-2">
                                                    <div class="flex items-center">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span class="ml-2 text-sm font-medium text-gray-900">New messages</span>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span class="ml-2 text-sm font-medium text-gray-900">New followers</span>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span class="ml-2 text-sm font-medium text-gray-900">Space updates</span>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input type="checkbox" class="form-checkbox text-indigo-600 focus:ring-indigo-600" />
                                                        <span class="ml-2 text-sm font-medium text-gray-900">Community announcements</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                    <button class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            {showToast && (
                <div className="w-full fixed bottom-4 right-4 z-100 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
                    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
                        <Toast success={toastProps.success} message={toastProps.message} showToast={showToast} setShowToast={setShowToast} />
                    </div>
                </div>
            )}
        </>
    );
}

export default SettingsPage     
