import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  ar: {
    translation: {
      "navbar.search": "ابحث عن منتج...",
      "layout.banner": "🚚 توصيل سريع لجميع مدن المغرب + الدفع دائماً عند الاستلام!",
      "footer.desc": "متجرك الأول في المغرب للتسوق الآمن عبر الإنترنت، الدفع عند الاستلام والتوصيل السريع لجميع المدن.",
      "footer.links": "روابط سريعة",
      "footer.customer_service": "خدمة الزبناء",
      "footer.contact": "تواصل معنا",
      "home.hero.title": "تسوق أفضل المنتجات بأعلى جودة",
      "home.hero.highlight": "والدفع عند الاستلام",
      "home.hero.desc": "نوفر لك تجربة شراء آمنة 100%، اطلب الآن وادفع لاحقاً عند وصول المنتج لباب منزلك في أي مدينة بالمغرب.",
      "home.hero.btn": "تصفح المنتجات الآن",
      "home.features.delivery": "توصيل لجميع المدن",
      "home.features.delivery_desc": "من 24 إلى 48 ساعة فقط",
      "home.features.cod": "الدفع عند الاستلام",
      "home.features.cod_desc": "لا تدفع شيئاً حتى تتأكد من المنتج",
      "home.features.warranty": "ضمان الاستبدال",
      "home.features.warranty_desc": "استبدال مجاني في حال وجود عيب",
      "home.features.support": "دعم متواصل",
      "home.features.support_desc": "خدمة عملاء طيلة أيام الأسبوع",
      "home.best_sellers": "الأكثر مبيعاً",
      "home.best_sellers_desc": "استكشف المنتجات التي يفضلها زبناؤنا",
      "product.discount": "تخفيض!",
      "product.currency": "د.م",
      "product.details_btn": "تفاصيل أكثر",
      "product.qty": "الكمية:",
      "product.buy_btn": "أطلب الآن (الدفع عند الاستلام)",
      "product.whatsapp_btn": "الطلب السريع عبر واتساب",
      "product.delivery_note": "توصيل سريع لجميع المدن: 24 - 48 ساعة",
      "checkout.title": "معلومات التوصيل",
      "checkout.subtitle": "المرجو إدخال معلوماتك الشخصية، ولن تدفع شيئاً حتى تستلم طلبك!",
      "checkout.fullname": "الاسم الكامل *",
      "checkout.phone": "رقم الهاتف *",
      "checkout.city": "المدينة *",
      "checkout.address": "العنوان (اختياري)",
      "checkout.cod_notice": "الدفع عند الاستلام المتوفر!",
      "checkout.cod_desc": "أنت تطلب الآن بأمان، لا توجد أي مخاطرة، ادفع فقط عندما يصلك المنتج وتتأكد منه.",
      "checkout.submit": "تأكيد الطلب الآن",
      "checkout.summary": "ملخص الطلب",
      "checkout.subtotal": "المجموع الفرعي",
      "checkout.shipping": "التوصيل",
      "checkout.shipping_free": "مجاني فابور والتوصيل سريع 🚚",
      "checkout.total": "المجموع النهائي",
      "checkout.success": "تم تسجيل طلبك بنجاح!",
      "checkout.success_desc": "سنتصل بك قريباً على رقمك لتأكيد الطلب وتحديد موعد التسليم المناسب لك.",
      "checkout.back": "العودة للرئيسية"
    }
  },
  fr: {
    translation: {
      "navbar.search": "Rechercher un produit...",
      "layout.banner": "🚚 Livraison rapide partout au Maroc + Paiement à la livraison !",
      "footer.desc": "Votre première boutique au Maroc pour des achats en ligne sécurisés. Paiement à la livraison et expédition rapide.",
      "footer.links": "Liens Rapides",
      "footer.customer_service": "Service Client",
      "footer.contact": "Contactez-nous",
      "home.hero.title": "Achetez les meilleurs produits",
      "home.hero.highlight": "Paiement à la livraison",
      "home.hero.desc": "Une expérience d'achat 100% sécurisée. Commandez maintenant et payez à la réception chez vous partout au Maroc.",
      "home.hero.btn": "Parcourir les produits",
      "home.features.delivery": "Livraison partout",
      "home.features.delivery_desc": "Entre 24 et 48 heures",
      "home.features.cod": "Paiement à la livraison",
      "home.features.cod_desc": "Ne payez rien avant de recevoir",
      "home.features.warranty": "Garantie",
      "home.features.warranty_desc": "Échange gratuit en cas de défaut",
      "home.features.support": "Support continu",
      "home.features.support_desc": "Service commercial 7j/7",
      "home.best_sellers": "Meilleures ventes",
      "home.best_sellers_desc": "Découvrez les favoris de nos clients",
      "product.discount": "Promo !",
      "product.currency": "Dhs",
      "product.details_btn": "Plus de détails",
      "product.qty": "Quantité:",
      "product.buy_btn": "Commander (Paiement à la livraison)",
      "product.whatsapp_btn": "Commande rapide WhatsApp",
      "product.delivery_note": "Livraison rapide : 24 - 48 heures",
      "checkout.title": "Informations de livraison",
      "checkout.subtitle": "Entrez vos informations, vous ne paierez rien qu'à la livraison !",
      "checkout.fullname": "Nom complet *",
      "checkout.phone": "Téléphone *",
      "checkout.city": "Ville *",
      "checkout.address": "Adresse (Optionel)",
      "checkout.cod_notice": "Paiement à la livraison garanti !",
      "checkout.cod_desc": "Achetez en toute sécurité, aucun risque, vous payez uniquement à la réception.",
      "checkout.submit": "Confirmer la commande",
      "checkout.summary": "Résumé de commande",
      "checkout.subtotal": "Sous-total",
      "checkout.shipping": "Livraison",
      "checkout.shipping_free": "Gratuite et rapide 🚚",
      "checkout.total": "Total",
      "checkout.success": "Votre commande est confirmée !",
      "checkout.success_desc": "Nous vous appellerons bientôt pour confirmer l'expédition.",
      "checkout.back": "Retour à l'accueil"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ar", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
