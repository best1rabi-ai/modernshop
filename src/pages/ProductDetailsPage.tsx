import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Truck, ArrowRight, MessageCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ProductDetailsPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
      fetch('/api/products').then(res=>res.json()).then(list=> {
          const found = list.find((p:any) => p.id === Number(id));
          setProduct(found);
          setLoading(false);
      }).catch(() => setLoading(false));
  }, [id]);

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <RefreshCw className="w-10 h-10 animate-spin text-emerald-500" />
          </div>
      );
  }

  if (!product) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">المنتج غير موجود</h1>
              <Link to="/" className="text-emerald-600 font-bold hover:underline">العودة للرئيسية</Link>
          </div>
      );
  }

  return (
    <div className="bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4 flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-emerald-600 transition flex items-center gap-1">
             <ArrowRight className="w-4 h-4 rtl:rotate-180 ltr:rotate-0" /> {t("checkout.back")}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm relative">
                <img src={product.image_url || 'https://via.placeholder.com/600'} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-orange-500 text-white font-bold px-3 py-1 rounded-lg">
                    {t("product.discount")}
                </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
                <button className="w-20 h-20 rounded-xl overflow-hidden border-2 border-emerald-500 flex-shrink-0 transition-all">
                  <img src={product.image_url || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
                </button>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-emerald-600">{product.price} {t("product.currency")}</span>
                <span className="text-lg text-gray-400 line-through">{(product.price * 1.5).toFixed(0)} {t("product.currency")}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed whitespace-pre-wrap">
              {product.description || "لا يوجد وصف تفصيلي لهذا المنتج بعد."}
            </p>

            <ul className="space-y-3 mb-8 bg-emerald-50 p-6 rounded-2xl">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">منتج أصلي ذو جودة عالية ومضمونة.</span>
                </li>
            </ul>

            <div className="flex items-center gap-4 mb-8">
                <div className="font-bold text-gray-700">{t("product.qty")}</div>
                <div className="flex items-center bg-gray-100 rounded-full">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-gray-200 rtl:rounded-r-full ltr:rounded-l-full">-</button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-gray-200 rtl:rounded-l-full ltr:rounded-r-full">+</button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-auto">
              <Link to={`/checkout?product=${product.id}&qty=${quantity}`} className="bg-orange-500 text-white text-center py-4 rounded-xl font-bold text-xl hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                {t("product.buy_btn")}
              </Link>
              <button className="bg-[#25D366] text-white flex justify-center items-center gap-2 py-4 rounded-xl font-bold text-lg hover:bg-[#1ebd5a] transition">
                <MessageCircle className="w-6 h-6" /> {t("product.whatsapp_btn")}
              </button>
            </div>
            
            <div className="mt-8 flex flex-col gap-3 text-sm text-gray-500 justify-center">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 p-3 rounded-lg"><Truck className="w-5 h-5 text-emerald-600 flex-shrink-0" /> {t("product.delivery_note")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
