import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Berita from "./pages/Berita";
import Monografi from "./pages/Monografi";
import Search from "./pages/Search";
import DetailDokumen from "./pages/DetailDokumen";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Berita" element={<Berita />} />
      <Route path="/Monografi" element={<Monografi />} />
      <Route path="/Search/:tipePencarian" element={<Search />} />
      <Route path="/detail-dokumen/:slug" element={<DetailDokumen />} />
    </Routes>
  )
}

export default App
