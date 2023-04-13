import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from "react-router-dom";
import { API_SPACES_GET_ALL_LABELS } from '../../../lib/api';
import RecommendedPosts from '../PostDetailCards/RecommendedPosts';
import axios from 'axios';
import Labels from '../../Labels';
import SpaceInfo from './SpaceInfo';


function SpaceDetails({ handleOpenModal }) {
    const { state: space } = useLocation();
    const [selectedLabel, setSelectedLabel] = useState(null)
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
    }, []);

    const handleLabelClick = (label) => {
        setSelectedLabel(label);
    };


    return (
        <div className="bg-gray-300 w-full min-h-screen grid lg:grid-cols-custom2">
            <SpaceInfo space={space} handleOpenModal={handleOpenModal} selectedLabel={selectedLabel} />
            <div>
                <Labels
                    labels={labels}
                    spaceCreator = {space.creator}
                    spaceId={space._id}
                    onLabelClick={handleLabelClick}
                />
                <RecommendedPosts />
            </div>
        </div>
    );
}

export default SpaceDetails;
