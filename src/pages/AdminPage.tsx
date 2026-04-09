import React, { useEffect, useState } from 'react';
import { Package, RefreshCw, DollarSign, ShoppingCart, Users, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        setOrders(data);
    } catch (e) {
        console.error("Failed to fetch orders", e);
    }
    setLoading(false);
  };

  useEffect(() => {
     fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen hidden md:flex flex-col">
         <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-black text-white tracking-tighter" dir="ltr">MATJARI<span className="text-orange-500">.ADMIN</span></h2>
         </div>
         <nav className="flex-1 p-4 space-y-2">
            <a href="#" className="flex items-center gap-3 bg-emerald-600 text-white px-4 py-3 rounded-xl font-bold transition">
               <LayoutDashboard className="w-5 h-5" /> نظرة عامة
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-xl transition">
               <ShoppingCart className="w-5 h-5" /> إدارة الطلبات
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-xl transition">
               <Package className="w-5 h-5" /> المنتجات
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-xl transition">
               <Users className="w-5 h-5" /> الزبناء
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-xl transition">
               <Settings className="w-5 h-5" /> الإعدادات
            </a>
         </nav>
         <div className="p-4 border-t border-gray-800">
             <Link to="/" className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2 transition">
                 <LogOut className="w-5 h-5" /> العودة للمتجر
             </Link>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
             <div>
                <h1 className="text-3xl font-black text-gray-900">مرحباً بك في لوحة التحكم 👋</h1>
                <p className="text-gray-500 mt-1">إليك نظرة عامة على نشاط متجرك اليوم.</p>
             </div>
             <button onClick={fetchOrders} className="bg-white border border-gray-200 text-gray-700 font-bold py-2.5 px-5 rounded-xl shadow-sm flex items-center gap-2 hover:bg-gray-50 hover:text-emerald-600 transition">
                 <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-emerald-600' : ''}`} /> تحديث البيانات
             </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                      <p className="text-gray-500 font-bold mb-1">إجمالي المبيعات المحتملة</p>
                      <h3 className="text-3xl font-black text-gray-900">{totalRevenue.toLocaleString()} <span className="text-xl text-gray-400">د.م</span></h3>
                  </div>
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                      <DollarSign className="w-7 h-7" />
                  </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                      <p className="text-gray-500 font-bold mb-1">إجمالي الطلبات</p>
                      <h3 className="text-3xl font-black text-gray-900">{totalOrders} <span className="text-xl text-gray-400">طلب</span></h3>
                  </div>
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                      <ShoppingCart className="w-7 h-7" />
                  </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                      <p className="text-gray-500 font-bold mb-1">الزوار اليوم (تقريبي)</p>
                      <h3 className="text-3xl font-black text-gray-900">+124 <span className="text-xl text-gray-400">زائر</span></h3>
                  </div>
                  <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                      <Users className="w-7 h-7" />
                  </div>
              </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                 <h2 className="text-xl font-bold text-gray-900">أحدث الطلبات (الدفع عند الاستلام)</h2>
                 <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">{orders.length} طلبات جديدة</span>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 font-bold text-gray-500 text-sm border-b border-gray-100">رقم الطلب</th>
                            <th className="p-4 font-bold text-gray-500 text-sm border-b border-gray-100">العميل</th>
                            <th className="p-4 font-bold text-gray-500 text-sm border-b border-gray-100">الهاتف</th>
                            <th className="p-4 font-bold text-gray-500 text-sm border-b border-gray-100">المدينة / العنوان</th>
                            <th className="p-4 font-bold text-gray-500 text-sm border-b border-gray-100">الإجمالي</th>
                            <th className="p-4 font-bold text-gray-500 text-sm border-b border-gray-100">الحالة</th>
                            <th className="p-4 font-bold text-gray-500 text-sm border-b border-gray-100">التاريخ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr><td colSpan={7} className="text-center p-12 text-gray-500"><RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-emerald-500" /> جاري تحميل البيانات من الخادم...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center p-16">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ShoppingCart className="w-10 h-10 text-gray-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد طلبات حتى الآن</h3>
                                    <p className="text-gray-500">عندما يقوم الزبائن بالطلب، ستظهر بياناتهم في هذا الجدول.</p>
                                </td>
                            </tr>
                        ) : (
                            orders.map((o: any) => (
                                <tr key={o.id} className="hover:bg-gray-50 transition group cursor-pointer">
                                    <td className="p-4 text-gray-900 font-bold whitespace-nowrap">#{o.id}</td>
                                    <td className="p-4">
                                       <div className="font-bold text-gray-900">{o.customer_name}</div>
                                    </td>
                                    <td className="p-4 text-emerald-600 font-bold" dir="ltr">{o.phone}</td>
                                    <td className="p-4">
                                        <div className="font-bold text-gray-800">{o.city}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-[150px]">{o.address || 'لا يوجد عنوان تفصيلي'}</div>
                                    </td>
                                    <td className="p-4 font-black text-orange-500 whitespace-nowrap">{o.total} د.م</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 font-bold text-xs rounded-full ${o.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {o.status === 'completed' ? 'مكتمل' : 'قيد المراجعة'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400 text-sm whitespace-nowrap" dir="ltr">{new Date(o.created_at).toLocaleString('en-GB', {day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'})}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
             </div>
          </div>

      </main>
    </div>
  );
}
