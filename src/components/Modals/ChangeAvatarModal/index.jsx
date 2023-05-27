import React from 'react';

function ChangeAvatarModal({ showModal, closeModal, handleAvatarSelection }) {
  const avatarOptions = [];

  for (let i = 1; i <= 200; i++) {
    const avatarUrl = `https://avatars.dicebear.com/api/adventurer/${i}.svg`;
    avatarOptions.push(avatarUrl);
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${showModal ? '' : 'hidden'}`}>
      <div className="bg-white p-6 m-6 rounded-md shadow-lg max-h-[600px] overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Select Avatar</h2>
        <div className="grid grid-cols-5 gap-5">
          {avatarOptions.map((avatar, index) => (
            <img
              key={index}
              className="w-16 h-16 rounded-full cursor-pointer"
              src={avatar}
              alt={`Avatar ${index + 1}`}
              onClick={() => handleAvatarSelection(avatar)}
            />
          ))}
        </div>
        <button className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white font-semibold" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ChangeAvatarModal;
