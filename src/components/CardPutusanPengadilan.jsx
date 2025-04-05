import React from 'react';
import { useNavigate } from "react-router-dom";

const CardPutusanPengadilan = ({data}) => {

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

  const handleDownload = async (path, nmFile) => {
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
      onClick={(e) => { e.preventDefault(); navigateHandelClick(`putasn-pengadilan/${data?.slug}`); }}
      >
        {ambilSampaiTahun(data?.judul)}
      </h2>
      <p className='block md:text-[16px] text-[14px] font-medium font-roboto text-slate-500'>{data?.judul}</p>
      <div className='flex mt-2 gap-3'>
        <div className='flex gap-1 font-roboto md:text-[16px] text-[12px] text-bluePu'>
        <span className="material-symbols-outlined">schedule</span>
          <p className='inline'>{ubahFormatTanggal(data?.tanggal_pengundangan)}</p>
        </div>
      </div>
    </div>

    {/* Download Section */}
    <div className="md:p-6 p-2 md:py-4 py-2 border-t">
     <div className='flex flex-col md:flex-row md:justify-between text-center'>

     <div className="flex gap-3 mt-2">
     
      <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-auto w-full md:px-3 px-2 py-2 rounded-2xl font-roboto md:text-[15px] text-[11px] flex justify-center items-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg" 
      onClick={() => handleDownload(`https://jdih.pu.go.id/internal/assets/assets/produk/putusan/PTUN/${ambilTahunBulan(data.tanggal).tahun}/${ambilTahunBulan(data.tanggal).bulan}/${data.file_upload}`, data.file_upload)}
      >
        <span className="material-symbols-outlined md:text-lg text-base text-kuningButton">download_2</span> Unduh
      </button>
    

      <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-auto w-full md:px-3 px-2 py-2 rounded-2xl font-roboto md:text-[15px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg"
      onClick={(e) => { e.preventDefault(); navigateHandelClick(`putasn-pengadilan/${data?.slug}`); }}
      >
        <span className="material-symbols-outlined md:text-lg text-base text-kuningButton">search</span> Detail
      </button>
    </div>

      <div className="flex gap-4 md:mt-2 mt-4 px-2">
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
