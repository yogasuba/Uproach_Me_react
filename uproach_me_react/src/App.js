import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import { AllContent, AllCountries, AllVisitorSources, AllRecentPurchases } from "./components";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
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
        <Route path="/" element={<SignIn />} />
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
          path="/dashboard"
          element={
            <ProtectedRoute>
            <DashboardLayout showHeader={true}>
              <DashboardPage />
            </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
            <DashboardLayout showHeader={false}>
              <ProfilePage />
            </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
            <DashboardLayout showHeader={false}>
              <FaqPage />
            </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
            <DashboardLayout showHeader={false}>
              <FeedbackPage />
            </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/billingplan"
          element={
            <ProtectedRoute>
            <DashboardLayout showHeader={false}>
              <BillingPopup />
            </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
            <DashboardLayout showHeader={false}>
              <BillingPage />
            </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/integration"
          element={
            <ProtectedRoute>
            <DashboardLayout showHeader={false}>
              <IntegrationPage />
            </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
            <DashboardLayout showHeader={false}>
              <BookingsMenu />
            </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pages"
          element={
            <ProtectedRoute>
            <DashboardLayout showHeader={false}>
              <PagesMenu />
            </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
            <DashboardLayout showHeader={false}>
              <AnalyticsMenu />
            </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;
