import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
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

function App() {

  return (
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
    </Routes>
  )
}

export default App
