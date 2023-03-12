import React from 'react'
import { useRecoilValue } from 'recoil'
import { authState } from '../../recoil/atoms/userAtoms'

function ProfileTooltip() {
    const { user } = useRecoilValue(authState);
    return (
        <div class="w-64 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
            <img alt="profil" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80" class="w-full mb-4 rounded-t-lg h-28" />
            <div class="flex flex-col items-center justify-center p-4 -mt-16">
                <a href="#" class="relative block">
                    <img
                        src={`https://avatars.dicebear.com/api/adventurer/${user.userId}.svg`}
                        alt="user avatar"
                        className="w-16 h-16 rounded-full"
                    />
                </a>
                <p class="mt-2 text-xl font-medium text-gray-800 dark:text-white">
                    {user.userName}
                </p>
                <p class="text-xs text-gray-400">
                    FullStack dev
                </p>
                <div class="flex items-center justify-between w-full gap-4 mt-8">
                    <button type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        See profile
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ProfileTooltip