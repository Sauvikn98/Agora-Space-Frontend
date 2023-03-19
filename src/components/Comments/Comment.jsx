import React, { useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { commentsState } from '../../recoil/atoms/commentAtoms';
import axios from 'axios';
import { API_COMMENTS_GET_BY_POST } from '../../api/api';
import socket from '../../utils/socket';
import { isAuthenticatedAtom } from '../../recoil/atoms/authAtom';
import NotificationTooltip from '../Tooltip/NotificationTooltip';
import { notificationsState } from '../../recoil/atoms/notificationAtom';

function Comment() {
  const { state: post } = useLocation();
  const [comments, setComments] = useRecoilState(commentsState);
  const setNotifications = useSetRecoilState(notificationsState);
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(API_COMMENTS_GET_BY_POST(post._id));
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchComments();

    // Listen for new notifications
    socket.on('notification', (notification) => {
      // Update the notifications state with the new notification
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off('notification');
    };
  }, [post._id, setComments]);




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
    <div className="bg-white rounded-lg py-6">
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
      </div>
    </div>
  );
}

export default Comment;
