import React, { useState } from 'react'


function CommentInput({ onComment }) {
    const [commentBody, setCommentBody] = useState('');
    return (
        <div className='mb-6 ml-20 mr-20'>
            <div className='w-1/2 py-2 px-4 mt-6 mb-4 bg-white rounded-lg rounded-t-lg border-2 border-gray-500 dark:bg-gray-800 dark:border-gray-700'>
                <textarea
                    value={commentBody}
                    rows="8"
                    onChange={event => setCommentBody(event.target.value)}
                    placeholder='What are your thoughts'
                    className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                />
            </div>
            <button className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
                onClick={() => {
                    onComment({ body: commentBody, comments: [] });
                    setCommentBody("");
                }}
            >
                Comment
            </button>
        </div>

    )
}

export default CommentInput