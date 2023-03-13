import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Comment from '../components/Comments/Comment';
import PostDetailCard from '../components/Cards/PostDetailCard';
import SignInModal from '../components/Modals/SignInModal';
import SignUpModal from '../components/Modals/SignUpModal';

function Post() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <PostDetailCard />
            <div className="md:col-span-1 mt-10 hidden lg:block">
              <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-bold mb-4">Related Posts</h2>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-400 rounded"></div>
                    <div className="flex-grow">
                      <h3 className="text-gray-900 font-bold text-sm">Post 1</h3>
                      <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-400 rounded"></div>
                    <div className="flex-grow">
                      <h3 className="text-gray-900 font-bold text-sm">Post 2</h3>
                      <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-400 rounded"></div>
                    <div className="flex-grow">
                      <h3 className="text-gray-900 font-bold text-sm">Post 3</h3>
                      <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className='mt-5'>
              <Comment />
            </div>
            <div className="md:col-span-1 mt-10 block lg:hidden">
              <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-bold mb-4">Related Posts</h2>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-400 rounded"></div>
                    <div className="flex-grow">
                      <h3 className="text-gray-900 font-bold text-sm">Post 1</h3>
                      <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-400 rounded"></div>
                    <div className="flex-grow">
                      <h3 className="text-gray-900 font-bold text-sm">Post 2</h3>
                      <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-400 rounded"></div>
                    <div className="flex-grow">
                      <h3 className="text-gray-900 font-bold text-sm">Post 3</h3>
                      <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Post;
