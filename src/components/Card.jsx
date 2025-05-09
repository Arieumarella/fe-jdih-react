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

  return (
    <div className="group w-full md:w-[70%] mx-auto bg-white rounded-xl shadow-lg flex flex-col overflow-hidden my-4">

      {/* Header */}
      <div className="flex md:justify-between items-center w-full bg-slate-200 p-4">
        <span className="text-slate-500 md:text-[14px] text-[14px] font-medium font-roboto">
          {peraturanCategories[dataParse?.peraturan_category_id] || '-'} nomor {dataParse?.noperaturan || '-'}
        </span>
        {dataParse?.statusPeraturn && (
          <span className="md:block hidden text-slate-500 md:text-[14px] text-[14px] font-roboto">
            • {dataParse.statusPeraturn}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="p-4">
        <h2
          className="md:text-[16px] text-[16px] font-semibold text-bluePu hover:text-opacity-70 font-roboto cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigateHandelClick(`detail-dokumen/${dataParse?.slug}`);
          }}
        >
          {dataParse?.judul?.replace(/<[^>]+>/g, "") || "-"}
        </h2>

        <div className="flex mt-2 gap-3 flex-wrap">
          <div className="flex gap-1 font-roboto md:text-[14px] text-[12px] text-bluePu">
            <span className="material-symbols-outlined">history_edu</span>
            <p>{formatTanggal(dataParse?.tanggal)}</p>
          </div>

          {dataParse?.dataRealPeraturan?.[0]?.sumber && (
            <div className="flex gap-1 font-roboto md:text-[14px] text-[12px] text-bluePu">
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
              <p className="text-bluePu md:text-[14px] text-[12px] mt-2">
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
      <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[500px] group-hover:py-4 transition-all duration-500 ease-in-out md:p-4 p-2 md:py-0 py-2 border-t">

        <div className="flex flex-col md:flex-row md:justify-between text-center w-full">

          <div className="flex gap-3 mt-2 flex-wrap justify-center md:justify-start">
            <button
              className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-auto w-full md:px-3 px-2 py-2 rounded-2xl font-roboto md:text-[13px] text-[11px] flex items-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => showModalAi(true, dataParse.pathFile)}
            >
              <span className="material-symbols-outlined md:text-lg text-sm text-kuningButton">robot_2</span>
              Chat AI
            </button>

            <button
              className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-auto w-full md:px-3 px-2 py-2 rounded-2xl font-roboto md:text-[13px] text-[11px] flex items-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => showModal(true, dataParse.pathAbstrak)}
            >
              <span className="material-symbols-outlined md:text-lg text-sm text-kuningButton">visibility</span>
              Abstrak
            </button>

            <button
              className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-auto w-full md:px-3 px-2 py-2 rounded-2xl font-roboto md:text-[13px] text-[11px] flex items-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => handleDownload(dataParse.pathFile, dataParse.file_upload)}
            >
              <span className="material-symbols-outlined md:text-lg text-sm text-kuningButton">download_2</span>
              Unduh
            </button>

            <button
              className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-auto w-full md:px-3 px-2 py-2 rounded-2xl font-roboto md:text-[13px] text-[11px] flex items-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                navigateHandelClick(`detail-dokumen/${dataParse?.slug}`);
              }}
            >
              <span className="material-symbols-outlined md:text-lg text-sm text-kuningButton">search</span>
              Detail
            </button>
          </div>

          <div className="flex gap-4 mt-2 px-2 justify-center md:justify-end">
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
