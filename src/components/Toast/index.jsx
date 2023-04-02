import React, { useState, useEffect } from 'react'

function Toast({ success, message, showToast, setShowToast }) {
    const [timeoutId, setTimeoutId] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (showToast) {
            const id = setTimeout(() => {
                setShowToast(false);
            }, 5000);
            setTimeoutId(id);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [showToast]);

    useEffect(() => {
        if (showToast && progress < 100) {
            const intervalId = setInterval(() => {
                setProgress((prevProgress) => prevProgress + 10);
            }, 100);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [showToast, progress]);

    useEffect(() => {
        if (progress === 100) {
            const fadeOutId = setTimeout(() => {
                setShowToast(false);
            }, 1000);

            return () => {
                clearTimeout(fadeOutId);
            };
        }
    }, [progress]);
    return (
        <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 max-w-xs bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 ${success ? 'border-green-500' : 'border-red-500'
                } ${showToast ? 'visible' : 'invisible'}`}
            role="alert"
        >
            <div className="flex p-4">
                <div className="flex-shrink-0">
                    {success ? (
                        <svg
                            className='h-4 w-4 mt-0.5 text-green-500'
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-4 w-4 mt-0.5 text-red-500"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>

                    )}

                </div>
                <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-400">{message}</p>
                </div>

            </div>

            <div className="bg-gray-300 h-1 rounded-b">
                <div
                    className={`${success ? 'bg-green-500' : 'bg-red-500'} h-1 rounded-b transition-width duration-500`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

export default Toast