import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { userAtom } from '../../../recoil/atoms/userAtoms';
import { API_USERS_GET_ALL_BOOKMARKS } from '../../../lib/api';

function BookmarkTooltip({ onRequestClose }) {
    const user = useRecoilValue(userAtom);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        async function fetchBookmarks() {
            try {
                const response = await axios.post(API_USERS_GET_ALL_BOOKMARKS, null, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                console.log(response.data);
                setBookmarks(response.data) // Post bookmarked successfully
            } catch (error) {
                console.error(error);
            }
        }
        fetchBookmarks();
    }, []);

    // Slice the bookmarks array to show only the first two bookmarks
    const displayedBookmarks = bookmarks.slice(0, 2);
    const handleCommentNavigate = (postTitle, event) => {
        const modifiedTitle = postTitle.replace(/\s+/g, '_');
        navigate(`/post/${modifiedTitle}`, {
            state: bookmarks.find((post) => post.title === postTitle),
        });
    };
    return (
        <>
            <div id="toast-notification" class=" w-48 h-full pt-4 text-gray-900 bg-white rounded-r-lg dark:bg-gray-800 dark:text-gray-300" role="alert">
                <div>

                </div>
                <div class="flex items-center justify-between mb-3">
                    <span class="pl-4 mb-1 text-sm font-semibold text-gray-900 dark:text-white">Bookmarks</span>
                    <button onClick={() => onRequestClose()} class=" mr-4 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="toast-notification" aria-label="Close">
                        <span class="sr-only">Close</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div>
                    {displayedBookmarks.map(bookmark => (
                        <div key={bookmark._id} onClick={() => handleCommentNavigate(bookmark.title)} className="mb-4 pl-4 pb-2 pt-2 pr-2 hover:bg-indigo-600 hover:text-white cursor-pointer">
                            <h2 className="font-bold">{bookmark.title}</h2>
                            <p className="">{bookmark.content}</p>
                        </div>
                    ))}

                    {bookmarks.length > 0 ? (
                        !showAll && bookmarks.length > 2 ? (
                            <button
                                className="pl-4 text-blue-500 mb-4 underline"
                                onClick={() => setShowAll(true)}
                            >
                                See More
                            </button>
                        ) : null
                    ) : (
                        <h2 className='pl-4 mb-4 text-sm font-semibold text-blue-600 dark:text-white'>No Bookmark Available</h2>
                    )}
                    {showAll && (
                        <div>
                            {bookmarks.slice(2).map(bookmark => (
                                <div key={bookmark._id} onClick={() => handleCommentNavigate(bookmark.title)} className=" mb-4 pl-4 pb-2 pt-2 pr-2 hover:bg-indigo-600 hover:text-white cursor-pointer">
                                    <h2 className="font-bold">{bookmark.title}</h2>
                                    <p className="">{bookmark.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BookmarkTooltip