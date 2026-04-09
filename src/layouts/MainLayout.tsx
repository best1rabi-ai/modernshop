import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-emerald-700 text-white text-center py-2 text-xs font-bold md:text-sm">
        🚚 توصيل سريع لجميع مدن المغرب + الدفع دائماً عند الاستلام!
      </div>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
