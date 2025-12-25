// src/components/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { BsGlobe } from "react-icons/bs";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "EN" ? "BN" : "EN");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 bg-white text-gray-800 px-3 py-1 rounded-full hover:bg-gray-100 transition "
    >
      <BsGlobe size={18} />
      {i18n.language === "EN" ? "BN" : "EN"}
    </button>
  );
}
