import React, { useState } from 'react'
import { useLocation } from "react-router-dom";

function PostDetailCard() {
    const { state: post } = useLocation();
    const [counts, setCounts] = useState({});

    function handleUpvote(postId) {
        setCounts(prevCounts => ({
            ...prevCounts,
            [postId]: {
                upvotes: (prevCounts[postId]?.upvotes || 0) + 1,
                downvotes: prevCounts[postId]?.downvotes || 0,
            },
        }));
    }

    function handleDownvote(postId) {
        setCounts(prevCounts => ({
            ...prevCounts,
            [postId]: {
                upvotes: prevCounts[postId]?.upvotes || 0,
                downvotes: (prevCounts[postId]?.downvotes || 0) + 1,
            },
        }));
    }

    return (
        <div className="mt-5 w-full mx-auto">
            <div
                key={post._id}
                className="rounded-lg bg-white space-y-10 p-6"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={`https://avatars.dicebear.com/api/adventurer/${post.author._id}.svg`}
                            alt="user avatar"
                            className="w-14 h-14 rounded-full"
                        />
                        <div>
                            <h3 className="text-sm font-bold text-gray-700">{`@${post.author.userName}`}</h3>
                            <h3 className="text-lg font-bold text-gray-700">{post.title}</h3>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            className="text-gray-500 hover:text-blue-500"
                            onClick={() => handleUpvote(post.id)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25" />
                            </svg>
                        </button>
                        <span className="text-gray-500">{counts[post.id]?.upvotes || 0}</span>
                        <button
                            className="text-gray-500 hover:text-blue-500"
                            onClick={() => handleDownvote(post.id)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16.5 15.75h-9m9-3H12m-9.75-1.51c0-1.6 1.123-2.994 2.707-3.227 1.129-.166 2.27-.293 3.423-.379.35-.026.67-.21.865-.501L12 3l2.755 4.133a1.14 1.14 0 01.865.501c1.154.086 2.294.213 3.423.379 1.584.233 2.707 1.626 2.707 3.228v4.508c0 1.602-1.123 2.995-2.707 3.228-.697.103-1.43.156-2.193.156-2.392 0-4.744-.175-7.043-.513C3.373 18.254 2.25 17.36 1.5 16.5"
                                />
                            </svg>
                        </button>
                        <span className="text-gray-500">{post.upvotes.length - post.downvotes.length}</span>
                    </div>
                </div>
                <div>
                    <p className="text-gray-700">{post.content}</p>
                    {post.multimedia.includes('.mp4', '.mpeg', './quicktime') ? (
                        <video src={post.multimedia} alt="post image" className="w-full mt-5" controls />
                    ) : (
                        <img src={post.multimedia} alt="post image" className="w-full mt-5" />
                    )}
                </div>
            </div>
        </div>
    );
}
export default PostDetailCard;
