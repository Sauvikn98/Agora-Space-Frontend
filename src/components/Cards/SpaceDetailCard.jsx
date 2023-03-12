import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { getAllPosts } from '../../recoil/atoms/postAtoms';
import AllSpacePost from './AllSpacePosts';

function SpaceDetailCard({ handleOpenModal }) {
    const { state: space } = useLocation()
    const [counts, setCounts] = useState({});
    const posts = useRecoilValue(getAllPosts)

    return (
        <div className='w-full '>
            <img src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGlua2VkaW4lMjBiYW5uZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' className='w-full h-40'></img>
            <div key={space._id} className=" bg-gray-300">
                <div className="p-6 pb-20 lg:ml-7 mr-7 lg:mt-0  space-y-4">
                    <div className='mb-10'>
                        <h3 className="text-lg font-bold text-black">{space.name}</h3>
                        <p className="text-black">{space.description}</p>
                    </div>
                    <AllSpacePost spaceId={space._id} handleOpenModal={handleOpenModal} />
                </div>
            </div>
        </div>
    )
}

export default SpaceDetailCard