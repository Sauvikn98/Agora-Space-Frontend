import { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { spacesState } from '../../recoil/atoms/spaceAtoms';
import { createNewpost } from '../../recoil/atoms/postAtoms';
import axios from 'axios';
import { API_POSTS_CREATE } from '../../api/api';
import { authState } from '../../recoil/atoms/userAtoms';

function PostModal({ onRequestClose }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [multimedia, setMultiMedia] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const spaces = useRecoilValue(spacesState);
    const [posts, setPosts] = useRecoilState(createNewpost);
    const { user } = useRecoilValue(authState)

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleMediaChange = (event) => {
        setMultiMedia(event.target.files[0]);
    };

    const handleSubmit = async () => {
        const newPost = {
            space: selectedSpace,
            title,
            content,
            author: user.userId
            //multimedia,
        };

        try {
            const response = await axios.post(API_POSTS_CREATE, newPost);
            setPosts([...posts, response.data]);

            // Reset the form
            setTitle('');
            setContent('');
            setMultiMedia(null);
            setSelectedSpace(null);

            onRequestClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="">
                        <div className="">
                            <div className="">
                                <div class="w-64">
                                    <div class="relative mt-5 mb-5 px-4" ref={dropdownRef}>
                                        <button type="button" onClick={handleButtonClick} class="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-md shadow-lg cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <>
                                                {selectedSpace ? (
                                                    <>
                                                        <span class="flex items-center">
                                                            <img src="https://avatars.githubusercontent.com/u/46704901?v=4" alt="person" class="flex-shrink-0 w-6 h-6 rounded-full" />
                                                            <span class="block ml-3 truncate">
                                                                {selectedSpace.name}
                                                            </span>
                                                        </span>
                                                        <span class="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                                                            <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd">
                                                                </path>
                                                            </svg>
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span class="flex items-center">
                                                            <img src="https://avatars.githubusercontent.com/u/46704901?v=4" alt="person" class="flex-shrink-0 w-6 h-6 rounded-full" />
                                                            <span class="block ml-3 truncate">
                                                                Select a space
                                                            </span>
                                                        </span>
                                                        <span class="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                                                            <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd">
                                                                </path>
                                                            </svg>
                                                        </span>
                                                    </>
                                                )}
                                            </>
                                        </button>
                                        {isOpen && (
                                            <div class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                                                <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" class="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {spaces.map(space => (
                                                        <li key={space._id}
                                                            id={`listbox-item-${space._id}`}
                                                            role="option"
                                                            className={`relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-600 hover:text-white pr-9`}
                                                            onClick={() => {
                                                                setSelectedSpace(space);
                                                                setIsOpen(false);
                                                            }}
                                                        >
                                                            <div className="flex items-center">
                                                                <img src="https://avatars.githubusercontent.com/u/46704901?v=4" alt="person" className="flex-shrink-0 w-6 h-6 rounded-full" />
                                                                <span className="block ml-3 font-normal truncate">
                                                                    {space.name}
                                                                </span>
                                                            </div>
                                                            {selectedSpace === space && (
                                                                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                                    <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" aria-hidden="true">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <div className="mb-4">

                                        <input
                                            type="text"
                                            id="title"
                                            className="required appearance-none border rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Title"
                                            value={title}
                                            onChange={handleTitleChange}
                                        />
                                    </div>
                                    <textarea
                                        id="content"
                                        className="resize-none appearance-none border rounded w-full px-4 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Text (Optional)"
                                        rows={16}
                                        value={content}
                                        onChange={handleContentChange}
                                    />
                                    <div className="mb-4">
                                        <div className="flex items-center justify-center bg-gray-100 py-2 px-3 rounded-md">
                                            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                            <span className="ml-2 text-gray-500">{multimedia ? multimedia.name : 'Select a file'}</span>
                                            <input
                                                type="file"
                                                id="multimedia"
                                                className="relative inset-0 opacity-0 z-50"
                                                onChange={handleMediaChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleSubmit}
                        >
                            Post
                        </button>
                        <button
                            onClick={onRequestClose}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostModal; 
