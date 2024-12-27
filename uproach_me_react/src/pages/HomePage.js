// src/pages/HomePage.js
import React, { useEffect } from 'react';

import ProfileHead from '../components/ProfileHead';
import { ProfileHeader } from '../components/ProfileHeader';
import TabNavigation from '../components/TabNavigation';
import EventList from '../components/EventList';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Home'; // Set your desired page title here
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileHead />
      <ProfileHeader />

      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
        <div>
          <TabNavigation />
        </div>
        <div>
          <EventList />
        </div>
      </div>
    </div>
  );
}
