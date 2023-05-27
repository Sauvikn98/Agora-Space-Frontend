import { useEffect, useState } from "react";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import {
  API_SPACES_CREATE,
  API_SPACES_GET_ALL,
  API_SPACES_JOIN_SPACE,
  API_SPACES_LEAVE_SPACE,
  API_SPACES_BY_ID,
} from "../../lib/api";
import { userAtom } from "./userAtoms";

export const spaceAtom = atom({
  key: "spaces",
  default: [],
});

export const singSpaceAtom = atom({
  key: "spaces",
  default: [],
});


export function useCreateSpace() {
  const setSpaces = useSetRecoilState(spaceAtom);

  async function createSpace(newSpace) {
    try {
      const response = await axios.post(API_SPACES_CREATE, newSpace);
      setSpaces([...spaces, response.data]);
    } catch (error) {
      console.error(error);
    }
  }

  return createSpace;
}

export function useGetAllSpaces() {
  const [isLoading, setIsLoading] = useState(false);
  const setSpaces = useSetRecoilState(spaceAtom);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(API_SPACES_GET_ALL)
      .then((response) => {
        setSpaces(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { isLoading };
}

export function useJoinSpace() {
  const setSpaces = useSetRecoilState(spaceAtom);
  const user = useRecoilValue(userAtom)

  async function joinSpace(spaceId) {
    try {
      const response = await axios.put(
        API_SPACES_JOIN_SPACE(spaceId),
        { spaceId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setSpaces((prev) => {
          return prev.map((space) => {
            if (space._id === spaceId) {
              return {
                ...space,
                members: [...space.members, user.userDetails._id],
              };
            } else {
              return space;
            }
          });
        });
        return true;
      } else {
        console.error(`Failed to join space: ${response.data.error}`);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return joinSpace;
}

export function useLeaveSpace() {
  const setSpaces = useSetRecoilState(spaceAtom);
  const user = useRecoilValue(userAtom)

  async function leaveSpace(spaceId) {
    try {
      const response = await axios.delete(API_SPACES_LEAVE_SPACE(spaceId), {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        setSpaces((prev) => {
          return prev.map((space) => {
            if (space._id === spaceId) {
              return {
                ...space,
                members: space.members.filter((memberId) => memberId !== user.userDetails._id),
              };
            } else {
              return space;
            }
          });
        });
        return true;
      } else {
        console.error(`Failed to leave space: ${response.data.error}`);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  return leaveSpace;
}


export function useGetSpaceById() {
  const setSpace = useSetRecoilState(singSpaceAtom);
  async function getSpaceById(spaceId) {
    try {
      const response = await axios.get(API_SPACES_BY_ID(spaceId));
      setSpace(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return getSpaceById;
}