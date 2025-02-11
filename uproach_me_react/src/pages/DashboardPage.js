// src/pages/DashboardPage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardGrid from "../components/DashboardGrid";
import SuccessPopup from "../components/SuccesslinkPopup";

export default function DashboardPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showPopup = queryParams.get("showPopup"); // Access the query parameter
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (showPopup === "true") {
      setIsPopupVisible(true);
    }
  }, [showPopup]);

  useEffect(() => {
    document.title = "Dashboard"; // Set your desired page title here
  }, []);

  return (
    <>
    <div class="fixed top-5 left-0 z-50 w-full bg-white shadow-md">
    {isPopupVisible && <SuccessPopup setShowPopup={setIsPopupVisible} />}
    </div>
      <DashboardGrid />
    </>
  );
}
