import React from 'react';
import { spaceAtom, useGetAllSpaces } from '../../../recoil/atoms/spaceAtoms';
import { useRecoilValue } from 'recoil';
import { handleNavigate } from '../../../utils/spaceUtils';
import { useNavigate } from 'react-router-dom';

const RecommendedSpaces = () => {
    const { isLoading } = useGetAllSpaces();
    const spaces = useRecoilValue(spaceAtom);
    const navigate = useNavigate();

    return (
        <div className='ml-7 lg:ml-2 mr-7 lg:mr-4'>
            {isLoading ? (
                <div class="fixed inset-0 flex items-center justify-center">
                    <div
                        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            class="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span
                        >
                    </div>
                </div>
            ) : (
                <div className='col-span-1 mt-4'>
                    <h2 className="text-xl font-bold mb-4 ">Recommended Spaces </h2>
                    {spaces.map(space => (
                        <div onClick={() => handleNavigate(space.name, navigate, spaces)} className="shadow-xl hover:outline outline-offset-2 outline-blue-500 transition duration-500 ease-in-out transform hover:-translate-y-1 relative bg-white mt-8 max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                            {space.coverPhoto ? (
                                <img src={space.coverPhoto} alt="" className="object-cover object-center w-full rounded-t-md h-36 dark:bg-gray-500" />
                            ) : (
                                <img src="https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="object-cover object-center w-full rounded-t-md h-36 dark:bg-gray-500" />
                            )}
                            <div className="flex flex-col justify-between pt-3 pl-5 pb-5 space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-md font-semibold">{space.name}</h2>
                                    <p className="dark:text-gray-100 text-sm">{space.description}</p>
                                </div>

                            </div>
                            <div>
                                <div className='flex justify-center items-center'>
                                    <button className='text-sm bg-blue-700 text-white items-center px-[33%] py-1 transition ease-in duration-200 rounded-md hover:bg-gray-700 hover:text-white shadow-lg focus:outline-none'>
                                        Join Space
                                    </button>
                                </div>

                                <div className='p-4'>
                                    {space.category.map(cat => (
                                        <span class="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">#{cat}</span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecommendedSpaces;
