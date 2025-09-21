import React, { useState, useEffect, useCallback } from 'react';
import logoJDIHN from "/src/assets/jdihn.png"; // Pastikan path ini benar
import pu from "../assets/pu.png"; // Pastikan path ini benar
import { useNavigate } from "react-router-dom";
import { getJenisPeraturan } from "../services/header.services"; // Pastikan path ini benar
import { useTranslation } from 'react-i18next';

// Custom Hook untuk posisi scroll
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const [jnsPeraturan, setJnsPeraturan] = useState([]);
  const scrollPosition = useScrollPositionHook();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    getJenisPeraturan().then((result) => {
      // Sesuaikan dengan struktur data API Anda
      if (result && result.data && Array.isArray(result.data.data)) {
        setJnsPeraturan(result.data.data);
      } else if (result && Array.isArray(result.data)) {
        setJnsPeraturan(result.data);
      } else if (result && Array.isArray(result)) {
        setJnsPeraturan(result);
      } else {
        console.warn("Struktur data Jenis Peraturan tidak sesuai atau data kosong:", result);
        setJnsPeraturan([]);
      }
    }).catch(error => {
      console.error("Gagal mengambil Jenis Peraturan:", error);
      setJnsPeraturan([]);
    });
  }, []);

  const handleNavigateAndCloseMenu = useCallback((link = '') => {
    navigate(`/${link}`);
    window.scrollTo(0, 0);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setActiveMobileSubmenu(null);
    }
  }, [navigate, isMobileMenuOpen, setIsMobileMenuOpen, setActiveMobileSubmenu]);

  const handleHamburgerToggle = () => {
    const newOpenState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newOpenState);
    if (!newOpenState) {
      setActiveMobileSubmenu(null);
    }
  };

  const handleMobileSubmenuToggle = (submenuName) => {
    setActiveMobileSubmenu(prev => (prev === submenuName ? null : submenuName));
  };

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Pastikan class CSS untuk hamburger ('hamburger-line', 'humberger-aktif') terdefinisi di file CSS global Anda
  return (
    <section
      className={`sticky top-0 z-50 md:px-[60px] bg-bluePu ${scrollPosition === 0
        ? "bg-opacity-0"
        : scrollPosition <= 70
          ? "bg-opacity-30"
          : "bg-opacity-100"
        }`}
      aria-label="Header navigasi utama"
    >
      <div className='container flex max-w-none justify-between items-center w-full h-16 md:h-20 px-4 md:px-0'>
        <div className='flex items-center group shrink-0'>
          <img
            src={logoJDIHN}
            alt="JDIHN"
            className='h-10 sm:h-12 md:h-12 lg:h-[65px] py-2 px-2 hidden md:block cursor-pointer'
            onClick={() => handleNavigateAndCloseMenu("")}
          />
          <img
            src={pu}
            alt="Pekerjaan Umum"
            className='h-10 sm:h-12 md:h-12 lg:h-[65px] py-2 px-2 cursor-pointer'
            onClick={() => handleNavigateAndCloseMenu("")}
          />
        </div>

        <div className="hidden lg:flex items-center font-roboto font-normal">
          <nav className="flex gap-4 md:gap-6 lg:gap-8 text-white text-base md:text-[15px] lg:text-[15px] font-medium">
            <a
              href="#"
              className="hover:text-slate-300 whitespace-nowrap"
              onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu(""); }}
            >
              {t("menu.home")}
            </a>

            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300 whitespace-nowrap" aria-haspopup="true" aria-expanded="false">
                {t("menu.jenisProdukHukum")} <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-max min-w-[200px] lg:w-[250px]">
                {jnsPeraturan?.length > 0 ? (
                  jnsPeraturan.map((item, index) => (
                    <li key={item.singkatan_file || index}> {/* Gunakan ID unik jika ada */}
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

            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300 whitespace-nowrap" aria-haspopup="true" aria-expanded="false">
                {t("menu.informasiHukum")} <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-max min-w-[180px]">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("Berita"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.berita")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("Monografi"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.monografi")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("putasn-pengadilan"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.putusanPengadilan")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("agenda"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.agenda")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("artikel"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.artikel")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("infografis"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.infografis")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("Mou"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.Mou")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("Dokumen-Langka"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.dokumenLangka")}</a></li>
              </ul>
            </div>

            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300 whitespace-nowrap" aria-haspopup="true" aria-expanded="false">
                {t("konsultasiPublik.nmMenu")} <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-max min-w-[180px]">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("Konsultasi-Publik-Perencanaan"); }} className="block px-4 py-2 hover:bg-slate-100">{t("konsultasiPublik.SubmenuKPPerencanaan")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("Konsultasi-Publik"); }} className="block px-4 py-2 hover:bg-slate-100">{t("konsultasiPublik.SubmenuKPPembahasan")}</a></li>               
              </ul>
            </div>

            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300 whitespace-nowrap" aria-haspopup="true" aria-expanded="false">
                SiMPeL <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-max min-w-[180px]">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("SiMPeL/Prolegnas"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.prolegnas")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("SiMPeL/Progsun"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.progsun")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("SiMPeL/Proleg"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.prolegPupr")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("SiMPeL/IpRPP"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.ipRpp")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("SiMPeL/IpRpermen"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.ipRpermen")}</a></li>
              </ul>
            </div>


            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300 whitespace-nowrap" aria-haspopup="true" aria-expanded="false">
                {t("menu.tentangJdih")} <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-max min-w-[180px]">
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("struktur-organisasi"); }}>{t("menu.strukturOrganisasi")}</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("tentang-kami"); }}>{t("menu.tentangKami")}</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("prasyarat"); }}>{t("menu.prasyarat")}</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("kontak-kami"); }}>{t("menu.kontakKami")}</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu("Statistik"); }}>{t("menu.statistik")}</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="hidden lg:flex items-center space-x-2 lg:space-x-6 ml-4 lg:ml-8">
          <div className="flex">
            <button
              type="button"
              className={`text-sm md:text-base lg:text-xl hover:bg-blue-900 active:bg-blue-950 w-[50px] lg:w-[70px] text-white font-semibold ${currentLang === 'id' ? 'bg-blue-950' : 'bg-blue-800'}`}
              onClick={() => changeLang('id')}
              aria-pressed={currentLang === 'id'}
            > ID</button>
            <button
              type="button"
              className={`text-sm md:text-base lg:text-xl hover:bg-yellow-600 active:bg-yellow-700 w-[50px] lg:w-[70px] font-semibold ${currentLang === 'en' || currentLang.startsWith('en-') ? 'bg-yellow-700 ' : 'bg-kuningButton'}`}
              onClick={() => changeLang('en')}
              aria-pressed={currentLang === 'en' || currentLang.startsWith('en-')}
            > EN</button>
          </div>
        </div>

        <div className='flex items-center lg:hidden'>
          <div className='flex gap-1 mr-2'>
            <button
              type='button'
              className={`text-xs hover:bg-blue-900 active:bg-blue-950 w-[28px] text-white font-semibold ${currentLang === 'id' ? 'bg-blue-950' : 'bg-blue-800'}`}
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
            id='hamburger'
            className={`px-2 ${isMobileMenuOpen ? 'humberger-aktif' : ''}`}
            onClick={handleHamburgerToggle}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="menu-mobile"
          >
            <span className="hamburger-line origin-top-left transition duration-300 ease-in-out"></span>
            <span className="hamburger-line transition duration-300 ease-in-out"></span>
            <span className="hamburger-line origin-bottom-left transition duration-300 ease-in-out"></span>
          </button>
        </div>
      </div>

      <nav
        id='menu-mobile'
        className={`absolute lg:hidden py-2 bg-bluePu/90 text-slate-100 shadow-lg w-screen top-full left-0 
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-5 invisible pointer-events-none'} 
        `}
      >
        <ul className='block px-4 text-sm space-y-2 text-left'>
          <li>
            <a href="#" className='hover:text-slate-300 block' onClick={() => handleNavigateAndCloseMenu("")}>{t("menu.home")}</a>
          </li>

          <li className='group'>
            <button
              type='button'
              className='flex items-center justify-between w-full hover:text-slate-300'
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
              {jnsPeraturan?.length > 0 ? (
                jnsPeraturan.map((item, index) => (
                  <li key={item.singkatan_file || index}> {/* Gunakan ID unik jika ada */}
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
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("putasn-pengadilan")} className='hover:text-slate-600 block'>{t("menu.putusanPengadilan")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("agenda")} className='hover:text-slate-600 block'>{t("menu.agenda")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("artikel")} className='hover:text-slate-600 block'>{t("menu.artikel")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("infografis")} className='hover:text-slate-600 block'>{t("menu.infografis")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("Mou")} className='hover:text-slate-600 block'>{t("menu.Mou")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("Dokumen-Langka")} className='hover:text-slate-600 block'>{t("menu.dokumenLangka")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("Konsultasi-Publik")} className='hover:text-slate-600 block'>{t("menu.konsultasiPublik")}</a></li>
            </ul>
          </li>

          <li className='group'>
            <button
              type='button'
              className='flex items-center justify-between w-full hover:text-slate-300'
              onClick={() => handleMobileSubmenuToggle('konsultasi_publik')}
              aria-expanded={activeMobileSubmenu === 'konsultasi_publik'}
              aria-controls="submenu-mobile-konsultasi-publik"
            >
              {t("konsultasiPublik.nmMenu")}
              <span className={`material-symbols-outlined transition-transform duration-200 ${activeMobileSubmenu === 'konsultasi_publik' ? 'rotate-180' : ''}`}>arrow_drop_down</span>
            </button>
            <ul
              id="submenu-mobile-konsultasi-publik"
              className={`overflow-hidden mt-2 bg-slate-200 text-black rounded-md px-3 space-y-1 text-sm shadow-xl transition-all duration-300 ease-in-out ${activeMobileSubmenu === 'konsultasi_publik' ? 'max-h-96 py-2' : 'max-h-0 py-0'
                }`}
            >
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("Konsultasi-Publik-Perencanaan")} className='hover:text-slate-600 block'>{t("konsultasiPublik.SubmenuKPPerencanaan")}</a></li>
              <li><a href="#" onClick={() => handleNavigateAndCloseMenu("Konsultasi-Publik")} className='hover:text-slate-600 block'>{t("konsultasiPublik.SubmenuKPPembahasan")}</a></li>
              
            </ul>
          </li>


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
              <li><a href="#" className='hover:text-slate-300 block' onClick={() => handleNavigateAndCloseMenu("Statistik")}>{t("menu.statistik")}</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </section>
  );
}