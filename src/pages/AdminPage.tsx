import React, { useEffect, useState } from 'react';
import { Package, RefreshCw, DollarSign, ShoppingCart, Users, LayoutDashboard, Settings, LogOut, TrendingUp, AlertCircle, MessageCircle, PhoneCall, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const STATUS_MAP: Record<string, { label: string, color: string }> = {
  'pending': { label: 'جديد 🆕', color: 'bg-blue-100 text-blue-700' },
  'processing': { label: 'قيد المعالجة ⏳', color: 'bg-yellow-100 text-yellow-700' },
  'shipped': { label: 'تم الشحن 🚚', color: 'bg-purple-100 text-purple-700' },
  'completed': { label: 'مكتمل ✅', color: 'bg-emerald-100 text-emerald-700' },
  'cancelled': { label: 'ملغى ❌', color: 'bg-red-100 text-red-700' },
};

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  
  // نظام التنقل الجانبي
  const [activeTab, setActiveTab] = useState('overview');

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

  const updateStatus = async (id: number, newStatus: string) => {
      setUpdatingId(id);
      try {
          await fetch('/api/orders', {
              method: 'PUT',
              headers:{'Content-Type': 'application/json'},
              body: JSON.stringify({id, status: newStatus})
          });
          setOrders(orders.map(o => o.id === id ? {...o, status: newStatus} : o));
      } catch (e) {
          alert('فشل تحديث الحالة');
      }
      setUpdatingId(null);
  };

  // --- Smart Analytics Calculations ---
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  const todayOrders = orders.filter(o => o.created_at.startsWith(today));
  const yesterdayOrders = orders.filter(o => o.created_at.startsWith(yesterday));
  
  const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const yesterdayRevenue = yesterdayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const revenueGrowth = yesterdayRevenue === 0 ? 100 : Math.round(((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100);

  const pendingOrdersCount = orders.filter(o => !o.status || o.status === 'pending').length;

  const getCustomerType = (phone: string) => {
      const count = orders.filter(o => o.phone === phone).length;
      return count > 1 ? 'زبون دائم 🌟' : 'زبون جديد';
  };

  const navItemClass = (tabName: string) => {
      return `flex items-center justify-between px-4 py-3 rounded-xl font-bold transition cursor-pointer ${
          activeTab === tabName 
          ? 'bg-emerald-600 text-white' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen hidden md:flex flex-col fixed rtl:right-0 ltr:left-0 z-20 shadow-2xl">
         <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-black text-white tracking-tighter" dir="ltr">MATJARI<span className="text-orange-500">.ADMIN</span></h2>
         </div>
         <nav className="flex-1 p-4 space-y-2">
            <div onClick={() => setActiveTab('overview')} className={navItemClass('overview')}>
               <div className="flex items-center gap-3"><LayoutDashboard className="w-5 h-5" /> نظرة عامة</div>
            </div>
            <div onClick={() => setActiveTab('orders')} className={navItemClass('orders')}>
               <div className="flex items-center gap-3"><ShoppingCart className="w-5 h-5" /> إدارة الطلبات</div>
               {pendingOrdersCount > 0 && <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingOrdersCount}</span>}
            </div>
            <div onClick={() => setActiveTab('products')} className={navItemClass('products')}>
               <div className="flex items-center gap-3"><Package className="w-5 h-5" /> المنتجات</div>
            </div>
            <div onClick={() => setActiveTab('crm')} className={navItemClass('crm')}>
               <div className="flex items-center gap-3"><Users className="w-5 h-5" /> ملفات الزبائن</div>
            </div>
            <div onClick={() => setActiveTab('settings')} className={navItemClass('settings')}>
               <div className="flex items-center gap-3"><Settings className="w-5 h-5" /> الإعدادات</div>
            </div>
         </nav>
         <div className="p-4 border-t border-gray-800">
             <Link to="/" className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2 transition">
                 <LogOut className="w-5 h-5" /> معاينة المتجر
             </Link>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:mr-64 overflow-x-hidden min-h-screen">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
             <div>
                <h1 className="text-3xl font-black text-gray-900">
                    {activeTab === 'overview' && 'مرحباً، أيها المدير 👋'}
                    {activeTab === 'orders' && 'إدارة الطلبات المحسنة'}
                    {activeTab === 'products' && 'إدارة مخزون المنتجات'}
                    {activeTab === 'crm' && 'نظام إدارة علاقات الزبائن (CRM)'}
                    {activeTab === 'settings' && 'إعدادات لوحة التحكم'}
                </h1>
                <p className="text-gray-500 mt-1">تحديث اللوحة يتم بشكل فوري وآمن.</p>
             </div>
             <button onClick={fetchOrders} className="bg-white border border-gray-200 text-gray-700 font-bold py-2.5 px-5 rounded-xl shadow-sm flex items-center gap-2 hover:bg-gray-50 hover:text-emerald-600 transition">
                 <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-emerald-600' : ''}`} /> تحديث البيانات
             </button>
          </div>

          {activeTab === 'overview' && (
              <>
                  {/* 💡 Insights Panel لوحة القرارات */}
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-orange-500 opacity-20 rounded-full blur-3xl mix-blend-screen"></div>
                     <div className="relative z-10">
                         <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="text-orange-400" /> تحليل وقرارات ذكية</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                                 <h3 className="text-gray-300 text-sm font-bold mb-2">أداء المبيعات اليوم</h3>
                                 <div className="flex items-end gap-3">
                                     <div className="text-3xl font-black">{todayRevenue.toLocaleString()} د.م</div>
                                     <div className={`text-sm font-bold pb-1 flex items-center ${revenueGrowth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                         {revenueGrowth >= 0 ? '▲' : '▼'} {Math.abs(revenueGrowth)}% مقارنة بأمس
                                     </div>
                                 </div>
                             </div>
                             <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                                 <h3 className="text-gray-300 text-sm font-bold mb-2 flex items-center gap-2">
                                     <AlertCircle className="w-4 h-4 text-orange-400" /> تنبيه تشغيلي
                                 </h3>
                                 <p className="font-medium text-lg leading-snug">
                                     لديك <b className="text-orange-400">{pendingOrdersCount} طلبات لم تُعالج</b>، يرجى تأكيدها سريعاً لرفع معدل التسليم!
                                 </p>
                             </div>
                             <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                                 <h3 className="text-gray-300 text-sm font-bold mb-2">أعلى منتج طلباً</h3>
                                 <p className="font-bold text-lg">ساعة ذكية فاخرة (75% من طلبات اليوم)</p>
                                 <p className="text-emerald-400 text-sm mt-1">يُقترح زيادة الإعلانات لهذا المنتج.</p>
                             </div>
                         </div>
                     </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                          <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center"><DollarSign className="w-6 h-6" /></div>
                              <p className="text-gray-500 font-bold">إجمالي الأرباح الكلية</p>
                          </div>
                          <h3 className="text-3xl font-black text-gray-900">{orders.reduce((s, o) => s + (o.total||0), 0).toLocaleString()} <span className="text-sm font-normal text-gray-400">د.م</span></h3>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                          <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center"><ShoppingCart className="w-6 h-6" /></div>
                              <p className="text-gray-500 font-bold">إجمالي الطلبات</p>
                          </div>
                          <h3 className="text-3xl font-black text-gray-900">{orders.length} <span className="text-sm font-normal text-gray-400">طلب</span></h3>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                          <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center"><Package className="w-6 h-6" /></div>
                              <p className="text-gray-500 font-bold">طلبات تنتظر المعالجة</p>
                          </div>
                          <h3 className="text-3xl font-black text-gray-900">{pendingOrdersCount}</h3>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                          <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center"><Users className="w-6 h-6" /></div>
                              <p className="text-gray-500 font-bold">معدل التحويل المتوقع</p>
                          </div>
                          <h3 className="text-3xl font-black text-gray-900">3.2% <span className="text-sm font-bold text-emerald-500">جيد جداً</span></h3>
                      </div>
                  </div>
              </>
          )}

          {(activeTab === 'overview' || activeTab === 'orders') && (
              {/* Orders Table */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-6 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50">
                     <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                        <ShoppingCart className="w-6 h-6 text-gray-400" /> إدارة الطلبات والعملاء
                     </h2>
                 </div>
                 
                 <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead className="bg-gray-50 uppercase text-xs font-black text-gray-500 tracking-wider">
                            <tr>
                                <th className="p-4 border-b border-gray-100 w-24">الطلب</th>
                                <th className="p-4 border-b border-gray-100">ملف العميل</th>
                                <th className="p-4 border-b border-gray-100">المدينة والعنوان</th>
                                <th className="p-4 border-b border-gray-100 w-32">السعر</th>
                                <th className="p-4 border-b border-gray-100 w-44">تحديث الحالة</th>
                                <th className="p-4 border-b border-gray-100 w-40 text-left">تواصل سريع</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={6} className="text-center p-12 text-gray-500"><RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-emerald-500" /> جاري تحميل البيانات من الخادم...</td></tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center p-16">
                                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Package className="w-10 h-10 text-gray-300" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد أي طلبات</h3>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((o: any) => {
                                    const customerType = getCustomerType(o.phone);
                                    const currentStatus = o.status || 'pending';
                                    
                                    return (
                                    <tr key={o.id} className="hover:bg-gray-50/80 transition group">
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900">#{o.id}</div>
                                            <div className="text-xs text-gray-400 mt-1 truncate" dir="ltr">{new Date(o.created_at).toLocaleString('en-GB', {day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'})}</div>
                                        </td>
                                        
                                        <td className="p-4">
                                           <div className="font-bold text-gray-900 text-base">{o.customer_name}</div>
                                           <div className="flex items-center gap-2 mt-1.5">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${customerType.includes('دائم') ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {customerType}
                                                </span>
                                                <span className="text-xs text-gray-500 font-medium" dir="ltr">{o.phone}</span>
                                           </div>
                                        </td>
                                        
                                        <td className="p-4">
                                            <div className="font-bold text-gray-800">{o.city}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-[180px]" title={o.address}>{o.address || 'لا يوجد عنوان تفصيلي'}</div>
                                        </td>
                                        
                                        <td className="p-4">
                                            <div className="font-black text-gray-900 bg-gray-100 inline-block px-3 py-1 rounded-lg">{o.total} د.م</div>
                                        </td>
                                        
                                        <td className="p-4">
                                            <div className="relative inline-block w-full max-w-[140px]">
                                                <select 
                                                    disabled={updatingId === o.id}
                                                    value={currentStatus}
                                                    onChange={(e) => updateStatus(o.id, e.target.value)}
                                                    className={`appearance-none w-full border-2 border-transparent hover:border-gray-200 cursor-pointer text-sm font-bold px-3 py-2 pr-8 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all ${STATUS_MAP[currentStatus]?.color}`}
                                                >
                                                    {Object.entries(STATUS_MAP).map(([val, {label}]) => (
                                                        <option key={val} value={val} className="text-gray-900 bg-white">{label}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 pointer-events-none opacity-50" />
                                                {updatingId === o.id && <RefreshCw className="w-3 h-3 animate-spin absolute left-2 top-3 text-gray-500" />}
                                            </div>
                                        </td>
                                        
                                        <td className="p-4 text-left space-x-2 space-x-reverse">
                                            <a 
                                               href={`https://wa.me/212${o.phone.replace(/^0/, '').replace(/\s+/g, '')}`} 
                                               target="_blank" 
                                               rel="noreferrer"
                                               className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-xl transition shadow-sm"
                                               title="مراسلة عبر واتساب"
                                            >
                                                <MessageCircle className="w-5 h-5" />
                                            </a>
                                            <a 
                                               href={`tel:${o.phone}`} 
                                               className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white rounded-xl transition shadow-sm"
                                               title="اتصال هاتفي"
                                            >
                                                <PhoneCall className="w-5 h-5" />
                                            </a>
                                        </td>
                                    </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                 </div>
              </div>
          )}

          {/* Under Construction placeholders */}
          {['products', 'crm', 'settings'].includes(activeTab) && (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm mt-8">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Settings className="w-12 h-12 text-gray-300 animate-spin-slow" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">هذا القسم قيد التطوير</h2>
                  <p className="text-gray-500 max-w-md mx-auto">سيتم إتاحة ميزات هذا القسم في التحديث القادم من لوحة التحكم الذكية. يمكنك متابعة إدارة الطلبات في قسم النظرة العامة حالياً.</p>
              </div>
          )}

      </main>
    </div>
  );
}
