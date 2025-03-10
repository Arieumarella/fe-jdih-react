import React from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import CardAgenda from "../components/CardAgenda";
import { useNavigate } from "react-router-dom";



const Agenda = () => {

    const navigate = useNavigate();
    
      const navigateHandelClick = (link = '') => {
        navigate(`/${link}`);
      };

      let textKeterangan = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, eum.qadsf  sdfg dsfgdfshdfs";
      const trimmedText = textKeterangan.length > 120 ? textKeterangan.substring(0, 120) + "..." : textKeterangan;


    return (
      <>
        <Headers/>
            
        <section className='h-full bg-slate-100 md:px-[180px] px-5 py-4 h-[500px]'>
          
          <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4'>Agenda</h1>

          <CardAgenda/>

        {/* Pagination */}
        <div className='flex justify-end items-center my-4 space-x-2 gap-4 md:w-[85%]'>
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
  };
  
  export default Agenda;
  