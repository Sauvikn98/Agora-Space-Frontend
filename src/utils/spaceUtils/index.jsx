import axios from "axios";
import { API_SPACES_CREATE_LABEL, API_SPACES_GET_ALL_LABELS, API_SPACES_GET_ALL_MEMBERS, API_SPACES_UPLOAD_COVER_PHOTO } from "../../lib/api";
import { COLORS } from "../../components/Labels/LabelInput";
import { socket } from "..";

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

/******************* Function to Create a Label *******************************/
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

/******************* Function to Navigate to Space Details Page *******************************/
export const handleNavigate = (spaceName, navigate, spaces) => {
    const modifiedSpaceName = spaceName.replace(/\s/g, '');
    navigate(`/agora/${modifiedSpaceName}`, { state: spaces.find(space => space.name === spaceName) });
};

/******************* Function to Join a Space *******************************/
export const handleJoinSpace = async (spaceId, setShowToast, setToastProps, joinSpace) => {
    const success = await joinSpace(spaceId);
    if (success) {
        setShowToast(true);
        setToastProps({ success: true, message: 'Successfully joined Space!' });
        setTimeout(() => setShowToast(false), 5000);
        socket.emit('joinSpaceChannel', spaceId)
    } else {
        setShowToast(true);
        setToastProps({ success: false, message: 'Failed to Join Space, Try Again !' });
        setTimeout(() => setShowToast(false), 5000);
    }
};

/******************* Function to Leave a Space *******************************/
export const handleLeaveSpace = async (spaceId, setShowToast, setToastProps, leaveSpace) => {
    const success = leaveSpace(spaceId)
    if (success) {
        setShowToast(true);
        setToastProps({ success: true, message: 'Successfully Left the Space !' });
        setTimeout(() => setShowToast(false), 5000);
    } else {
        console.error(`Failed to leave space: ${response.data.error}`);
        setShowToast(true);
        setToastProps({ success: false, message: 'Failed to Leave Space, Try Again !' });
        setTimeout(() => setShowToast(false), 5000);
    }

};

/******************* Function to Filter spaces based on Category *******************************/
export const handleCategorySelect = (selectedCategory, spaces, setFilteredSpaces, setSelectedCategory, setShowCreateSpaceMessage) => {
    if (selectedCategory === 'All') {
      setFilteredSpaces(spaces);
    } else {
      const newFilteredSpaces = spaces.filter(space =>
        space.category.some(category => category === selectedCategory)
      );
      if (newFilteredSpaces.length === 0) {
        setFilteredSpaces([]);
        setSelectedCategory(selectedCategory);
        setShowCreateSpaceMessage(true);
      } else {
        setFilteredSpaces(newFilteredSpaces);
        setShowCreateSpaceMessage(false);
      }
    }
  };

  
