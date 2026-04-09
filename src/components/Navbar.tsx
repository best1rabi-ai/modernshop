import React from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Menu className="w-6 h-6 text-gray-600 lg:hidden cursor-pointer" />
          <Link to="/" className="text-2xl font-black text-emerald-800 tracking-tighter">
            MATJARI<span className="text-orange-500">.MA</span>
          </Link>
        </div>
        
        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <input type="text" placeholder="ابحث عن منتج..." className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-4 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full transition">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
