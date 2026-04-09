import React from 'react';
import { ShoppingCart, Search, Menu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
      const newLang = i18n.language === 'ar' ? 'fr' : 'ar';
      i18n.changeLanguage(newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Menu className="w-6 h-6 text-gray-600 lg:hidden cursor-pointer" />
          <Link to="/" className="text-2xl font-black text-emerald-800 tracking-tighter" dir="ltr">
            MATJARI<span className="text-orange-500">.MA</span>
          </Link>
        </div>
        
        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <input type="text" placeholder={t("navbar.search")} className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-4 rtl:pl-10 rtl:pr-4 ltr:pr-10 ltr:pl-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
            <Search className="absolute rtl:left-3 ltr:right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleLanguage} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-1 font-bold text-sm">
             <Globe className="w-5 h-5" />
             {i18n.language.toUpperCase()}
          </button>
          <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full transition">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
