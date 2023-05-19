import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import RecommendedPosts from '../PostDetailCards/RecommendedPosts';
import Labels from '../../Labels';
import SpaceInfo from './SpaceInfo';
import { getAllLabels } from '../../../utils/spaceUtils';


function SpaceDetails({ handleOpenModal }) {
    const { state: space } = useLocation();
    const [selectedLabel, setSelectedLabel] = useState(null)
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        getAllLabels(space._id, setLabels);
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
