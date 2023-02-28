import React, { useState } from 'react'
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

const dummyComments = [
  {
    id: '1',
    userName: 'James',
    body: 'This is comment 1',
    comments: []
  },
  {
    id: '2',
    body: 'This is comment 2',
    userName: 'James',
    comments: []
  },
  {
    id: '3',
    body: 'This is comment 3',
    userName: 'James',
    comments: []
  },
  {
    id: '4',
    body: 'This is comment 4',
    userName: 'James',
    comments: []
  },
  {
    id: '5',
    body: 'This is comment 5',
    userName: 'James',
    comments: []
  },
  {
    id: '6',
    body: 'This is comment 6',
    userName: 'James',
    comments: []
  },
  {
    id: '7',
    body: 'This is comment 7',
    userName: 'James',
    comments: []
  },
  {
    id: '8',
    body: 'This is comment 8',
    userName: 'James',
    comments: []
  },
  {
    id: '9',
    body: 'This is comment 9',
    userName: 'James',
    comments: []
  },
  {
    id: '10',
    body: 'This is comment 10',
    comments: []
  },
  {
    id: '11',
    body: 'This is comment 11',
    userName: 'James',
    comments: []
  },
  {
    id: '12',
    body: 'This is comment 12',
    userName: 'James',
    comments: []
  },
  {
    id: '13',
    body: 'This is comment 13',
    userName: 'James',
    comments: []
  },
  {
    id: '14',
    body: 'This is comment 14',
    userName: 'James',
    comments: []
  },
  {
    id: '15',
    body: 'This is comment 15',
    userName: 'James',
    comments: []
  },
  {
    id: '16',
    body: 'This is comment 16',
    comments: []
  },
  {
    id: '17',
    body: 'This is comment 17',
    userName: 'James',
    comments: []
  },
  {
    id: '18',
    body: 'This is comment 18',
    userName: 'James',
    comments: []
  },
  {
    id: '19',
    body: 'This is comment 19',
    userName: 'James',
    comments: []
  },
  {
    id: '20',
    body: 'This is comment 20',
    userName: 'James',
    comments: []
  },
  {
    id: '21',
    body: 'This is comment 21',
    userName: 'James',
    comments: []
  },
  {
    id: '22',
    body: 'This is comment 22',
    userName: 'James',
    comments: []
  },
  {
    id: '23',
    body: 'This is comment 23',
    userName: 'James',
    comments: []
  },
  {
    id: '24',
    body: 'This is comment 24',
    userName: 'James',
    comments: []
  },
  {
    id: '25',
    body: 'This is comment 25',
    userName: 'James',
    comments: []
  }
]

function Comment() {
  const [comments, setComments] = useState(dummyComments);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className='py-8 lg:py-16'>
      <div class="flex justify-between items-center mb-6 ml-20">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments (20)</h2>
      </div>
      <CommentInput onComment={(newComment) => onComment(newComment)} />
      <div className='bg-white rounded-lg flex flex-col gap-4 mt-10 ml-40 mr-20'>
        {currentComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} userName={comment.userName} />
        ))}
      </div>
      <div className=''>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`${currentPage === pageNumber ? 'bg-gray-300' : 'bg-gray-100'
              } px-4 py-1 mx-2 my-6 rounded-md`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Comment;