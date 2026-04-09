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

    // هنا نقوم بتمثيل عملية الإرسال بنجاح
    const btn = e.target.querySelector('button');
    btn.innerHTML = "جاري الحفظ...";
    btn.disabled = true;

    // محاكاة الانتقال لصفحة الشكر بعد 1.5 ثانية
    setTimeout(() => {
        window.location.href = "thankyou.html";
    }, 1500);
});