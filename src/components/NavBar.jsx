import React, { useState } from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { HiMenu, HiX } from "react-icons/hi";
import appLogo from "../assets/logo.png";



  

export default function NavBar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
   const toggleMenu = () => setMenuOpen(!menuOpen);
 
  
  return (
    <header>
      <div  className="bg-emerald-700 text-white  shadow dark:bg-gray-900 dark:text-white  px-5 py-2.5 flex  justify-between items-center">
         {/* LEFT: SOFTWARE LOGO  */}
        
          <div>
             <img
                src={appLogo}
                alt="Transcript Software Logo"
                className="w-12 h-9 md:w-20 md:h-20 border-2 md:border-2 bg-red-600 border-gray-900 object-contain rounded-full"
              />
          </div>
          <div >
              <h1 className="text-center text-2xl font-bold ">
                  📘 Digital Marksheet System
              </h1>
              <p className="text-center text-sm opacity-90 font-bold">
                    Your Own Institute ,Own Asset !
              </p>
          </div>

          <div>
            <nav className="flex gap-2 text-lg font-semibold">
                  {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-2">
                <Link to="/" className="hover:text-black text-sm font-bold">{t("home")}</Link>
                <Link to="/help" className="hover:text-black text-sm font-bold">{t("help")}</Link>
                <Link to="/privacy" className="hover:text-black text-sm font-bold">{t("privacy")}</Link>
                <Link to="/terms" className="hover:text-black text-sm font-bold">{t("terms")}</Link>
                <LanguageSwitcher />
              </div>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden p-2 rounded-md focus:outline-none"
                onClick={toggleMenu}
              >
                {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
              </button>
          

            </nav>
          </div>
        
       
    </div>
    
              {/* Mobile Menu */}
              {menuOpen && (
                <div className="pt-2 md:hidden bg-black text-white flex flex-col items-center gap-2 px-6 pb-4">
                  <Link to="/" className="text-center rounded-full text-xl bg-gray-800 w-full hover:border hover:border-amber-400 ">{t("home")}</Link>
                  <Link to="/help" className="text-center rounded-full text-xl bg-gray-800 w-full hover:border hover:border-amber-400">{t("help")}</Link>
                  <Link to="/privacy" className="text-center rounded-full text-xl bg-gray-800 w-full hover:border hover:border-amber-400">{t("privacy")}</Link>
                  <Link to="/terms" className="text-center rounded-full text-xl bg-gray-800 w-full hover:border hover:border-amber-400">{t("terms")}</Link>
                  <div className="py-2 bg-black">
                    <LanguageSwitcher />
                  </div>
                </div>
              )}
    </header>
  );
}
