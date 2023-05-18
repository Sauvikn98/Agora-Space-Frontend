import React from 'react';
import { spaceAtom, useGetAllSpaces } from '../../../recoil/atoms/spaceAtoms';
import { useRecoilValue } from 'recoil';

const RecommendedSpaces = () => {
    const { isLoading } = useGetAllSpaces();
    const spaces = useRecoilValue(spaceAtom);

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
                        <div className="bg-white rounded-md shadow-md p-6 mt-6">
                            <h2 className="text-lg font-bold mb-4">{space.name}</h2>
                            <p className="text-gray-700 text-sm mb-2">
                                {space.description}
                            </p>
                            <a
                                href="#"
                                className="text-blue-500 text-sm hover:underline hover:text-blue-700"
                            >
                                Join Space
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecommendedSpaces;
