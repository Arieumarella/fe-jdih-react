import React from 'react';

const Card = () => {
  return (
    <>
    <div className="w-full md:w-[70%] mx-auto bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
    {/* Header */}
    <div className="flex justify-between items-center w-full bg-slate-200 p-4">
      <span className="text-slate-800 text-[16px] font-medium font-roboto">
      Keputusan Menteri nomor 1648/KPTS/M/2024
      </span>
      <span className="text-slate-800 text-[14px]">• Berlaku mulai 4 bulan yang lalu</span>
    </div>

    {/* Title */}
    <div className="p-6">
      <h2 className="text-[20px] font-semibold text-slate-800 font-roboto">
        Keputusan Menteri Pekerjaan Umum dan Perumahan Rakyat Nomor 1648/KPTS/M/2024 Tahun 2024 tentang Himpunan Pejabat Fungsional Permukiman
      </h2>
      <div className='flex mt-2 gap-3'>
        <div className='flex gap-1 font-roboto font-medium text-slate-700'>
        <span class="material-symbols-outlined inline">visibility</span>
          <p className='inline'>123</p>
        </div>
        <div className='flex gap-1 font-roboto font-medium text-slate-700'>
        <span class="material-symbols-outlined inline">download</span>
          <p className='inline'>321</p>
        </div>
        <div className='flex gap-1 font-roboto font-medium text-slate-700'>
        <span class="material-symbols-outlined">history_edu</span>
          <p className='inline'>06 - Januari - 2025</p>
        </div>
        <div className='flex gap-1 font-roboto font-medium text-slate-700'>
        <span class="material-symbols-outlined">campaign</span>
          <p className='inline'>LN 12/2025</p>
        </div>

      </div>
    </div>

    {/* Status Peraturan */}
    <div className="p-6 pt-0 font-roboto">
      <h3 className="text-slate-600 font-semibold mb-2 text-[14px]">Status Peraturan</h3>
      <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md w-fit text-sm">
        Mencabut sebagian
      </div>
      <p className="text-slate-600 text-sm mt-2">
        a. <span className="text-red-500 font-medium">UU No. 29 Tahun 1959</span> tentang Pembentukan Daerah Tingkat II Di Sulawesi
      </p>
      <p className="text-slate-600 text-sm">
        Ketentuan yang mengatur mengenai Kota Parepare dalam Undang-Undang Nomor 29 Tahun 1959, dicabut dan dinyatakan tidak berlaku.
      </p>
    </div>

    {/* Download Section */}
    <div className="p-6 pt-0 border-t">
      <h3 className="text-slate-600 font-semibold text-sm mb-2">Download file:</h3>
      <a href="#" className="flex items-center text-red-500 text-sm font-medium hover:underline">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 8a1 1 0 011-1h8a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1V8z" />
          <path
            fillRule="evenodd"
            d="M9 0a1 1 0 011 1v8.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L8 9.586V1a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        UU Nomor 139 Tahun 2024.pdf
      </a>
    </div>

    {/* Action Buttons */}
    <div className="p-6 pt-0 flex justify-end">
      <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-md text-sm hover:bg-slate-200">
        Abstrak
      </button>
    </div>
  </div>
  </>
  );
};

export default Card;
