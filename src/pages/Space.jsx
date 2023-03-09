import React, { useState } from 'react'
import Comment from '../components/Comments/Comment'
import Navbar from '../components/Navbar/Navbar'
import SignUpModal from "../components/Modals/SignUpModal";
import SignInModal from "../components/Modals/SignInModal";
import SpaceDetailCard from '../components/Cards/SpaceDetailCard';


function Space() {
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
    <div>
      <Navbar handleOpenModal={handleOpenModal} />
      {isModalOpen && (
        <div className="backdrop-blur-lg fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          {activeModal === 'signin' && <SignInModal onRequestClose={handleCloseModal} />}
          {activeModal === 'signup' && <SignUpModal onRequestClose={handleCloseModal} />}
        </div>
      )}
      <SpaceDetailCard />
    </div>
  )
}

export default Space