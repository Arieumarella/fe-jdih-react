import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import {getDetailBerita} from '../services/berita.services';

const DetailBerita = () => {

    const { slug } = useParams();

    const [data, setData] = useState([]);

      useEffect(() => {    
    
        // Get Jenis Peraturan
        getDetailBerita(slug).then((result) => {
            setData(result);
        });
            
      }, [slug]);

    console.log(data);

    const formatDate = (dateString=null) => {
        if(dateString==null){
            return '-'
        }
        
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6) - 1; // JS bulan mulai dari 0
        const day = dateString.substring(6, 8);
    
        const date = new Date(year, month, day);
        return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
    };      


    return (
      <>
        <Headers/>
            
        <section className="h-full bg-slate-100 py-4 h-[500px] ">
        

            <div className='md:flex justify-between md:w-[80%] w-full gap-4 mx-auto my-4'>
                <div className="md:w-[80%] w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">

                <div className='font-roboto font-semibold text-sm text-gray-600'>{formatDate(data?.tgl_buat)}</div>


                {/* Judul Berita */}
                <h1 className="md:text-[23px] text-[23px] font-bold font-roboto text-blue-900 mt-3 text-center">
                    {data?.judul}
                </h1>

                {/* Gambar Berita */}
                <div className="w-full h-[200px] md:h-[400px] overflow-hidden rounded-lg mt-4">
                    <img
                    src={`https://jdih.pu.go.id/internal/assets/assets/berita/${data?.gambar_1}`}
                    alt="Gambar Berita"
                    className="w-full h-full object-fill"
                    />
                </div>

                {/* Deskripsi Berita */}
                <p
                className="text-gray-600 text-sm md:text-base mt-4 text-justify leading-relaxed font-roboto"
                dangerouslySetInnerHTML={{ __html: data?.isi || "" }}
                />
                
                {/* Tombol Kembali */}
                <div className="mt-6">
                <button 
                    onClick={() => window.history.back()} 
                    className="flex items-center gap-2 bg-bluePu text-kuningButton hover:bg-opacity-80 font-bold py-2 px-2
                     rounded-md shadow-md transition-all duration-300 text-[14px]">
                    <i className="fa-solid fa-arrow-left"></i> Kembali
                </button>
                </div>

                <div className='flex justify-between border-t pt-2 mt-2'>
                   
                    <div className='flex-col'>
                    <p className='font-bold font-roboto text-slate-600'>Share :</p>
                    <div className="flex gap-3 mt-2">
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

                    <div className="flex gap-4 mt-2 px-2">
                        <div className="flex items-center gap-1 font-roboto font-medium text-bluePu">
                        <span className="material-symbols-outlined text-lg text-bluePu">visibility</span>
                        <p className="text-sm">123</p>
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
  
  export default DetailBerita;
  