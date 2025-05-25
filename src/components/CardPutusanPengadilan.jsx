import React from 'react';
import { useNavigate } from "react-router-dom";
import { addDownload } from "../services/putusanPengadilan.service";
import { toast } from "../components/ToastProvider";


const CardPutusanPengadilan = ({ data }) => {

  const navigate = useNavigate();

  const navigateHandelClick = (link = '') => {
    navigate(`/${link}`);
    window.scrollTo(0, 0);
  };

  const ambilSampaiTahun = (judul) => {
    const match = judul.match(/^(.*?Tahun \d{4})/);
    return match ? match[1] : judul;
  };

  const ubahFormatTanggal = (tanggalString) => {
    const tahun = tanggalString.slice(0, 4);
    const bulan = tanggalString.slice(4, 6);
    const tanggal = tanggalString.slice(6, 8);

    const namaBulan = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const nama = namaBulan[parseInt(bulan, 10) - 1];

    return `${tanggal} - ${nama} - ${tahun}`;
  };

  const ambilTahunBulan = (waktuString) => {
    const tahun = waktuString.slice(0, 4);
    const bulan = waktuString.slice(4, 6);
    return { tahun, bulan };
  };

  const handleDownload = async (path, nmFile, slug) => {

    const isPDF = typeof nmFile === 'string' && nmFile.toLowerCase().endsWith('.pdf');
    if (!isPDF) {
      toast.error("Tidak Bisa Menemukan Dokumen.!", { position: "bottom-right" });
      return false;
    }


    addDownload(slug)
    const fileUrl = path;
    const fileName = nmFile;

    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Nama file yang akan diunduh
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Gagal download:', err);
    }
  };

  return (
    <>
      <div className="w-full mx-auto bg-white rounded-xl shadow-lg flex flex-col overflow-hidden my-10 overflow-x-hidden md:w-full lg:w-[70%]">
        {/*
      Perubahan pada div utama:
      - Mobile (default): w-full
      - Tablet (md:), sama dengan mobile: md:w-full
      - Laptop (lg:), mengambil style md: yang asli: lg:w-[70%]
    */}
        {/* Header */}
        <div className="flex items-center w-full bg-slate-200 p-4 lg:justify-between">
          {/*
        Perubahan pada div header:
        - Mobile (default): justify-start (default flex)
        - Tablet (md:), sama dengan mobile: justify-start (default flex)
        - Laptop (lg:), mengambil style md: yang asli: lg:justify-between
        Karena justify-start adalah default, kita tidak perlu menambahkannya untuk mobile/md.
      */}
          <span className="text-kuningButton bg-bluePu px-2 py-1 rounded-lg text-[12px] font-medium font-roboto md:text-[12px] lg:text-[14px]">
            {/*
          Perubahan pada span "Berlaku":
          - Mobile (default): text-[12px]
          - Tablet (md:), sama dengan mobile: md:text-[12px]
          - Laptop (lg:), mengambil style md: yang asli: lg:text-[14px]
        */}
            Berlaku
          </span>
        </div>

        {/* Title */}
        <div className="p-6">
          <h2
            className="text-[16px] font-semibold text-bluePu hover:text-opacity-70 font-roboto cursor-pointer md:text-[16px] lg:text-[19px]"
            onClick={(e) => { e.preventDefault(); navigateHandelClick(`putasn-pengadilan/${data?.slug}`); }}
          >
            {/*
          Perubahan pada h2 Judul:
          - Mobile (default): text-[16px]
          - Tablet (md:), sama dengan mobile: md:text-[16px]
          - Laptop (lg:), mengambil style md: yang asli: lg:text-[19px]
        */}
            {ambilSampaiTahun(data?.judul)}
          </h2>
          <p className='block text-[14px] font-medium font-roboto text-slate-500 md:text-[14px] lg:text-[16px]'>
            {/*
          Perubahan pada p Judul lengkap:
          - Mobile (default): text-[14px]
          - Tablet (md:), sama dengan mobile: md:text-[14px]
          - Laptop (lg:), mengambil style md: yang asli: lg:text-[16px]
        */}
            {data?.judul}
          </p>
          <div className='flex mt-2 gap-3'>
            <div className='flex gap-1 font-roboto text-[12px] text-bluePu md:text-[12px] lg:text-[16px]'>
              {/*
            Perubahan pada div tanggal:
            - Mobile (default): text-[12px]
            - Tablet (md:), sama dengan mobile: md:text-[12px]
            - Laptop (lg:), mengambil style md: yang asli: lg:text-[16px]
          */}
              <span className="material-symbols-outlined">schedule</span>
              <p className='inline'>{ubahFormatTanggal(data?.tanggal_pengundangan)}</p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="p-2 py-2 border-t md:p-2 md:py-2 lg:p-6 lg:py-4">
          {/*
        Perubahan pada div Download Section (padding):
        - Mobile (default): p-2 py-2
        - Tablet (md:), sama dengan mobile: md:p-2 md:py-2
        - Laptop (lg:), mengambil style md: yang asli: lg:p-6 lg:py-4
      */}
          <div className='flex flex-col text-center md:flex-col lg:flex-row lg:justify-between'>
            {/*
          Perubahan pada div flex container dalam Download Section:
          - Mobile (default): flex-col
          - Tablet (md:), sama dengan mobile: md:flex-col
          - Laptop (lg:), mengambil style md: yang asli: lg:flex-row lg:justify-between
        */}

            <div className="flex gap-3 mt-2">
              <button
                className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full px-2 py-2 rounded-2xl font-roboto text-[11px] flex justify-center items-center gap-1 transition-all duration-200 shadow-md hover:shadow-lg md:w-full md:px-2 md:text-[11px] md:gap-1 lg:w-auto lg:px-3 lg:text-[15px] lg:gap-2"
                onClick={() => handleDownload(`https://jdih.pu.go.id/internal/assets/assets/produk/putusan/PTUN/${ambilTahunBulan(data.tanggal).tahun}/${ambilTahunBulan(data.tanggal).bulan}/${data.file_upload}`, data.file_upload, data?.slug)}
              >
                {/*
              Perubahan pada tombol Unduh:
              - Mobile: w-full, px-2, text-[11px], gap-1
              - Tablet (md:): md:w-full, md:px-2, md:text-[11px], md:gap-1
              - Laptop (lg:): lg:w-auto, lg:px-3, lg:text-[15px], lg:gap-2
            */}
                <span className="material-symbols-outlined text-base text-kuningButton md:text-base lg:text-lg">download_2</span> Unduh
                {/*
              Perubahan pada ikon di tombol:
              - Mobile: text-base
              - Tablet (md:): md:text-base
              - Laptop (lg:): lg:text-lg
            */}
              </button>

              <button
                className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full px-2 py-2 rounded-2xl font-roboto text-[11px] flex items-center justify-center gap-1 transition-all duration-200 shadow-md hover:shadow-lg md:w-full md:px-2 md:text-[11px] md:gap-1 lg:w-auto lg:px-3 lg:text-[15px] lg:gap-2"
                onClick={(e) => { e.preventDefault(); navigateHandelClick(`putasn-pengadilan/${data?.slug}`); }}
              >
                {/*
              Perubahan pada tombol Detail:
              - Mobile: w-full, px-2, text-[11px], gap-1
              - Tablet (md:): md:w-full, md:px-2, md:text-[11px], md:gap-1
              - Laptop (lg:): lg:w-auto, lg:px-3, lg:text-[15px], lg:gap-2
            */}
                <span className="material-symbols-outlined text-base text-kuningButton md:text-base lg:text-lg">search</span> Detail
                {/*
              Perubahan pada ikon di tombol:
              - Mobile: text-base
              - Tablet (md:): md:text-base
              - Laptop (lg:): lg:text-lg
            */}
              </button>
            </div>

            <div className="flex gap-4 mt-4 px-2 md:mt-4 lg:mt-2">
              {/*
            Perubahan pada div view & download count (margin-top):
            - Mobile (default): mt-4
            - Tablet (md:), sama dengan mobile: md:mt-4
            - Laptop (lg:), mengambil style md: yang asli: lg:mt-2
          */}
              <div className="flex items-center gap-1 font-roboto font-medium text-bluePu">
                <span className="material-symbols-outlined text-lg text-bluePu">visibility</span>
                <p className="text-sm">{data?.view_count}</p>
              </div>
              <div className="flex items-center gap-1 font-roboto font-medium text-bluePu">
                <span className="material-symbols-outlined text-lg text-bluePu">download</span>
                <p className="text-sm">{data?.download_count}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPutusanPengadilan;
