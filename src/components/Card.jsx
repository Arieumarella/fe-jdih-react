import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { peraturanCategories } from "../assets/object/jnsPeraturan";

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
    <div className="group w-auto lg:w-[70%] mx-auto bg-white rounded-xl shadow-lg flex flex-col overflow-hidden my-4">

      {/* Header */}
      {/* Untuk tablet, justify-content akan default (start). Untuk lg (desktop), akan jadi justify-between */}
      <div className="flex lg:justify-between items-center w-full bg-gradient-to-r from-slate-300 to-slate-200 p-4 rounded-md ">
        {/* Ukuran teks untuk mobile dan tablet adalah 14px, untuk lg (desktop) 16px */}
        <span className="text-slate-700 text-[14px] lg:text-[16px] font-semibold font-roboto">
          {peraturanCategories[dataParse?.peraturan_category_id] || '-'} <span className="font-normal">Nomor {dataParse?.noperaturan || '-'}</span>
        </span>

        {/* Status ini akan hidden di mobile dan tablet, dan block di lg (desktop) */}
        <span className={`hidden lg:block text-[12px] lg:text-[14px] font-medium rounded-full px-3 py-1 ${dataParse?.statusPeraturan?.trim() === 'Berlaku' ? 'bg-emerald-200 text-emerald-700' : 'bg-rose-200 text-rose-700'
          }`}>
          {dataParse?.statusPeraturan}
        </span>
      </div>

      {/* Title */}
      <div className="p-4">
        {/* Ukuran teks judul sama untuk mobile, tablet, dan lg (desktop) */}
        <h2
          className="text-[16px] lg:text-[16px] font-semibold text-bluePu hover:text-opacity-70 font-roboto cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigateHandelClick(`detail-dokumen/${dataParse?.slug}`);
          }}
        >
          {dataParse?.judul?.replace(/<[^>]+>/g, "") || "-"}
        </h2>

        <div className="flex mt-2 gap-3 flex-wrap">
          {/* Ukuran teks untuk mobile dan tablet adalah 12px, untuk lg (desktop) 14px */}
          <div className="flex gap-1 font-roboto text-[12px] lg:text-[14px] text-bluePu">
            <span className="material-symbols-outlined">history_edu</span>
            <p>{formatTanggal(dataParse?.tanggal)}</p>
          </div>

          {dataParse?.dataRealPeraturan?.[0]?.sumber && (
            <div className="flex gap-1 font-roboto text-[12px] lg:text-[14px] text-bluePu">
              <span className="material-symbols-outlined">campaign</span>
              <p>{dataParse.dataRealPeraturan[0].sumber}</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Peraturan */}
      {dataParse?.logDataPeraturan?.length > 0 && (
        <div className="p-6 pt-0 font-roboto">
          <h3 className="text-bluePu font-bold mb-2 text-[14px]">Status Peraturan</h3>
          {dataParse.logDataPeraturan.map((item, index) => (
            <div key={index} className="group">
              <div className="bg-blue-100 text-bluePu px-3 py-1 rounded-md w-fit text-[14px]">
                {item?.status || '-'}
              </div>
              {/* Ukuran teks untuk mobile dan tablet adalah 12px, untuk lg (desktop) 14px */}
              <p className="text-bluePu text-[12px] lg:text-[14px] mt-2">
                <span
                  className="text-blue-600 font-medium cursor-pointer"
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
      )}

      {/* Download Section */}
      {/* Padding mobile/tablet: p-2 py-2. Padding lg (desktop): p-4 py-0 (group-hover akan mengubah py menjadi py-4) */}
      <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[500px] group-hover:py-4 transition-all duration-500 ease-in-out p-2 py-2 lg:p-4 lg:py-0 border-t">

        {/* Layout mobile/tablet: flex-col. Layout lg (desktop): flex-row, justify-between */}
        <div className="flex flex-col lg:flex-row lg:justify-between text-center w-full">

          {/* Button container: mobile/tablet: justify-center. lg (desktop): justify-start */}
          <div className="flex gap-3 mt-2 flex-wrap justify-center lg:justify-start">
            <button
              // Mobile/tablet: w-full, px-2, text-[11px], gap-1, icon text-sm.
              // Lg (desktop): w-auto, px-3, text-[13px], gap-2, icon text-lg.
              className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full lg:w-auto px-2 lg:px-3 py-2 rounded-2xl font-roboto text-[11px] lg:text-[13px] flex items-center justify-center lg:justify-start gap-1 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => showModalAi(true, dataParse.pathFile)}
            >
              <span className="material-symbols-outlined text-sm lg:text-lg text-kuningButton">robot_2</span>
              Chat AI
            </button>

            <button
              className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full lg:w-auto px-2 lg:px-3 py-2 rounded-2xl font-roboto text-[11px] lg:text-[13px] flex items-center justify-center lg:justify-start gap-1 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => showModal(true, dataParse.pathAbstrak)}
            >
              <span className="material-symbols-outlined text-sm lg:text-lg text-kuningButton">visibility</span>
              Abstrak
            </button>

            <button
              className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full lg:w-auto px-2 lg:px-3 py-2 rounded-2xl font-roboto text-[11px] lg:text-[13px] flex items-center justify-center lg:justify-start gap-1 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => handleDownload(dataParse.pathFile, dataParse.file_upload, dataParse.slug)}
            >
              <span className="material-symbols-outlined text-sm lg:text-lg text-kuningButton">download_2</span>
              Unduh
            </button>

            <button
              className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full lg:w-auto px-2 lg:px-3 py-2 rounded-2xl font-roboto text-[11px] lg:text-[13px] flex items-center justify-center lg:justify-start gap-1 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                navigateHandelClick(`detail-dokumen/${dataParse?.slug}`);
              }}
            >
              <span className="material-symbols-outlined text-sm lg:text-lg text-kuningButton">search</span>
              Detail
            </button>
          </div>

          {/* View/Download Counts: mobile/tablet: justify-center. lg (desktop): justify-end */}
          <div className="flex gap-4 mt-2 px-2 justify-center lg:justify-end">
            <div className="flex items-center gap-1 font-roboto font-medium text-bluePu">
              <span className="material-symbols-outlined text-lg text-bluePu">visibility</span>
              <p className="text-sm">{dataParse?.dataRealPeraturan?.[0]?.view_count || 0}</p>
            </div>
            <div className="flex items-center gap-1 font-roboto font-medium text-bluePu">
              <span className="material-symbols-outlined text-lg text-bluePu">download</span>
              <p className="text-sm">{dataParse?.dataRealPeraturan?.[0]?.download_count || 0}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;
