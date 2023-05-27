import React from 'react';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import { useRecoilValue } from 'recoil';
import { commentsState, useGetAllComments } from '../../../recoil/atoms/commentAtoms';
import { isAuthenticatedAtom } from '../../../recoil/atoms/authAtom';

function Comment() {
  const { isLoading } = useGetAllComments();
  const comments = useRecoilValue(commentsState);
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);

  function countComments(comments) {
    let count = comments.length;

    comments.forEach((comment) => {
      if (comment.children && comment.children.length > 0) {
        count += countComments(comment.children);
      }
    });
    return count;
  }

  return (
    <div className="bg-white rounded-b-lg py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Comments ({countComments(comments)})
        </h2>
        {isAuthenticated ? (
          <CommentInput />
        ) : (
          <div className='mt-5 mb-5'>
            <h1>Sign In / Sign Up to create a comment</h1>
          </div>

        )}

        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span
              >
            </div>
          </div>
        ) : (
          <div className="comment-container">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                userName={comment.author.userName}
                userId={comment.author._id}
              />
            ))}
          </div>
        )}

      </div>
    </div >
  );
}

export default Comment;
