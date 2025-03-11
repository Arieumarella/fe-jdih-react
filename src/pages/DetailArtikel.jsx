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

            <div className='w-[60%] mx-auto p-4'>
            
            <p className="text-left md:pl-6 pl-4 font-roboto font-semibold text-gray-500 text-[14px]">11 Februari 2024</p>

            {/* Judul */}
            <h1 className="text-left font-roboto font-bold text-bluePu md:text-[24px] text-[23px]  md:pl-6 pl-4">
                Menteri Pekerjaan Umum Memulai Pengabdian kepada Masyarakat yaitu membangun jaringan irigasi
            </h1>

            <img 
            src="/artikel.jpeg" 
            alt="image artikel"
            className="md:ml-6 ml-4 rounded-2xl shadow-lg  w-[95%] item-center my-4" 
            />

            <div className="md:flex flex-col bg-white text-bluePu font-roboto shadow-md rounded-xl border border-gray-200 w-[95%] mx-auto my-6 p-6 min-h-[500px]">
            {/* Header */}
            <h2 className="text-lg font-semibold border-b pb-3 mb-4">
                Lembar Kerja Artikel
            </h2>

            {/* Konten Utama */}
            <div className="flex flex-col gap-4">
                <div className="flex">
                <span className="w-1/3 font-medium">Tipe Dokumen</span>
                <span className="w-2/3">Artikel</span>
                </div>

                <div className="flex">
                <span className="w-1/3 font-medium">Judul</span>
                <span className="w-2/3 text-blue-600 cursor-pointer hover:text-blue-700 transition">
                    Luhut Ungkap RI Incar Sumber Baru Pengganti BBM
                </span>
                </div>

                <div className="flex">
                <span className="w-1/3 font-medium">T.E.U. Orang/Badan</span>
                <span className="w-2/3">Verda Nano Setiawan / CNBC Indonesia</span>
                </div>

                <div className="flex">
                <span className="w-1/3 font-medium">Tempat Terbit</span>
                <span className="w-2/3">Jakarta</span>
                </div>

                <div className="flex">
                <span className="w-1/3 font-medium">Tahun Terbit</span>
                <span className="w-2/3">2024</span>
                </div>

                {/* Sumber (Dibuat Sejajar dengan Elemen Lain) */}
                <div className="flex border-t pt-3">
                <span className="w-1/3 font-medium">Sumber</span>
                <div className="w-2/3 flex flex-col gap-1">
                    <span className="text-sm">Penerbit: CNBC Indonesia</span>
                    <span className="text-sm">Penulis: Verda Nano Setiawan</span>
                    <span className="text-sm">Foto: CNBC Indonesia / Faisal Rahman</span>
                </div>
                </div>

                {/* Subjek */}
                <div className="flex border-t pt-3">
                <span className="w-1/3 font-medium">Subjek</span>
                <span className="w-2/3">LUHUT - BBM</span>
                </div>

                <div className="flex">
                <span className="w-1/3 font-medium">Bahasa</span>
                <span className="w-2/3">Indonesia</span>
                </div>

                <div className="flex">
                <span className="w-1/3 font-medium">Bidang Hukum</span>
                <span className="w-2/3">Energi</span>
                </div>

                <div className="flex">
                <span className="w-1/3 font-medium">Lokasi</span>
                <span className="w-2/3">CNBC</span>
                </div>

                <div className="flex">
                <span className="w-1/3 font-medium">Lampiran</span>
                <span className="w-2/3">-</span>
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