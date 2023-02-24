import React, { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard';

function PostCard() {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [counts, setCounts] = useState({});

    function handleUpvote(postId) {
        setCounts(prevCounts => ({
            ...prevCounts,
            [postId]: {
                upvotes: (prevCounts[postId]?.upvotes || 0) + 1,
                downvotes: prevCounts[postId]?.downvotes || 0
            }
        }));
    }

    function handleDownvote(postId) {
        setCounts(prevCounts => ({
            ...prevCounts,
            [postId]: {
                upvotes: prevCounts[postId]?.upvotes || 0,
                downvotes: (prevCounts[postId]?.downvotes || 0) + 1
            }
        }));
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="">
            <div className="relative w-700">
                <CategoryCard />
                {isLoading ? (
                    <div className="m-8 relative space-y-6">
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
                    <div>
                        {posts.map(post => (
                            <div key={post.id} className="relative">
                                <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg p-5 bg-white rounded-lg lg:ml-7 mr-10 mb-6 mt-6 lg:mt-0 ml-4 space-y-3">
                                    <h3 className="text-sm font-bold text-gray-700">@user{post.id}</h3>
                                    <h3 className="text-lg font-bold text-gray-700">{post.title}</h3>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center ">
                                                <button className="text-gray-500">
                                                    <span role="img" aria-label="comment">&#128172; 20 Comments</span>
                                                </button>
                                                <p className="text-gray-500"></p>
                                            </div>
                                            <button className="text-gray-500">
                                                <span role="img" aria-label="save">&#128190; Save</span>
                                            </button>
                                            <button className="text-gray-500">
                                                <span role="img" aria-label="share">&#128279; Share</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-r-lg absolute top-0 right-0 flex flex-col bg-gradient-to-b from-indigo-800 via-indigo-500 to-indigo-600 h-full w-10 md:mr-0 lg:mr-0 mr-5">
                                    <button className="text-gray-100 mt-2" onClick={() => handleUpvote(post.id)}>
                                        <span role="img" aria-label="upvote">&#9650;</span>
                                    </button>
                                    <p className="text-center text-gray-100">{(counts[post.id]?.upvotes || 0) - (counts[post.id]?.downvotes || 0)}</p>
                                    <button className="text-gray-100" onClick={() => handleDownvote(post.id)}>
                                        <span role="img" aria-label="downvote">&#9660;</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>)}
            </div>
        </div>
    )
}

export default PostCard