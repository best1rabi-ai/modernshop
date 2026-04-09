import React from 'react';
import { ShieldCheck, Truck, HeadphonesIcon, RefreshCw } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="pb-20 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-50 py-16 lg:py-24 border-b border-emerald-100">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl lg:text-6xl font-black text-emerald-900 mb-6 leading-tight">
            تسوق أفضل المنتجات بأعلى جودة <br/><span className="text-orange-500 text-5xl lg:text-7xl">والدفع عند الاستلام</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            نوفر لك تجربة شراء آمنة 100%، اطلب الآن وادفع لاحقاً عند وصول المنتج لباب منزلك في أي مدينة بالمغرب.
          </p>
          <button className="bg-orange-500 text-white px-10 py-5 rounded-full text-xl font-bold shadow-xl shadow-orange-500/30 hover:bg-orange-600 hover:scale-105 transition-all duration-300">
            تصفح المنتجات الآن
          </button>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-12 container mx-auto px-4 -mt-10 relative z-10 w-full max-w-6xl">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900">توصيل لجميع المدن</h3>
            <p className="text-sm text-gray-500">من 24 إلى 48 ساعة فقط</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900">الدفع عند الاستلام</h3>
            <p className="text-sm text-gray-500">لا تدفع شيئاً حتى تتأكد من المنتج</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900">ضمان الاستبدال</h3>
            <p className="text-sm text-gray-500">استبدال مجاني في حال وجود عيب</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <HeadphonesIcon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900">دعم متواصل</h3>
            <p className="text-sm text-gray-500">خدمة عملاء طيلة أيام الأسبوع</p>
          </div>
        </div>
      </section>

      {/* Product Placeholder */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">الأكثر مبيعاً</h2>
            <p className="text-gray-500">استكشف المنتجات التي يفضلها زبناؤنا</p>
          </div>
          <a href="#" className="hidden sm:block text-emerald-600 font-bold hover:underline">عرض الكل &larr;</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map(i => (
             <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer group">
                <div className="bg-gray-100 aspect-square w-full relative overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D`} alt="Product" className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                        -20%
                    </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">ساعة الرفاهية الذكية - الإصدار الذهبي المحدود {i}</h3>
                  <div className="flex gap-2 items-center mb-4">
                    <span className="text-lg font-black text-emerald-600">349 د.م</span>
                    <span className="text-sm text-gray-400 line-through">599 د.م</span>
                  </div>
                  <button className="w-full bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold py-2 rounded-xl border border-emerald-200 transition">
                    اضف الى السلة
                  </button>
                </div>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
}
