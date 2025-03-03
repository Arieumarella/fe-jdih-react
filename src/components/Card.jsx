import React from 'react';

const Card = () => {
  return (
    <>
    <div className="w-full md:w-[70%] mx-auto bg-white rounded-xl shadow-lg flex flex-col overflow-hidden my-10">
    {/* Header */}
    <div className="flex justify-between items-center w-full bg-slate-200 p-4">
      <span className="text-slate-500 text-[16px] font-medium font-roboto">
      Keputusan Menteri nomor 1648/KPTS/M/2024
      </span>
      <span className="text-slate-500 text-[14px]">• Berlaku mulai 4 bulan yang lalu</span>
    </div>

    {/* Title */}
    <div className="p-6">
      <h2 className="text-[19px] font-semibold text-bluePu font-roboto">
        Keputusan Menteri Pekerjaan Umum dan Perumahan Rakyat Nomor 1648/KPTS/M/2024 Tahun 2024 tentang Himpunan Pejabat Fungsional Permukiman
      </h2>
      <div className='flex mt-2 gap-3'>
        <div className='flex gap-1 font-roboto font-medium text-bluePu'>
        <span class="material-symbols-outlined">history_edu</span>
          <p className='inline'>06 - Januari - 2025</p>
        </div>
        <div className='flex gap-1 font-roboto font-medium text-bluePu'>
        <span class="material-symbols-outlined">campaign</span>
          <p className='inline'>LN 12/2025</p>
        </div>

      </div>
    </div>

    {/* Status Peraturan */}
    <div className="p-6 pt-0 font-roboto">
      <h3 className="text-bluePu font-bold mb-2 text-[14px]">Status Peraturan</h3>
      <div className="bg-blue-100 text-bluePu px-3 py-1 rounded-md w-fit text-[14px]">
        Mencabut
      </div>
      <p className="text-bluePu text-[14px] mt-2">
        <span className="text-blue-600 font-medium cursor-pointer">UU No. 29 Tahun 1959</span> tentang Pembentukan Daerah Tingkat II Di Sulawesi
      </p>
      <p className="text-bluePu text-sm">
        Ketentuan yang mengatur mengenai Kota Parepare dalam Undang-Undang Nomor 29 Tahun 1959, dicabut dan dinyatakan tidak berlaku.
      </p>
    </div>

    {/* Download Section */}
    <div className="p-6 py-4 border-t">
     <div className='flex justify-between text-center'>

     <div className="flex gap-3 mt-2">
      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">robot_2</span> Chat AI
      </button>

      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">visibility</span> Abstrak
      </button>

      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">download_2</span> Unduh
      </button>

      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">search</span> Detail
      </button>
    </div>

      <div className="flex gap-4 mt-2">
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

    <div className="w-full md:w-[70%] mx-auto bg-white rounded-xl shadow-lg flex flex-col overflow-hidden my-10">
    {/* Header */}
    <div className="flex justify-between items-center w-full bg-slate-200 p-4">
      <span className="text-slate-500 text-[16px] font-medium font-roboto">
      Keputusan Menteri nomor 1648/KPTS/M/2024
      </span>
      <span className="text-slate-500 text-[14px]">• Berlaku mulai 4 bulan yang lalu</span>
    </div>

    {/* Title */}
    <div className="p-6">
      <h2 className="text-[19px] font-semibold text-bluePu font-roboto">
        Keputusan Menteri Pekerjaan Umum dan Perumahan Rakyat Nomor 1648/KPTS/M/2024 Tahun 2024 tentang Himpunan Pejabat Fungsional Permukiman
      </h2>
      <div className='flex mt-2 gap-3'>
        <div className='flex gap-1 font-roboto font-medium text-bluePu'>
        <span class="material-symbols-outlined">history_edu</span>
          <p className='inline'>06 - Januari - 2025</p>
        </div>
        <div className='flex gap-1 font-roboto font-medium text-bluePu'>
        <span class="material-symbols-outlined">campaign</span>
          <p className='inline'>LN 12/2025</p>
        </div>

      </div>
    </div>

    {/* Status Peraturan */}
    <div className="p-6 pt-0 font-roboto">
      <h3 className="text-bluePu font-bold mb-2 text-[14px]">Status Peraturan</h3>
      <div className="bg-blue-100 text-bluePu px-3 py-1 rounded-md w-fit text-[14px]">
        Mencabut
      </div>
      <p className="text-bluePu text-[14px] mt-2">
        <span className="text-blue-600 font-medium cursor-pointer">UU No. 29 Tahun 1959</span> tentang Pembentukan Daerah Tingkat II Di Sulawesi
      </p>
      <p className="text-bluePu text-sm">
        Ketentuan yang mengatur mengenai Kota Parepare dalam Undang-Undang Nomor 29 Tahun 1959, dicabut dan dinyatakan tidak berlaku.
      </p>
    </div>

    {/* Download Section */}
    <div className="p-6 py-4 border-t">
     <div className='flex justify-between text-center'>

     <div className="flex gap-3 mt-2">
      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">robot_2</span> Chat AI
      </button>

      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">visibility</span> Abstrak
      </button>

      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">download_2</span> Unduh
      </button>

      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">search</span> Detail
      </button>
    </div>

      <div className="flex gap-4 mt-2">
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

    <div className="w-full md:w-[70%] mx-auto bg-white rounded-xl shadow-lg flex flex-col overflow-hidden my-10">
    {/* Header */}
    <div className="flex justify-between items-center w-full bg-slate-200 p-4">
      <span className="text-slate-500 text-[16px] font-medium font-roboto">
      Keputusan Menteri nomor 1648/KPTS/M/2024
      </span>
      <span className="text-slate-500 text-[14px]">• Berlaku mulai 4 bulan yang lalu</span>
    </div>

    {/* Title */}
    <div className="p-6">
      <h2 className="text-[19px] font-semibold text-bluePu font-roboto">
        Keputusan Menteri Pekerjaan Umum dan Perumahan Rakyat Nomor 1648/KPTS/M/2024 Tahun 2024 tentang Himpunan Pejabat Fungsional Permukiman
      </h2>
      <div className='flex mt-2 gap-3'>
        <div className='flex gap-1 font-roboto font-medium text-bluePu'>
        <span class="material-symbols-outlined">history_edu</span>
          <p className='inline'>06 - Januari - 2025</p>
        </div>
        <div className='flex gap-1 font-roboto font-medium text-bluePu'>
        <span class="material-symbols-outlined">campaign</span>
          <p className='inline'>LN 12/2025</p>
        </div>

      </div>
    </div>

    {/* Status Peraturan */}
    <div className="p-6 pt-0 font-roboto">
      <h3 className="text-bluePu font-bold mb-2 text-[14px]">Status Peraturan</h3>
      <div className="bg-blue-100 text-bluePu px-3 py-1 rounded-md w-fit text-[14px]">
        Mencabut
      </div>
      <p className="text-bluePu text-[14px] mt-2">
        <span className="text-blue-600 font-medium cursor-pointer">UU No. 29 Tahun 1959</span> tentang Pembentukan Daerah Tingkat II Di Sulawesi
      </p>
      <p className="text-bluePu text-sm">
        Ketentuan yang mengatur mengenai Kota Parepare dalam Undang-Undang Nomor 29 Tahun 1959, dicabut dan dinyatakan tidak berlaku.
      </p>
    </div>

    {/* Download Section */}
    <div className="p-6 py-4 border-t">
     <div className='flex justify-between text-center'>

     <div className="flex gap-3 mt-2">
      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">robot_2</span> Chat AI
      </button>

      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">visibility</span> Abstrak
      </button>

      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">download_2</span> Unduh
      </button>

      <button className="bg-bluePu text-kuningButton hover:bg-kuningHover px-3 py-2 rounded-2xl font-roboto text-[15px] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="material-symbols-outlined text-lg text-kuningButton">search</span> Detail
      </button>
    </div>

      <div className="flex gap-4 mt-2">
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

export default Card;
