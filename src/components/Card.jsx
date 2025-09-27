import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { peraturanCategories } from "../assets/object/jnsPeraturan";
import { toast } from "../components/ToastProvider";

// Format tanggal
function formatTanggal(tanggalStr = null) {
  if (!tanggalStr || tanggalStr.length !== 8) return '-';

  const year = tanggalStr.slice(0, 4);
  const month = tanggalStr.slice(4, 6);
  const day = tanggalStr.slice(6, 8);

  const namaBulan = [
    "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  return `${day} - ${namaBulan[parseInt(month)]} - ${year}`;
}

const Card = ({ data, showModalAi, showModal, handleDownload }) => {
  const navigate = useNavigate();

  const navigateHandelClick = (link = '') => {
    navigate(`/${link}`);
    window.scrollTo(0, 0);
  };

  const dataParse = data;

  console.log(dataParse.statusPeraturan);

  return (
  <div className="group w-auto lg:w-[70%] mx-auto bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden my-4 border border-bluePu/10 hover:border-bluePu/30 transition-all duration-200 relative hover:scale-[1.01]">
    {/* Accent bar kiri */}
    <div className="absolute left-0 top-0 h-full w-1.5 bg-bluePu rounded-l-2xl" aria-hidden="true" />

      {/* Header */}
      {/* Untuk tablet, justify-content akan default (start). Untuk lg (desktop), akan jadi justify-between */}
      <div className="flex lg:justify-between items-center w-full p-4 rounded-t-2xl border-b border-bluePu/10 relative min-h-[52px]">
        <div className="flex items-center gap-3">
          <span className="text-bluePu text-sm lg:text-[15px] font-semibold font-roboto tracking-wide">{peraturanCategories[dataParse?.peraturan_category_id] || '-'}</span>
          <span className="text-slate-600 text-xs lg:text-sm">Nomor {dataParse?.noperaturan || '-'}</span>
        </div>
        {/* Badge status di pojok kanan atas (compact) */}
        <span className={`absolute top-3 right-4 z-10 text-[13px] font-semibold rounded-full px-3 py-0.5 shadow-sm border border-white/80 transition-colors duration-200
          ${dataParse?.statusPeraturan?.trim() === 'Berlaku' 
            ? 'bg-emerald-200 text-emerald-800 group-hover:bg-bluePu group-hover:text-white' 
            : 'bg-rose-200 text-rose-800 group-hover:bg-bluePu group-hover:text-white'}
        `}>{dataParse?.statusPeraturan}</span>
      </div>

      {/* Title */}
      <div className="p-4 pb-3 bg-white">
        <h2
          className="text-[18px] lg:text-[19px] font-bold text-bluePu font-roboto cursor-pointer transition-colors duration-150 mb-1.5 relative group/title"
          onClick={(e) => {
            e.preventDefault();
            navigateHandelClick(`detail-dokumen/${dataParse?.slug}`);
          }}
        >
          <span className="group-hover/title:text-bluePu/90 transition-colors duration-150 text-[16px] lg:text-[17px] leading-tight">
            {dataParse?.judul?.replace(/<[^>]+>/g, "") || "-"}
          </span>
          <span className="block w-0 group-hover/title:w-full h-[1.5px] bg-bluePu rounded-full transition-all duration-300 mt-1"></span>
        </h2>
          <div className="flex mt-2 gap-3 flex-wrap items-center">
          <div className="flex items-center gap-2 font-roboto text-[13px] lg:text-[14px] text-slate-600 bg-bluePu/6 px-2 py-1 rounded-full">
            <span className="material-symbols-outlined text-sm text-bluePu">history_edu</span>
            <p className="text-[13px]">{formatTanggal(dataParse?.tanggal)}</p>
          </div>
          {dataParse?.dataRealPeraturan?.[0]?.sumber && (
            <div className="flex items-center gap-2 font-roboto text-[13px] lg:text-[14px] text-slate-600 bg-bluePu/6 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm text-bluePu">campaign</span>
              <p className="text-[13px]">{dataParse.dataRealPeraturan[0].sumber}</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Peraturan */}
      {dataParse?.logDataPeraturan?.length > 0 && (
        <div className="px-6 pt-0 pb-5 font-roboto">
          <h3 className="text-bluePu font-bold mb-2 text-[15px] tracking-wide">Status Peraturan</h3>
          <div className="flex flex-col gap-2">
            {dataParse.logDataPeraturan.map((item, index) => (
              <div key={index} className="group bg-bluePu/6 rounded-lg p-2 shadow-sm">
                <div className="bg-bluePu/12 text-bluePu px-2 py-0.5 rounded-md w-fit text-[13px] font-semibold mb-1">
                  {item?.status || '-'}
                </div>
                <p className="text-bluePu text-[13px] lg:text-[14px] mt-1 leading-snug">
                  <span
                    className="text-bluePu font-semibold underline underline-offset-2 cursor-pointer hover:text-bluePu/80"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateHandelClick(`detail-dokumen/${item?.slug}`);
                    }}
                  >
                    {item?.percategoryname || '-'} {item?.noperaturan || '-'}
                  </span>{" "}
                  tentang {item?.tentang?.replace(/<[^>]+>/g, "") || '-'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Download Section */}
      {/* Padding mobile/tablet: p-2 py-2. Padding lg (desktop): p-4 py-0 (group-hover akan mengubah py menjadi py-4) */}
      <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[500px] group-hover:py-5 transition-all duration-500 ease-in-out p-2 py-2 lg:p-5 lg:py-0 border-t border-bluePu/10 bg-gradient-to-r from-bluePu/8 via-white/60 to-bluePu/10 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:justify-between text-center w-full">
          <div className="flex gap-2 mt-2 flex-wrap justify-center lg:justify-start">
            {/** Compact outlined buttons: light outline, fill on hover */}
            <button
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] lg:text-[13px] font-roboto text-bluePu border border-bluePu/20 bg-white transition-colors duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-200"
              onClick={() => showModalAi(true, dataParse.pathFile)}
              title="Chat AI"
            >
              <span className="material-symbols-outlined text-[16px] leading-none" aria-hidden>robot_2</span>
              <span className="hidden sm:inline">Chat AI</span>
            </button>

            <button
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] lg:text-[13px] font-roboto text-bluePu border border-bluePu/20 bg-white transition-colors duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-200"
              onClick={() => showModal(true, dataParse.pathAbstrak)}
              title="Abstrak"
            >
              <span className="material-symbols-outlined text-[16px] leading-none" aria-hidden>visibility</span>
              <span className="hidden sm:inline">Abstrak</span>
            </button>

            <button
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] lg:text-[13px] font-roboto text-bluePu border border-bluePu/20 bg-white transition-colors duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-200"
              onClick={() => handleDownload(dataParse.pathFile, dataParse.file_upload, dataParse.slug)}
              title="Unduh"
            >
              <span className="material-symbols-outlined text-[16px] leading-none" aria-hidden>download_2</span>
              <span className="hidden sm:inline">Unduh</span>
            </button>

            <button
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] lg:text-[13px] font-roboto text-bluePu border border-bluePu/20 bg-white transition-colors duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-200"
              onClick={(e) => {
                e.preventDefault();
                navigateHandelClick(`detail-dokumen/${dataParse?.slug}`);
              }}
              title="Detail"
            >
              <span className="material-symbols-outlined text-[16px] leading-none" aria-hidden>search</span>
              <span className="hidden sm:inline">Detail</span>
            </button>
          </div>
          <div className="flex gap-6 mt-2 px-2 justify-center lg:justify-end">
            <div className="flex items-center gap-2 font-roboto font-medium text-bluePu bg-white/90 px-2 py-0.5 rounded-full shadow-sm text-[13px]">
              <span className="material-symbols-outlined text-[15px] text-bluePu">visibility</span>
              <p className="text-[13px]">{dataParse?.dataRealPeraturan?.[0]?.view_count || 0}</p>
            </div>
            <div className="flex items-center gap-2 font-roboto font-medium text-bluePu bg-white/90 px-2 py-0.5 rounded-full shadow-sm text-[12px]">
              <span className="material-symbols-outlined text-[15px] text-bluePu">download</span>
              <p className="text-[13px]">{dataParse?.dataRealPeraturan?.[0]?.download_count || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
