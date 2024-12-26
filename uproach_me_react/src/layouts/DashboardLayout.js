// src/layouts/DashboardLayout.js
import Sidebar from '../components/DashboardGrid/Sidebar';
import Header from '../components/Header';

export default function DashboardLayout({ children, showHeader = true }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {showHeader && <Header />} {/* Show header only if showHeader is true */}
        <div>{children}</div>
      </main>
    </div>
  );
}
