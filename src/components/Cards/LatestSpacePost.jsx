import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { getAllPosts } from "../../recoil/atoms/postAtoms";
import { API_POSTS_GET_ALL } from "../../api/api";

function LatestSpacePost({ spaceId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useRecoilState(getAllPosts);

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

    const spaces = {};

    posts.filter((post) => post.space === spaceId).forEach((post) => {
            if (!spaces[post.space] || post.createdAt > spaces[post.space].createdAt) {
                spaces[post.space] = post;
            }
        });

    const latestPosts = Object.values(spaces);

    return (
        <div>
            {isLoading ? (
                <div className="m-8 relative">
                    <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
                        <div className="flex-1">
                            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                        </div>
                        <div>
                            <div className="w-24 h-6 rounded-lg bg-indigo-500"></div>
                        </div>
                    </div>
                    <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
                        <div className="flex-1">
                            <div className="h-4 w-2/5 bg-gray-300 rounded"></div>
                        </div>
                        <div>
                            <div className="w-20 h-6 rounded-lg bg-indigo-500"></div>
                        </div>
                    </div>
                    <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
                        <div className="flex-1">
                            <div className="h-4 w-3/5 bg-gray-300 rounded"></div>
                        </div>
                        <div>
                            <div className="w-28 h-6 rounded-lg bg-indigo-500"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {latestPosts.map(post => (
                        <div key={post._id}>
                            <h3 className="text-lg font-bold text-gray-700">{post.title}</h3>
                            <p className="text-md text-gray-700 pt-1">{post.content}</p>
                            <div className="flex items-center justify-between mt-6">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center ">
                                        <button className="text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                            </svg>
                                        </button>
                                        <p className="text-gray-500"></p>
                                    </div>
                                    <button className="text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                        </svg>

                                    </button>
                                    <button className="text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default LatestSpacePost