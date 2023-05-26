import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SignUpModal from "../../components/Modals/SignUpModal";
import SignInModal from "../../components/Modals/SignInModal";
import SignOutModal from "../../components/Modals/SignOutModal";
import PostModal from "../../components/Modals/PostModal";
import SpaceList from "../../components/Lists/SpaceList";
import Comment from "../../components/Cards/CommentCard";
import RecommendedSpaces from "../../components/Cards/SpaceDetailCards/RecommendedSpaces";
import LandingSidebar from "../../components/Sidebar/LandingSidebar";
import NotificationTooltip from "../../components/Tooltip/NotificationTooltip";
import ProfileTooltip from "../../components/Tooltip/ProfileTooltip";
import { useNavigate } from "react-router-dom";
import BookmarkTooltip from "../../components/Tooltip/BookmarkTooltip";
import Hero from "../../components/Hero";
import VoteValidation from "../../components/Modals/ValidationModal/VoteValidationModal";
import { useRecoilValue } from "recoil";
import { isAuthenticatedAtom } from "../../recoil/atoms/authAtom";
import KnowAgora from "../../components/Cards/KnowAgora";
import DidYouKnow from "../../components/Cards/DidYouKnow";
import Toast from "../../components/Toast";
import Footer from "../../components/Cards/Footer";
import VideoModal from "../../components/Modals/VideoModal";

const LandingPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({ success: false, message: '' });


  const handleOpenModal = (modal) => {
    setActiveModal(modal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setIsModalOpen(false);
    navigate('/')
  };

  const handleOpenTooltip = (tooltip) => {
    setActiveTooltip(tooltip);
    setIsTooltipOpen(true);
  };

  const handleCloseTooltip = () => {
    setActiveTooltip(null);
    setIsTooltipOpen(false);
  };

  return (
    <>
      <Navbar handleOpenModal={handleOpenModal} />
      {isModalOpen && (
        <div className="backdrop-blur-lg backdrop-brightness-50 fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          {activeModal === 'signin' && <SignInModal onRequestClose={handleCloseModal} handleOpenModal={handleOpenModal} setToastProps={setToastProps} setShowToast={setShowToast}/>}
          {activeModal === 'signup' && <SignUpModal onRequestClose={handleCloseModal} handleOpenModal={handleOpenModal} setToastProps={setToastProps} setShowToast={setShowToast}/>}
          {activeModal === 'signout' && <SignOutModal onRequestClose={handleCloseModal} />}
          {activeModal === 'post' && <PostModal onRequestClose={handleCloseModal} />}
          {activeModal === 'comment' && <Comment onRequestClose={handleCloseModal} />}
          {activeModal === 'votes validation' && <VoteValidation onRequestClose={handleCloseModal} />}
          {activeModal === 'video' && <VideoModal onRequestClose={handleCloseModal} />}
        </div>
      )}

      {isTooltipOpen && (
        <>
          <div className="fixed z-50 flex bottom-20 left-16">
            {activeTooltip === 'profileTooltip' && <ProfileTooltip onRequestClose={handleCloseTooltip} />}
          </div>
          <div className="fixed z-50 flex top-60 left-16">
            {activeTooltip === 'notificationTooltip' && <NotificationTooltip onRequestClose={handleCloseTooltip} />}
          </div>
          <div className="fixed z-50 flex top-52 left-16">
            {activeTooltip === 'bookmarkTooltip' && <BookmarkTooltip onRequestClose={handleCloseTooltip} />}
          </div>
        </>
      )}

      <div className="min-h-screen h-full grid lg:grid-cols-custom bg-gray-200 ">
        <div className="flex">
          <LandingSidebar handleOpenModal={handleOpenModal} handleOpenTooltip={handleOpenTooltip} onRequestClose={handleCloseTooltip} />
          <div className="hidden lg:block w-full">
            <Hero handleOpenModal={handleOpenModal} />
          </div>
        </div>
        <SpaceList handleOpenModal={handleOpenModal} />
        {isAuthenticated ? (
          <RecommendedSpaces />
        ) : (
          <div className="space-y-8">
            <KnowAgora />
            <Footer/>
          </div>

        )}

      </div>
      {showToast && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
            <Toast success={toastProps.success} message={toastProps.message} showToast={showToast} setShowToast={setShowToast} />
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;