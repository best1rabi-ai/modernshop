import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Truck, ArrowRight, MessageCircle } from 'lucide-react';
import { DUMMY_PRODUCTS } from '../data/dummy';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = DUMMY_PRODUCTS.find(p => p.id === Number(id)) || DUMMY_PRODUCTS[0];
  const [activeImage, setActiveImage] = useState(product.gallery[0] || product.image);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-gray-50 pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4 flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-emerald-600 transition flex items-center gap-1">
             <ArrowRight className="w-4 h-4" /> الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate font-semibold">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm relative">
                <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-orange-500 text-white font-bold px-3 py-1 rounded-lg">
                    تخفيض!
                </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.gallery.map((img, i) => (
                <button 
                    key={i} 
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${activeImage === img ? 'border-emerald-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-emerald-600">{product.price} د.م</span>
                <span className="text-lg text-gray-400 line-through">{product.originalPrice} د.م</span>
              </div>
              <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                وفر {product.originalPrice - product.price} د.م
              </div>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <ul className="space-y-3 mb-8 bg-emerald-50 p-6 rounded-2xl">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 mb-8">
                <div className="font-bold text-gray-700">الكمية:</div>
                <div className="flex items-center bg-gray-100 rounded-full">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-gray-200 rounded-r-full">-</button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-gray-200 rounded-l-full">+</button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-auto">
              <Link to={`/checkout?product=${product.id}&qty=${quantity}`} className="bg-orange-500 text-white text-center py-4 rounded-xl font-bold text-xl hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                أطلب الآن (الدفع عند الاستلام)
              </Link>
              <button className="bg-[#25D366] text-white flex justify-center items-center gap-2 py-4 rounded-xl font-bold text-lg hover:bg-[#1ebd5a] transition">
                <MessageCircle className="w-6 h-6" /> الطلب السريع عبر واتساب
              </button>
            </div>
            
            <div className="mt-8 flex flex-col gap-3 text-sm text-gray-500 justify-center">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 p-3 rounded-lg"><Truck className="w-5 h-5 text-emerald-600 flex-shrink-0" /> توصيل سريع لجميع المدن: 24 - 48 ساعة</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
