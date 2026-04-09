import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, HeadphonesIcon, RefreshCw, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error("Failed to fetch products", e);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="pb-20 bg-gray-50">
      {/* Hero Section with Full Background Image */}
      <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 border-b border-emerald-100 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1600&auto=format&fit=crop&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay so text is readable */}
          <div className="absolute inset-0 bg-emerald-950/70"></div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            {t("home.hero.title")} <br/>
            <span className="text-orange-500 inline-block mt-2 drop-shadow-lg">{t("home.hero.highlight")}</span>
          </h1>
          <p className="text-xl text-emerald-50 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md font-medium">
            {t("home.hero.desc")}
          </p>
          <a href="#products" className="inline-block bg-orange-500 text-white px-12 py-5 rounded-full text-2xl font-black shadow-2xl shadow-orange-500/50 hover:bg-orange-600 hover:-translate-y-2 hover:scale-105 transition-all duration-300">
            {t("home.hero.btn")}
          </a>
        </div>
        
        {/* Decorative fade at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>
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
          {loading ? (
             <div className="col-span-full py-20 text-center text-gray-500">
                <RefreshCw className="w-10 h-10 animate-spin mx-auto mb-4 text-emerald-500" />
                <p>جاري تحميل المنتجات...</p>
             </div>
          ) : products.length === 0 ? (
             <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد منتجات حالياً</h3>
                <p className="text-gray-500">يرجى إضافة الجداول في قاعدة بيانات Cloudflare D1 (schema.sql) لتبدأ المنتجات في الظهور.</p>
             </div>
          ) : (
            products.map(product => (
               <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer group flex flex-col">
                  <div className="bg-gray-100 aspect-square w-full relative overflow-hidden">
                      <img src={product.image_url || 'https://via.placeholder.com/400'} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                          {t("product.discount")}
                      </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex gap-2 items-center mb-4 mt-auto">
                      <span className="text-lg font-black text-emerald-600">{product.price} {t("product.currency")}</span>
                      <span className="text-sm text-gray-400 line-through">{(product.price * 1.5).toFixed(0)} {t("product.currency")}</span>
                    </div>
                    <button className="w-full bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold py-2 rounded-xl border border-emerald-200 transition">
                      {t("product.details_btn")}
                    </button>
                  </div>
               </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
