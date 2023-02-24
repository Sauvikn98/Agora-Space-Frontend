import React, { useEffect } from 'react'

function SignInModal({ onRequestClose }) {
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
                    <div className="space-y-4">
                        <input type="text" placeholder="Username" className="block text-sm py-3 px-3 rounded-lg w-full border outline-none" />
                        <input type="password" placeholder="Password" className="block text-sm py-3 px-3 rounded-lg w-full border outline-none" />
                    </div>
                    <div className="text-center mt-6">
                        <button className="py-3 w-64 text-xl text-white bg-indigo-500 rounded-2xl">Sign In</button>
                        <p className="mt-4 text-sm text-gray-900">Don't Have An Account? <span className="underline cursor-pointer"> Sign Up</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInModal