import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from "react-router-dom";
import { API_SPACES_GET_ALL_LABELS, API_SPACES_UPLOAD_COVER_PHOTO } from '../../api/api';
import LabelForm from '../Labels/LabelForm';
import LabelList from '../Labels/LabelList';
import SpaceSettings from '../Settings.jsx/SpaceSettings';
import SpaceTabs from '../Tabs/SpaceTabs';
import AllSpacePost from './AllSpacePosts';
import RecommendedPosts from './RecommendedPosts';
import SpaceMembers from './SpaceMembers';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtoms';

function SpaceDetailCard({ handleOpenModal }) {
    const { state: space } = useLocation();
    const [currentTab, setCurrentTab] = useState('Posts');
    const [labels, setLabels] = useState([]);
    const fileInputRef = useRef(null);
    const user = useRecoilValue(userAtom)

    const handleImageClick = async () => {
        fileInputRef.current.click();

        const file = fileInputRef.current.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('coverPhoto', file);

        try {
            const response = await axios.post(API_SPACES_UPLOAD_COVER_PHOTO(space._id), formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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
                <div className="relative w-full h-52">
                    <img
                        src={space.coverPhoto}
                        className="w-full h-full object-cover"
                        alt=""
                    />
                    <div onClick={handleImageClick} className="group absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-500 ease-in-out">
                        <svg className="w-12 h-12 text-white fill-current cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 2a9 9 0 1 0 9 9c0-4.97-4.03-9-9-9zm-1 15v-4H8v-2h3V7h2v4h3v2h-3v4h-2z" />
                        </svg>
                        <span className="ml-3 text-white text-sm cursor-pointer">Add Cover Picture</span>
                        <input type="file" className="hidden" ref={fileInputRef} />
                    </div>
                </div>
                <div className="flex justify-between bg-white pt-6 pl-6 pr-6 pb-2">
                    <div>
                        <h2 className=" text-2xl font-semibold text-gray-900">
                            {space.name}
                        </h2>
                        <p className="mt-2 text-gray-600">{space.description}</p>
                        <div className='flex mt-7'>
                            <SpaceTabs
                                tabs={['Posts', 'Members', 'Settings']}
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
            </div>

            <div>
                <LabelList
                    labels={labels}
                    onUpdate={handleUpdateLabel}
                    onDelete={handleDeleteLabel}
                />
                <RecommendedPosts />
            </div>

        </div>
    );
}

export default SpaceDetailCard;
