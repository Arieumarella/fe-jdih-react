import React from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();
    
      const navigateHandelClick = (link = '') => {
        navigate(`/${link}`);
      };

      let textKeterangan = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, eum.qadsf  sdfg dsfgdfshdfs";
      const trimmedText = textKeterangan.length > 120 ? textKeterangan.substring(0, 120) + "..." : textKeterangan;


    return (
      <>
        <Headers/>
            
        <section className='h-full bg-slate-100 md:px-[180px] px-5 py-4 '>
          
          <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4'>Semua Berita</h1>

          <div className="box-border md:w-[50%] w-full mx-auto md:my-4 my-2 md:mb-[50px] mb-[20px]  rounded-lg md:h-[70px] h-[60px] bg-bluePu shadow-lg flex items-center px-4">
            <input 
              type="text" 
              placeholder="Cari judul berita..." 
              className="w-full bg-transparent outline-none text-white placeholder-white font-roboto text-lg"
            />
            <button className="ml-2 w-[90px] bg-kuningButton text-bluePu px-4 py-2 rounded-lg font-roboto font-semibold hover:bg-opacity-80 transition">
              Cari
            </button>
          </div>


          <div className='items-center grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 mb-12'>


          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer"
          onClick={(e) => { e.preventDefault(); navigateHandelClick("Berita/slug"); }}>
            {/* Gambar */}
            <div className="w-full h-[180px] md:h-[250px] overflow-hidden group">
              <img src="1.jpg" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500" />
            </div>
            {/* Konten */}
            <div className="p-4">
              {/* Tanggal Terbit */}
              <p className="text-gray-500 md:text-sm text-[14px] font-semibold">28 Feb 2025</p>

              {/* Judul Berita */}
              <h3 className="text-bluePu font-roboto font-semibold text-[14px] md:text-base leading-tight md:mt-1 mt-2 hover:text-opacity-70 cursor-pointer ">
                Perpres 12/2025: Rencana Pembangunan Jangka Menengah Nasional Tahun 2025-2029
              </h3>

              {/* Link Selengkapnya */}
              <div className="mt-1 flex justify-end items-center">

                {/* Jumlah Viewer */}
                <div className="flex items-center gap-1 text-bluePu text-xs bg-bluePu bg-opacity-15 px-2 py-1 rounded-full font-roboto md:mt-0 mt-2 text-[12px]">
                <span className="material-symbols-outlined">visibility</span> <span>3083</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer"
          onClick={(e) => { e.preventDefault(); navigateHandelClick("Berita/slug"); }}>
            {/* Gambar */}
            <div className="w-full h-[180px] md:h-[250px] overflow-hidden group">
              <img src="1.jpg" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500" />
            </div>
            {/* Konten */}
            <div className="p-4">
              {/* Tanggal Terbit */}
              <p className="text-gray-500 md:text-sm text-[14px] font-semibold">28 Feb 2025</p>

              {/* Judul Berita */}
              <h3 className="text-bluePu font-roboto font-semibold text-[14px] md:text-base leading-tight md:mt-1 mt-2 hover:text-opacity-70 cursor-pointer ">
                Perpres 12/2025: Rencana Pembangunan Jangka Menengah Nasional Tahun 2025-2029
              </h3>

              {/* Link Selengkapnya */}
              <div className="mt-1 flex justify-end items-center">

                {/* Jumlah Viewer */}
                <div className="flex items-center gap-1 text-bluePu text-xs bg-bluePu bg-opacity-15 px-2 py-1 rounded-full font-roboto md:mt-0 mt-2 text-[12px]">
                <span className="material-symbols-outlined">visibility</span> <span>3083</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer"
          onClick={(e) => { e.preventDefault(); navigateHandelClick("Berita/slug"); }}>
            {/* Gambar */}
            <div className="w-full h-[180px] md:h-[250px] overflow-hidden group">
              <img src="1.jpg" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500" />
            </div>
            {/* Konten */}
            <div className="p-4">
              {/* Tanggal Terbit */}
              <p className="text-gray-500 md:text-sm text-[14px] font-semibold">28 Feb 2025</p>

              {/* Judul Berita */}
              <h3 className="text-bluePu font-roboto font-semibold text-[14px] md:text-base leading-tight md:mt-1 mt-2 hover:text-opacity-70 cursor-pointer ">
                Perpres 12/2025: Rencana Pembangunan Jangka Menengah Nasional Tahun 2025-2029
              </h3>

              {/* Link Selengkapnya */}
              <div className="mt-1 flex justify-end items-center">

                {/* Jumlah Viewer */}
                <div className="flex items-center gap-1 text-bluePu text-xs bg-bluePu bg-opacity-15 px-2 py-1 rounded-full font-roboto md:mt-0 mt-2 text-[12px]">
                <span className="material-symbols-outlined">visibility</span> <span>3083</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer"
          onClick={(e) => { e.preventDefault(); navigateHandelClick("Berita/slug"); }}>
            {/* Gambar */}
            <div className="w-full h-[180px] md:h-[250px] overflow-hidden group">
              <img src="1.jpg" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500" />
            </div>
            {/* Konten */}
            <div className="p-4">
              {/* Tanggal Terbit */}
              <p className="text-gray-500 md:text-sm text-[14px] font-semibold">28 Feb 2025</p>

              {/* Judul Berita */}
              <h3 className="text-bluePu font-roboto font-semibold text-[14px] md:text-base leading-tight md:mt-1 mt-2 hover:text-opacity-70 cursor-pointer ">
                Perpres 12/2025: Rencana Pembangunan Jangka Menengah Nasional Tahun 2025-2029
              </h3>

              {/* Link Selengkapnya */}
              <div className="mt-1 flex justify-end items-center">

                {/* Jumlah Viewer */}
                <div className="flex items-center gap-1 text-bluePu text-xs bg-bluePu bg-opacity-15 px-2 py-1 rounded-full font-roboto md:mt-0 mt-2 text-[12px]">
                <span className="material-symbols-outlined">visibility</span> <span>3083</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer"
          onClick={(e) => { e.preventDefault(); navigateHandelClick("Berita/slug"); }}>
            {/* Gambar */}
            <div className="w-full h-[180px] md:h-[250px] overflow-hidden group">
              <img src="1.jpg" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500" />
            </div>
            {/* Konten */}
            <div className="p-4">
              {/* Tanggal Terbit */}
              <p className="text-gray-500 md:text-sm text-[14px] font-semibold">28 Feb 2025</p>

              {/* Judul Berita */}
              <h3 className="text-bluePu font-roboto font-semibold text-[14px] md:text-base leading-tight md:mt-1 mt-2 hover:text-opacity-70 cursor-pointer ">
                Perpres 12/2025: Rencana Pembangunan Jangka Menengah Nasional Tahun 2025-2029
              </h3>

              {/* Link Selengkapnya */}
              <div className="mt-1 flex justify-end items-center">

                {/* Jumlah Viewer */}
                <div className="flex items-center gap-1 text-bluePu text-xs bg-bluePu bg-opacity-15 px-2 py-1 rounded-full font-roboto md:mt-0 mt-2 text-[12px]">
                <span className="material-symbols-outlined">visibility</span> <span>3083</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer"
          onClick={(e) => { e.preventDefault(); navigateHandelClick("Berita/slug"); }}>
            {/* Gambar */}
            <div className="w-full h-[180px] md:h-[250px] overflow-hidden group">
              <img src="1.jpg" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500" />
            </div>
            {/* Konten */}
            <div className="p-4">
              {/* Tanggal Terbit */}
              <p className="text-gray-500 md:text-sm text-[14px] font-semibold">28 Feb 2025</p>

              {/* Judul Berita */}
              <h3 className="text-bluePu font-roboto font-semibold text-[14px] md:text-base leading-tight md:mt-1 mt-2 hover:text-opacity-70 cursor-pointer ">
                Perpres 12/2025: Rencana Pembangunan Jangka Menengah Nasional Tahun 2025-2029
              </h3>

              {/* Link Selengkapnya */}
              <div className="mt-1 flex justify-end items-center">

                {/* Jumlah Viewer */}
                <div className="flex items-center gap-1 text-bluePu text-xs bg-bluePu bg-opacity-15 px-2 py-1 rounded-full font-roboto md:mt-0 mt-2 text-[12px]">
                <span className="material-symbols-outlined">visibility</span> <span>3083</span>
                </div>
              </div>
            </div>
          </div>

          

         </div>

        {/* Pagination */}
        <div className='flex justify-end items-center my-4 space-x-2 gap-4'>
          <span className='font-medium font-roboto md:text-[30px] text-[14px]'>Halaman</span>
          <div className='flex space-x-2 font-roboto md:text-[18px] text-[14px] shedow-lg'>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-bluePu text-kuningButton rounded-lg shadow-md hover:bg-opacity-80 transition">
              1
            </button>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
              2
            </button>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
              3
            </button>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
              4
            </button>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
              5
            </button>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
              Next
            </button>
          </div>
        </div>


        </section>      
        
        <Langganan/>
        <Footer/>
      </>
    );
  };
  
  export default Home;
  