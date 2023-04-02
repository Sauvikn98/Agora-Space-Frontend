import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState, selectorFamily } from "recoil";
import axios from "axios";
import { API_POSTS_CREATE, API_POSTS_GET_ALL, API_POSTS_UPDATE } from "../../api";
import { userAtom } from "./userAtoms";
import { useNavigate } from "react-router-dom";

export const postAtom = atom({
  key: "posts",
  default: [],
});

export const currentPostIdState = atom({
  key: 'currentPostIdState',
  default: null,
});

export const bookmarksState = atom({
  key: 'bookmarksState',
  default: [],
});

export const userBookmarksSelector = selectorFamily({
  key: 'userBookmarksSelector',
  get: (userId) => ({ get }) => {
    return get(bookmarksState(userId));
  },
  set: (userId) => ({ get, set }, newValue) => {
    set(bookmarksState(userId), newValue);
  },
});

export const useAddBookmark = () => {
  const setBookmarks = useSetRecoilState(bookmarksState);
  return (post) => {
    setBookmarks((bookmarks) => {
      // Check if the post is already in the bookmarks list
      const isAlreadyBookmarked = bookmarks.some((bookmark) => bookmark._id === post._id);
      if (isAlreadyBookmarked) {
        // Post is already bookmarked, do nothing
        return bookmarks;
      } else {
        // Post is not bookmarked yet, add it to the bookmarks list
        return [...bookmarks, post];
      }
    });
    console.log(post);
  };
};


export const useRemoveBookmark = () => {
  const setBookmarks = useSetRecoilState(bookmarksState);
  return (post) => {
    setBookmarks((bookmarks) => bookmarks.filter((b) => b.id !== post.id));
  };
};

export function useGetPosts(spaceId) {
  const [isLoading, setIsLoading] = useState(false);
  const setPosts = useSetRecoilState(postAtom);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(API_POSTS_GET_ALL, { params: { space: spaceId } })
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [spaceId]);

  return { isLoading };
}

export function useAddPost() {
  const setPosts = useSetRecoilState(postAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const navigate = useNavigate()

  async function addPost(newPost) {
    try {
      setIsLoading(true)
      const response = await axios.post(API_POSTS_CREATE, newPost, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPercentCompleted(percentCompleted);
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPosts((oldPosts) => [...oldPosts, response.data]);
      setIsLoading(false)
      const postTitle = response.data.title
      const modifiedTitle = postTitle.replace(/\s+/g, '_');
      navigate(`/post/${modifiedTitle}`, {
        state: response.data,
    });
    } catch (error) {
      setIsLoading(true)
      console.error(error);
    }
  }

  return {isLoading, addPost, percentCompleted };
}


export function useUpdatePost() {
  const setPosts = useSetRecoilState(postAtom);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const user = useRecoilValue(userAtom)

  async function updatePost(postId, postToUpdate) {
    try {
      const response = await axios.put(API_POSTS_UPDATE(postId), postToUpdate, {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      });
      setPosts((oldPosts) =>
        oldPosts.map((post) =>
          post._id === postId ? response.data : post
        )
      );
    } catch (error) {
      console.error(error);
      console.log("Something is wrong", error)
    }
  }

  return { updatePost, percentCompleted };
}


export function useDeletePost() {
  const setPosts = useSetRecoilState(postAtom);

  function deletePost(postToDelete) {
    setPosts((oldPosts) =>
      oldPosts.filter((post) => post.id !== postToDelete.id)
    );
  }

  return deletePost;
}