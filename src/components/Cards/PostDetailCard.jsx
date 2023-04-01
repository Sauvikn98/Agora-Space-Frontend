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
                            <div className="flex space-x-3">
                                <h3 className="text-lg font-bold text-gray-700">{post.title}</h3>
                                {post.label && (
                                    <div class={`hidden lg:block pl-3 pr-3 ${post.label.color} pt-[3px] text-white rounded-full flex justify-center items-center `}>
                                        <h3 className="text-sm text-white">{post.label.name}</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <button
                            className="text-gray-500 hover:text-blue-500"
                            onClick={() => handleUpvote(post.id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>


                        </button>
                        <span className="text-gray-500">{counts[post.id]?.upvotes || 0}</span>
                        <button
                            className="text-gray-500 hover:text-blue-500"
                            onClick={() => handleDownvote(post.id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>

                        </button>
                    </div>
                </div>
                <div>
                    <p className="text-gray-700">{post.content}</p>
                    {post.multimedia && (
                        <>
                            {post.multimedia.includes('.mp4', '.mpeg', './quicktime') ? (
                                <video src={post.multimedia} alt="post image" className="w-full mt-5" controls />
                            ) : (
                                <img src={post.multimedia} alt="post image" className="w-full mt-5" />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
export default PostDetailCard;
