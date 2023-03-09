import React, { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard';
import { useNavigate } from "react-router-dom"
import { useRecoilState } from 'recoil';
import { API_SPACES_GET_ALL } from '../../api/api';
import { spacesState } from '../../recoil/atoms/spaceAtoms';
import axios from "axios";
import LatestSpacePost from './LatestSpacePost';

function SpaceList() {
    const [isLoading, setIsLoading] = useState(true);
    const [spaces, setSpaces] = useRecoilState(spacesState);
    const [counts, setCounts] = useState({});
    const navigate = useNavigate();
    const [votedPosts, setVotedPosts] = useState({});

    function handleUpvote(postId) {
        if (votedPosts[postId] === 'downvote') {
            setCounts(prevCounts => ({
                ...prevCounts,
                [postId]: {
                    upvotes: (prevCounts[postId]?.upvotes || 0) + 1,
                    downvotes: (prevCounts[postId]?.downvotes || 0) - 1
                }
            }));
            setVotedPosts(prevVotedPosts => ({
                ...prevVotedPosts,
                [postId]: 'upvote'
            }));
        } else if (!votedPosts[postId]) {
            setCounts(prevCounts => ({
                ...prevCounts,
                [postId]: {
                    upvotes: (prevCounts[postId]?.upvotes || 0) + 1,
                    downvotes: prevCounts[postId]?.downvotes || 0
                }
            }));
            setVotedPosts(prevVotedPosts => ({
                ...prevVotedPosts,
                [postId]: 'upvote'
            }));
        }
    }

    function handleDownvote(postId) {
        if (votedPosts[postId] === 'upvote') {
            setCounts(prevCounts => ({
                ...prevCounts,
                [postId]: {
                    upvotes: (prevCounts[postId]?.upvotes || 0) - 1,
                    downvotes: (prevCounts[postId]?.downvotes || 0) + 1
                }
            }));
            setVotedPosts(prevVotedPosts => ({
                ...prevVotedPosts,
                [postId]: 'downvote'
            }));
        } else if (!votedPosts[postId]) {
            setCounts(prevCounts => ({
                ...prevCounts,
                [postId]: {
                    upvotes: prevCounts[postId]?.upvotes || 0,
                    downvotes: (prevCounts[postId]?.downvotes || 0) + 1
                }
            }));
            setVotedPosts(prevVotedPosts => ({
                ...prevVotedPosts,
                [postId]: 'downvote'
            }));
        }
    }

    const handleNavigate = (spaceId) => {
        navigate(`/space/${spaceId}`, { state: spaces.find(space => space._id === spaceId) });
    };

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(API_SPACES_GET_ALL)
            .then(response => {
                setSpaces(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <div className="lg:mr-5">
                <CategoryCard />
                {isLoading ? (
                    <div className='lg:ml-7 mr-10 mb-6 mt-6 lg:mt-0 ml-4'>
                        <h3 className="text-sm font-bold text-gray-700">Loading Spaces...</h3>
                    </div>
                ) : (
                    <div>
                        {spaces.map(space => (
                            <div key={space._id} className="transition duration-500 ease-in-out transform hover:-translate-y-1 relative">
                                <div className="hover:outline outline-offset-2 outline-blue-500 p-5 bg-white rounded-lg lg:ml-7 mr-5 mb-6 mt-6 lg:mt-0 ml-6 space-y-2">
                                    <div className='flex justify-between mr-5 lg:mr-0'>
                                        <div className='flex justify-center'>
                                            <a href="#" class="relative block">
                                                <img alt="profile" src="https://avatars.githubusercontent.com/u/46704901?v=4" class="mx-auto object-cover rounded-full h-6 w-6 " />
                                            </a>
                                            <h3 className="text-sm font-bold text-gray-700 ml-2"><span className='text-indigo-700'>agora/</span>{space.name}</h3>
                                        </div>
                                        <button className='inline-flex text-sm bg-indigo-700 text-white items-center px-3 py-1 transition ease-in duration-200 rounded-md hover:bg-gray-700 hover:text-white shadow-lg focus:outline-none mr-4 lg:mr-10'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                            </svg>
                                            Join Space</button>
                                    </div>
                                    <div onClick={() => handleNavigate(space._id)}>
                                        <LatestSpacePost spaceId={space._id} />
                                    </div>
                                    <div className='flex'>
                                        <div className="absolute inset-y-0 w-10 right-5 flex flex-col justify-start items-center bg-blue-500 rounded-r-lg">
                                            <button className="text-gray-100 mt-2" onClick={() => handleUpvote(space._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" />
                                                </svg>
                                            </button>
                                            <p className="text-center text-gray-100">{(counts[space._id]?.upvotes || 0) - (counts[space._id]?.downvotes || 0)}</p>
                                            <button className="text-gray-100" onClick={() => handleDownvote(space._id)}>
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
                )}
            </div>
        </div>
    )
}

export default SpaceList