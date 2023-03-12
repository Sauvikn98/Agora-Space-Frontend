import React, { useState } from 'react';
import CommentInput from './CommentInput';

function CommentItem({ comment, userName, userId }) {
  const childComments = comment.children || [];
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <div className='flex items-center'>
        <img
          src={`https://avatars.dicebear.com/api/adventurer/${userId}.svg`}
          alt="user avatar"
          className="w-14 h-14 rounded-full"
        />
        <div>
          <p className='font-medium text-gray-800'>{userName}</p>
          <p className='text-sm text-gray-500'>{new Date(comment.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <div className='mt-4'>
        <p className='text-gray-800'>{comment.content}</p>
      </div>
      <div className='mt-4 flex justify-between items-center'>
        <button className='text-gray-500 text-sm' onClick={handleReplyClick}>
          {showReplyInput ? 'Cancel' : 'Reply'}
        </button>
        <div>
          {childComments.length > 0 && (
            <span className='text-gray-500 text-sm'>{childComments.length} replies</span>
          )}
        </div>
      </div>
      {showReplyInput && (
        <div className='mt-4'>
          <CommentInput parentId={comment._id} />
        </div>
      )}
      {childComments.length > 0 && (
        <div className='mt-4'>
          {childComments.map((childComment) => (
            <div className='ml-8' key={childComment._id}>
              <CommentItem comment={childComment} userName={childComment.author.userName} userId={userId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
