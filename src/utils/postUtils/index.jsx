import axios from 'axios';
import { API_POSTS_DOWNVOTE, API_POSTS_UPVOTE } from '../../lib/api';

/******************* Function to Handle Upvote *******************************/
export const handleUpvote = async (postId, user, setIsUpvoted, setIsDownvoted) => {
  try {
    const response = await axios.patch(API_POSTS_UPVOTE(postId), null, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    const message = response.data.message;
    if (message === 'Post upvoted') {
      setIsUpvoted(true);
      setIsDownvoted(false);
    } else if (message === 'Post upvote removed') {
      setIsUpvoted(false);
    }
  } catch (error) {
    console.error(error);
  }
};

/******************* Function to Handle Downvote *******************************/
export const handleDownvote = async (postId, user, setIsUpvoted, setIsDownvoted) => {
  try {
    await axios.patch(API_POSTS_DOWNVOTE(postId), null, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    setIsUpvoted(false);
    setIsDownvoted(true);
  } catch (error) {
    console.error(error);
  }
};

/******************* Function to Navigate to Post Page *******************************/
export const handlePostNavigate = (postTitle, latestPosts, navigate) => {
    const modifiedTitle = postTitle.replace(/\s+/g, '_');
    navigate(`/post/${modifiedTitle}`, {
        state: latestPosts.find((post) => post.title === postTitle),
    });
};

/******************* Function to Have a Share Link to the Clipboard *******************************/
export const handleShareLink = (postTitle, setShareLink) => {
    const modifiedTitle = postTitle.replace(/\s+/g, '_');
    const currentUrl = window.location.href;
    const shareUrl = `${currentUrl.split('#')[0]}comments/${modifiedTitle}`;
    setShareLink(shareUrl);
    navigator.clipboard.writeText(shareUrl);
};