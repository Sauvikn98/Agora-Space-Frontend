import axios from "axios";
import { API_COMMENTS_DELETE } from "../../lib/api";

/******************* Function to Create a New Comment *******************************/
export const handleNewComment = async (
    user,
    commentBody,
    setCommentBody,
    post,
    parentId,
    onComment,
    createComment,
    setShowModal,
    setError
  ) => {
    if (!user.userDetails) {
      setShowModal(true);
      return;
    }
  
    try {
      const response = await createComment({
        author: user.userDetails._id,
        content: commentBody,
        post: post._id,
        parentComment: parentId || null,
      });
  
      console.log(response);
  
      if (onComment && parentId) {
        onComment(response.comment);
      }
  
      setCommentBody('');
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message || 'Something went wrong');
    }
  };
  
/******************* Function to Delete a Comment *******************************/
  export const handleDeleteComment = async (commentId, user) => {
    try {
      await axios.delete(API_COMMENTS_DELETE(commentId), {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      // TODO: handle comment deletion on UI
    } catch (error) {
      console.error(error);
      // TODO: handle error on UI
    }
  }; 
  
  
  