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
        }
    };

    const handleTabClick = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <div className='h-[94.2vh] sticky flex top-[3.52rem] bottom-[3.1rem] w-full'>
            {isAuthenticated ? (
                <div className="w-full bg-gradient-to-b from-blue-800 to-blue-500 dark:bg-gray-900 dark:border-gray-700">
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
                <section class="bg-gradient-to-r from-blue-500 to-blue-800 dark:bg-gray-900">
                    <div class="py-8 px-6 mx-auto max-w-screen-xl text-center lg:py-16 yyy">
                        <a href="#" class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                            <span class="text-xs bg-violet-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span class="text-sm font-medium">Agora Space is out! See what's new</span>
                            <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        </a>
                        <div class="mb-4 ">
                        <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                            <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">
                                Discover, Learn & Discuss
                            </h2>
                            
                        </Reveal>
                        </div>
                        <img
                        src={landingImage}
                        className=" mt-8 md:mr-6 object-contain h-60 w-72 mb-10"
                        alt="landing"
                    />
                        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                Learn more
                                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </a>
                            <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 bg-white focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                <svg class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                Watch video
                            </a>
                        </div>
                        
                    </div>
                </section>
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
