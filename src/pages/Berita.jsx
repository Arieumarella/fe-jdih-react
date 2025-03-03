import React from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";


const Home = () => {

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


          <div className='items-center grid md:grid-cols-3 grid-cols-2 md:gap-8 gap-2 mb-12'>

          <div className="group text-center cursor-pointer">
            <div className="w-full h-full bg-slate-400 md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden relative shadow-lg">
              {/* Gambar Background */}
              <div className='w-full h-full bg-[url("./assets/1.jpg")] bg-cover bg-center absolute group-hover:scale-125 transition-all duration-500'></div>

              {/* Kotak Keterangan di Bagian Bawah */}
              <div className="absolute bottom-0 left-0 w-full bg-bluePu group-hover:bg-opacity-100 bg-opacity-80 text-kuningButton font-semibold md:text-sm text-[9px] p-2 text-center font-roboto h-[60px] transition-all duration-500 items-center justify-center flex">
                {trimmedText}
              </div>
            </div>
          </div>

          <div className="group text-center cursor-pointer">
            <div className="w-full h-full bg-slate-400 md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden relative shadow-lg">
              {/* Gambar Background */}
              <div className='w-full h-full bg-[url("./assets/1.jpg")] bg-cover bg-center absolute group-hover:scale-125 transition-all duration-500'></div>

              {/* Kotak Keterangan di Bagian Bawah */}
              <div className="absolute bottom-0 left-0 w-full bg-bluePu group-hover:bg-opacity-100 bg-opacity-80 text-kuningButton font-semibold md:text-sm text-[9px] p-2 text-center font-roboto h-[60px] transition-all duration-500 items-center justify-center flex">
                {trimmedText}
              </div>
            </div>
          </div>

          <div className="group text-center cursor-pointer">
            <div className="w-full h-full bg-slate-400 md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden relative shadow-lg">
              {/* Gambar Background */}
              <div className='w-full h-full bg-[url("./assets/1.jpg")] bg-cover bg-center absolute group-hover:scale-125 transition-all duration-500'></div>

              {/* Kotak Keterangan di Bagian Bawah */}
              <div className="absolute bottom-0 left-0 w-full bg-bluePu group-hover:bg-opacity-100 bg-opacity-80 text-kuningButton font-semibold md:text-sm text-[9px] p-2 text-center font-roboto h-[60px] transition-all duration-500 items-center justify-center flex">
                {trimmedText}
              </div>
            </div>
          </div>

          <div className="group text-center cursor-pointer">
            <div className="w-full h-full bg-slate-400 md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden relative shadow-lg">
              {/* Gambar Background */}
              <div className='w-full h-full bg-[url("./assets/1.jpg")] bg-cover bg-center absolute group-hover:scale-125 transition-all duration-500'></div>

              {/* Kotak Keterangan di Bagian Bawah */}
              <div className="absolute bottom-0 left-0 w-full bg-bluePu group-hover:bg-opacity-100 bg-opacity-80 text-kuningButton font-semibold md:text-sm text-[9px] p-2 text-center font-roboto h-[60px] transition-all duration-500 items-center justify-center flex">
                {trimmedText}
              </div>
            </div>
          </div>

          <div className="group text-center cursor-pointer">
            <div className="w-full h-full bg-slate-400 md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden relative shadow-lg">
              {/* Gambar Background */}
              <div className='w-full h-full bg-[url("./assets/1.jpg")] bg-cover bg-center absolute group-hover:scale-125 transition-all duration-500'></div>

              {/* Kotak Keterangan di Bagian Bawah */}
              <div className="absolute bottom-0 left-0 w-full bg-bluePu group-hover:bg-opacity-100 bg-opacity-80 text-kuningButton font-semibold md:text-sm text-[9px] p-2 text-center font-roboto h-[60px] transition-all duration-500 items-center justify-center flex">
                {trimmedText}
              </div>
            </div>
          </div>

          <div className="group text-center cursor-pointer">
            <div className="w-full h-full bg-slate-400 md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden relative shadow-lg">
              {/* Gambar Background */}
              <div className='w-full h-full bg-[url("./assets/1.jpg")] bg-cover bg-center absolute group-hover:scale-125 transition-all duration-500'></div>

              {/* Kotak Keterangan di Bagian Bawah */}
              <div className="absolute bottom-0 left-0 w-full bg-bluePu group-hover:bg-opacity-100 bg-opacity-80 text-kuningButton font-semibold md:text-sm text-[9px] p-2 text-center font-roboto h-[60px] transition-all duration-500 items-center justify-center flex">
                {trimmedText}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className='flex justify-end items-center my-4 space-x-2 gap-4'>
          <span className='font-medium font-roboto text-[30px]'>Halaman</span>
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
  