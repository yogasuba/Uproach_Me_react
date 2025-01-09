import React from "react";
import {ICONS } from "../../../constants";



const CreateEventTypeModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Create Event Type
        </h2>

        {/* Event Options */}
        <div className="space-y-4">
          {/* One-on-One */}
          <div
            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => console.log("One-on-One selected")}
          >
            <div className="flex items-center space-x-4">
              <img src={ICONS.ONE_ON_ONE} alt="One-on-One" className="w-10 h-10" />
              <div>
                <h3 className="font-bold text-gray-800">One host with one invitee</h3>
                <p className="text-gray-500 text-sm">
                  Good for: coffee chats, 1:1 interviews, etc.
                </p>
              </div>
            </div>
            <img src={ICONS.RIGHT_ARROW} alt="Arrow" className="w-5 h-5" />
          </div>

          {/* Group */}
          <div
            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => console.log("Group selected")}
          >
            <div className="flex items-center space-x-4">
              <img src={ICONS.GROUP} alt="Group" className="w-10 h-10" />
              <div>
                <h3 className="font-bold text-gray-800">One host with group of invitees</h3>
                <p className="text-gray-500 text-sm">
                  Good for: webinars, online classes, etc.
                </p>
              </div>
            </div>
            <img src={ICONS.RIGHT_ARROW} alt="Arrow" className="w-5 h-5" />
          </div>

          {/* Collective */}
          <div
            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => console.log("Collective selected")}
          >
            <div className="flex items-center space-x-4">
              <img src={ICONS.COLLECTIVE} alt="Collective" className="w-10 h-10" />
              <div>
                <h3 className="font-bold text-gray-800">More than one host with one invitee</h3>
                <p className="text-gray-500 text-sm">
                  Good for: panel interviews, group sales calls, etc.
                </p>
              </div>
            </div>
            <img src={ICONS.RIGHT_ARROW} alt="Arrow" className="w-5 h-5" />
          </div>

          {/* Round Robin */}
          <div
            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => console.log("Round Robin selected")}
          >
            <div className="flex items-center space-x-4">
              <img src={ICONS.ROUND_ROBIN} alt="Round Robin" className="w-10 h-10" />
              <div>
                <h3 className="font-bold text-gray-800">One rotating host with one invitee</h3>
                <p className="text-gray-500 text-sm">
                  Good for: distributing incoming sales leads.
                </p>
              </div>
            </div>
            <img src={ICONS.RIGHT_ARROW} alt="Arrow" className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventTypeModal;
