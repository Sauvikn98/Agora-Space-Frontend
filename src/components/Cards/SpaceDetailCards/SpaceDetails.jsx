import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from "react-router-dom";
import { API_SPACES_GET_ALL_LABELS } from '../../../api';
import RecommendedPosts from '../PostDetailCards/RecommendedPosts';
import axios from 'axios';
import Labels from '../../Labels';
import SpaceInfo from './SpaceInfo';

function SpaceDetails({ handleOpenModal }) {
    const { state: space } = useLocation();

    const [labels, setLabels] = useState([]);

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
    }, [labels]);


    return (
        <div className="bg-gray-300 w-full min-h-screen grid lg:grid-cols-custom2">
            <SpaceInfo space={space} handleOpenModal={handleOpenModal} />
            <div>
                <Labels
                    labels={labels}
                    spaceId={space._id}
                />
                <RecommendedPosts />
            </div>
        </div>
    );
}

export default SpaceDetails;
