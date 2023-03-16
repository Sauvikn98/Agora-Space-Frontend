import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SignUpModal from "../components/Modals/SignUpModal";
import SignInModal from "../components/Modals/SignInModal";
import SignOutModal from "../components/Modals/SignOutModal";
import PostModal from "../components/Modals/PostModal";
import SpaceList from "../components/Cards/SpaceList";
import Comment from "../components/Comments/Comment";
import { useNavigate } from "react-router-dom";
import RecommendedSpaces from "../components/Cards/RecommendedSpaces";
import LandingSidebar from "../components/Sidebar/LandingSidebar";
const Landing = () => {

  const [activeModal, setActiveModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = (modal) => {
    setActiveModal(modal);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setActiveModal(null);
    setIsModalOpen(false);
    navigate('/')
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
          {activeModal === 'comment' && <Comment onRequestClose={handleCloseModal} />}
        </div>
      )}
      <div className="min-h-screen h-full grid lg:grid-cols-custom bg-gray-200 ">
        <LandingSidebar handleOpenModal={handleOpenModal} />
        <SpaceList handleOpenModal={handleOpenModal} />
        <RecommendedSpaces />
      </div>
    </>
  );
};

export default Landing;