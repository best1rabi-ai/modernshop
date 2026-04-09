import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

export default function MainLayout() {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-emerald-700 text-white text-center py-2 text-xs font-bold md:text-sm">
        {t("layout.banner")}
      </div>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
