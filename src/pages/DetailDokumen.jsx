import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";

const DetailDokumen = () => {

    const { slug } = useParams();

    const details = [
      { label: "Tipe", value: "Peraturan Perundang-undangan" },
      { label: "Judul", value: "Peraturan Menteri Koordinator Bidang Kemaritiman dan Investasi Nomor 5 Tahun 2024 tentang Tugas dan Tata Kerja Tim Koordinasi Serta Pedoman Teknis Tata Kelola Kompleks Candi Borobudur" },
      { label: "T.E.U. Badan / Pengarang", value: "Indonesia. Kementerian Koordinator Bidang Kemaritiman dan Investasi" },
      { label: "No. Peraturan", value: "5" },
      { label: "Jenis/Bentuk Peraturan", value: "Peraturan Menteri" },
      { label: "Singkatan Jenis/Bentuk Peraturan", value: "Permen" },
      { label: "Tempat Penetapan", value: "Jakarta" },
      { label: "Tanggal-Bulan-Tahun Penetapan", value: "16 Oktober 2024" },
      { label: "Tanggal-Bulan-Tahun Pengundangan", value: "18 Oktober 2024" },
      { label: "Sumber", value: "BN 2024 (718):14 hlm" },
      { label: "Subjek", value: "CANDI BOROBUDUR - TIM KOORDINASI" },
      { label: "Status Peraturan", value: "Berlaku" },
      { label: "Bahasa", value: "Bahasa Indonesia" },
      { label: "Lokasi", value: "Biro Hukum Kementerian Koordinator Bidang Kemaritiman dan Investasi" },
      { label: "Bidang Hukum", value: "Kepariwisataan dan Ekonomi Kreatif" },
      { label: "Lampiran", value: "-" },
    ];

    return (
      <>
        <Headers/>
            
        <section className="h-full bg-slate-100 py-4 h-[500px]">
          {/* Judul */}
          <h1 className="text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4">
            Detail Peraturan
          </h1>

          <div className='flex justify-between w-[80%] gap-4 mx-auto'>

          {/* Card Peraturan */}
          <div className="max-w-[70%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
            <h2 className="text-[23px] font-bold font-roboto text-bluePu mt-3">
              Peraturan Menteri Koordinator Bidang Kemaritiman dan Investasi No 6 Tahun 2024
            </h2>
            <p className="text-gray-700 mt-2 font-roboto text-sm md:text-base leading-relaxed">
              tentang Pelaksanaan Tugas dan Wewenang Tim Koordinasi Peningkatan Peran Aktif Indonesia di Kawasan Dasar Laut Internasional
            </p>
            
            <div className="flex items-center border-b border-t mt-4 py-4 gap-4">

            <div className="box-border size-16 p-1 rounded-lg shadow-lg bg-gradient-to-r from-[#2793a3] to-bluePu flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-100 text-5xl">dictionary</span>
            </div>

            <p className='font-roboto font-semibold text-slate-600 text-[23px]'>Meta Data Peraturan</p>

            </div>


            {/* Detail Peraturan */}
            <div className="space-y-3 pt-6">
              {details.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start border-gray-200 pb-2 text-gray-800 font-roboto text-sm md:text-base"
                >
                  <span className="font-regular w-[30%] text-slate-600">{item.label}</span>
                  <span className="w-[5%]">:</span>
                  <span className="w-[60%]">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-2 border-t  py-2">
              <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-auto w-full md:px-3 px-2 py-2 rounded-2xl font-roboto md:text-[15px] text-[11px] flex items-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg ">
                <span className="material-symbols-outlined md:text-lg text-sm text-kuningButton">robot_2</span> Chat AI
              </button>
            </div>

            <div className="flex gap-3 mt-2 border-t  py-4">
            <p className='font-roboto font-semibold text-slate-600 text-[18px]'>Share :</p>
            <div className="flex gap-3">
              {/* Twitter */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i class="fa-brands fa-x-twitter text-white text-2xl"></i>
              </div>

              {/* Facebook */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#3b5998] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i class="fa-brands fa-facebook text-2xl text-white"></i>
              </div>

              {/* WhatsApp */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#25D366] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i class="fa-brands fa-whatsapp text-white text-2xl"></i>
              </div>

              {/* Telegram */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#0088cc] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i class="fa-brands fa-telegram text-white text-2xl"></i>
              </div>
            </div>
            </div>
          </div>

          <div className='flex-col w-[30%]'>

          <div className="w-full  mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex-col mb-4">
            <p className='font-roboto font-semibold text-slate-600 text-[14px] flex items-center gap-2 border-b pb-2'><span class="material-symbols-outlined">description</span> ABSTRAK</p>
            <div className='flex gap-2 p-2 w-full my-2'>
              <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg">
                <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">visibility</span> 
                Preview
              </button>
              <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg">
                <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">download</span> 
                Download
              </button>
            </div>
          </div>

          <div className="w-full  mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex-col my-4">
            <p className='font-roboto font-semibold text-slate-600 text-[14px] flex items-center gap-2 border-b pb-2'><span class="material-symbols-outlined">description</span> FILE PERATURAN</p>
            <div className='flex gap-2 p-2 w-full my-2'>
              <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg">
                <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">visibility</span> 
                Preview
              </button>
              <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg">
                <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">download</span> 
                Download
              </button>
            </div>
          </div>
              
          <div className="w-full  mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex-col my-4">
            <p className='font-roboto font-semibold text-slate-600 text-[14px] flex items-center gap-2 pb-2 border-b'><span class="material-symbols-outlined">description</span> BERKAS PARSIAL</p>


            <div className='p-2'>
              <p className='my-2 mx-2 font-roboto font-semibold text-[16px] text-bluePu'>1. Berkas Parsial Ke-1</p> 
              <div className='flex gap-2 '>
                <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg">
                  <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">visibility</span> 
                  Preview
                </button>
                <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg">
                  <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">download</span> 
                  Download
                </button>
              </div>
            </div>

            <div className='p-2'>
              <p className='my-2 mx-2 font-roboto font-semibold text-[16px] text-bluePu'>2. Berkas Parsial Ke-2</p> 
              <div className='flex gap-2 '>
                <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg">
                  <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">visibility</span> 
                  Preview
                </button>
                <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg">
                  <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">download</span> 
                  Download
                </button>
              </div>
            </div>
          </div>

          <div className="w-full  mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex-col my-4">
            <p className='font-roboto font-semibold text-slate-600 text-[14px] flex items-center gap-1 border-b pb-2'><span class="material-symbols-outlined -rotate-12">priority_high</span> STATUS PERATURAN</p>
            <div className='p-2 w-full my-2'>
              <div className="bg-blue-100 text-bluePu px-3 py-1 rounded-md w-fit text-[14px]">
                Mencabut
              </div>
              <p className="text-bluePu md:text-[14px] text-[12px] mt-2">
                <span className="text-blue-600 font-medium cursor-pointer">UU No. 29 Tahun 1959</span> tentang Pembentukan Daerah Tingkat II Di Sulawesi
              </p>
            </div>
          </div>

          </div>
          </div>

        </section>

        
        <Langganan/>
        <Footer/>
      </>
    );
  };
  
  export default DetailDokumen;
  