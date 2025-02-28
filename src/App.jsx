import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Berita from "./pages/Berita";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Berita" element={<Berita />} />
    </Routes>
  )
}

export default App
