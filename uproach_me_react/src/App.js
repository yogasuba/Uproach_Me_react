import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import { AllContent, AllCountries, AllVisitorSources, AllRecentPurchases } from "./components";
import { AuthProvider } from "./context/AuthContext";
import ProtectRoute from "./components/ProtectedRoute";
import {
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword,
  Welcome,
  ProfileDetails,
  SocialLinks,
  SuccessPage,
  HomePage,
  EventDetailPage,
  BookingPage,
  ScheduledPage,
  DashboardPage,
  ProfilePage,
  FaqPage,
  FeedbackPage,
  BillingPopup,
  BillingPage,
  IntegrationPage,
  BookingsMenu,
  PagesMenu,
  AnalyticsMenu,
  OneOnOnePage,
  GroupPage,
  AvailabilityPage,
} from "./pages";
import CreateEventTypeModal from "./components/DashboardGrid/CreateEventTypeModal";
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (

    <Router>
    <AuthProvider>
      <Toaster
        position="top-center" 
        reverseOrder={false}  
        toastOptions={{
          duration: 3000,     
        }}
      />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profiledetails" element={<ProfileDetails />} />
        <Route path="/sociallinks" element={<SocialLinks />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />
        <Route path="/booking/:slug" element={<BookingPage />} />
        <Route path="/scheduled/:slug" element={<ScheduledPage />} />
        <Route path="/all-sources" element={<AllVisitorSources />} />
        <Route path="/countries" element={<AllCountries />} />
        <Route path="/content" element={<AllContent />} />
        <Route path="/recent-purchases" element={<AllRecentPurchases />} />
        <Route path="/create-event-modal" element={<CreateEventTypeModal />} />
        <Route path="/createevent/oneonone" element={<OneOnOnePage />} />
        <Route path="/createevent/group" element={<GroupPage />} />
        <Route
          path="/"
          element={
            <ProtectRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </ProtectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectRoute>
            <DashboardLayout showHeader={false}>
              <ProfilePage />
            </DashboardLayout>
            </ProtectRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <DashboardLayout showHeader={false}>
              <FaqPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/feedback"
          element={
            <DashboardLayout showHeader={false}>
              <FeedbackPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/billingplan"
          element={
            <DashboardLayout showHeader={false}>
              <BillingPopup />
            </DashboardLayout>
          }
        />
        <Route
          path="/billing"
          element={
            <DashboardLayout showHeader={false}>
              <BillingPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/integration"
          element={
            <DashboardLayout showHeader={false}>
              <IntegrationPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/bookings"
          element={
            <DashboardLayout showHeader={false}>
              <BookingsMenu />
            </DashboardLayout>
          }
        />
        <Route
          path="/pages"
          element={
            <DashboardLayout showHeader={false}>
              <PagesMenu />
            </DashboardLayout>
          }
        />
        <Route
          path="/analytics"
          element={
            <DashboardLayout showHeader={false}>
              <AnalyticsMenu />
            </DashboardLayout>
          }
        />
        <Route
          path="/availability"
          element={
            <DashboardLayout showHeader={false}>
              <AvailabilityPage />
            </DashboardLayout>
          }
        />
      </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;
