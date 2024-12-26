// src/components/ProfileHead.js
import React from 'react';
import {IMAGES} from "../constants";

const ProfileHead = () => (
  <div>
    <header className="w-full h-[44px] bg-purple-200 relative flex justify-center items-center p-4">
      <div className="flex items-center space-x-2">
        <h1 className="text-base leading-[1.3] capitalize font-semibold text-purple-500">
          Create Your Profile
        </h1>
        <img
          src={IMAGES.EXTERNAL_LINKS} // Path to image
          alt="External link"
          width={16}
          height={16}
          className="inline"
        />
      </div>
    </header>
  </div>
);

export default ProfileHead;
