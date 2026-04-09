import React from 'react';
import { ShieldCheck, Truck, HeadphonesIcon, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="pb-20 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-50 pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-emerald-100 overflow-hidden relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-orange-200 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-200 opacity-50 blur-3xl"></div>

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Text Content */}
            <div className="lg:w-5/12 text-center lg:text-start lg:rtl:text-right lg:ltr:text-left shrink-0">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black text-emerald-900 mb-6 leading-tight">
                {t("home.hero.title")} <br/>
                <span className="text-orange-500 inline-block mt-2">{t("home.hero.highlight")}</span>
              </h1>
              <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t("home.hero.desc")}
              </p>
              <a href="#products" className="inline-block bg-orange-500 text-white px-10 py-5 rounded-full text-xl font-bold shadow-xl shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300">
                {t("home.hero.btn")}
              </a>
            </div>

            {/* Image */}
            <div className="lg:w-7/12 relative w-full mx-auto">
               <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-orange-400 blur-3xl opacity-20 rounded-full"></div>
               <img 
                 src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1400&auto=format&fit=crop&q=80" 
                 alt="Modern E-commerce" 
                 className="relative z-10 w-full rounded-3xl shadow-2xl border-8 border-white transform hover:scale-[1.02] transition duration-500 object-cover h-[400px] sm:h-[500px] lg:h-[600px]" 
               />
               
               {/* Floating Badge */}
               <div className="absolute -left-6 bottom-16 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce rtl:right-10 rtl:left-auto ltr:right-auto ltr:left-10" style={{ animationDuration: '3s' }}>
                  <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                      <div className="font-black text-gray-900">تسوق آمن</div>
                      <div className="text-xs text-gray-500">مضمون 100%</div>
                  </div>
               </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-12 container mx-auto px-4 -mt-10 lg:-mt-16 relative z-20 w-full max-w-6xl">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900">{t("home.features.delivery")}</h3>
            <p className="text-sm text-gray-500">{t("home.features.delivery_desc")}</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900">{t("home.features.cod")}</h3>
            <p className="text-sm text-gray-500">{t("home.features.cod_desc")}</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900">{t("home.features.warranty")}</h3>
            <p className="text-sm text-gray-500">{t("home.features.warranty_desc")}</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <HeadphonesIcon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900">{t("home.features.support")}</h3>
            <p className="text-sm text-gray-500">{t("home.features.support_desc")}</p>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section id="products" className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">{t("home.best_sellers")}</h2>
            <p className="text-gray-500">{t("home.best_sellers_desc")}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {DUMMY_PRODUCTS.map(product => (
             <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer group flex flex-col">
                <div className="bg-gray-100 aspect-square w-full relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                        {t("product.discount")}
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex gap-2 items-center mb-4 mt-auto">
                    <span className="text-lg font-black text-emerald-600">{product.price} {t("product.currency")}</span>
                    <span className="text-sm text-gray-400 line-through">{product.originalPrice} {t("product.currency")}</span>
                  </div>
                  <button className="w-full bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold py-2 rounded-xl border border-emerald-200 transition">
                    {t("product.details_btn")}
                  </button>
                </div>
             </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
