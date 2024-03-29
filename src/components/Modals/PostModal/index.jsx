import { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { spaceAtom } from '../../../recoil/atoms/spaceAtoms';
import { currentPostIdState, useAddPost, useUpdatePost } from '../../../recoil/atoms/postAtoms';
import { userAtom } from '../../../recoil/atoms/userAtoms';

function PostModal({ onRequestClose }) {
    const post = useRecoilValue(currentPostIdState)
    const [title, setTitle] = useState(post?.title || '');
    const [content, setContent] = useState(post?.content || '');
    const [multimedia, setMultiMedia] = useState(post?.multimedia || null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const spaces = useRecoilValue(spaceAtom);
    const user = useRecoilValue(userAtom)
    const { addPost, percentCompleted, isLoading } = useAddPost();
    const { updatePost } = useUpdatePost()
    const [isLabelOpen, setIsLabelOpen] = useState(false);

    const toggleList = () => {
        setIsLabelOpen(!isLabelOpen);
    };


    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        console.log(post)
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleMediaChange = (event) => {
        setMultiMedia(event.target.files[0]);
    };

    const handleRemoveImage = () => {
        setMultiMedia(null);
        document.getElementById("media-input").value = "";
    };

    const handleSubmit = async () => {
        if (post) {
            const updatePostContent = {
                author: user.userDetails._id,
                title,
                content,
                multimedia: multimedia,
            };
            updatePost(post._id, updatePostContent)
            setTitle('');
            setContent('');
            setMultiMedia(null);
        }
        else {
            const newPost = {
                space: selectedSpace,
                title,
                content,
                author: user.userDetails._id,
                label: selectedLabel ? { name: selectedLabel.name, color: selectedLabel.color } : null,
                multimedia: multimedia ? multimedia : null
            };
            addPost(newPost);
            setTitle('');
            setContent('');
            setMultiMedia(null);
            setSelectedSpace(null);
        }
    };

    console.log(selectedSpace)

    const handleModalClose = () => {
        setTitle('');
        setContent('');
        setMultiMedia(null);
        setSelectedSpace(null);
        onRequestClose();
    }

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
        <div className="fixed z-10 inset-0 overflow-y-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                    <div className="">
                        <div className="">
                            <div className="">
                                <div class="w-64">
                                    <div class="relative mt-5 mb-5 px-4" ref={dropdownRef}>
                                        {post ? (
                                            <></>
                                        ) : (
                                            <>
                                                <button type="button" onClick={handleButtonClick} class="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-md shadow-lg cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">

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
                                                </button>
                                                {isOpen && (
                                                    <div class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                                                        <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" class="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {spaces
                                                                .filter(space => space.members.includes(user.userDetails._id) || space.creator.includes(user.userDetails._id))
                                                                .map(space => (
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
                                                                                {post?.space || space.name}
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
                                            </>
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
                                    {multimedia && (
                                        <div className={`absolute ${percentCompleted > 0 ? ('bottom-40') : ('bottom-28')} left-1/2 transform -translate-x-1/2 mt-2 mr-2 `}>
                                            <button
                                                onClick={handleRemoveImage}
                                                className="bg-red-500 flex items-center absolute  right-0 top-2 text-white h-6 hover:bg-red-600 p-1"
                                            >
                                                X
                                            </button>
                                            <img src={post?.multimedia || URL.createObjectURL(multimedia)} alt="Selected media" className="mt-2 object-cover h-[270px]" />
                                        </div>
                                    )}
                                    <div className='flex justify-between'>
                                        <div className="">
                                            <form class="ml-4 mt-2 flex items-center space-x-6">
                                                <label htmlFor="media-input" class="block">
                                                    <span class="sr-only">Choose Multimedia</span>
                                                    <input id="media-input" onChange={handleMediaChange} type="file" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                                                </label>
                                            </form>
                                            {percentCompleted > 0 && (
                                                <div className="relative pl-5 pr-5 pt-3 pb-2">
                                                    <div className=" overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                                                        <div style={{ width: `${percentCompleted}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                                                    </div>
                                                    <h2 className='flex items-end justify-end'>{percentCompleted}%</h2>
                                                </div>
                                            )}
                                        </div>
                                        {post ? (
                                            <></>
                                        ) : (
                                            <div class="relative">
                                                {selectedLabel ? (
                                                    <button type="button" class="focus:outline-none" onClick={toggleList}>
                                                        <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="mr-5 lg:mt-2 lg:mb-2 mt-1 pl-2 rounded-full flex items-center justify-center bg-violet-50">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-5 h-5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                                                            </svg>
                                                            <h3 class="text-sm text-slate-500 mr-4 rounded-full border-0 text-sm font-semibold text-violet-700 file:bg-violet-100">{selectedLabel.name}</h3>
                                                        </ul>
                                                    </button>
                                                ) : (
                                                    <button type="button" class="focus:outline-none" onClick={toggleList}>
                                                        <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="mr-5 lg:mt-2 lg:mb-2 mt-1 pl-2 rounded-full flex items-center justify-center bg-violet-50">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-5 h-5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                                                            </svg>
                                                            <h3 class="text-sm text-slate-500 mr-4 rounded-full border-0 text-sm font-semibold text-violet-700 file:bg-violet-100">Label</h3>
                                                        </ul>
                                                    </button>
                                                )}

                                                {isLabelOpen && (
                                                    <ul class="absolute bg-white rounded-lg shadow p-2 mr-2 bottom-10">
                                                        {selectedSpace.labels.map((label) => (
                                                            <li onClick={() => {
                                                                setSelectedLabel(label);
                                                                setIsLabelOpen(false);
                                                            }} class={`cursor-pointer rounded-full inline-flex items-center py-1 px-3 mr-2 mb-2 text-sm text-white font-medium ${label.color} `}>{label.name}</li>
                                                        ))}
                                                            
                                                       
                                                    </ul>
                                                )}
                                            </div>
                                        )}

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
                            {post ? <>Update</> : <>Post</>}
                        </button>
                        <button
                            onClick={handleModalClose}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PostModal; 
