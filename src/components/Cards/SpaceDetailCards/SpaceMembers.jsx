import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../../recoil/atoms/userAtoms';
import { fetchSpaceMembers } from '../../../utils/spaceUtils';

function SpaceMembers({ spaceId }) {
    const [members, setMembers] = useState([]);
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        fetchSpaceMembers(spaceId, setMembers);
    }, []);

    return (
        <div>
            <div className="bg-white grid grid-cols-1 pl-4 pr-4 pt-6 gap-4">
                {members.length > 0 ? (
                    members.map((member) => (
                        <div className=" p-4 flex items-center" key={member._id}>
                            <img
                                src={`https://avatars.dicebear.com/api/adventurer/${member._id}.svg`}
                                alt="user avatar"
                                className='object-cover w-10 h-10 rounded-full cursor-pointer mr-5'
                            />
                            <div>
                                <p className="text-lg font-medium">{member.userName}</p>
                                <p className="text-gray-500">{member.email}</p>
                                <div className="flex items-center mt-2">
                                    {/* user.userDetails.online ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <circle cx="10" cy="10" r="6" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <circle cx="10" cy="10" r="6" />
                                        </svg>
                                    )*/}
                                    <p className="text-gray-500 text-sm">{user.userDetails.online ? 'Online' : 'Offline'}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default SpaceMembers;
