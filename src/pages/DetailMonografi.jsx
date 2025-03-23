import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import {getDetailMonografi} from "../services/monografi.services";

const DetailMonografi = () => {

    const { slug } = useParams();
    const [dataMonografi, setDataMonografi] = useState([]);

    useEffect(() => {
      getDetailMonografi(slug).then((result) => {
        setDataMonografi(result.data);
           });
      }, []);

      console.log(dataMonografi);

    return (
      <>
        <Headers/>
            
        <section className="h-full bg-slate-100 py-4  ">
        
        <div className="md:flex bg-white shadow-lg rounded-2xl border border-gray-300 md:w-[70%] w-[95%] mx-auto my-6 p-6">
  
        {/* Bagian Kiri - Gambar Buku */}
        <div className="md:w-1/3 w-full flex flex-col mt-6">
            <img 
            src="https://jdih.maritim.go.id/cfind/source/thumb/images/pustaka/cover_w320_h472_buku-hukum-pendaftaran-tanah-dan-hak-tanggungan.png" 
            alt="Cover Buku" 
            className="rounded-xl shadow-md md:w-2/3 md:w-full object-cover h-2/3"
            />
             {/* Judul Buku */}
             <div className=' w-full mt-4'>
                <h2 className="text-[20px] font-roboto font-bold text-bluePu">Pengantar Hukum Perbankan Indonesia</h2>
                <p className="text-bluePu text-[14px] mt-1">Oleh: <span className="font-semibold">Dr. H. Zainal Asikin, SH., S.U.</span></p>
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

        {/* Bagian Kanan - Detail Buku */}
        <div className="md:w-2/3 w-full md:pl-8 mt-6 md:mt-0">
            {/* Deskripsi */}
            <div className="mt-4 border-b border-gray-300 pb-4">
            <h3 className="font-bold text-bluePu text-[20px] font-roboto">Deskripsi</h3>
            <p className="text-[16px] text-bluePu mt-1 leading-relaxed font-roboto text-base">
                Hampir semua orang pernah berhubungan dengan Bank dan Lembaga Keuangan Non Bank, 
                namun tidak semua orang memahami tentang hubungan hukum yang muncul dalam transaksi perbankan...
            </p>
            </div>

            {/* Detail Informasi */}
            <div className="mt-6">
            <h3 className="font-bold font-roboto text-[20px] text-bluePu ">Detail Informasi</h3>
            <div className="md:space-y-3 space-y-2 md:pt-6 pt-8">
             
                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base"
                >
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Tipe Dokumen</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Monografi</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Judul</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Hukum Acara Pidana</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Jenis Monografi</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Buku Hukum</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Singkatan Jenis</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">BukuHukum</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">T.E.U. Badan / Pengarang</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Bismar Siregar</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Nomor Panggil</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">343</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Cetakan / Edisi</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Pertama</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Tempat Terbit</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Jakarta</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Penerbit</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Bina Cipta</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Tahun Terbit</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">1983</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Deskripsi Fisik</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Buku Lama</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Subjek</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">PIDANA</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">ISBN</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">-</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Bahasa</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Indonesia</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Bidang Hukum</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Hukum Pidana</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Nomor Induk Buku</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">343</span>
                </div>

                <div  
                  className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                  <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">Lokasi</span>
                  <span className="md:w-[5%] hidden md:inline ">:</span>
                  <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Biro Hukum Kementerian PU</span>
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
  
  export default DetailMonografi;