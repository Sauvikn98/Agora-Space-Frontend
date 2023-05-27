import React, { useState } from 'react'
import Comment from '../../components/Cards/CommentCard'
import Navbar from '../../components/Navbar'
import SignUpModal from "../../components/Modals/SignUpModal";
import SignInModal from "../../components/Modals/SignInModal";
import PostModal from '../../components/Modals/PostModal';
import SpaceDetails from '../../components/Cards/SpaceDetailCards/SpaceDetails';


function SpacePage() {
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
          {activeModal === 'post' && <PostModal onRequestClose={handleCloseModal} />}
        </div>
      )}
      <SpaceDetails handleOpenModal={handleOpenModal} />
    </div>
  )
}

export default SpacePage