// src/pages/DashboardPage.js
import DashboardGrid from '../components/DashboardGrid';
import { useEffect } from "react";


export default function DashboardPage() {
  useEffect(() => {
    document.title = 'Dashboard'; // Set your desired page title here
  }, []);
  return <DashboardGrid />;
}
