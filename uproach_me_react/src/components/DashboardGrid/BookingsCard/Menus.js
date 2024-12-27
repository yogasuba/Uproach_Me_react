import React, { useState } from "react";
import "quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill"; // Rich text editor
import EmojiPicker from "@emoji-mart/react"; // Correct default import for Emoji picker
import data from "@emoji-mart/data";

const EventDetailsPopup = ({ isOpen, onClose, selectedTab }) => {
  const [selectedView, setSelectedView] = useState("default"); 
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  if (!isOpen) return null;

  const handleDelete = () => {
    // Handle delete action here
    console.log('Event deleted');
    setIsModalOpen(false);
  };

  const handleGmailConnect = () => {
    setIsGmailConnected(!isGmailConnected);
  };

  // Function to handle WhatsApp connect/disconnect
  const handleWhatsAppConnect = () => {
    setIsWhatsAppConnected(!isWhatsAppConnected);
  };

  const addEmoji = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.native); // Append emoji to the editor's text
    setShowEmojiPicker(false); // Close the picker
  };
  
  const selectedEvent = {
    title: "Quick chat on design",
    name: "Vignesh",
    date: "Sat,19 OCT",
    time: "1 hour - 09:00-09:15AM (GMT+5:30)",
    attendee: {
      email: "john.doe@example.com",
      phone: "+1234567890",
    },
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    notes: "Remember to discuss the budget allocation for Q1.",
    price: "500",
    addOn: "Priority Support",
    addOnPrice: "100",
  };



  const renderLeftSection = () => {
    switch (selectedView) {
      case "notificationTimeline":
        return (
          <div>
            {/* Header */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">Notification Timeline</h2>
            <p className="text-sm text-gray-600 mb-4">
              Booking made {selectedEvent.date || "No Date Available"}
            </p>
  
            {/* Action buttons */}
            <div className="xxl:flex xxl:flex-row sm:flex sm:flex-col flex justify-between items-center mb-6 space-x-4">
              {/* Gmail Section */}
              <div className="flex items-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg xxl:w-1/2 justify-between sm:w-[19rem] sm:ml-2 xxl:ml-0">
                <div className="flex items-center">
                  <img
                    src="https://img.icons8.com/color/48/000000/gmail-new.png"
                    alt="Gmail Icon"
                    className="w-[32px] h-[32px]"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium flex items-center space-x-1">
                      Gmail
                      <span className="flex items-center text-xs text-yellow-600 bg-white px-1 py-0.5 rounded-full ml-1">
                        10
                        <img
                          src="/icons/crown.svg"
                          alt="Crown Icon"
                          className="w-[18px] h-[18px] ml-1"
                        />
                      </span>
                    </p>
                    <p className="text-xs text-gray-600">Send your reminders</p>
                  </div>
                </div>
                <button
                  onClick={handleGmailConnect}
                  className={`text-sm ${isGmailConnected ? 'bg-green-100 text-green-600' : 'bg-white text-gray-700'} border border-gray px-4 py-1.5 rounded-full hover:bg-gray-300`}
                >
                  {isGmailConnected ? 'Connected' : 'Connect'}
                </button>
              </div>
  
              {/* WhatsApp Section */}
              <div className="flex items-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg xxl:w-1/2 justify-between sm:w-[19rem] sm:mt-5 xxl:mt-0">
                <div className="flex items-center">
                  <img
                    src="https://img.icons8.com/color/48/000000/whatsapp.png"
                    alt="WhatsApp Icon"
                    className="w-[32px] h-[32px]"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium flex items-center space-x-1">
                      WhatsApp
                      <span className="flex items-center text-xs text-yellow-600 bg-white px-1 py-0.5 rounded-full ml-1">
                        <img
                          src="/icons/crown.svg"
                          alt="Crown Icon"
                          className="w-4 h-4 ml-1"
                        />
                      </span>
                    </p>
                    <p className="text-xs text-gray-600">Send your reminders</p>
                  </div>
                </div>
                <button
                  onClick={handleWhatsAppConnect}
                  className={`text-sm ${isWhatsAppConnected ? 'bg-green-100 text-green-600' : 'bg-white text-gray-700'} border border-gray px-4 py-1.5 rounded-full hover:bg-gray-300`}
                >
                  {isWhatsAppConnected ? 'Connected' : 'Connect'}
                </button>
              </div>
            </div>
  
            <div className="space-y-4">
              {/* Timeline Messages */}
              <div className="relative">
                {/* Horizontal Line */}
                <div className="absolute left-4 top-8 h-[97px] w-px ml-[10px] bg-gray-300 z-0"></div>
  
                {/* Message 1 */}
                <div className="relative flex items-start space-x-3 border border-gray-300 rounded-lg p-4 z-10 xxl:w-[595px] xxxl:w-[718px] xxxl:-[88px] xxl:ml-[64px] xxxl:ml-[68px] sm:ml-[31px]">
                  {/* Mail Icon */}
                  <div className="absolute -left-6 w-8 h-8 bg-[#6C49AC] text-white flex items-center justify-center rounded-full xxl:ml-[-29px] xxxl:ml-[-34px]">
                    <img
                      src="/icons/mail.svg"
                      alt="Mail Icon"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="text-sm text-gray-800">
                      <span className="font-medium">Reminder email to booker</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      <img
                        src="/icons/green_tick.svg" // Replace with your tick image path
                        alt="Tick Icon"
                        className="w-[20px] h-[20px] mr-2 inline-block"
                      />
                      Scheduled {selectedEvent.date || "No Date"} at {selectedEvent.time || "No Time"}
                    </p>
                  </div>
                  <button className="text-[#6139FF] text-sm font-medium">Resend</button>
                </div>
  
                {/* Message 2 */}
                <div className="relative flex items-start space-x-3 border border-gray-300 rounded-lg p-4 mt-6 z-10 xxl:w-[595px] xxxl:w-[718px] xxxl:-[88px] xxl:ml-[64px] xxxl:ml-[68px] sm:ml-[31px]">
                  {/* Mail Icon */}
                  <div className="absolute -left-6 w-8 h-8 bg-[#6C49AC] text-white flex items-center justify-center rounded-full xxl:ml-[-29px] xxxl:ml-[-34px]">
                    <img
                      src="/icons/mail.svg"
                      alt="Mail Icon"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="text-sm text-gray-800">
                      <span className="font-medium">Link has been sent to your mail</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      <img
                        src="/icons/green_tick.svg" // Replace with your tick image path
                        alt="Tick Icon"
                        className="w-[20px] h-[20px] mr-2 inline-block"
                      />
                      Scheduled {selectedEvent.date || "No Date"} at {selectedEvent.time || "No Time"}
                    </p>
                  </div>
                </div>
              </div>
  
              {/* Message Input */}
              <div className="hidden lg:block relative mt-6 border border-gray-300 rounded-lg p-4 xxl:w-[595px] h-[192px] xxxl:w-[718px] xxxl:ml-[68px] xxl:ml-[64px] sm:ml-[31px]">
                {/* Mail Icon */}
                <div className="absolute -left-6 w-8 h-8 bg-[#6C49AC] text-white flex items-center justify-center rounded-full xxl:ml-[-29px] xxxl:ml-[-34px]">
                  <img src="/icons/mail.svg" alt="Mail Icon" />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs text-gray-400">type your message</p>
                  <button
                    onClick={() => {
                      console.log("Message Sent:", message);
                      setMessage(""); // Clear message
                    }}
                    className=" text-[#6139FF]  text-sm "
                  >
                    Send
                  </button>
                </div>
                <style>
                  {`
                    .ql-toolbar {
                      background-color: #f0f0f0; 
                      color :#B6B6B6;
                      padding: 5px; 
                    }
                  `}
                </style>
                <ReactQuill
                  theme="snow"
                  value={message}
                  onChange={setMessage}
                  placeholder="Description"
                  className="w-full  h-[82px] text-sm"
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"], // Text styles
                      [{ list: "ordered" }, { list: "bullet" }], // Lists
                      ["link"], // Insert links
                    ],
                  }}
                />
  
                {/* Emoji Picker Button */}
                <div className="absolute top-[53px] xxl:mr-[305px] xxxl:mr-[428px] right-2">
                  <button
                    className="mt-2"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <img
                        src="/icons/emoji.svg" // Replace with your tick image path
                        alt="Tick Icon"
                        className="w-[20px] h-[20px] mr-2 inline-block"
                    />
                  </button>
  
                  {showEmojiPicker && (
                    <div className="absolute z-10 mt-2">
                      <EmojiPicker data={data} onEmojiSelect={addEmoji} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        case "default":
          default:
            return (
              <div>
                {/* Default content for the left section */}
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {selectedEvent.title || "No Title"}
                </h2>
                <p className="text-[18px] mb-4">{selectedEvent.name || "No name"}</p>
    
                <div className="flex items-start bg-[#F6F6F9] p-[11px] rounded-[12px] mb-4">
                  <img
                    src="/icons/gmeet.svg"
                    alt="Google Meet Icon"
                    className="w-5 h-5 mr-2"
                  />
                  <div>
                    <p className="text-sm text-gray-800 font-medium">
                      {selectedEvent.date || "No Date Available"}
                    </p>
                    <div className="flex items-start">
                      <img
                        src="/icons/clock.svg"
                        alt="Clock Icon"
                        className="w-4 h-4 mr-1 ml-[-27px] mt-2"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        {selectedEvent.time || "No Time Available"}
                      </p>
                    </div>
                  </div>
                </div>
    
                  {/* Attendee Details */}
                  <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-4 mt-4">Attendee Details</h3>
      
                  <div className="flex justify-between gap-4 xxl:flex xxl:flex-row sm:flex sm:flex-col">
                    {/* Email Section */}
                    <div className="xxl:w-1/2 sm:w-[333px] md:w-[380px]">
                      <div className="bg-[#F6F6F9] rounded-lg p-4">
                        <p className="text-xs font-medium text-gray-500 mb-2 ml-[36px]">
                          Gmail
                        </p>
                        <div className="flex items-center">
                          <img
                            src="/icons/gmail.svg"
                            alt="Email Icon"
                            className="w-6 h-6 mr-3"
                          />
                          <p className="text-sm text-[#1E1F24] truncate">
                            {selectedEvent.attendee?.email || "No Email"}
                          </p>
                        </div>
                      </div>
                    </div>
      
                    {/* Phone Section */}
                    <div className="xxl:w-1/2 sm:w-[333px] md:w-[380px]">
                      <div className="bg-[#F6F6F9] rounded-lg p-4">
                        <p className="text-xs font-medium text-gray-500 mb-2 ml-[36px]">
                          Phone Number
                        </p>
                        <div className="flex items-center">
                          <img
                            src="/icons/phone.svg"
                            alt="Phone Icon"
                            className="w-6 h-6 mr-3"
                          />
                          <p className="text-sm text-[#1E1F24] truncate">
                            {selectedEvent.attendee?.phone || "No Phone Number"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      
                {/* Description */}
                <h3 className="text-md font-semibold mb-2 hidden lg:block">Description</h3>
                <p className="text-sm text-gray-600 mb-4 hidden lg:block">
                  {selectedEvent.description || "No Description"}
                </p>
                  
                {/* Meeting Notes */}
                <div className="bg-[#F0F5FE] rounded-lg p-4 relative">
                  <p className="text-[18px] font-semibold text-[#1E1F24] ml-[65px] mb-[-29px]">
                    Meeting notes
                  </p>
                  <div className="flex items-center">
                    <img
                      src="/icons/notes.svg"
                      alt="Note icon"
                      className="w-[54px] h-[54px] mr-3"
                    />
                    <p className="text-sm text-[#5C5C5C] truncate mt-[30px]">
                      {selectedEvent.notes || "No Notes"}
                    </p>
                  </div>
    
                  {/* Notes Button */}
                  <button
                    className="absolute top-8 right-4 text-sm text-[#0045B8] font-semibold hover:text-indigo-800"
                    onClick={() => {
                      console.log("Add Notes clicked");
                    }}
                  >
                    Add notes
                  </button>
                </div>
    
      
                {/* Price Breakdown */}
                <h3 className="text-md font-semibold mb-4 mt-4">Price Breakdown</h3>
                <p className="text-sm text-gray-600 mb-2">
                  1x {selectedEvent.title || "Unknown Title"}: ₹
                  {selectedEvent.price || "0"}
                </p>
                <p className="text-sm text-gray-600">
                  Add On ({selectedEvent.addOn || "None"}): ₹
                  {selectedEvent.addOnPrice || "0"}
                </p>
              </div>
            );
        }
      };
      
  return (
    <div className="container flex flex-col sm:flex-row gap-4" >
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50  ">
      <div className="bg-white rounded-lg shadow-lg xxxl:w-[1252.311px] xxxl:h-[722.089px] xxl:w-[1087px] xxl:h-[550px] flex relative">
        {/* Left Section */}
        <div className="xxl:w-2/3 xxl:h-[550px] xxl:p-6 relative overflow-y-auto sm:w-full sm:h-[57rem] sm:p-4 sm:w-[23rem] ">
          {renderLeftSection()}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Right Section */}
        <div className="right-section sm:w-[416px]  xl:static fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg sm:shadow-none z-50 border-t border-gray-200 ">
          <div className="xxl:space-y-4 xxl:mt-[55px] xxl:flex xxl:flex-col sm:flex sm:flex-row gap-4 sm:gap-2 items-center sm:overflow-x-auto xxl:overflow-visible ">
          <button className="w-full text-left text-sm text-gray-600 hover:text-purple-600 flex items-center ">
                <img
                  src="/icons/reschedule.svg" // Replace with actual reschedule icon path
                  alt="Reschedule"
                  className="w-5 h-5 mr-2" // Adjust size and spacing as needed
                />
                Reschedule
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:text-red-600 flex items-center sm:ml-[41px] xxl:ml-0">
                <img
                  src="/icons/cancel.svg" // Replace with actual cancel icon path
                  alt="Cancel"
                  className="w-5 h-5 mr-2"
                />
                Cancel
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:text-red-600 flex items-center sm:ml-[47px] xxl:ml-0"
               onClick={() => setIsModalOpen(true)}>
                <img
                  src="/icons/trash.svg" // Replace with actual delete icon path
                  alt="Delete"
                  className="w-5 h-5 mr-2"
                />
                Delete
              </button>
            <button
              className="w-full text-left text-sm text-gray-600 hover:text-blue-600 flex items-center sm:ml-[55px] xxl:ml-0"
              onClick={() => setSelectedView("notificationTimeline")}
            >
              <img
                src="/icons/notification.svg"
                alt="Notification Timeline"
                className="w-5 h-5 mr-2"
              />
              Notification Timeline
            </button>
          </div>
          {isModalOpen && (
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
               // Optional for a blurred background
            >
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-[358px] h-[268px] relative sm:mb-[739px]  xxl:m-0 sm:ml-[68px]">
                <div className="flex justify-center mb-4 mt-[-54px]">
                <div>
                  <img
                    src="/icons/trash_blue.svg"
                    alt="Trash Icon"
                    className="h-[181px] w-[170px]"
                  />
                </div>
              </div>                
              <h3 className="text-lg font-semibold text-center text-gray-900 mt-[-62px]">
                Are You Sure?
              </h3>
                {/* Description */}
                <p className="text-center text-gray-500 mt-2">
                  This Event Will Be Deleted For Everyone
                </p>
                {/* Buttons */}
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={handleDelete}
                    className="w-[151px] h-[48px] bg-[#F3F4F6] text-[#2E2B2B] rounded-[32px] hover:bg-[#6139FF] hover:text-white transition "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-[151px] h-[48px] bg-[#F3F4F6] text-[#2E2B2B] rounded-[32px] hover:bg-[#6139FF] hover:text-white transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}


          {selectedTab === "Upcoming" ? (
            <button className="w-full text-white py-2 rounded-full bg-[#6139FF] py-3 px-2 text-sm font-medium text-white shadow-sm 
            xxl:mb-[240px] xxl:mt-[28px] hover:bg-customPurple">
              Join Call
            </button>
            
          ) : (
            <div className="bg-[#FFF] border-t-[4px] border-[#FF5A5F] p-4 xxxl:mb-[250px] xxl:mb-[115px]">
              <div className="flex items-center mb-2">
                <img
                  src="/icons/alert-icon.svg"
                  alt="Warning Icon"
                  className="w-[24px] h-[24px] mr-2"
                />
                <p className="text-sm font-medium text-[#1E1F24]">
                  Need Action
                </p>
              </div>
              <p className="text-xs text-[#686A74] mb-4">
                You Didn't Join The Call
              </p>
              <input
                type="text"
                placeholder="Add note.."
                className="w-full p-2 text-sm border-b border-[#C4C4C4] focus:outline-none focus:ring-0 mb-5"
              />
              <div className="flex justify-between items-center">
                <button className="text-[#623CEA] text-sm font-medium hover:underline">
                  Cancel
                </button>
                <button className="text-[#623CEA] text-sm font-medium">
                  Mark as Completed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default EventDetailsPopup;
