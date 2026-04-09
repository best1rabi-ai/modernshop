document.addEventListener('DOMContentLoaded', () => {
    const loginOverlay = document.getElementById('loginOverlay');
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('adminPassword');
    const loginError = document.getElementById('loginError');
    const ordersTableBody = document.getElementById('ordersTableBody');
    const totalOrdersEl = document.getElementById('totalOrders');
    const logoutBtn = document.getElementById('logoutBtn');

    let adminCredentials = localStorage.getItem('admin_credentials');
    
    if (adminCredentials) {
        verifyAndFetchOrders();
    } else {
        loginOverlay.classList.remove('hidden');
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = passwordInput.value;
        const base64creds = btoa(`admin:${pwd}`);
        adminCredentials = `Basic ${base64creds}`;
        verifyAndFetchOrders();
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('admin_credentials');
        loginOverlay.classList.remove('hidden');
    });

    async function verifyAndFetchOrders() {
        try {
            loginError.classList.add('hidden');
            const response = await fetch('/api/orders', {
                headers: {
                    'Authorization': adminCredentials
                }
            });

            if (response.status === 401) {
                localStorage.removeItem('admin_credentials');
                adminCredentials = null;
                loginOverlay.classList.remove('hidden');
                if (passwordInput.value !== '') {
                    loginError.classList.remove('hidden');
                }
                return;
            }

            if (!response.ok) throw new Error("Server Error");

            localStorage.setItem('admin_credentials', adminCredentials);
            loginOverlay.classList.add('hidden');
            
            const data = await response.json();
            renderOrders(data.orders);

        } catch (err) {
            console.error(err);
            alert("حدث خطأ في الاتصال بالخادم");
        }
    }

    function renderOrders(orders) {
        if (!orders || orders.length === 0) {
            ordersTableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-gray-500">لا توجد طلبات بعد.</td></tr>`;
            totalOrdersEl.textContent = "0";
            return;
        }

        totalOrdersEl.textContent = orders.length;
        ordersTableBody.innerHTML = '';

        orders.forEach(order => {
            const date = new Date(order.created_at).toLocaleString('ar-MA');
            
            let statusColor = "bg-gray-100 text-gray-600";
            if (order.status === 'جديد') statusColor = "bg-blue-100 text-blue-700";
            if (order.status === 'تم الشحن') statusColor = "bg-orange-100 text-orange-700";
            if (order.status === 'تم التوصيل') statusColor = "bg-green-100 text-green-700";
            if (order.status === 'ملغى') statusColor = "bg-red-100 text-red-700";

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="p-4 font-bold text-gray-900">#${order.id}</td>
                <td class="p-4">${order.name}</td>
                <td class="p-4" dir="ltr">${order.phone}</td>
                <td class="p-4">${order.city}</td>
                <td class="p-4 text-sm text-gray-500">${date}</td>
                <td class="p-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold ${statusColor}">${order.status}</span>
                </td>
                <td class="p-4">
                    <select class="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-emerald-500 p-2 outline-none" onchange="updateStatus(${order.id}, this.value)">
                        <option value="">تغيير...</option>
                        <option value="جديد">جديد</option>
                        <option value="تم الشحن">تم الشحن</option>
                        <option value="تم التوصيل">تم التوصيل</option>
                        <option value="ملغى">ملغى</option>
                    </select>
                </td>
            `;
            ordersTableBody.appendChild(tr);
        });
    }

    window.updateStatus = async function(id, newStatus) {
        if (!newStatus || !adminCredentials) return;
        
        try {
            const response = await fetch('/api/orders', {
                method: 'PATCH',
                headers: {
                    'Authorization': adminCredentials,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, status: newStatus })
            });

            if (response.ok) {
                verifyAndFetchOrders();
            } else {
                alert("لم يتم التحديث");
            }
        } catch (err) {
            console.error(err);
            alert("خطأ في الاتصال");
        }
    };
});
