import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { isAuthenticatedAtom, signIn } from '../../../recoil/atoms/authAtom';
import { userAtom } from '../../../recoil/atoms/userAtoms';
import Toast from '../../Toast';
import { socket } from '../../../utils';

function SignInModal({ onRequestClose, handleOpenModal }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({})
    const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);
    const setUser = useSetRecoilState(userAtom)
    const [showToast, setShowToast] = useState(false);
    const [toastProps, setToastProps] = useState({ success: false, message: '' });

    const handleSignIn = async (event) => {
        event.preventDefault();
        const newErrors = {};
        if (!userName) {
            newErrors.userName = "Username is required";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            event.preventDefault();
            setIsLoading(true);
            const success = await signIn(userName, password);
            if (success) {
                setUser({ accessToken: success.accessToken, refreshToken: success.refreshToken, userDetails: success.user });
                setIsAuthenticated(true);
                setShowToast(true);
                setToastProps({ success: true, message: 'Sign In Successfull !' });
                setTimeout(() => setShowToast(false), 5000);
                setIsLoading(false);
                setTimeout(() => onRequestClose(), 2000);
                socket.auth = { token: success.accessToken }
                socket.connect();
                socket.emit('checkMembership', { spaceId: 'your-space-id', userId: success.user._id });

            }
            else {
                setUser({ accessToken: null, refreshToken: null, userDetails: null });
                setIsAuthenticated(false);
                setShowToast(true);
                setToastProps({ success: false, message: 'Sign In Failed, Try Again !' });
                setIsLoading(false);
                setTimeout(() => setShowToast(false), 5000);
            }

            console.log(showToast)
        }
    };

    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            onRequestClose();
        }
    };

    return (
        <div className="min-h-full h-full w-full flex justify-center items-center" onClick={handleOutsideClick}>
            <div className="bg-white py-8 px-12 rounded-2xl shadow-xl" >
                <div className="mb-20">
                    <div className='flex justify-end mb-10'>
                        <button onClick={onRequestClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className='mb-10'>
                        <h1 className="text-3xl font-bold mb-4 cursor-pointer text-gray-900">Sign In</h1>
                        <p className="w-80 text-sm mb-8 font-semibold text-gray-900 tracking-wide cursor-pointer">By continuing, you agree are setting up a Agora Space and agree to our <span className='text-blue-500'>User Agreement</span> and <span className='text-blue-500'>Privacy Policy.</span></p>
                    </div>
                    <div className={` ${errors.userName ? 'space-y-8' : 'space-y-6'} ${errors.password ? 'space-y-8' : 'space-y-6'}`} >
                        <div className="relative">
                            <input
                                type="text" value={userName} onChange={(event) => setUserName(event.target.value)}
                                placeholder="Username"
                                className={classNames(
                                    "block text-sm py-3 px-3 rounded-lg w-full border placeholder-gray-500 border-gray-300 outline-none",
                                    {
                                        "border-red-500": errors.userName,
                                    }
                                )}
                            />
                            {errors.userName && (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="absolute text-red-500 right-2 bottom-10" viewBox="0 0 1792 1792">
                                        <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z">
                                        </path>
                                    </svg>
                                    <span className=" text-sm text-red-500">
                                        {errors.userName}
                                    </span>
                                </>

                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="password" value={password} onChange={(event) => setPassword(event.target.value)}
                                placeholder="Password"
                                className={classNames(
                                    "block text-sm py-3 px-3 rounded-lg w-full border placeholder-gray-500 border-gray-300 outline-none",
                                    {
                                        "border-red-500": errors.password,
                                    }
                                )}
                            />
                            {errors.password && (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="absolute text-red-500 right-2 bottom-10" viewBox="0 0 1792 1792">
                                        <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z">
                                        </path>
                                    </svg>
                                    <span className="text-sm text-red-500">
                                        {errors.password}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <button
                            onClick={handleSignIn}
                            className="py-3 w-64 text-xl text-white bg-indigo-500 rounded-2xl"

                        >
                            {isLoading ? (
                                <>
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Loading...
                                </>
                            ) : 'Sign In'}
                        </button>
                        <p className="mt-4 text-sm text-gray-900">
                            Don't Have An Account?{' '}
                            <button onClick={() => handleOpenModal('signup')} className="underline cursor-pointer">Sign Up</button>
                        </p>
                    </div>

                </div>
                {showToast && (
                    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
                            <Toast success={toastProps.success} message={toastProps.message} showToast={showToast} setShowToast={setShowToast} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignInModal