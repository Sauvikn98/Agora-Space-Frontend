import React from 'react'
import { useLocation } from "react-router-dom";
import AllSpacePost from './AllSpacePosts';
import RecommendedPosts from './RecommendedPosts';

function SpaceDetailCard({ handleOpenModal }) {
    const { state: space } = useLocation();
    return (
        <div className="bg-gray-300 w-full grid grid-cols-custom2">
            <div className="rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-40">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGlua2VkaW4lMjBiYW5uZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                        className="w-full h-full object-cover"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-25"></div>
                </div>
                <div className="bg-white p-6 lg:p-8">
                    <h2 className=" text-2xl font-semibold text-gray-900">
                        {space.name}
                    </h2>
                    <p className="mt-2 text-gray-600">{space.description}</p>
                </div>
                <div className="pt-10 border-t border-gray-100">
                    <AllSpacePost spaceId={space._id} handleOpenModal={handleOpenModal} />
                </div>
            </div>
            <RecommendedPosts />
        </div>
    );
}

export default SpaceDetailCard;
