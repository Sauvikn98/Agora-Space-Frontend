import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Comment from '../../components/Cards/CommentCard';
import SignInModal from '../../components/Modals/SignInModal';
import SignUpModal from '../../components/Modals/SignUpModal';
import RecommendedPosts from '../../components/Cards/PostDetailCards/RecommendedPosts';
import PostDetails from '../../components/Cards/PostDetailCards/PostDetails';

function PostPage() {
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
    <div className="bg-gray-200 min-h-screen">
      <Navbar handleOpenModal={handleOpenModal} />
      {isModalOpen && (
        <div className="backdrop-blur-lg fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          {activeModal === 'signin' && <SignInModal onRequestClose={handleCloseModal} />}
          {activeModal === 'signup' && <SignUpModal onRequestClose={handleCloseModal} />}
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-custom2 gap-8">
          <div>
            <PostDetails />
            <div id='comments'>
              <Comment />
            </div>
          </div>
          <RecommendedPosts />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
