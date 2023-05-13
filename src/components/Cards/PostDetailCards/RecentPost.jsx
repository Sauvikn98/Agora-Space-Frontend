import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPostIdState, postAtom, useAddBookmark, useGetPosts } from "../../../recoil/atoms/postAtoms";
import { API_POSTS_DOWNVOTE, API_POSTS_UPVOTE } from "../../../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticatedAtom } from "../../../recoil/atoms/authAtom";
import { userAtom } from "../../../recoil/atoms/userAtoms";
import Toast from "../../Toast";
import { timeAgo } from "../../../utils";

function RecentPost({ spaceId, handleOpenModal }) {
    useGetPosts(spaceId)
    const posts = useRecoilValue(postAtom);
    const navigate = useNavigate();
    const isAuthenticated = useRecoilValue(isAuthenticatedAtom)
    const user = useRecoilValue(userAtom)
    const [showMenu, setShowMenu] = useState(false);
    const setCurrentPostId = useSetRecoilState(currentPostIdState);
    const addBookmark = useAddBookmark();
    const [shareLink, setShareLink] = useState('');
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);

    const handleShareLink = (postTitle, event) => {
        const modifiedTitle = postTitle.replace(/\s+/g, '_');
        // Generate shareable link and copy to clipboard
        const currentUrl = window.location.href;
        const shareUrl = `${currentUrl.split('#')[0]}comments/${modifiedTitle}`;
        setShareLink(shareUrl);
        navigator.clipboard.writeText(shareUrl);
    };
    
    function handleUpvote(postId) {
        axios.patch(API_POSTS_UPVOTE(postId), null, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((response) => {
                const message = response.data.message;
                if (message === "Post upvoted") {
                    setIsUpvoted(true);
                    setIsDownvoted(false);
                } else if (message === "Post upvote removed") {
                    setIsUpvoted(false);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleDownvote(postId) {
        axios.patch(API_POSTS_DOWNVOTE(postId), null, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then(response => {
                setIsUpvoted(false);
                setIsDownvoted(true);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const spaces = {};

    posts.filter((post) => post.space === spaceId).forEach((post) => {
        if (!spaces[post.space] || post.createdAt > spaces[post.space].createdAt) {
            spaces[post.space] = post;
        }
    });

    const latestPosts = Object.values(spaces);

    const handleCommentNavigate = (postTitle) => {
        const modifiedTitle = postTitle.replace(/\s+/g, '_');
        navigate(`/post/${modifiedTitle}`, {
            state: latestPosts.find((post) => post.title === postTitle),
        });
    };

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    const handlePostClick = (post) => {
        setCurrentPostId(post);
    };


    return (
        <div>
            {latestPosts.length === 0 && (
                <div className='flex items-center  mt-20 mb-20 justify-center'>
                    <h1 className="font-bold animate-bounce">No Posts Available, Create a new Post</h1>
                </div>
            )}
            {latestPosts.map(post => (
                <div className=" w-full mx-auto">
                    <div
                        key={post._id}
                        className="rounded-lg bg-white "
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={`https://avatars.dicebear.com/api/adventurer/${post.author?._id}.svg`}
                                        alt="user avatar"
                                        className="w-14 h-14 rounded-full"
                                    />
                                    <div>
                                        <div className="flex justify-between">
                                            <h5 className="text-[12px] text-gray-600 mb-1">{`posted by @${post.author?.userName} - ${timeAgo(new Date(post.createdAt))}`}</h5>
                                            {isAuthenticated && user.userDetails._id === post.author?._id && (
                                                <div className="absolute  right-20 top-14">
                                                    <button className="text-gray-500 text-xs sm:text-sm focus:outline-none" onClick={handleMenuClick}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                        </svg>
                                                    </button>
                                                    {showMenu && (
                                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10">
                                                            <button
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                                                onClick={() => {
                                                                    handlePostClick(post)
                                                                    handleOpenModal('post')
                                                                    setShowMenu(false);
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                                                onClick={() => {
                                                                    handlePostClick(post)
                                                                    setShowMenu(false);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div onClick={() => handleCommentNavigate(post.title)} className="flex space-x-3">
                                            <h3 className="text-lg font-bold text-gray-700">{post.title}</h3>
                                            {post.label && (
                                                <div class={`pl-3 pr-3 ${post.label.color} text-white rounded-full flex justify-center items-center `}>
                                                    <h3 className="text-sm text-white">{post.label.name}</h3>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between flex-row lg:flex-col mt-2 lg:mt-1" onClick={() => handleCommentNavigate(post.title)}>
                                <p className="relative text-gray-700 mb-4">{post.content}</p>
                                {post.multimedia && (
                                    <>
                                        {post.multimedia && post.multimedia.includes('.mp4', '.mpeg', '.quicktime') ? (
                                            <div className="lg:w-[700px] w-[80px]">
                                                <video src={post.multimedia} alt="post video" className=" object-cover w-[100%] h-[100%]" controls />
                                            </div>
                                        ) : (
                                            <div className="lg:w-[700px] w-[80px]">
                                                <img src={post.multimedia} alt="post image" className="object-cover w-[100%] h-[100%]" />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center space-x-4">
                                <Link>
                                    <div className="flex items-center justify-center ">
                                        <button className="text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                            </svg>
                                        </button>
                                        <p className="text-gray-500 ml-1">{post.comments.length} Comments</p>
                                    </div>
                                </Link>
                                <div className="flex items-center justify-center ">
                                    <button onClick={() => addBookmark(post)} className="text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                        </svg>
                                    </button>
                                    <p className="text-gray-500 ml-1">Save</p>
                                </div>
                                <div className="flex items-center justify-center ">
                                    <button onClick={() => handleShareLink(post.title)} className="text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                        </svg>
                                    </button>
                                    <p className="text-gray-500 ml-1">Share</p>
                                </div>
                            </div>
                        </div>

                        {isAuthenticated ? (
                            <div className='flex'>
                                <div className="mt-[45px] absolute inset-y-0 w-10 right-5 flex flex-col justify-start items-center bg-gray-100 border-l-2 rounded-r-lg">
                                    <button className={`${isUpvoted ? 'text-green-500' : 'text-gray-400'} mt-2`} onClick={() => handleUpvote(post._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clip-rule="evenodd" stroke="currentColor" stroke-width="3" />
                                        </svg>
                                    </button>
                                    <p className="text-center text-gray-900">{post.upvotes.length - post.downvotes.length}</p>
                                    <button className={`${isDownvoted ? 'text-red-500' : 'text-gray-400'}`} onClick={() => handleDownvote(post._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" stroke="currentColor" stroke-width="3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className='flex'>
                                <div className="mt-[45px] absolute inset-y-0 w-10 right-5 flex flex-col justify-start items-center bg-gray-100 border-l-2 rounded-r-lg">
                                    <button className="text-gray-900 mt-2" onClick={() => handleOpenModal("votes validation")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" />
                                        </svg>
                                    </button>
                                    <p className="text-center text-gray-900">{post.upvotes.length - post.downvotes.length}</p>
                                    <button className="text-gray-900" onClick={() => handleOpenModal("votes validation")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecentPost