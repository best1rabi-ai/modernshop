import React, { useEffect, useState } from 'react';
import { Package, RefreshCw } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-4">
       <div className="container mx-auto max-w-6xl text-right" dir="rtl">
          <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-8 border border-gray-100">
             <div className="flex items-center gap-3">
                 <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                     <Package className="w-8 h-8" />
                 </div>
                 <div>
                    <h1 className="text-2xl font-black text-gray-900">لوحة تحكم الإدارة</h1>
                    <p className="text-gray-500 text-sm">مراقبة الطلبات الواردة من موقع Modern Shop</p>
                 </div>
             </div>
             <div className="flex gap-3">
                <Link to="/" className="bg-gray-100 text-gray-700 font-bold py-2 px-5 rounded-lg hover:bg-gray-200 transition">العودة للمتجر</Link>
                <button onClick={fetchOrders} className="bg-emerald-600 text-white font-bold py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition">
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /> تحديث
                </button>
             </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-bold text-gray-700">رقم الطلب</th>
                            <th className="p-4 font-bold text-gray-700">العميل</th>
                            <th className="p-4 font-bold text-gray-700">الهاتف</th>
                            <th className="p-4 font-bold text-gray-700">المدينة</th>
                            <th className="p-4 font-bold text-gray-700">العنوان</th>
                            <th className="p-4 font-bold text-gray-700">الإجمالي</th>
                            <th className="p-4 font-bold text-gray-700">التاريخ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={7} className="text-center p-8 text-gray-500">جاري تحميل الطلبات...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan={7} className="text-center p-8 text-gray-500">لا توجد طلبات حتى الآن.</td></tr>
                        ) : (
                            orders.map((o: any) => (
                                <tr key={o.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 text-emerald-600 font-bold">#{o.id}</td>
                                    <td className="p-4 font-bold text-gray-900">{o.customer_name}</td>
                                    <td className="p-4 text-gray-600" dir="ltr">{o.phone}</td>
                                    <td className="p-4 text-gray-600">{o.city}</td>
                                    <td className="p-4 text-gray-500 text-sm max-w-[200px] truncate">{o.address || '-'}</td>
                                    <td className="p-4 font-bold text-orange-500">{o.total} د.م</td>
                                    <td className="p-4 text-gray-400 text-sm" dir="ltr">{new Date(o.created_at).toLocaleString('en-GB')}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
             </div>
          </div>
       </div>
    </div>
  );
}
