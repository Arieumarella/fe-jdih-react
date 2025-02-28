import React from 'react';

import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";


const Home = () => {
    return (
      <>
        <Headers/>
            
        <section className='h-full bg-slate-100 md:px-[180px] px-5 py-4 '>
          
          <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4'>Semua Berita</h1>

          <div className='items-center grid md:grid-cols-3 grid-cols-2 gap-8 mb-12'>

            <div className="group text-center">
              <div className="w-full h-full bg-slate-400 md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden group relative shadow-lg">
                {/* Gambar Background */}
                <div className='w-full h-full bg-[url("./assets/1.jpg")] bg-cover bg-center absolute group-hover:scale-125 transition-all duration-500'></div>
                
                {/* Kotak Keterangan */}
                <div className="absolute  left-1/2 -translate-x-1/2 bg-gray-700 bg-opacity-75 text-white text-sm px-3 py-1 rounded-md shadow-md w-[80%]">
                  Keterangan Gambar
                </div>
              </div>
            </div>
            <div className="group text-center">
              <div className="w-full h-full bg-slate-400 md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden group relative shadow-lg">
                {/* Gambar Background */}
                <div className='w-full h-full bg-[url("./assets/1.jpg")] bg-cover bg-center absolute group-hover:scale-125 transition-all duration-500'></div>
                
                {/* Kotak Keterangan */}
                <div className="absolute  left-1/2 -translate-x-1/2 bg-gray-700 bg-opacity-75 text-white text-sm px-3 py-1 rounded-md shadow-md w-[80%]">
                  Keterangan Gambar
                </div>
              </div>
            </div>
            <div className="group text-center">
              <div className="w-full h-full bg-slate-400 md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden group relative shadow-lg">
                {/* Gambar Background */}
                <div className='w-full h-full bg-[url("./assets/1.jpg")] bg-cover bg-center absolute group-hover:scale-125 transition-all duration-500'></div>
                
                {/* Kotak Keterangan */}
                <div className="absolute  left-1/2 -translate-x-1/2 bg-gray-700 bg-opacity-75 text-white text-sm px-3 py-1 rounded-md shadow-md w-[80%]">
                  Keterangan Gambar
                </div>
              </div>
            </div>
            <div className="group text-center">
              <div className="w-full h-full bg-slate-400 md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden group relative shadow-lg">
                {/* Gambar Background */}
                <div className='w-full h-full bg-[url("./assets/1.jpg")] bg-cover bg-center absolute group-hover:scale-125 transition-all duration-500'></div>
                
                {/* Kotak Keterangan */}
                <div className="absolute  left-1/2 -translate-x-1/2 bg-gray-700 bg-opacity-75 text-white text-sm px-3 py-1 rounded-md shadow-md w-[80%]">
                  Keterangan Gambar
                </div>
              </div>
            </div>
            <div className="group text-center">
              <div className="w-full h-full bg-slate-400 md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden group relative shadow-lg">
                {/* Gambar Background */}
                <div className='w-full h-full bg-[url("./assets/1.jpg")] bg-cover bg-center absolute group-hover:scale-125 transition-all duration-500'></div>
                
                {/* Kotak Keterangan */}
                <div className="absolute  left-1/2 -translate-x-1/2 bg-gray-700 bg-opacity-75 text-white text-sm px-3 py-1 rounded-md shadow-md w-[80%]">
                  Keterangan Gambar
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
  
  export default Home;
  