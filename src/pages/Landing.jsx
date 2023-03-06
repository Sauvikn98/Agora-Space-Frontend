import React, { useState } from "react";
import PostCard from "../components/Cards/PostCard";
import Navbar from "../components/Navbar/Navbar";
import SignUpModal from "../components/Modals/SignUpModal";
import SignInModal from "../components/Modals/SignInModal";
import Sidebar from "../components/Sidebar/Sidebar";

const Landing = () => {

  const [activeModal, setActiveModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (modal) => {
    setActiveModal(modal);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setActiveModal(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar handleOpenModal={handleOpenModal} />
      {isModalOpen && (
        <div className="backdrop-blur-lg fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          {activeModal === 'signin' && <SignInModal onRequestClose={handleCloseModal} />}
          {activeModal === 'signup' && <SignUpModal onRequestClose={handleCloseModal} />}
=======

  const handleOpenModal = (modal) => {
    setActiveModal(modal);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setActiveModal(null);
    setIsModalOpen(false);
  };

  return (
    <div className="h-full bg-slate-100 sm:grid-cols-1 md:grid-cols-3">
      <Navbar handleOpenModal={handleOpenModal} />
      {isModalOpen && (
        <div className="backdrop-blur-lg fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          {activeModal === 'signin' && <SignInModal onRequestClose={handleCloseModal} />}
          {activeModal === 'signup' && <SignUpModal onRequestClose={handleCloseModal} />}
        </div>
      )}

      <div className="custom-co min-h-screen h-full grid lg:grid-cols-custom lg:space-y-6 bg-slate-100 ">
        <div className=" py-20 bg-gradient-to-r bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900 via-indigo-400 to-indigo-900">
          <div className="lg:mt-12 container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-2 text-white">
              Discover a world full of
            </h2>
            <h2 className="text-4xl font-bold mb-2 text-white">
              knowledge
            </h2>
            <h3 className="text-2xl text-gray-200">
              Empower your mind, ignite your passion
            </h3>
            <h3 className="text-2xl mb-8 text-gray-200">
              through discussion
            </h3>
            <div className="mt-6 lg:mr-6 md:mr-20">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-6">
                  <svg className="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                    height="30" viewBox="0 0 30 30">
                    <path
                      d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                    </path>
                  </svg>
                </span>
                <input
                  className="w-full py-4 px-14 shadow-lg tracking-wider lg:w-full bg-white placeholder:font-italitc border border-slate-300 rounded-full  focus:outline-none"
                  placeholder="Enter your keyword to search" type="text" />
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="min-h-screen h-full grid lg:grid-cols-custom bg-gray-200 ">
        <Sidebar handleOpenModal={handleOpenModal} />
        <PostCard />
      </div>
    </>
    </div>
  );
};

export default Landing;