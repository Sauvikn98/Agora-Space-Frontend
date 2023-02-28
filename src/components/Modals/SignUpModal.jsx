import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { createUser } from '../../state/atoms';
import { API_USERS_REGISTER } from '../../api/api';

function SignUpModal({ onRequestClose }) {
    const [user, setUser] = useState({ userName: '', email: '', password: '' });
    const [createUserRequest, setCreateUserRequest] = useRecoilState(createUser);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateUser = () => {
        setIsLoading(true);
        setCreateUserRequest(user);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            onRequestClose();
        }
    };

    const handleEscapeKey = (event) => {
        if (event.keyCode === 27) {
            onRequestClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleEscapeKey, false);
        return () => {
            document.removeEventListener("keydown", handleEscapeKey, false);
        };
    }, []);

    useEffect(() => {
        if (createUserRequest) {
            fetch(API_USERS_REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createUserRequest),
            })
                .then((response) => response.json())
                .catch((error) => console.log(error))
                .finally(() => { setIsLoading(false) });
        }
    }, [createUserRequest]);

    return (
        <div className="min-h-full h-full w-full flex justify-center items-center" onClick={handleOutsideClick}>
            <div className="bg-white py-5 px-14 rounded-2xl shadow-xl" >
                <div className="mb-20">
                    <div className='flex justify-end mb-10'>
                        <button onClick={onRequestClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className='mb-10'>
                        <h1 className="text-3xl font-bold  mb-4 cursor-pointer text-gray-900">Sign Up</h1>
                        <p className="w-80 text-sm mb-8 font-semibold text-gray-900 tracking-wide cursor-pointer">By continuing, you agree are setting up a Agora Space and agree to our <span className='text-blue-500'>User Agreement</span> and <span className='text-blue-500'>Privacy Policy.</span></p>
                    </div>
                    <div className="space-y-4">
                        <input type="text" name="userName" value={user.userName} onChange={handleInputChange} placeholder="Username" className="block text-sm py-3 px-3 rounded-lg w-full border outline-none" />
                        <input type="email" name="email" value={user.email} onChange={handleInputChange} placeholder="Email" className="block text-sm py-3 px-3 rounded-lg w-full border outline-none" />
                        <input type="password" name="password" value={user.password} onChange={handleInputChange} placeholder="Password" className="block text-sm py-3 px-3 rounded-lg w-full border outline-none" />
                    </div>
                    <div className="text-center mt-6">
                        <button
                            onClick={handleCreateUser}
                            className="py-3 w-64 text-xl text-white bg-indigo-500 rounded-2xl"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Loading...
                                </>
                            ) : 'Create Account'}
                        </button>
                        <p className="mt-4 text-sm text-gray-900">
                            Already Have An Account?{' '}
                            <span className="underline cursor-pointer">Sign In</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpModal