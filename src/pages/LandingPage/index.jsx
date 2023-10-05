import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SignUpModal from "../../components/Modals/SignUpModal";
import SignInModal from "../../components/Modals/SignInModal";
import SignOutModal from "../../components/Modals/SignOutModal";
import PostModal from "../../components/Modals/PostModal";
import SpaceList from "../../components/Lists/SpaceList";
import Comment from "../../components/Cards/CommentCard";
import NotificationTooltip from "../../components/Tooltip/NotificationTooltip";
import ProfileTooltip from "../../components/Tooltip/ProfileTooltip";
import { useNavigate } from "react-router-dom";
import BookmarkTooltip from "../../components/Tooltip/BookmarkTooltip";
import Hero from "../../components/Hero";
import VoteValidation from "../../components/Modals/ValidationModal/VoteValidationModal";
import { useRecoilValue } from "recoil";
import { spaceAtom } from "../../recoil/atoms/spaceAtoms";
import Category from "../../components/Category";

const LandingPage = () => {
  const spaces = useRecoilValue(spaceAtom);
  const [activeModal, setActiveModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCreateSpaceMessage, setShowCreateSpaceMessage] = useState(false);
  const [filteredSpaces, setFilteredSpaces] = useState(spaces);
  const navigate = useNavigate();

  const handleCategorySelect = (selectedCategory) => {
    if (selectedCategory === 'All') {
        setFilteredSpaces(spaces);
    } else {
        const newFilteredSpaces = spaces.filter(space =>
            space.category.some(category => category === selectedCategory)
        );
        if (newFilteredSpaces.length === 0) {
            setFilteredSpaces([]);
            setSelectedCategory(selectedCategory);
            setShowCreateSpaceMessage(true);
        } else {
            setFilteredSpaces(newFilteredSpaces);
            setShowCreateSpaceMessage(false);
        }
    }
};

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
          {activeModal === 'signin' && <SignInModal onRequestClose={handleCloseModal} />}
          {activeModal === 'signup' && <SignUpModal onRequestClose={handleCloseModal} />}
          {activeModal === 'signout' && <SignOutModal onRequestClose={handleCloseModal} />}
          {activeModal === 'post' && <PostModal onRequestClose={handleCloseModal} />}
          {activeModal === 'comment' && <Comment onRequestClose={handleCloseModal} />}
          {activeModal === 'votes validation' && <VoteValidation onRequestClose={handleCloseModal} />}
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

      <div className="min-h-screen h-full grid lg:grid-cols-custom ">

        <Hero handleOpenModal={handleOpenModal} />
        <SpaceList handleOpenModal={handleOpenModal} filteredSpaces={filteredSpaces} setFilteredSpaces={setFilteredSpaces} showCreateSpaceMessage={showCreateSpaceMessage} selectedCategory={selectedCategory}/>
        <div className="mt-10">
          <h1 className="mb-3">Categories</h1>
          <Category handleCategorySelect={handleCategorySelect}/>
        </div>

      </div>
    </>
  );
};

export default LandingPage;