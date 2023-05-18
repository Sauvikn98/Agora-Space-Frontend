import React, { useState } from 'react'
import landingImage from "../../assets/vector-image.svg"
import { Reveal } from 'react-awesome-reveal';
import { fadeInDownShorter, fadeInLeft } from '../../utils';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtoms';
import { isAuthenticatedAtom } from '../../recoil/atoms/authAtom';
import { categories } from '../Cards/CategoryCard';
import Toast from '../Toast';
import { useCreateSpace } from '../../recoil/atoms/spaceAtoms';
import HeroTabs from '../Tabs/HeroTabs';

function Hero({ handleOpenModal }) {
    const user = useRecoilValue(userAtom);
    const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
    const [currentTab, setCurrentTab] = useState('Create a Post');
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastProps, setToastProps] = useState({ success: false, message: '' });
    const createSpace = useCreateSpace();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSpace({
                name,
                description,
                creator: user.userDetails._id,
                category
            })
            setShowToast(true);
            setToastProps({ success: true, message: 'Space Created Successfully!' });
        } catch (error) {
            console.error(error);
            setShowToast(true);
            setToastProps({ success: false, message: 'Space could not be created, Try Again!' });
            // show error message to user
        }
    };

    const handleTabClick = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <div className='h-[94vh] sticky flex top-[3.52rem] bottom-[3.1rem] w-full'>
            {isAuthenticated ? (
                <div className="w-full bg-gradient-to-r from-blue-900 to-blue-800 dark:bg-gray-900 dark:border-gray-700">
                    <div className="">
                        <HeroTabs
                            tabs={['Create a Post', 'Create a Space']}
                            currentTab={currentTab}
                            onTabClick={handleTabClick}
                        />
                    </div>
                    {currentTab === 'Create a Post' && (
                        <div className="mt-20 px-5">
                            <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                                <h2 className="mb-5 text-4xl font-bold text-white text-left">
                                    Create a Post
                                </h2>
                            </Reveal>
                            <Reveal keyframes={fadeInDownShorter} duration={1000} delay={400}>
                                <input
                                    onClick={() => handleOpenModal('post')}
                                    className="outline-none bg-white rounded-lg text-gray-800 w-full h-12 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    placeholder="What's on your mind.."
                                ></input>
                            </Reveal>
                        </div>
                    )}
                    {currentTab === 'Create a Space' && (
                        <div className="mt-20 px-5">
                            <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                                <h2 className="mb-5 text-4xl font-bold text-white text-left">
                                    Create a Space
                                </h2>
                            </Reveal>
                            <Reveal keyframes={fadeInDownShorter} duration={1000} delay={400}>
                                <input
                                    className="outline-none bg-white rounded-lg text-gray-800 w-full px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                                <textarea
                                    maxlength="50"
                                    className="resize-none outline-none bg-white rounded-lg text-gray-800 w-full mt-4 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    placeholder="Description"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                <select
                                    id="categories"
                                    className="mt-3 outline-none bg-white rounded-lg text-gray-800 w-full px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Choose a category</option>
                                    {categories.map(category => (
                                        <option value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                            </Reveal>
                            <Reveal keyframes={fadeInDownShorter} duration={1000} delay={400}>
                                <button onClick={handleSubmit} className="font-bold bg-gray-800 text-white mt-4 flex items-center px-8 py-3 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-700 hover:text-white shadow-lg focus:outline-none">
                                    Create
                                </button>
                            </Reveal>

                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 dark:bg-gray-900 dark:border-gray-700">
                    <img
                        src={landingImage}
                        className=" mt-8 md:mr-6 object-contain h-60 w-72"
                        alt="landing"
                    />
                    <div className="p-6 ">
                        <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                            <h2 className="text-4xl font-bold text-white text-left">
                                Discover, Learn & Discuss
                            </h2>
                        </Reveal>
                        <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                            <h3 className="mt-4 text-2xl text-gray-200 text-left">
                                Empower your mind, ignite your passion through discussion.
                            </h3>
                        </Reveal>

                        <Reveal keyframes={fadeInDownShorter} duration={1000} delay={400}>
                            <button onClick={() => handleOpenModal('signup')} className="font-bold bg-white mt-8 text-gray-900 flex items-center px-8 py-3  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white shadow-lg focus:outline-none">Get Started</button>
                        </Reveal>
                    </div>
                </div>
            )}

            {showToast && (
                <div className="absolute w-full inset-4 z-100 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
                    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
                        <Toast success={toastProps.success} message={toastProps.message} showToast={showToast} setShowToast={setShowToast} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Hero
