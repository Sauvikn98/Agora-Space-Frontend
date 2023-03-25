import React from 'react';

const RecommendedSpaces = () => {
    return (
        <div className='ml-7 lg:ml-2 mr-7 lg:mr-4'>
            <div className='col-span-1 mt-4'>
                <h2 className="text-xl font-bold mb-4 ">Recommended Spaces </h2>
                <div className="bg-white rounded-md shadow-md p-6">
                    <h2 className="text-lg font-bold mb-4">New Space 1</h2>
                    <p className="text-gray-700 text-sm mb-2">
                        This Space gives all the latest news about technology and infrastructure.
                    </p>
                    <a
                        href="#"
                        className="text-blue-500 text-sm hover:underline hover:text-blue-700"
                    >
                        Join Space
                    </a>
                </div>
            </div>
            <div className="col-span-1 mt-4">
                <div className="bg-white rounded-md shadow-md p-6">
                    <h2 className="text-lg font-bold mb-4">New Space 2</h2>
                    <p className="text-gray-700 text-sm mb-2">
                        This Space gives all the latest news about Sports and Fitness. All about new tips and tricks on Sports and proper training
                    </p>
                    <a
                        href="#"
                        className="text-blue-500 text-sm hover:underline hover:text-blue-700"
                    >
                        Join Space
                    </a>
                </div>
            </div>
            <div className="col-span-1 mt-4">
                <div className="bg-white rounded-md shadow-md p-6">
                    <h2 className="text-lg font-bold mb-4">New Space 3</h2>
                    <p className="text-gray-700 text-sm mb-2">
                        This Space gives all the latest news about Health and Wellbeing. All about healthy Lifestyle and diet planning.
                    </p>
                    <a
                        href="#"
                        className="text-blue-500 text-sm hover:underline hover:text-blue-700"
                    >
                        Join Space
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RecommendedSpaces;
