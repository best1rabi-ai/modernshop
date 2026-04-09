import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t-4 border-emerald-600">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-black text-white mb-4 tracking-tighter" dir="ltr">MATJARI<span className="text-orange-500">.MA</span></h3>
          <p className="text-gray-400 text-sm leading-relaxed">{t("footer.desc")}</p>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">{t("footer.links")}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition">{t("home.best_sellers")}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">{t("footer.customer_service")}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition">{t("home.features.warranty")}</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition">{t("home.features.support")}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">{t("footer.contact")}</h4>
          <p className="text-sm text-gray-400 mb-2" dir="ltr">+212 600 000 000</p>
          <p className="text-sm text-gray-400 mb-4">contact@matjari.ma</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-600 mt-12 pt-8 border-t border-gray-800">
        &copy; 2026 Matjari.ma - جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
