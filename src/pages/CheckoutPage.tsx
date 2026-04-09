import React, { useState } from 'react';
import { Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { useSearchParams, Link } from 'react-router-dom';

export default function CheckoutPage() {
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get('product')) || 1;
  const quantity = Number(searchParams.get('qty')) || 1;
  
  const product = DUMMY_PRODUCTS.find(p => p.id === productId) || DUMMY_PRODUCTS[0];

  if (success) {
      return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
              <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 text-center border-t-8 border-emerald-500">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 mb-4">تم تسجيل طلبك بنجاح!</h1>
                  <p className="text-gray-600 mb-8 text-lg">سنتصل بك قريباً على رقمك لتأكيد الطلب وتحديد موعد التسليم المناسب لك.</p>
                  <Link to="/" className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold w-full hover:bg-emerald-700 transition">العودة للرئيسية</Link>
              </div>
          </div>
      )
  }

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Form */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-2">معلومات التوصيل</h2>
            <p className="text-gray-500 mb-8">المرجو إدخال معلوماتك الشخصية، ولن تدفع شيئاً حتى تستلم طلبك!</p>
            
            <form onSubmit={(e) => { e.preventDefault(); setSuccess(true); }} className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل *</label>
                   <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition" placeholder="مثال: يونس العلوي" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف *</label>
                   <input required type="tel" dir="ltr" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition text-right" placeholder="06 XX XX XX XX" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">المدينة *</label>
                   <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition">
                       <option value="">-- اختر مدينتك --</option>
                       <option value="casablanca">الدار البيضاء</option>
                       <option value="rabat">الرباط</option>
                       <option value="marrakech">مراكش</option>
                       <option value="tangier">طنجة</option>
                       <option value="agadir">أكادير</option>
                       <option value="other">مدينة أخرى (سيتم تحديدها في المكالمة)</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">العنوان (اختياري)</label>
                   <textarea rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition" placeholder="مزيد من التفاصيل حول عنوانك..."></textarea>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex gap-3 text-orange-800 text-sm mt-8">
                   <ShieldCheck className="w-8 h-8 flex-shrink-0" />
                   <div>
                      <strong className="block mb-1 text-base">الدفع عند الاستلام المتوفر!</strong>
                      أنت تطلب الآن بأمان، لا توجد أي مخاطرة، ادفع فقط عندما يصلك المنتج وتتأكد منه.
                   </div>
                </div>

                <button type="submit" className="w-full bg-orange-500 text-white font-bold text-xl py-4 rounded-xl shadow-lg hover:bg-orange-600 transition hover:scale-[1.02]">
                    تأكيد الطلب الآن
                </button>
            </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">ملخص الطلب</h3>
                
                <div className="flex gap-4 mb-6">
                    <img src={product.image} className="w-20 h-20 rounded-xl object-cover" />
                    <div>
                        <h4 className="font-bold text-gray-800 line-clamp-2">{product.name}</h4>
                        <div className="text-gray-500 text-sm mt-1">الكمية: {quantity}</div>
                        <div className="font-black text-emerald-600 mt-1">{product.price * quantity} د.م</div>
                    </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>المجموع الفرعي</span>
                        <span>{product.price * quantity} د.م</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>التوصيل</span>
                        <span className="text-emerald-600 font-bold">مجاني فابور والتوصيل سريع 🚚</span>
                    </div>
                    <div className="flex justify-between font-black text-xl text-gray-900 pt-4 mt-2 border-t border-gray-100">
                        <span>المجموع النهائي</span>
                        <span className="text-orange-500">{product.price * quantity} د.م</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
