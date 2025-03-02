import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Berita from "./pages/Berita";
import Monografi from "./pages/Monografi";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Berita" element={<Berita />} />
      <Route path="/Monografi" element={<Monografi />} />
    </Routes>
  )
}

export default App
