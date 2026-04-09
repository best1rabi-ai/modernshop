document.getElementById('purchase-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;

    // التحقق من رقم الهاتف المغربي (يتكون من 10 أرقام ويبدأ بـ 06 أو 07 أو 05)
    const phonePattern = /^(05|06|07)\d{8}$/;
    
    if(!phonePattern.test(phone.trim())) {
        alert("يرجى إدخال رقم هاتف مغربي صحيح (10 أرقام ويبدأ بـ 06 أو 07)");
        return;
    }

    // إرسال البيانات إلى الخادم (Backend)
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = "جاري الحفظ...";
    btn.disabled = true;

    fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, city })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            window.location.href = "thankyou.html";
        } else {
            alert(data.error || "حدث خطأ أثناء التسجيل");
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    })
    .catch(err => {
        alert("تعذر الاتصال بالخادم، المرجو المحاولة لاحقاً");
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
});