import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { getAllPosts } from "../../recoil/atoms/postAtoms";
import { API_POSTS_DOWNVOTE, API_POSTS_GET_ALL, API_POSTS_UPVOTE } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../recoil/atoms/userAtoms";

function AllSpacePost({ spaceId, handleOpenModal }) {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useRecoilState(getAllPosts);
    const [counts, setCounts] = useState(0)
    const navigate = useNavigate();
    const [votes, setVotes] = useState(0);
    const user = useRecoilValue(userAtom)


    useEffect(() => {
        setIsLoading(true);
        axios
            .get(API_POSTS_GET_ALL, { params: { space: spaceId } })
            .then((response) => {
                setPosts(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [spaceId]);

    const postsOfSpace = posts.filter((post) => post.space === spaceId);
    postsOfSpace.sort((a, b) => b.createdAt - a.createdAt);
    function handleUpvote(postId) {
        axios.patch(API_POSTS_UPVOTE(postId), null, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then(response => {
                setVotes(prevVotes => ({
                    ...prevVotes,
                    [postId]: response.data.votes,
                }));
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
                setVotes(prevVotes => ({
                    ...prevVotes,
                    [postId]: response.data.votes,
                }));
            })
            .catch(error => {
                console.error(error);
            });
    }
    const handleCommentNavigate = (postTitle, event) => {
        const modifiedTitle = postTitle.replace(/\s+/g, '_');
        navigate(`/comments/${modifiedTitle}`, {
            state: postsOfSpace.find((post) => post.title === postTitle),
        });
    };


    const timeAgo = (timestamp) => {
        const now = new Date();
        const seconds = Math.floor((now - timestamp) / 1000);
        if (seconds < 60) {
            return 'just now';
        }
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        }
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        }
        const days = Math.floor(hours / 24);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }

    return (
        <div className="h-full">
            {postsOfSpace.map(post => (
                <div key={post._id} className="transition duration-500 ease-in-out transform hover:-translate-y-1 relative">
                    <div className="hover:outline outline-offset-2 pb-4 outline-blue-500 bg-white rounded-lg lg:ml-7 mr-5 mb-6 mt-6 lg:mt-0 ml-6 space-y-2">

                        <div className='pl-5 pt-5'>
                            <div className=" w-full mx-auto">
                                <div
                                    key={post._id}
                                    onClick={() => handleCommentNavigate(post.title)}
                                    className="rounded-lg bg-white "
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={`https://avatars.dicebear.com/api/adventurer/${post.author._id}.svg`}
                                                alt="user avatar"
                                                className="w-14 h-14 rounded-full"
                                            />
                                            <div>
                                                <h5 className="text-[12px] text-gray-600 mb-1">{`posted by @${post.author.userName} - ${timeAgo(new Date(post.createdAt))}`}</h5>
                                                <div className="flex space-x-3">
                                                    <h3 className="text-lg font-bold text-gray-700">{post.title}</h3>
                                                    <div class="pl-3 h-6 pr-3 bg-purple-500 text-white rounded-full flex items-center ">
                                                        <h3 className="text-sm text-white">New Post</h3>
                                                    </div>
                                                    <div class="pl-3 h-6 pr-3 bg-blue-500 text-white rounded-full flex items-center ">
                                                        <h3 className="text-sm text-white">I made this</h3>
                                                    </div>
                                                    <div class="pl-3 h-6 pr-3 bg-yellow-500 text-white rounded-full flex items-center ">
                                                        <h3 className="text-sm text-black">Nice Post</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">{post.content}</p>
                                        <img src={post.multimedia} alt="post image" className="object-cover mt-5" />
                                    </div>
                                    <div className="flex items-center justify-between mt-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center justify-center ">
                                                <button className="text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                                    </svg>
                                                </button>
                                                <p className="text-gray-500 ml-1">{post.comments.length} Comments</p>
                                            </div>
                                            <div className="flex items-center justify-center ">
                                                <button className="text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                    </svg>
                                                </button>
                                                <p className="text-gray-500 ml-1">Save</p>
                                            </div>
                                            <div className="flex items-center justify-center ">
                                                <button className="text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                                    </svg>
                                                </button>
                                                <p className="text-gray-500 ml-1">Share</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex'>
                            <div className="absolute inset-y-0 w-10 right-5 flex flex-col justify-start items-center bg-gray-100 border-l-2 rounded-r-lg">
                                <button className="text-gray-900 mt-2" onClick={() => handleUpvote(post._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" />
                                    </svg>
                                </button>
                                <p className="text-center text-gray-900">{post.upvotes.length - post.downvotes.length}</p>
                                <button className="text-gray-900" onClick={() => handleDownvote(post._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllSpacePost