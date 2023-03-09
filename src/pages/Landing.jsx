import React, { useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import SignUpModal from "../components/Modals/SignUpModal";
import SignInModal from "../components/Modals/SignInModal";
import Sidebar from "../components/Sidebar/Sidebar";
import SignOutModal from "../components/Modals/SignOutModal";
import PostModal from "../components/Modals/PostModal";
import SpaceList from "../components/Cards/SpaceList";
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
        <div className="backdrop-blur-lg backdrop-brightness-50 fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          {activeModal === 'signin' && <SignInModal onRequestClose={handleCloseModal} />}
          {activeModal === 'signup' && <SignUpModal onRequestClose={handleCloseModal} />}
          {activeModal === 'signout' && <SignOutModal onRequestClose={handleCloseModal} />}
          {activeModal === 'post' && <PostModal onRequestClose={handleCloseModal} />}
        </div>
      )}
      <div className="min-h-screen h-full grid lg:grid-cols-custom bg-gray-200 ">
        <Sidebar handleOpenModal={handleOpenModal} />
        <SpaceList />
      </div>
    </>
    </div>
  );
};

export default Landing;