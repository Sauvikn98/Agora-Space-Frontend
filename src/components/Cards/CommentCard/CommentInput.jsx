import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { API_COMMENTS_CREATE } from '../../../api/api';
import { newCommentState } from '../../../recoil/atoms/commentAtoms';
import { userAtom } from '../../../recoil/atoms/userAtoms';
import axios from 'axios';
import CommentValidation from '../../Modals/ValidationModal/CommentValidationModal';

function CommentInput({ parentId, onComment }) {
  const { state: post } = useLocation();
  const user = useRecoilValue(userAtom);
  const [commentBody, setCommentBody] = useRecoilState(newCommentState);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    if (!user.userDetails) {
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post(API_COMMENTS_CREATE, {
        author: user.userDetails._id,
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
      {showModal && (
        <CommentValidation />

      )}
      <div className=' py-2 lg:w-[700px] px-4 mt-6 mb-4 rounded-lg rounded-t-lg border-2 border-gray-500 '>
        <div class="px-4 py-2 rounded-t-lg dark:bg-gray-800">
          <label for="comment" class="sr-only">Your comment</label>
          <textarea
            id="comment"
            rows="8"
            class="resize-none  outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            value={commentBody}
            onChange={(event) => setCommentBody(event.target.value)}
            required></textarea>
        </div>
        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button onClick={() => {
            handleSubmit();
          }} class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            Post comment
          </button>
          <div class="flex pl-0 space-x-1 sm:pl-2">
            <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Attach file</span>
            </button>
            <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Set location</span>
            </button>
            <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Upload image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentInput;
