import axios from "axios";
import { API_SPACES_CREATE_LABEL, API_SPACES_GET_ALL_LABELS, API_SPACES_GET_ALL_MEMBERS, API_SPACES_UPLOAD_COVER_PHOTO } from "../../lib/api";
import { COLORS } from "../../components/Labels/LabelInput";

/******************* Function to Get All Space Labels *******************************/
export const getAllLabels = async (spaceId, setLabels) => {
    try {
        const response = await axios.get(API_SPACES_GET_ALL_LABELS(spaceId));
        setLabels(response.data)
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createLabel = async (spaceId, newLabel, setName, setColor) => {
    try {
        await axios.post(API_SPACES_CREATE_LABEL(spaceId), newLabel);
        setName("");
        setColor(COLORS[0]);
    } catch (err) {
        console.error(err);
    }
}

/******************* Function to Upload Space Cover Photo *******************************/
export const handleSpaceCoverPhoto = async (file, spaceId, accessToken) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('coverPhoto', file);

    try {
        const response = await axios.post(API_SPACES_UPLOAD_COVER_PHOTO(spaceId), formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(response.data);
        console.log(response)
    } catch (error) {
        console.error(error);
    }
};

/******************* Function to Fetch all the Space Members *******************************/
export const fetchSpaceMembers = async (spaceId, setMembers) => {
    try {
        const response = await axios.get(API_SPACES_GET_ALL_MEMBERS(spaceId));
        setMembers(response.data);
    } catch (error) {
        console.error(error);
    }
};