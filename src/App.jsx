import { React, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Berita from "./pages/Berita";
import Monografi from "./pages/Monografi";
import Search from "./pages/Search";
import DetailDokumen from "./pages/DetailDokumen";
import DetailBerita from "./pages/DetailBerita";
import Detailmonografi from "./pages/DetailMonografi";
import StrukturOrganisasi from "./pages/StrukturOrganisasi";
import PutusanPengadilan from "./pages/PutusanPengadilan";
import DetailPutusan from "./pages/DetailPutusan";
import Agenda from "./pages/Agenda";
import Artikel from "./pages/Artikel";
import DetailArtikel from "./pages/DetailArtikel";
import TentangKami from "./pages/TentangKami";
import Prasyarat from "./pages/Prasyarat";
import KontakKami from "./pages/KontakKami";
import Statistik from "./pages/statistik";
import SiMPeL from "./pages/SiMPeL";
import Infografis from "./pages/Infografis";
import DetailInfografis from "./pages/DetailInfografis";
import Mou from "./pages/Mou";
import DetailMou from "./pages/detailMou";
import DokumenLangka from "./pages/DokumenLangka";
import DetailDokumenlangka from "./pages/DetailDokumenlangka";
import ChatGeneral from "./components/ChatGeneral";
import { Helmet } from "react-helmet-async";
import { ToastProvider } from "./components/ToastProvider";




const titles = {
  "/": "JDIH PU - Home",
  "/Search/pencarian-detail": "JDIH PU - Pencarian Deail",
  "/Search/pencarian-biasa": "JDIH PU - Pencarian",
  "/Search/:slug": "JDIH PU - Pencarian",
  "/detail-dokumen/:slug": "JDIH PU - Detail Dokumen",
  "/Berita": "JDIH PU - List Berita",
  "/Berita/:slug": "JDIH PU - Detail Berita",
  "/Monografi": "JDIH PU - List Monografi",
  "/Monografi/:slug": "JDIH PU - Detail Monografi",
  "/putasn-pengadilan": "JDIH PU - List Putusan Pengadilan",
  "/putasn-pengadilan/:slug": "JDIH PU - Detail Putusan Pengadilan",
  "/agenda": "JDIH PU - List Agenda",
  "/artikel": "JDIH PU - List Artikel",
  "/artikel/:slug": "JDIH PU - Detail Artikel",
  "/struktur-organisasi": "JDIH PU - Struktur Organisasi",
  "/tentang-kami": "JDIH PU - Tentang Kami",
  "/prasyarat": "JDIH PU - Prsayarat",
  "/kontak-kami": "JDIH PU - Kontak Kami",
  "/Statistik": "JDIH PU - Statistik",
  "/SiMPeL/:slug": "JDIH PU - SiMPeL",
  "/infografis": "JDIH PU - Infografis",
  "/infografis/:id": "JDIH PU - Detail Infografis",
  "/Mou": "JDIH PU - Mou",
  "/Mou-detail/:slug": "JDIH PU - Detail Mou",
  "/Dokumen-Langka": "JDIH PU - Dokumen Langka",
  "/Dokumen-Langka/:slug": "JDIH PU - Detail Dokumen Langka",
};

function TitleUpdater() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Cek apakah ada title yang cocok tanpa parameter dinamis
  const matchedTitleKey = Object.keys(titles).find((route) =>
    new RegExp(`^${route.replace(/:\w+/g, ".*")}$`).test(currentPath)
  );

  const title = titles[matchedTitleKey] || "JDIH PU";

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}


function App() {

  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('data-account', import.meta.env.id_key_userWay); // Ganti dengan ID akun UserWay-mu
    script.setAttribute('data-position', '7'); // Posisi 3 = kiri bawah
    script.src = 'https://cdn.userway.org/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);


  return (
    <>
      <TitleUpdater />
      <ToastProvider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Berita" element={<Berita />} />
        <Route path="/Monografi" element={<Monografi />} />
        <Route path="/Search/:tipePencarian" element={<Search />} />
        <Route path="/detail-dokumen/:slug" element={<DetailDokumen />} />
        <Route path="/Berita/:slug" element={<DetailBerita />} />
        <Route path="/Monografi/:slug" element={<Detailmonografi />} />
        <Route path="/struktur-organisasi" element={<StrukturOrganisasi />} />
        <Route path="/putasn-pengadilan" element={<PutusanPengadilan />} />
        <Route path="/putasn-pengadilan/:slug" element={<DetailPutusan />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/artikel/:slug" element={<DetailArtikel />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/prasyarat" element={<Prasyarat />} />
        <Route path="/kontak-kami" element={<KontakKami />} />
        <Route path="/statistik" element={<Statistik />} />
        <Route path="/SiMPeL/:slug" element={<SiMPeL />} />
        <Route path="/infografis" element={<Infografis />} />
        <Route path="/infografis/:id" element={<DetailInfografis />} />
        <Route path="/Mou" element={<Mou />} />
        <Route path="/Mou-detail/:slug" element={<DetailMou />} />
        <Route path="/Dokumen-Langka" element={<DokumenLangka />} />
        <Route path="/Dokumen-Langka/:slug" element={<DetailDokumenlangka />} />
      </Routes>
      <ChatGeneral />
    </>
  )
}

export default App
