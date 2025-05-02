import React, { useState, useEffect } from 'react';
import logoJDIHN from "/src/assets/jdihn.png";
import pu from "../assets/pu.png";
import { useNavigate } from "react-router-dom";
import { getJenisPeraturan } from "../services/header.services";
import { useTranslation } from 'react-i18next';


export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubmenu, setIsOpenSubmenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [jnsPeraturan, setJnsPeraturan] = useState([]);


  useEffect(() => {
    getJenisPeraturan().then((result) => {
      setJnsPeraturan(result);
    });

  }, []);

  const navigate = useNavigate();

  const navigateHandelClick = (link = '') => {
    navigate(`/${link}`);
    window.scrollTo(0, 0);
  };

  function hendelHuberger() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  // Handel Klik Submenu
  function handelClickSubmenu(jns_menu = null) {

    if (jns_menu !== null) {
      if (isOpenSubmenu === jns_menu) {
        setIsOpenSubmenu(false);
      } else {
        setIsOpenSubmenu(jns_menu);
      }
    }
  }


  function useScrollPosition() {


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

  useScrollPosition();

  const { t, i18n } = useTranslation();

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (

    <section
      className={`sticky top-0 z-50 md:px-[60px] bg-bluePu ${scrollPosition === 0
        ? "bg-opacity-0"
        : scrollPosition <= 70
          ? "bg-opacity-30"
          : "bg-opacity-100"
        }`}
    >
      <div className='container flex max-w-none justify-between  w-full md:h-20'>

        <div className='flex items-center group'>
          <img src={logoJDIHN} alt="JDIHN" className='h-12 py-2 px-2   md:w-full md:h-[65px] hidden md:block' />
          <img src={pu} alt="Pekerjaan Umum" className='h-12  py-2 px-2  md:w-full md:h-[65px] sm:w-[110px] ' />
        </div>

        <div className="hidden md:flex items-center font-roboto font-normal">

          {/* Navigasi Utama */}
          <nav className="flex gap-8 text-sm font-medium text-white text-[25px] mr-[-64px]">
            <a href="#" className="hover:text-slate-300" onClick={(e) => { e.preventDefault(); navigateHandelClick(""); }}>{t("menu.home")}</a>

            {/* Dropdown Produk Hukum */}
            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300">
                {t("menu.jenisProdukHukum")} <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              {/* Submenu */}
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-[250px] ">

                {jnsPeraturan?.data?.data?.length > 0 ? (
                  jnsPeraturan?.data?.data?.map((item, index) => (
                    <li
                      key={index}
                      onClick={(e) => { e.preventDefault(); navigateHandelClick(`Search/${item.singkatan_file}`); }}
                    ><a href="#" className="block px-4 py-2 hover:bg-slate-100">{item.percategoryname}</a></li>
                  ))) : (
                  <p className='text-center text-slate-100'>Data Kosong</p>
                )}

              </ul>
            </div>

            {/* Dropdown Produk Hukum */}
            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300">
                {t("menu.informasiHukum")} <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              {/* Submenu */}
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-[180px]">
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("Berita"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.berita")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("Monografi"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.monografi")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("putasn-pengadilan"); }} className="block px-4 py-2 hover:bg-slate-100">{t("putusanPengadilan")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("agenda"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.agenda")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("artikel"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.artikel")}</a></li>

              </ul>
            </div>

            {/* Dropdown Produk Hukum */}
            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300">
                SiMPeL <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              {/* Submenu */}
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-[180px]">
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("SiMPeL/Prolegnas"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.prolegnas")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("SiMPeL/Progsun"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.progsun")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("SiMPeL/Proleg"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.prolegPupr")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("SiMPeL/IpRPP"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.ipRpp")}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("SiMPeL/IpRpermen"); }} className="block px-4 py-2 hover:bg-slate-100">{t("menu.ipRpermen")}</a></li>

              </ul>
            </div>

            {/* Dropdown Produk Hukum */}

            <a href="#" className="hover:text-slate-300 mt-[2px]" onClick={(e) => { e.preventDefault(); navigateHandelClick("Statistik"); }}>{t("menu.statistik")}</a>



            {/* Dropdown Produk Hukum */}
            <div className="relative group">
              <button type="button" className="flex items-center hover:text-slate-300">
                {t("menu.tentangJdih")} <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              {/* Submenu */}
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 w-[180px]">
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={(e) => { e.preventDefault(); navigateHandelClick("struktur-organisasi"); }}>{t("menu.strukturOrganisasi")}</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100"
                  onClick={(e) => { e.preventDefault(); navigateHandelClick("tentang-kami"); }}
                >{t("menu.tentangKami")}</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100"
                  onClick={(e) => { e.preventDefault(); navigateHandelClick("prasyarat"); }}
                >{t("menu.prasyarat")}</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-slate-100"
                  onClick={(e) => { e.preventDefault(); navigateHandelClick("kontak-kami"); }}
                >{t("menu.kontakKami")}</a></li>
              </ul>
            </div>

          </nav>

        </div>

        <div className="hidden md:flex items-center space-x-6 px-9">
          {/* Tombol Bahasa */}
          <div className="flex">
            <button
              type="button"
              className="text-xl bg-blue-800 hover:bg-blue-900 active:bg-blue-950 w-[70px] text-white font-semibold"
              onClick={() => changeLang('id')}
            > ID</button>
            <button
              type="button"
              className="text-xl bg-kuningButton hover:bg-yellow-600 active:bg-yellow-700 w-[70px] font-semibold"
              onClick={() => changeLang('en')}
            > EN</button>
          </div>
        </div>



        {/* Humberger Menu For Mobail */}
        <div className='flex items-center px-4 md:hidden lg:hidden relative'>
          <button
            id='hamburger'
            name='hamburger'
            type='button'
            className={`px-2 ${isOpen ? 'humberger-aktif' : ''}`}
            onClick={hendelHuberger}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <nav
            id='menu-mobile'
            className={`absolute py-2 bg-bluePu/90 text-slate-100 shadow-lg w-screen top-[48px] right-0
      transition-all duration-300 ease-in-out
      ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}
    `}
          >
            <ul className='block px-4 text-sm space-y-2 text-left'>
              <li>
                <a href="#" className='hover:text-slate-300 block' onClick={(e) => { e.preventDefault(); navigateHandelClick(""); }}>{t("menu.home")}</a>
              </li>
              <li className='group'>
                <button
                  type='button'
                  className='flex items-center justify-between w-full hover:text-slate-300'
                  onClick={() => handelClickSubmenu('produk_hukum')}
                >
                  {t("menu.jenisProdukHukum")}
                  <span className="material-symbols-outlined">arrow_drop_down</span>
                </button>
                <ul
                  className={`mt-2 bg-slate-200 text-black rounded-md px-3 py-2 space-y-1 text-sm shadow-xl transition-all duration-300 ease-in-out
            ${isOpenSubmenu === 'produk_hukum' ? 'block' : 'hidden'}
          `}
                >
                  {jnsPeraturan?.data?.data?.length > 0 ? (
                    jnsPeraturan?.data?.data?.map((item, index) => (
                      <li
                        key={index}
                        onClick={(e) => { e.preventDefault(); navigateHandelClick(`Search/${item.singkatan_file}`); }}
                      ><a href="#" className='hover:text-slate-600 block'>{item.percategoryname}</a></li>
                    ))
                  ) : (
                    <p className='text-center text-slate-600'>Data Kosong</p>
                  )}
                </ul>
              </li>
              <li className='group'>
                <button
                  type='button'
                  className='flex items-center justify-between w-full hover:text-slate-300'
                  onClick={() => handelClickSubmenu('informasi_hukum')}
                >
                  {t("menu.informasiHukum")}
                  <span className="material-symbols-outlined">arrow_drop_down</span>
                </button>
                <ul
                  className={`mt-2 bg-slate-200 text-black rounded-md px-3 py-2 space-y-1 text-sm shadow-xl transition-all duration-300 ease-in-out
            ${isOpenSubmenu === 'informasi_hukum' ? 'block' : 'hidden'}
          `}
                >
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("Berita"); }} className='hover:text-slate-600 block'>{t("menu.berita")}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("Monografi"); }} className='hover:text-slate-600 block'>{t("menu.monografi")}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("putasn-pengadilan"); }} className='hover:text-slate-600 block'>{t("putusanPengadilan")}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("agenda"); }} className='hover:text-slate-600 block'>{t("menu.agenda")}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("artikel"); }} className='hover:text-slate-600 block'>{t("menu.artikel")}</a></li>
                </ul>
              </li>
              <li className='group'>
                <button
                  type='button'
                  className='flex items-center justify-between w-full hover:text-slate-300'
                  onClick={() => handelClickSubmenu('simpel')}
                >
                  SiMPeL
                  <span className="material-symbols-outlined">arrow_drop_down</span>
                </button>
                <ul
                  className={`mt-2 bg-slate-200 text-black rounded-md px-3 py-2 space-y-1 text-sm shadow-xl transition-all duration-300 ease-in-out
            ${isOpenSubmenu === 'simpel' ? 'block' : 'hidden'}
          `}
                >
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("SiMPeL/Prolegnas"); }} className='hover:text-slate-600 block'>{t("menu.prolegnas")}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("SiMPeL/Progsun"); }} className='hover:text-slate-600 block'>{t("menu.progsun")}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("SiMPeL/Proleg"); }} className='hover:text-slate-600 block'>{t("menu.prolegPupr")}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("SiMPeL/IpRPP"); }} className='hover:text-slate-600 block'>{t("menu.ipRpp")}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateHandelClick("SiMPeL/IpRpermen"); }} className='hover:text-slate-600 block'>{t("menu.ipRpermen")}</a></li>
                </ul>
              </li>
              <li>
                <a href="#" className='hover:text-slate-300 block' onClick={(e) => { e.preventDefault(); navigateHandelClick("Statistik"); }}>{t("menu.statistik")}</a>
              </li>
              <li className='group'>
                <button
                  type='button'
                  className='flex items-center justify-between w-full hover:text-slate-300'
                  onClick={() => handelClickSubmenu('tentang_jdih')}
                >
                  {t("menu.tentangJdih")}
                  <span className="material-symbols-outlined">arrow_drop_down</span>
                </button>
                <ul
                  className={`mt-2 bg-slate-200 text-black rounded-md px-3 py-2 space-y-1 text-sm shadow-xl transition-all duration-300 ease-in-out
            ${isOpenSubmenu === 'tentang_jdih' ? 'block' : 'hidden'}
          `}
                >
                  <li><a href="#" className='hover:text-slate-600 block' onClick={(e) => { e.preventDefault(); navigateHandelClick("struktur-organisasi"); }}>{t("menu.strukturOrganisasi")}</a></li>
                  <li><a href="#" className='hover:text-slate-600 block' onClick={(e) => { e.preventDefault(); navigateHandelClick("tentang-kami"); }}>{t("menu.tentangKami")}</a></li>
                  <li><a href="#" className='hover:text-slate-600 block' onClick={(e) => { e.preventDefault(); navigateHandelClick("prasyarat"); }}>{t("menu.prasyarat")}</a></li>
                  <li><a href="#" className='hover:text-slate-600 block' onClick={(e) => { e.preventDefault(); navigateHandelClick("kontak-kami"); }}>{t("menu.kontakKami")}</a></li>
                </ul>
              </li>
            </ul>
          </nav>

          <div className='px-2 flex gap-1'>
            <button
              type='button'
              className='text-xs bg-blue-800 hover:bg-blue-900 active:bg-blue-950 w-[28px] text-white font-semibold'
              onClick={() => changeLang('id')}
            >
              ID
            </button>
            <button
              type='button'
              className='text-xs bg-kuningButton hover:bg-yellow-600 active:bg-yellow-700 w-[28px] font-semibold'
              onClick={() => changeLang('en')}
            >
              EN
            </button>
          </div>
        </div>
        {/* End Humberger Menu For Mobail */}

      </div >
    </section >

  );

};
