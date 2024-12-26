// src/components/TabNavigation.js
import React, { useState } from 'react';

const TabNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('about');

  return (
    <div>
      <div className="flex space-x-8 pb-2 py-8 p-7">
        {['about', 'specialties', 'experience'].map((tab) => (
          <button
            key={tab}
            className={`text-gray-600 hover:text-purple-600 font-semibold pb-2 ${
              selectedTab === tab ? 'text-purple-600 border-b-2 border-purple-600' : ''
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div>
        {selectedTab === 'about' && <AboutSection />}
        {selectedTab === 'specialties' && <SpecialtiesSection />}
        {selectedTab === 'experience' && <ExperienceSection />}
      </div>
    </div>
  );
};

const AboutSection = () => (
  <div className="p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-3">Languages</h2>
    <div className="flex space-x-2 flex-wrap">
      {['English', 'Spanish', 'Dutch'].map((lang) => (
        <button
          key={lang}
          className="text-muted-foreground bg-[rgba(0,0,0,0.07)] text-[#3a3a3a] px-4 py-1 rounded-[70px] text-[16px]"
        >
          {lang}
        </button>
      ))}
    </div>
    <p className="text-gray-600 mb-6 text-sm mt-[17px]">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make     </p>
    <hr className="border-gray-300 my-6" />
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Follow Me On</h2>
    <div className="flex flex-wrap lg:flex-col lg:gap-4 sm:gap-4 sm:flex-row">
      {['facebook', 'instagram', 'twitter', 'youtube', 'whatsapp'].map((social) => (
        <div key={social} className="flex items-center space-x-2">
          <img src={`/icons/${social}.svg`} alt={social} className="w-5 h-5" />
          <span className="text-gray-700 text-sm capitalize">{social}</span>
        </div>
      ))}
    </div>
  </div>
);

const SpecialtiesSection = () => (
  <div>
    <h2 className="text-lg font-semibold mb-2">Specialties</h2>
    <p className="text-gray-600">Design, Development, Consulting...</p>
  </div>
);

const ExperienceSection = () => (
  <div>
    <h2 className="text-lg font-semibold mb-2">Experience</h2>
    <p className="text-gray-600">5 years in Web Development...</p>
  </div>
);

export default TabNavigation;
