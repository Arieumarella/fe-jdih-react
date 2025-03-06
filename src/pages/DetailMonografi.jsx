import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";

const DetailMonografi = () => {

    const { slug } = useParams();

    return (
      <>
        <Headers/>
            
        <section className="h-full bg-slate-100 py-4 h-[500px] ">
        
        <div className="md:flex bg-white shadow-lg rounded-2xl border border-gray-300 md:w-[60%] w-[95%] mx-auto my-6 p-6">
  
        {/* Bagian Kiri - Gambar Buku */}
        <div className="md:w-1/3 w-full flex justify-center">
            <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80" 
            alt="Cover Buku" 
            className="rounded-xl shadow-md md:w-full w-3/4 object-cover"
            />
        </div>

        {/* Bagian Kanan - Detail Buku */}
        <div className="md:w-2/3 w-full md:pl-8 mt-6 md:mt-0">
            
            {/* Status */}
            <span className="bg-green-200 text-green-700 text-xs px-4 py-1 rounded-full font-semibold">
            Tersedia
            </span>

            {/* Judul Buku */}
            <h2 className="text-xl font-bold mt-3">Pengantar Hukum Perbankan Indonesia</h2>
            <p className="text-gray-600 text-sm mt-1">Oleh: <span className="font-semibold">Dr. H. Zainal Asikin, SH., S.U.</span></p>

            {/* Deskripsi */}
            <div className="mt-4">
            <h3 className="font-semibold text-gray-700">Deskripsi</h3>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Hampir semua orang pernah berhubungan dengan Bank dan Lembaga Keuangan Non Bank, 
                namun tidak semua orang memahami tentang hubungan hukum yang muncul dalam transaksi perbankan...
            </p>
            </div>

            {/* Detail Informasi */}
            <div className="mt-6">
            <h3 className="font-semibold text-gray-700">Detail Informasi</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-2 text-sm">
                <p><span className="font-semibold">Tipe Dokumen:</span> Monografi Hukum</p>
                <p><span className="font-semibold">Judul:</span> Pengantar Hukum Perbankan Indonesia</p>
                <p><span className="font-semibold">T.E.U Orang/Badan:</span> Dr. H. Zainal Asikin, SH., S.U.</p>
                <p><span className="font-semibold">Nomor Panggil:</span> 336.711 ZAI</p>
                <p><span className="font-semibold">Cetakan/Edisi:</span> ke-2</p>
                <p><span className="font-semibold">Tempat Terbit:</span> Depok</p>
                <p><span className="font-semibold">Penerbit:</span> Rajagrafindo Persada</p>
            </div>
            </div>

            {/* Share Button */}
            <div className="mt-6 flex gap-3">
            <span className="font-semibold text-gray-700">Share:</span>
            <div className="flex gap-2">
                <a href="#" className="text-blue-600 hover:opacity-80"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-sky-500 hover:opacity-80"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-green-500 hover:opacity-80"><i className="fab fa-whatsapp"></i></a>
                <a href="#" className="text-gray-600 hover:opacity-80"><i className="fas fa-envelope"></i></a>
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
  
  export default DetailMonografi;