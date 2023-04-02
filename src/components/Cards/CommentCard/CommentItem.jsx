import React, { useState } from 'react';
import CommentInput from './CommentInput';
import { userAtom } from '../../../recoil/atoms/userAtoms';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedAtom } from '../../../recoil/atoms/authAtom';
import axios from 'axios';
import { API_COMMENTS_DELETE } from '../../../api';

function CommentItem({ comment, userName, userId }) {
  const childComments = comment.children || [];
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const user = useRecoilValue(userAtom)
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom)

  
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(API_COMMENTS_DELETE(commentId), {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // TODO: handle comment deletion on UI
    } catch (error) {
      console.error(error);
      // TODO: handle error on UI
    }
  };

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const seconds = Math.floor((now - timestamp) / 1000);
    if (seconds < 60) {
      return 'just now';
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    const days = Math.floor(hours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  return (
    <div className="pl-4 pt-6 relative ">
      <div className="flex items-start space-x-4">
        <img
          src={`https://avatars.dicebear.com/api/adventurer/${userId}.svg`}
          alt="user avatar"
          className="w-14 h-14 rounded-full"
        />
        <div>
          <p className="font-medium text-gray-800 text-sm sm:text-base">{userName}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{timeAgo(new Date(comment.createdAt))}</p>
        </div>
      </div>
      {isAuthenticated && user.userDetails._id === comment.author._id && (
        <div className="absolute right-0 top-5">
          <button className="text-gray-500 text-xs sm:text-sm focus:outline-none" onClick={handleMenuClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                onClick={() => {
                  // TODO: handle edit comment
                  setShowMenu(false);
                }}
              >
                Edit
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                onClick={() => {
                  handleDeleteComment(comment._id)
                  setShowMenu(false);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
      <div className='ml-[72px]'>
        <div className="">
          <p className="text-gray-800 text-sm sm:text-base">{comment.content}</p>
        </div>
        <div className="mt-2 flex justify-between items-center">
          {isAuthenticated ? (
            <button className="text-gray-500 text-xs sm:text-sm focus:outline-none" onClick={handleReplyClick}>
              {showReplyInput ? "Cancel" : "Reply"}
              {childComments.length > 0 && (
                <span className="text-gray-500 text-xs sm:text-sm ml-1">({childComments.length} replies)</span>
              )}
            </button>
          ) : (
            <></>
          )}

        </div>
      </div>
      {showReplyInput && (
        <div className="mt-4 ml-[72px] mr-10">
          <CommentInput parentId={comment._id} />
        </div>
      )}
      {childComments.length > 0 && (
        <div className="mt-4 ">
          {childComments.map((childComment) => (
            <div className="ml-4 sm:ml-8 border-l-2" key={childComment._id}>
              <CommentItem
                comment={childComment}
                userName={childComment.author.userName}
                userId={childComment.author._id}
              />
            </div>
          ))}
        </div>
      )}
    </div>

  );
}

export default CommentItem;
