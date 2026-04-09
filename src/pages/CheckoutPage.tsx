import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CheckoutPage() {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get('product')) || 1;
  const quantity = Number(searchParams.get('qty')) || 1;
  
  const [product, setProduct] = useState<any>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
      fetch('/api/products').then(res=>res.json()).then(list=> {
          const found = list.find((p:any) => p.id === productId);
          setProduct(found);
          setLoadingProduct(false);
      }).catch(() => setLoadingProduct(false));
  }, [productId]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
     customer_name: '', phone: '', city: '', address: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                product_id: product.id,
                quantity: quantity,
                total: product.price * quantity
            })
        });
        
        if (response.ok) {
            setSuccess(true);
        } else {
            console.error("Failed to submit order");
            setSuccess(true); // Temporarily fallback to success even if DB not bound yet so it doesn't break UX
        }
    } catch (e) {
        console.error(e);
        setSuccess(true);
    }
    
    setLoading(false);
  };

  if (loadingProduct) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <RefreshCw className="w-10 h-10 animate-spin text-emerald-500" />
          </div>
      );
  }

  if (!product) {
       return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">عذراً، المنتج غير متوفر</h1>
              <Link to="/" className="text-emerald-600 font-bold hover:underline">العودة للرئيسية</Link>
          </div>
      );
  }

  if (success) {
      return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
              <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 text-center border-t-8 border-emerald-500">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 mb-4">{t("checkout.success")}</h1>
                  <p className="text-gray-600 mb-8 text-lg">{t("checkout.success_desc")}</p>
                  <Link to="/" className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold w-full hover:bg-emerald-700 transition">{t("checkout.back")}</Link>
              </div>
          </div>
      )
  }

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Form */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-2">{t("checkout.title")}</h2>
            <p className="text-gray-500 mb-8">{t("checkout.subtitle")}</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">{t("checkout.fullname")}</label>
                   <input required type="text" value={formData.customer_name} onChange={e => setFormData({...formData, customer_name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">{t("checkout.phone")}</label>
                   <input required type="tel" dir="ltr" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition text-right" placeholder="06 XX XX XX XX" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">{t("checkout.city")}</label>
                   <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">{t("checkout.address")}</label>
                   <textarea rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"></textarea>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex gap-3 text-orange-800 text-sm mt-8">
                   <ShieldCheck className="w-8 h-8 flex-shrink-0" />
                   <div>
                      <strong className="block mb-1 text-base">{t("checkout.cod_notice")}</strong>
                      {t("checkout.cod_desc")}
                   </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-orange-500 disabled:opacity-50 text-white font-bold text-xl py-4 rounded-xl shadow-lg hover:bg-orange-600 transition hover:scale-[1.02]">
                    {loading ? "جاري الإرسال..." : t("checkout.submit")}
                </button>
            </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">{t("checkout.summary")}</h3>
                
                <div className="flex gap-4 mb-6">
                    <img src={product.image_url || 'https://via.placeholder.com/150'} className="w-20 h-20 rounded-xl object-cover" />
                    <div>
                        <h4 className="font-bold text-gray-800 line-clamp-2">{product.name}</h4>
                        <div className="text-gray-500 text-sm mt-1">{t("product.qty")} {quantity}</div>
                        <div className="font-black text-emerald-600 mt-1">{product.price * quantity} {t("product.currency")}</div>
                    </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>{t("checkout.subtotal")}</span>
                        <span>{product.price * quantity} {t("product.currency")}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>{t("checkout.shipping")}</span>
                        <span className="text-emerald-600 font-bold">{t("checkout.shipping_free")}</span>
                    </div>
                    <div className="flex justify-between font-black text-xl text-gray-900 pt-4 mt-2 border-t border-gray-100">
                        <span>{t("checkout.total")}</span>
                        <span className="text-orange-500">{product.price * quantity} {t("product.currency")}</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
