import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";

const DetailPutusan = () => {

    const { slug } = useParams();

    const details = [
      { label: "Tipe", value: "Putusan Pengadilan / Yurispudensi" },
      { label: "Judul", value: "Putusan Mahkamah Agung Nomor 23/G/2020/PTUN.JPR Tahun 2020 PT Citra Konstruksi Persada lawan Kelompok Kerja (Pokja) Pemilihan 71 SDA, dkk" },
      { label: "T.E.U. Badan / Pengarang", value: "Pengadilan Tata Usaha Negara" },
      { label: "Nomor Putusan", value: "23/G/2020/PTUN.JPR" },
      { label: "Jenis Peradilan", value: "Pengadilan Tata Usaha Negara" },
      { label: "Singkatan Jenis", value: "PTUN" },
      { label: "Tempat Peradilan", value: "Jakarta" },
      { label: "Tanggal Dibacakan", value: " 20/10/2020" },
      { label: "Sumber", value: "Mahkamah Agung" },
      { label: "Bahasa", value: "Indonesia" },
      { label: "Bidang Hukum", value: "Hukum Administrasi Negara" },
      { label: "Lokasi", value: "Biro Hukum Kementerian Koordinator Bidang Kemaritiman dan Investasi" }
    ];

    return (
      <>
        <Headers/>
            
        <section className="h-full bg-slate-100 py-4 h-[500px] ">
          {/* Judul */}
          <h1 className="text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4">
            Detail Putusan
          </h1>

          <div className='md:flex justify-between md:w-[80%] w-full gap-4 mx-auto'>

          {/* Card Peraturan */}
          <div className="md:max-w-[70%] max-w-[95%]  mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
            <h2 className="md:text-[23px] text-[18px] font-bold font-roboto text-bluePu mt-3 md:text-left text-center">
            Putusan Mahkamah Agung Nomor 23/G/2020/PTUN.JPR Tahun 2020 PT Citra Konstruksi Persada lawan Kelompok Kerja (Pokja) Pemilihan 71 SDA, dkk
            </h2>
            
            <div className="flex items-center border-b border-t mt-4 py-4 gap-4">

            <div className="box-border md:size-16 size-14 p-1 rounded-lg shadow-lg bg-gradient-to-r from-[#2793a3] to-bluePu flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-100 md:text-5xl text-4xl">dictionary</span>
            </div>

            <p className='font-roboto font-semibold text-slate-600 md:text-[23px] text-[18px]'>Meta Data Putusan</p>

            </div>


            {/* Detail Peraturan */}
            <div className="md:space-y-3 space-y-2 md:pt-6 pt-8">
              {details.map((item, index) => (
                <div 
                  key={index} 
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base"
                >
                  <span className="md:font-regular font-semibold text-slate-700 md:w-[30%] w-full md:text-[15px] text-[14px]">{item.label}</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-slate-600 ">{item.value}</span>
                </div>
              ))}
            </div>


            <div className="flex gap-3 mt-2 border-t py-2">
              <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-auto w-full md:px-3 px-2 py-2 rounded-2xl font-roboto md:text-[15px] text-[16px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg text-center">
                <span className="material-symbols-outlined md:text-lg text-xl text-kuningButton">download</span>
                <span>Unduh</span>
              </button>
            </div>

            <div className="flex gap-3 mt-2 border-t py-4">
            <p className='font-roboto font-semibold text-slate-600 md:text-[18px] text-[14px]'>Share :</p>
            <div className="flex gap-3">
              {/* Twitter */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-x-twitter text-white text-2xl"></i>
              </div>

              {/* Facebook */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#3b5998] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-facebook text-2xl text-white"></i>
              </div>

              {/* WhatsApp */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#25D366] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-whatsapp text-white text-2xl"></i>
              </div>

              {/* Telegram */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#0088cc] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-telegram text-white text-2xl"></i>
              </div>
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
  
  export default DetailPutusan;
  