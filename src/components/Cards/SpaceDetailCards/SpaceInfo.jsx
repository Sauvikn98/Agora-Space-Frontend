import React, {useRef, useState} from 'react'
import { API_SPACES_UPLOAD_COVER_PHOTO } from '../../../lib/api';
import SpaceSettings from '../../Settings/SpaceSettings';
import SpaceTabs from '../../Tabs/SpaceTabs';
import SpaceMembers from './SpaceMembers';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../../recoil/atoms/userAtoms';
import PostList from '../../Lists/PostList';
import { handleSpaceCoverPhoto } from '../../../utils/spaceUtils';

function SpaceInfo({space, handleOpenModal, selectedLabel}) {
    const [currentTab, setCurrentTab] = useState('Posts');
    const fileInputRef = useRef(null);
    const user = useRecoilValue(userAtom)

    const handleImageClick = () => {
        fileInputRef.current.click();
    };    

    const handleFileInputChange = () => {
        const file = fileInputRef.current.files[0];
        handleSpaceCoverPhoto(file, space._id, user.accessToken);
    };

    return (
        <div className="overflow-hidden">
            <div className="relative w-full h-52">
                {space.coverPhoto ? (
                    <img
                        src={space.coverPhoto}
                        className="w-full h-full object-cover"
                        alt=""
                    />
                ) : (
                    <div className="flex-col flex justify-center items-center w-full h-full bg-gradient-to-r bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900 to-indigo-600 dark:bg-gray-900 dark:border-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-20 h-20">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <span className="ml-3 text-white text-md cursor-pointer">Add a Cover Picture</span>
                    </div>
                )}
                <div onClick={handleImageClick} className="group absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-500 ease-in-out">
                    <svg className="w-12 h-12 text-gray-800 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 2a9 9 0 1 0 9 9c0-4.97-4.03-9-9-9zm-1 15v-4H8v-2h3V7h2v4h3v2h-3v4h-2z" />
                    </svg>
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileInputChange} />
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
                    <PostList spaceId={space._id} handleOpenModal={handleOpenModal} selectedLabel={selectedLabel}/>
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
    )
}

export default SpaceInfo