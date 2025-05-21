import React, { useState, useEffect, useCallback } from 'react';
import logoJDIHN from "/src/assets/jdihn.png";
import pu from "../assets/pu.png";
import { useNavigate } from "react-router-dom";
import { getJenisPeraturan } from "../services/header.services"; // Pastikan path ini benar
import { useTranslation } from 'react-i18next';

// Custom Hook untuk posisi scroll (dipindahkan ke luar komponen)
function useScrollPositionHook() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollPosition;
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Original: isOpen
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null); // Original: isOpenSubmenu (dengan value string)
  const [jnsPeraturan, setJnsPeraturan] = useState([]);
  const scrollPosition = useScrollPositionHook();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    getJenisPeraturan().then((result) => {
      setJnsPeraturan(result);
    }).catch(error => {
      console.error("Gagal mengambil Jenis Peraturan:", error);
    });
  }, []);

  const handleNavigateAndCloseMenu = useCallback((link = '') => {
    navigate(`/${link}`);
    window.scrollTo(0, 0);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setActiveMobileSubmenu(null);
    }
  }, [navigate, isMobileMenuOpen]);

  const handleHamburgerToggle = () => { // Original: hendelHuberger
    const newOpenState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newOpenState);
    if (!newOpenState) {
      setActiveMobileSubmenu(null);
    }
  };

  const handleMobileSubmenuToggle = (submenuName) => { // Original: handelClickSubmenu
    setActiveMobileSubmenu(prev => (prev === submenuName ? null : submenuName));
  };

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  // CSS untuk hamburger icon dari kode asli Anda (pastikan ada di CSS global)
  // .hamburger-line { /* ... */ }
  // .humberger-aktif > span:nth-child(1) { /* ... */ }
  // .humberger-aktif > span:nth-child(2) { /* ... */ }
  // .humberger-aktif > span:nth-child(3) { /* ... */ }

  return (
    <section
      className={`sticky top-0 z-50 md:px-[60px] bg-bluePu ${ // md:px-[60px] mungkin perlu penyesuaian untuk tablet
        scrollPosition === 0
          ? "bg-opacity-0"
          : scrollPosition <= 70
            ? "bg-opacity-30"
            : "bg-opacity-100"
        }`}
      aria-label="Header navigasi utama"
    >
      <div className='container flex max-w-none justify-between items-center w-full h-16 md:h-20 px-4 md:px-0'> {/* h-16 untuk mobile/tablet, md:h-20 untuk desktop */}

        {/* Logo Section */}
        <div className='flex items-center group shrink-0'> {/* shrink-0 untuk mencegah logo mengecil terlalu banyak */}
          <img
            src={logoJDIHN}
            alt="JDIHN"
            className='h-10 sm:h-12 md:h-12 lg:h-[65px] py-2 px-2 hidden md:block cursor-pointer' // Ukuran disesuaikan, md:block bisa jadi lg:block
            onClick={() => handleNavigateAndCloseMenu("")}
          />
          <img
            src={pu}
            alt="Pekerjaan Umum"
            // Pertimbangkan ukuran spesifik untuk tablet jika h-12 terlalu besar/kecil
            className='h-10 sm:h-12 md:h-12 lg:h-[65px] py-2 px-2 cursor-pointer' // sm:w-[110px] dihapus jika menyebabkan masalah, biarkan height mengontrol
            onClick={() => handleNavigateAndCloseMenu("")}
          />
        </div>

        {/* Desktop Navigation */}
        {/* KUNCI: Kapan navigasi ini muncul? `md:flex` mungkin terlalu cepat. Pertimbangkan `lg:flex` */}
        <div className="hidden lg:flex items-center font-roboto font-normal">
          {/* Navigasi Utama: text-[25px] dan gap-8 mungkin terlalu besar untuk tablet */}
          {/* Solusi: Kurangi ukuran font & gap untuk `md` (tablet) dan kembalikan ke nilai asli untuk `lg` (desktop besar) */}
          <nav className="flex gap-4 md:gap-6 lg:gap-8 text-white text-base md:text-[15px] lg:text-[15px] font-medium">
            {/* mr-[-64px] mungkin perlu disesuaikan atau hanya berlaku di `lg` */}
            {/* Jika mr-[-64px] adalah untuk "menarik" elemen ke kanan, pastikan ini tidak menyebabkan overflow di tablet */}

            <a
              href="#"
              className="hover:text-slate-300 whitespace-nowrap" // whitespace-nowrap agar tidak pecah baris per item
              onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu(""); }}
            >
              {t("menu.home")}
            </a>

            {/* Dropdown Produk Hukum */}
            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300 whitespace-nowrap" aria-haspopup="true" aria-expanded="false">
                {t("menu.jenisProdukHukum")} <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-max min-w-[200px] lg:w-[250px]"> {/* w-max atau min-w untuk submenu */}
                {jnsPeraturan?.data?.data?.length > 0 ? (
                  jnsPeraturan.data.data.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu(`Search/${item.singkatan_file}`); }}
                        className="block px-4 py-2 hover:bg-slate-100"
                      >
                        {item.percategoryname}
                      </a>
                    </li>
                  ))
                ) : (
                  <li><p className='px-4 py-2 text-center text-slate-500'>Data Kosong</p></li>
                )}
              </ul>
            </div>

            {/* Ulangi pola untuk dropdown lainnya: */}
            {/* - `whitespace-nowrap` pada button */}
            {/* - `w-max min-w-[...px] lg:w-[...px]` pada submenu ul */}

            {/* Dropdown Informasi Hukum */}
            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300 whitespace-nowrap" aria-haspopup="true" aria-expanded="false">
                {t("menu.informasiHukum")} <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-max min-w-[180px]">
                {/* ... item submenu ... */}
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("Berita"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.berita")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("Monografi"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.monografi")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("putasn-pengadilan"); }} className="block px-4 py-2 hover:bg-slate-100">{t("putusanPengadilan")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("agenda"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.agenda")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("artikel"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.artikel")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("infografis"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.infografis")}</a></li>
              </ul>
            </div>

            {/* Dropdown SiMPeL */}
            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300 whitespace-nowrap" aria-haspopup="true" aria-expanded="false">
                SiMPeL <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-max min-w-[180px]">
                {/* ... item submenu ... */}
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("SiMPeL/Prolegnas"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.prolegnas")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("SiMPeL/Progsun"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.progsun")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("SiMPeL/Proleg"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.prolegPupr")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("SiMPeL/IpRPP"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.ipRpp")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("SiMPeL/IpRpermen"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.ipRpermen")}</a></li>
              </ul>
            </div>

            <a href="#" className="hover:text-slate-300 mt-[2px] whitespace-nowrap" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("Statistik"); }}>{t("menu.statistik")}</a>

            {/* Dropdown Tentang JDIH */}
            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300 whitespace-nowrap" aria-haspopup="true" aria-expanded="false">
                {t("menu.tentangJdih")} <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-max min-w-[180px]">
                {/* ... item submenu ... */}
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("struktur-organisasi"); }}>{t("menu.strukturOrganisasi")}</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("tentang-kami"); }}>{t("menu.tentangKami")}</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("prasyarat"); }}>{t("menu.prasyarat")}</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("kontak-kami"); }}>{t("menu.kontakKami")}</a></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Language Switcher - Desktop */}
        {/* Sama seperti navigasi, pertimbangkan `lg:flex` */}
        <div className="hidden lg:flex items-center space-x-2 lg:space-x-6 ml-4 lg:ml-8"> {/* Mengurangi space dan margin untuk tablet jika lg:flex dipakai */}
          <div className="flex">
            <button
              type="button"
              // Ukuran font dan tombol disesuaikan: lebih kecil untuk md, asli untuk lg
              className={`text-sm md:text-base lg:text-xl hover:bg-blue-900 active:bg-blue-950 w-[50px] lg:w-[70px] text-white font-semibold ${currentLang === 'id' ? 'bg-blue-950 ring-1 ring-white' : 'bg-blue-800'}`}
              onClick={() => changeLang('id')}
              aria-pressed={currentLang === 'id'}
            > ID</button>
            <button
              type="button"
              className={`text-sm md:text-base lg:text-xl hover:bg-yellow-600 active:bg-yellow-700 w-[50px] lg:w-[70px] font-semibold ${currentLang === 'en' || currentLang.startsWith('en-') ? 'bg-yellow-700 ring-1 ring-black' : 'bg-kuningButton'}`}
              onClick={() => changeLang('en')}
              aria-pressed={currentLang === 'en' || currentLang.startsWith('en-')}
            > EN</button>
          </div>
        </div>

        {/* Hamburger Menu Area & Mobile Language Switcher */}
        {/* Muncul hingga `lg` jika navigasi desktop diatur ke `lg:flex` */}
        <div className='flex items-center lg:hidden'>
          <div className='flex gap-1 mr-2'>
            <button
              type='button'
              className={`text-xs hover:bg-blue-900 active:bg-blue-950 w-[28px] text-white font-semibold ${currentLang === 'id' ? 'bg-blue-950 ring-1 ring-white' : 'bg-blue-800'}`}
              onClick={() => changeLang('id')}
              aria-label="Ganti bahasa ke Indonesia"
              aria-pressed={currentLang === 'id'}
            >ID</button>
            <button
              type='button'
              className={`text-xs hover:bg-yellow-600 active:bg-yellow-700 w-[28px] font-semibold ${currentLang === 'en' || currentLang.startsWith('en-') ? 'bg-yellow-700 ring-1 ring-black' : 'bg-kuningButton'}`}
              onClick={() => changeLang('en')}
              aria-label="Switch language to English"
              aria-pressed={currentLang === 'en' || currentLang.startsWith('en-')}
            >EN</button>
          </div>
          <button
            id='hamburger' // ... (sisa atribut hamburger)
            className={`px-2 ${isMobileMenuOpen ? 'humberger-aktif' : ''}`}
            onClick={handleHamburgerToggle}
          // ...
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu - Sekarang aktif hingga `lg` */}
      <nav
        id='menu-mobile'
        className={`absolute lg:hidden py-2 bg-bluePu/90 text-slate-100 shadow-lg w-screen top-full left-0 
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-5 invisible pointer-events-none'} 
        `}
      // ... (sisa menu mobile)
      >
        {/* ... (isi ul li menu mobile seperti sebelumnya) ... */}
        <ul className='block px-4 text-sm space-y-2 text-left'>
          <li>
            <a href="#" className='hover:text-slate-300 block' onClick={() => handleNavigateAndCloseMenu("")}>{t("menu.home")}</a>
          </li>

          {/* Mobile Dropdown Produk Hukum */}
          <li className='group'>
            <button
              type='button'
              className='flex items-center justify-between w-full hover:text-slate-300' // Style asli
              onClick={() => handleMobileSubmenuToggle('produk_hukum')}
              aria-expanded={activeMobileSubmenu === 'produk_hukum'}
              aria-controls="submenu-mobile-produk-hukum"
            >
              {t("menu.jenisProdukHukum")}
              <span className={`material-symbols-outlined transition-transform duration-200 ${activeMobileSubmenu === 'produk_hukum' ? 'rotate-180' : ''}`}>arrow_drop_down</span>
            </button>
            <ul
              id="submenu-mobile-produk-hukum"
              className={`overflow-hidden mt-2 bg-slate-200 text-black rounded-md px-3 space-y-1 text-sm shadow-xl transition-all duration-300 ease-in-out ${activeMobileSubmenu === 'produk_hukum' ? 'max-h-96 py-2' : 'max-h-0 py-0'
                }`}
            >
              {jnsPeraturan?.data?.data?.length > 0 ? (
                jnsPeraturan.data.data.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      onClick={() => handleNavigateAndCloseMenu(`Search/${item.singkatan_file}`)}
                      className='hover:text-slate-600 block'
                    >
                      {item.percategoryname}
                    </a>
                  </li>
                ))
              ) : (
                <li><p className='text-center text-slate-600'>Data Kosong</p></li>
              )}
            </ul>
          </li>

          {/* Mobile Dropdown Informasi Hukum */}
          <li className='group'>
            <button
              type='button'
              className='flex items-center justify-between w-full hover:text-slate-300'
              onClick={() => handleMobileSubmenuToggle('informasi_hukum')}
              aria-expanded={activeMobileSubmenu === 'informasi_hukum'}
              aria-controls="submenu-mobile-informasi-hukum"
            >
              {t("menu.informasiHukum")}
              <span className={`material-symbols-outlined transition-transform duration-200 ${activeMobileSubmenu === 'informasi_hukum' ? 'rotate-180' : ''}`}>arrow_drop_down</span>
            </button>
            <ul
              id="submenu-mobile-informasi-hukum"
              className={`overflow-hidden mt-2 bg-slate-200 text-black rounded-md px-3 space-y-1 text-sm shadow-xl transition-all duration-300 ease-in-out ${activeMobileSubmenu === 'informasi_hukum' ? 'max-h-96 py-2' : 'max-h-0 py-0'
                }`}
            >
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("Berita")} className='hover:text-slate-600 block'>{t("menu.berita")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("Monografi")} className='hover:text-slate-600 block'>{t("menu.monografi")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("putasn-pengadilan")} className='hover:text-slate-600 block'>{t("putusanPengadilan")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("agenda")} className='hover:text-slate-600 block'>{t("menu.agenda")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("artikel")} className='hover:text-slate-600 block'>{t("menu.artikel")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("infografis")} className='hover:text-slate-600 block'>{t("menu.infografis")}</a></li>
            </ul>
          </li>

          {/* Mobile Dropdown SiMPeL */}
          <li className='group'>
            <button
              type='button'
              className='flex items-center justify-between w-full hover:text-slate-300'
              onClick={() => handleMobileSubmenuToggle('simpel')}
              aria-expanded={activeMobileSubmenu === 'simpel'}
              aria-controls="submenu-mobile-simpel"
            >
              SiMPeL
              <span className={`material-symbols-outlined transition-transform duration-200 ${activeMobileSubmenu === 'simpel' ? 'rotate-180' : ''}`}>arrow_drop_down</span>
            </button>
            <ul
              id="submenu-mobile-simpel"
              className={`overflow-hidden mt-2 bg-slate-200 text-black rounded-md px-3 space-y-1 text-sm shadow-xl transition-all duration-300 ease-in-out ${activeMobileSubmenu === 'simpel' ? 'max-h-96 py-2' : 'max-h-0 py-0'
                }`}
            >
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("SiMPeL/Prolegnas")} className='hover:text-slate-600 block'>{t("menu.prolegnas")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("SiMPeL/Progsun")} className='hover:text-slate-600 block'>{t("menu.progsun")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("SiMPeL/Proleg")} className='hover:text-slate-600 block'>{t("menu.prolegPupr")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("SiMPeL/IpRPP")} className='hover:text-slate-600 block'>{t("menu.ipRpp")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("SiMPeL/IpRpermen")} className='hover:text-slate-600 block'>{t("menu.ipRpermen")}</a></li>
            </ul>
          </li>

          <li>
            <a href="#" className='hover:text-slate-300 block' onClick={() => handleNavigateAndCloseMenu("Statistik")}>{t("menu.statistik")}</a>
          </li>

          {/* Mobile Dropdown Tentang JDIH */}
          <li className='group'>
            <button
              type='button'
              className='flex items-center justify-between w-full hover:text-slate-300'
              onClick={() => handleMobileSubmenuToggle('tentang_jdih')}
              aria-expanded={activeMobileSubmenu === 'tentang_jdih'}
              aria-controls="submenu-mobile-tentang-jdih"
            >
              {t("menu.tentangJdih")}
              <span className={`material-symbols-outlined transition-transform duration-200 ${activeMobileSubmenu === 'tentang_jdih' ? 'rotate-180' : ''}`}>arrow_drop_down</span>
            </button>
            <ul
              id="submenu-mobile-tentang-jdih"
              className={`overflow-hidden mt-2 bg-slate-200 text-black rounded-md px-3 space-y-1 text-sm shadow-xl transition-all duration-300 ease-in-out ${activeMobileSubmenu === 'tentang_jdih' ? 'max-h-96 py-2' : 'max-h-0 py-0'
                }`}
            >
              <li><a href="#" className='hover:text-slate-600 block' onClick={() => handleNavigateAndCloseMenu("struktur-organisasi")}>{t("menu.strukturOrganisasi")}</a></li>
              <li><a href="#" className='hover:text-slate-600 block' onClick={() => handleNavigateAndCloseMenu("tentang-kami")}>{t("menu.tentangKami")}</a></li>
              <li><a href="#" className='hover:text-slate-600 block' onClick={() => handleNavigateAndCloseMenu("prasyarat")}>{t("menu.prasyarat")}</a></li>
              <li><a href="#" className='hover:text-slate-600 block' onClick={() => handleNavigateAndCloseMenu("kontak-kami")}>{t("menu.kontakKami")}</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </section>
  );
}