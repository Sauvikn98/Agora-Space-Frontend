import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { API_SPACES_GET_ALL_LABELS } from '../../api/api';
import LabelForm from '../Labels/LabelForm';
import LabelList from '../Labels/LabelList';
import SpaceSettings from '../Settings.jsx/SpaceSettings';
import SpaceTabs from '../Tabs/SpaceTabs';
import AllSpacePost from './AllSpacePosts';
import RecommendedPosts from './RecommendedPosts';
import SpaceMembers from './SpaceMembers';
import axios from 'axios';

function SpaceDetailCard({ handleOpenModal }) {
    const { state: space } = useLocation();
    const [currentTab, setCurrentTab] = useState('Posts');
    const [labels, setLabels] = useState([]);

    const handleAddLabel = (newLabel) => {
        setLabels((prevLabels) => [...prevLabels, newLabel]);
    };

    const handleUpdateLabel = (updatedLabel) => {
        setLabels((prevLabels) =>
            prevLabels.map((label) =>
                label.id === updatedLabel.id ? updatedLabel : label
            )
        );
    };

    const handleDeleteLabel = (labelToDelete) => {
        setLabels((prevLabels) =>
            prevLabels.filter((label) => label !== labelToDelete)
        );
    };

    useEffect(() => {
        const getAllLabels = async (spaceId) => {
            try {
                const response = await axios.get(API_SPACES_GET_ALL_LABELS(spaceId));
                setLabels(response.data)
            } catch (error) {
                console.error(error);
                return null;
            }
        };
        getAllLabels(space._id);
    }, []);


    return (
        <div className="bg-gray-300 w-full min-h-screen grid lg:grid-cols-custom2">
            <div className="overflow-hidden">
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
                                tabs={['Posts', 'Members', 'Settings', 'Labels']}
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
                    <div className="border-t border-gray-100">
                        <SpaceMembers spaceId={space._id} />
                    </div>
                )}
                {currentTab === 'Settings' && (
                    <div className="border-t border-gray-100">
                        <SpaceSettings name={space.name} description={space.description} />
                    </div>
                )}
                {currentTab === 'Labels' && (
                    <div className="bg-white h-full pt-10 border-t border-gray-100">
                        <LabelForm onSubmit={handleAddLabel} spaceId={space._id} />
                        <LabelList
                            labels={labels}
                            onUpdate={handleUpdateLabel}
                            onDelete={handleDeleteLabel}
                        />
                    </div>
                )}
            </div>
            <RecommendedPosts />
        </div>
    );
}

export default SpaceDetailCard;
