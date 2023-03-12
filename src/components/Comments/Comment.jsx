import React, { useState, useEffect } from 'react'
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { getAllComments } from '../../recoil/selector/commentSelector';
import { commentsState } from '../../recoil/atoms/commentAtoms';
import axios from 'axios';
import { API_COMMENTS_GET_BY_POST } from '../../api/api';


function Comment({ postId }) {
  const { state: post } = useLocation()

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  const [comments, setComments] = useRecoilState(commentsState);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(API_COMMENTS_GET_BY_POST(post._id));
        setComments(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchComments();
  }, [post._id]);

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
    <div className=''>
      <div class="mt-10  flex justify-between items-center mb-6 ml-20">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments ({countComments(comments)})</h2>
      </div>
      <CommentInput />
      <div className='bg-white rounded-lg flex flex-col gap-4 mt-10 ml-40 mr-20'>
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} userName={comment.author.userName} userId={comment.author._id} />
        ))}
      </div>

    </div>
  );
}

export default Comment;