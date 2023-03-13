import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { API_COMMENTS_CREATE } from '../../api/api';
import { newCommentState } from '../../recoil/atoms/commentAtoms';
import { authState } from '../../recoil/atoms/userAtoms';
import axios from 'axios';

function CommentInput({ parentId, onComment }) {
  const { state: post } = useLocation();
  const { user } = useRecoilValue(authState);
  const [commentBody, setCommentBody] = useRecoilState(newCommentState);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(API_COMMENTS_CREATE, {
        author: user.userId,
        content: commentBody,
        post: post._id,
        parentComment: parentId || null,
      });

      console.log(response.data);

      if (onComment && parentCommentId) {
        onComment(response.data.comment);
      }

      setCommentBody('');
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='mb-6'>
      {error && (
        <div className='text-red-500 mb-4 font-medium text-sm'>{error}</div>
      )}
      <div className=' py-2 px-4 mt-6 mb-4 bg-white rounded-lg rounded-t-lg border-2 border-gray-500 dark:bg-gray-800 dark:border-gray-700'>
        <textarea
          value={commentBody}
          rows='8'
          onChange={(event) => setCommentBody(event.target.value)}
          placeholder='What are your thoughts'
          className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
        />
      </div>
      <button
        className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
        onClick={() => {
          handleSubmit();
        }}
      >
        Comment
      </button>
    </div>
  );
}

export default CommentInput;
