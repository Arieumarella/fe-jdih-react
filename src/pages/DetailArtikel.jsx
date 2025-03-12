import React from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
// import CardArtikel from "../components/CardArtikel";

const DetailArtikel = () => {
    return (
        <>
            <Headers />
            
            <section className="h-full bg-slate-100 py-4 h-[500px] ">

            <div className='md:w-[60%] w-[100%] mx-auto p-4'>
            
            <p className="text-left md:pl-6 pl-2 font-roboto font-semibold text-gray-500 md:text-[14px] text-[12px]">11 Februari 2024</p>

            {/* Judul */}
            <h1 className="text-left font-roboto font-bold text-bluePu md:text-[24px] text-[20px]  md:pl-6 pl-2">
                Menteri Pekerjaan Umum Memulai Pengabdian kepada Masyarakat yaitu membangun jaringan irigasi
            </h1>

            <img 
            src="/artikel.jpeg" 
            alt="image artikel"
            className="md:ml-6 ml-2 rounded-2xl shadow-lg  md:w-[95%] w-[90%] item-center my-4" 
            />

            <div className="md:flex flex-col bg-white text-bluePu font-roboto shadow-md rounded-xl border border-gray-200 md:w-[95%] w-[100%] mx-auto my-6 p-6 min-h-[500px]">
            {/* Header */}
            <h2 className="md:text-lg text-[16px] font-semibold border-b pb-3 mb-4">
                Lembar Kerja Artikel
            </h2>

            {/* Konten Utama */}
            <div className="flex flex-col gap-4 text-sm sm:text-base font-roboto">
              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-1/3 font-semibold text-[14px]">Tipe Dokumen</span>
                <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">Artikel</span>
              </div>

              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-1/3 font-semibold text-[14px]">Judul</span>
                <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px] text-blue-600 cursor-pointer hover:text-blue-700 transition">
                  Luhut Ungkap RI Incar Sumber Baru Pengganti BBM
                </span>
              </div>

              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-1/3 font-semibold text-[14px]">T.E.U. Orang/Badan</span>
                <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">Verda Nano Setiawan / CNBC Indonesia</span>
              </div>

              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-1/3 font-semibold text-[14px]">Tempat Terbit</span>
                <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">Jakarta</span>
              </div>

              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-1/3 font-semibold text-[14px]">Tahun Terbit</span>
                <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">2024</span>
              </div>

              {/* Sumber */}
              <div className="flex flex-col sm:flex-row border-t pt-3">
                <span className="w-full sm:w-1/3 font-semibold text-[14px]">Sumber</span>
                <div className="w-full sm:w-2/3 flex flex-col gap-1">
                  <span className="text-sm">Penerbit: CNBC Indonesia</span>
                  <span className="text-sm">Penulis: Verda Nano Setiawan</span>
                  <span className="text-sm">Foto: CNBC Indonesia / Faisal Rahman</span>
                </div>
              </div>

              {/* Subjek */}
              <div className="flex flex-col sm:flex-row border-t pt-3">
                <span className="w-full sm:w-1/3 font-semibold text-[14px]">Subjek</span>
                <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">LUHUT - BBM</span>
              </div>

              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-1/3 font-semibold text-[14px]">Bahasa</span>
                <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">Indonesia</span>
              </div>

              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-1/3 font-semibold text-[14px]">Bidang Hukum</span>
                <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">Energi</span>
              </div>

              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-1/3 font-semibold text-[14px]">Lokasi</span>
                <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">CNBC</span>
              </div>

              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-1/3 font-semibold text-[14px]">Lampiran</span>
                <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">-</span>
              </div>
            </div>


            <div className="flex gap-3 mt-2 border-t py-4">
            <p className='font-roboto font-semibold text-slate-600 md:text-[16px] text-[14px]'>Share :</p>
            <div className="flex gap-3">
              {/* Twitter */}
              <div className="w-8 h-8 flex items-center justify-center bg-[#1DA1F2] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-x-twitter text-white text-xl"></i>
              </div>

              {/* Facebook */}
              <div className="w-8 h-8 flex items-center justify-center bg-[#3b5998] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-facebook text-xl text-white"></i>
              </div>

              {/* WhatsApp */}
              <div className="w-8 h-8 flex items-center justify-center bg-[#25D366] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-whatsapp text-white text-xl"></i>
              </div>

              {/* Telegram */}
              <div className="w-8 h-8 flex items-center justify-center bg-[#0088cc] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-telegram text-white text-xl"></i>
              </div>
            </div>
            </div>

            </div>


            
            </div>

            </section>
            
            <Langganan />
            <Footer />
        </>
    );
}

export default DetailArtikel