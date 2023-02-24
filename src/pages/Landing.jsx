import React, { useState } from "react";
import PostCard from "../components/Cards/PostCard";
import Navbar from "../components/Navbar/Navbar";
import SignUpModal from "../components/Modals/SignUpModal";
import SignInModal from "../components/Modals/SignInModal";
import landingImage from "../assets/vector-image.png"

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
    <div className="h-full bg-slate-100 sm:grid-cols-1 md:grid-cols-3">
      <Navbar handleOpenModal={handleOpenModal} />
      {isModalOpen && (
        <div className="backdrop-blur-lg fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          {activeModal === 'signin' && <SignInModal onRequestClose={handleCloseModal} />}
          {activeModal === 'signup' && <SignUpModal onRequestClose={handleCloseModal} />}
        </div>
      )}

      <div className="custom-co min-h-screen h-full grid lg:grid-cols-custom bg-slate-100 ">
        <div className="bg-gradient-to-r bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900 via-indigo-400 to-indigo-900">
          <div className="mt-20 container">
            <img
              src={landingImage}
              className="lg:ml-2 md:ml-6 md:mr-6 object-contain h-48 w-98"
              alt="landing"
            />
            <div className="lg:ml-6 ml-7 md:ml-10 mb-24">
              <h2 className="text-4xl font-bold mt-6 text-white text-left">
                Discover, Learn & Discuss
              </h2>

              <h3 className="mt-4 text-2xl text-gray-200 text-left">
                Empower your mind, ignite your passion through discussion
              </h3>
              <button onClick={() => handleOpenModal('signup')} className="font-bold bg-white mt-8 text-gray-900 flex items-center px-8 py-3  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white shadow-lg focus:outline-none">Get Started</button>
            </div>
          </div>
        </div>
        <PostCard />
      </div>
    </div>
  );
};

export default Landing;