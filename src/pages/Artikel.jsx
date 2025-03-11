import React from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


const Artikel = () => {

    let textKeterangan = "Tantangan Unit Kepatuhan Intern Sebagai Second Line Of Defense dan Menjaga Kepatuhan Terhadap Peraturan Perundang-undangan";
    const trimmedText = textKeterangan.length > 130 ? textKeterangan.substring(0, 130) + "..." : textKeterangan;
    const navigate = useNavigate();
    
    const navigateHandelClick = (link = '') => {
      navigate(`/${link}`);
    };


    return (
       <>
        <Headers/>
        
        <section className='h-full bg-slate-100 md:px-[300px] px-5 py-4 '>
          
          <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4'>Semua Artikel</h1>

          <div className="box-border md:w-[50%] w-full mx-auto md:my-4 my-2 md:mb-[50px] mb-[20px]  rounded-lg md:h-[70px] h-[60px] bg-bluePu shadow-lg flex items-center px-4">
            <input 
              type="text" 
              placeholder="Cari judul artikel..." 
              className="w-full bg-transparent outline-none text-white placeholder-white font-roboto text-lg"
            />
            <button className="ml-2 w-[90px] bg-kuningButton text-bluePu px-4 py-2 rounded-lg font-roboto font-semibold hover:bg-opacity-80 transition">
              Cari
            </button>
          </div>


          <div className='items-center grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-4 mb-12'>

          <div
            className="group relative cursor-pointer transition-transform duration-500 hover:scale-[1.05] hover:shadow-2xl"
            onClick={(e) => {
              e.preventDefault();
              navigateHandelClick("artikel/slug");
            }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-300 md:aspect-[4/4] aspect-[3/4]">
              {/* Gambar Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("./1.jpg")' }}
              ></div>

              {/* Overlay Gradasi */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Kotak Keterangan */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-center text-white">
                <p className="font-semibold text-lg md:text-xl line-clamp-2">{trimmedText}</p>
                <p className="mt-1 text-sm md:text-base text-gray-300">12 - Oktober</p>
              </div>
            </div>
          </div>

          <div
            className="group relative cursor-pointer transition-transform duration-500 hover:scale-[1.05] hover:shadow-2xl"
            onClick={(e) => {
              e.preventDefault();
              navigateHandelClick("artikel/slug");
            }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-300 md:aspect-[4/4] aspect-[3/4]">
              {/* Gambar Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("./1.jpg")' }}
              ></div>

              {/* Overlay Gradasi */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Kotak Keterangan */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-center text-white">
                <p className="font-semibold text-lg md:text-xl line-clamp-2">{trimmedText}</p>
                <p className="mt-1 text-sm md:text-base text-gray-300">12 - Oktober</p>
              </div>
            </div>
          </div>

          <div
            className="group relative cursor-pointer transition-transform duration-500 hover:scale-[1.05] hover:shadow-2xl"
            onClick={(e) => {
              e.preventDefault();
              navigateHandelClick("artikel/slug");
            }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-300 md:aspect-[4/4] aspect-[3/4]">
              {/* Gambar Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("./1.jpg")' }}
              ></div>

              {/* Overlay Gradasi */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Kotak Keterangan */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-center text-white">
                <p className="font-semibold text-lg md:text-xl line-clamp-2">{trimmedText}</p>
                <p className="mt-1 text-sm md:text-base text-gray-300">12 - Oktober</p>
              </div>
            </div>
          </div>

          <div
            className="group relative cursor-pointer transition-transform duration-500 hover:scale-[1.05] hover:shadow-2xl"
            onClick={(e) => {
              e.preventDefault();
              navigateHandelClick("artikel/slug");
            }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-300 md:aspect-[4/4] aspect-[3/4]">
              {/* Gambar Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("./1.jpg")' }}
              ></div>

              {/* Overlay Gradasi */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Kotak Keterangan */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-center text-white">
                <p className="font-semibold text-lg md:text-xl line-clamp-2">{trimmedText}</p>
                <p className="mt-1 text-sm md:text-base text-gray-300">12 - Oktober</p>
              </div>
            </div>
          </div>

          <div
            className="group relative cursor-pointer transition-transform duration-500 hover:scale-[1.05] hover:shadow-2xl"
            onClick={(e) => {
              e.preventDefault();
              navigateHandelClick("artikel/slug");
            }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-300 md:aspect-[4/4] aspect-[3/4]">
              {/* Gambar Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("./1.jpg")' }}
              ></div>

              {/* Overlay Gradasi */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Kotak Keterangan */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-center text-white">
                <p className="font-semibold text-lg md:text-xl line-clamp-2">{trimmedText}</p>
                <p className="mt-1 text-sm md:text-base text-gray-300">12 - Oktober</p>
              </div>
            </div>
          </div>

          <div
            className="group relative cursor-pointer transition-transform duration-500 hover:scale-[1.05] hover:shadow-2xl"
            onClick={(e) => {
              e.preventDefault();
              navigateHandelClick("artikel/slug");
            }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-300 md:aspect-[4/4] aspect-[3/4]">
              {/* Gambar Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("./1.jpg")' }}
              ></div>

              {/* Overlay Gradasi */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Kotak Keterangan */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-center text-white">
                <p className="font-semibold text-lg md:text-xl line-clamp-2">{trimmedText}</p>
                <p className="mt-1 text-sm md:text-base text-gray-300">12 - Oktober</p>
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

}

export default Artikel;