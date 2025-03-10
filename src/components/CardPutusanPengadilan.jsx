import React from 'react';
import { useNavigate } from "react-router-dom";

const CardPutusanPengadilan = () => {

  const navigate = useNavigate();

  const navigateHandelClick = (link = '') => {
    navigate(`/${link}`);
  };

  return (
    <>
    <div className="w-full md:w-[70%] mx-auto bg-white rounded-xl shadow-lg flex flex-col overflow-hidden my-10">
    {/* Header */}
    <div className="flex md:justify-between items-center w-full bg-slate-200 p-4">
      <span className="text-kuningButton bg-bluePu px-2 py-1 rounded-lg md:text-[14px] text-[12px] font-medium font-roboto">
        Berlaku
      </span>
    </div>

    {/* Title */}
    <div className="p-6">
      <h2 
      className="md:text-[19px] text-[16px] font-semibold text-bluePu hover:text-opacity-70 font-roboto cursor-pointer"
      onClick={(e) => { e.preventDefault(); navigateHandelClick("putasn-pengadilan/slug"); }}
      >
        Putusan Mahkamah Agung Nomor 23/G/2020/PTUN.JPR Tahun 2020
      </h2>
      <p className='block md:text-[16px] text-[14px] font-medium font-roboto text-slate-500'>Putusan Mahkamah Agung Nomor 23/G/2020/PTUN.JPR Tahun 2020 PT Citra Konstruksi Persada lawan Kelompok Kerja (Pokja) Pemilihan 71 SDA, dkk</p>
      <div className='flex mt-2 gap-3'>
        <div className='flex gap-1 font-roboto md:text-[16px] text-[12px] text-bluePu'>
        <span class="material-symbols-outlined">schedule</span>
          <p className='inline'>06 - Januari - 2025</p>
        </div>
      </div>
    </div>

    {/* Download Section */}
    <div className="md:p-6 p-2 md:py-4 py-2 border-t">
     <div className='flex flex-col md:flex-row md:justify-between text-center'>

     <div className="flex gap-3 mt-2">

      <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-auto w-full md:px-3 px-2 py-2 rounded-2xl font-roboto md:text-[15px] text-[11px] flex justify-center items-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined md:text-lg text-base text-kuningButton">download_2</span> Unduh
      </button>

      <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-auto w-full md:px-3 px-2 py-2 rounded-2xl font-roboto md:text-[15px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined md:text-lg text-base text-kuningButton">search</span> Detail
      </button>
    </div>

      <div className="flex gap-4 md:mt-2 mt-4 px-2">
        <div className="flex items-center gap-1 font-roboto font-medium text-bluePu">
          <span className="material-symbols-outlined text-lg text-bluePu">visibility</span>
          <p className="text-sm">123</p>
        </div>
        <div className="flex items-center gap-1 font-roboto font-medium text-bluePu">
          <span className="material-symbols-outlined text-lg text-bluePu">download</span>
          <p className="text-sm">321</p>
        </div>
      </div>
     </div>
    </div>
    </div>
  </>
  );
};

export default CardPutusanPengadilan;
