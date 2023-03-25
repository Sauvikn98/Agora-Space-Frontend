import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import ProfileSettings from '../Settings.jsx/ProfileSettings';
import SpaceSettings from '../Settings.jsx/SpaceSettings';
import SpaceTabs from '../Tabs/SpaceTabs';
import TopTabs from '../Tabs/TopTabs';
import AllSpacePost from './AllSpacePosts';
import RecommendedPosts from './RecommendedPosts';

function SpaceDetailCard({ handleOpenModal }) {
    const { state: space } = useLocation();
    const [currentTab, setCurrentTab] = useState('Posts');
    return (
        <div className="bg-gray-300 w-full min-h-screen grid grid-cols-custom2">
            <div className="rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-40">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGlua2VkaW4lMjBiYW5uZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                        className="w-full h-full object-cover"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-25"></div>
                </div>
                <div className="flex justify-between bg-white pt-6 pl-6 pr-6 pb-2">
                    <div>
                        <h2 className=" text-2xl font-semibold text-gray-900">
                            {space.name}
                        </h2>
                        <p className="mt-2 text-gray-600">{space.description}</p>
                        <div className='flex mt-7'>
                            <SpaceTabs
                                tabs={['Posts', 'Members', 'Settings', 'Notifications']}
                                currentTab={currentTab}
                                onTabClick={setCurrentTab}
                            />
                        </div>
                    </div>
                    <div className='space-y-4 w-1/3'>
                        <input
                            onClick={() => handleOpenModal('post')}
                            className="outline-none bg-gray-300 rounded-lg text-gray-800 w-full h-20 px-4 py-2 placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            placeholder="What's on your mind.."
                        ></input>
                    </div>
                </div>
                {currentTab === 'Posts' && (
                    <div className="pt-10 border-t border-gray-100">
                        <AllSpacePost spaceId={space._id} handleOpenModal={handleOpenModal} />
                    </div>
                )}
                {currentTab === 'Members' && (
                    <div className="pt-10 border-t border-gray-100">

                    </div>
                )}
                {currentTab === 'Settings' && (
                    <div className="pt-7 border-t border-gray-100">
                        <SpaceSettings name={space.name} description={space.description} />
                    </div>
                )}
                {currentTab === 'Notifications' && (
                    <div className="pt-10 border-t border-gray-100">

                    </div>
                )}
            </div>
            <RecommendedPosts />
        </div>
    );
}

export default SpaceDetailCard;
