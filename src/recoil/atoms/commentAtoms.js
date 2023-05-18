import { atom, useSetRecoilState } from "recoil";
import { API_COMMENTS_CREATE, API_COMMENTS_GET_BY_POST } from "../../lib/api";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const newCommentState = atom({
  key: 'newCommentState',
  default: '',
});

export const commentsState = atom({
  key: 'createComment',
  default: []
});

export function useGetAllComments() {
  const [isLoading, setIsLoading] = useState(false);
  const setComments = useSetRecoilState(commentsState);
  const { state: post } = useLocation();
 
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(API_COMMENTS_GET_BY_POST(post._id))
      .then((response) => {
        setComments(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { isLoading };
}

export function useCreateComment() {
  const setComments = useSetRecoilState(commentsState);

  async function createComment(newComment) {
    try {
      const response = await axios.post(API_COMMENTS_CREATE, newComment);
      setComments((comments) => [...comments, response.data]);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error(error);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
  }

  return createComment;
}

