import { useState } from 'react';

export const ProfileHeader = ({ showShareButton = true, roundedClass = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal state
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={`bg-white p-6 shadow flex flex-col items-start xl:w-full ${roundedClass}`}>
      {/* Profile Header Content */}
      <div className="flex items-center justify-between w-full">
        {/* Left Section: Profile Picture and Details */}
        <div className="flex items-center space-x-4">
          <img
            src="/profile-photo.png" // Replace with your image path
            alt="name"
            width={40} // Smaller width for mobile
            height={40} // Smaller height for mobile
            className="rounded-full sm:w-50 sm:h-50" // Larger size for desktop
          />
          <div>
            {/* Name */}
            <h1 className="xl:text-2xl font-bold sm:text-lg">Vignesh Kumar</h1>

            {/* Location with Map Icon */}
            <div className="flex items-center xl:text-sm text-gray-500 sm:text-xs">
              <img
                src="/icons/map-pin.svg" // Path to your map icon in the public folder
                alt="Location marker"
                width={14} // Smaller size for mobile
                height={14}
                className="mr-1"
              />
              <p>Mangalampet, Tamil Nadu</p>
            </div>
          </div>
        </div>

        {/* Right Section: Share Button */}
        {showShareButton && (
          <button
            className="ml-auto xl:text-sm text-purple-500 flex items-center space-x-2 sm:text-xs"
            onClick={toggleModal} // Toggle modal on click
          >
            <span>Share</span>
            <img
              src="/icons/download.svg" // Path to your custom share icon in the public folder
              alt="Share"
              width={14} // Smaller icon for mobile
              height={14}
              className="sm:w-2 sm:h-2 xl:w-5 xl:h-5" // Larger size for desktop
            />
          </button>
        )}
      </div>

      {/* Share Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white pl-2 pr-2 pt-5 pb-5 rounded-lg shadow-lg relative w-97">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={toggleModal}
            >
              <span>&times;</span> {/* Close button */}
            </button>
            {/* Modal Content */}
            <div className="flex flex-col items-center">
              {/* Profile Picture */}
              <img
                src="/profile-photo.png"
                alt="name"
                width={50}
                height={50}
                className="rounded-full mb-4"
              />
              {/* Name and Social Handle */}
              <h2 className="xl:text-lg font-semibold">Vignesh Kumar</h2>
              <p className="text-gray-500 text-sm">@Vignesh0303</p>

              {/* Share Links */}
              <div className="flex flex-col items-center space-y-4 mt-4 mb-4">
                <div className="flex justify-center space-x-3">
                  {/* Adjusted spacing */}
                  <div className="flex flex-col items-center" style={{ width: '50px' }}>
                    <button
                      className="p-2 bg-gray-800 rounded-full"
                      onClick={() => console.log("Copy URL clicked")} // Replace with actual functionality
                    >
                      <img
                        src="/icons/mdi_link-variant.svg"
                        alt="Copy URL"
                        width={16}
                        height={16}
                      />
                    </button>
                    <p className="mt-2 text-xs text-center text-gray-600 sm:text-[10px]">Copy url</p>
                  </div>
                  <div className="flex flex-col items-center" style={{ width: '50px' }}>
                    <button
                    className="p-2 bg-[#26D367] rounded-full"
                    onClick={()=> console.log("Whatsapp clicked")}
                    >
                      <img
                        src="/icons/ic_baseline-whatsapp.svg"
                        alt="WhatsApp"
                        width={16} // Smaller icon size for mobile
                        height={16}
                      />
                    </button>
                    <p className="mt-2 text-xs text-center text-gray-600 sm:text-[10px]">WhatsApp</p>
                  </div>
                  <div className="flex flex-col items-center" style={{ width: '50px' }}>
                    <button 
                    className="p-2 bg-gradient-to-br from-[#8C48DB] via-[#CC4499] to-[#FFB133] rounded-full"
                    onClick={()=>console.log("Instagram clicked")}
                    >
                      <img
                        src="/icons/ion_logo-instagram.svg"
                        alt="Instagram"
                        width={16} // Smaller icon size for mobile
                        height={16}
                      />
                    </button>
                    <p className="mt-2 text-xs text-center text-gray-600 sm:text-[10px]">Instagram</p>
                  </div>
                  <div className="flex flex-col items-center" style={{ width: '50px' }}>
                    <button 
                    className="p-2 bg-[#27A1FC] rounded-full"
                    onClick={()=>console.log("Telegram clicked")}>
                      <img
                        src="/icons/icons8-telegram-app.svg"
                        alt="Telegram"
                        width={16} // Smaller icon size for mobile
                        height={16}
                      />
                    </button>
                    <p className="mt-2 text-xs text-center text-gray-600 sm:text-[10px]">Telegram</p>
                  </div>
                  <div className="flex flex-col items-center" style={{ width: '50px' }}>
                    <button 
                    className="p-2 bg-[#1DA1F3] rounded-full"
                    onClick={()=>console.log("Twitter click")}>
                      <img
                        src="/icons/radix-icons_twitter-logo.svg"
                        alt="Twitter"
                        width={16} // Smaller icon size for mobile
                        height={16}
                      />
                    </button>
                    <p className="mt-2 text-xs text-center text-gray-600 sm:text-[10px]">Twitter</p>
                  </div>
                  <div className="flex flex-col items-center" style={{ width: '50px' }}>
                    <button 
                    className="p-2 bg-[#3B3B3B] rounded-full"
                    onClick={()=>console.log("More click")}>
                      <img
                        src="/icons/icon_doted.svg"
                        alt="More"
                        width={16} // Smaller icon size for mobile
                        height={16}
                      />
                    </button>
                    <p className="mt-2 text-xs text-center text-gray-600 sm:text-[10px]">More</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
