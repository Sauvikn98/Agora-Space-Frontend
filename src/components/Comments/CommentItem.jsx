import React, { useState } from 'react'
import CommentInput from './CommentInput';

function CommentItem({ comment, userName }) {
    const [isReplying, setIsReplying] = useState(false);
    const [comments, setComments] = useState(comment.comments)


    const onComment = (newComment) => {
        setComments(prev => [newComment, ...prev]);
    }

    return (
        <div className='h-full pl-6 pr-6 pt-4 pb-2 text-base rounded-lg dark:bg-gray-900'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center'>
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough" />Michael Gough</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><time datetime="2022-02-08"
                        title="February 8th, 2022">Feb. 8, 2022</time></p>
                </div>

                <span>{comment.body}</span>
            </div>

            {isReplying ? (<button
                className='pt-2 flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 mb-4'
                onClick={() => setIsReplying(false)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                Cancel
            </button>
            ) : (
                <button
                    className='pt-2 flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 mb-4'
                    onClick={() => setIsReplying(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    Reply
                </button>
            )}
            <div className='border-l-2 border-gray-200'>
                {isReplying && <CommentInput onComment={onComment} />}
                {comments.map((comment) => (
                    <CommentItem comment={comment} userName={userName} />
                ))}
            </div>

        </div>
    )
}

export default CommentItem