import { React, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { getDetailPutusan, insertViews, addDownload } from "../services/putusanPengadilan.service";
import FadeContent from '../components/react-bits/FadeContent/FadeContent'
import SplitText from "../components/react-bits/SplitText/SplitText";
import { useTranslation } from 'react-i18next';

const DetailPutusan = () => {

  const { slug } = useParams();
  const { t } = useTranslation();
  const [dataPutusan, setDataPutusan] = useState([]);

  useEffect(() => {
    getDetailPutusan(slug).then((result) => {
      setDataPutusan(result.data.data);
    });

    insertViews(slug);
  }, [slug]);

  const ambilTahunBulan = (waktuString) => {
    const tahun = waktuString.slice(0, 4);
    const bulan = waktuString.slice(4, 6);
    return { tahun, bulan };
  };

  const formatDate = (str = '') => {
    if (str.length !== 14) return str;
    const year = str.substring(0, 4);
    const month = str.substring(4, 6);
    const day = str.substring(6, 8);
    return `${day}/${month}/${year}`;
  };

  const handleDownload = async (path, nmFile, slug) => {
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

  const details = [
    { label: t("pengadilanTipe"), value: "Putusan Pengadilan / Yurispudensi" },
    { label: t("pengadilanJudul"), value: dataPutusan?.judul },
    { label: t("pengadilanTeu"), value: dataPutusan?.teu },
    { label: t("pengadilanNoPutusan"), value: dataPutusan?.noperaturan },
    { label: t("pengadilanJnsPeradilan"), value: dataPutusan?.teu },
    { label: t("pengadilanSingkatanJenis"), value: "PTUN" },
    { label: t("pengadilanTempatPeradilan"), value: dataPutusan?.tempat_terbit },
    { label: t("pengadilanTanggalDIbacakan"), value: formatDate(dataPutusan?.tanggal) },
    { label: t("pengadilanSumber"), value: dataPutusan?.sumber },
    { label: t("pengadilanBahasa"), value: dataPutusan?.bahasa },
    { label: t("pengadilanBidangHukum"), value: "Hukum Administrasi Negara" },
    { label: t("pengadilanLokasi"), value: dataPutusan?.lokasi }
  ];

  return (
    <>
      <Headers />

      <section className="h-full bg-slate-100 py-4">
        {/* Judul */}
        <h1 className="text-center font-roboto font-bold text-bluePu text-[23px] py-4 md:text-[23px] lg:text-[35px]">
          {/*
      H1 Judul:
      - Mobile: text-[23px]
      - Tablet (md): md:text-[23px]
      - Laptop (lg): lg:text-[35px] (dari md:text-[35px] asli)
    */}
          Detail Putusan
        </h1>
        <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0}>
          <div className='w-full gap-4 mx-auto md:w-full lg:flex lg:justify-between lg:w-[80%]'>
            {/*
        Div Wrapper Utama:
        - Mobile: w-full (block by default)
        - Tablet (md): md:w-full (block by default, tidak ada md:flex)
        - Laptop (lg): lg:flex, lg:justify-between, lg:w-[80%] (dari md:flex, justify-between, md:w-[80%] asli)
      */}

            {/* Card Peraturan */}
            <div className="max-w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300 md:max-w-[95%] lg:max-w-[70%]">
              {/*
          Card Peraturan:
          - Mobile: max-w-[95%]
          - Tablet (md): md:max-w-[95%]
          - Laptop (lg): lg:max-w-[70%] (dari md:max-w-[70%] asli)
        */}
              <h2 className="text-[18px] font-bold font-roboto text-bluePu mt-3 text-center md:text-[18px] md:text-center lg:text-[22px] lg:text-left">
                {/*
            H2 Judul Card:
            - Font Size: text-[18px] (mob), md:text-[18px] (tab), lg:text-[22px] (lap, dari md:text-[22px] asli)
            - Text Align: text-center (mob), md:text-center (tab), lg:text-left (lap, dari md:text-left asli)
          */}
                <SplitText
                  text={dataPutusan?.judul}
                  delay={10}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  easing="easeOutCubic"
                  threshold={0.2}
                />
              </h2>

              <div className="flex items-center border-b border-t mt-4 py-4 gap-4">
                <div className="box-border size-14 p-1 rounded-lg shadow-lg bg-gradient-to-r from-[#2793a3] to-bluePu flex items-center justify-center md:size-14 lg:size-16">
                  {/*
              Box Ikon:
              - Size: size-14 (mob), md:size-14 (tab), lg:size-16 (lap, dari md:size-16 asli)
            */}
                  <span className="material-symbols-outlined text-slate-100 text-4xl md:text-4xl lg:text-5xl">dictionary</span>
                  {/*
              Ikon:
              - Font Size: text-4xl (mob), md:text-4xl (tab), lg:text-5xl (lap, dari md:text-5xl asli)
            */}
                </div>
                <p className='font-roboto font-semibold text-slate-600 text-[18px] md:text-[18px] lg:text-[23px]'>
                  {/*
              Teks "Pengadilan Meta":
              - Font Size: text-[18px] (mob), md:text-[18px] (tab), lg:text-[23px] (lap, dari md:text-[23px] asli)
            */}
                  <SplitText
                    text={t("pengadilanMeta")}
                    delay={80}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    easing="easeOutCubic"
                    threshold={0.2}
                  />
                </p>
              </div>

              {/* Detail Peraturan */}
              <div className="space-y-2 pt-8 md:space-y-2 md:pt-8 lg:space-y-3 lg:pt-6">
                {/*
            Wrapper Detail Peraturan:
            - Space Y: space-y-2 (mob), md:space-y-2 (tab), lg:space-y-3 (lap, dari md:space-y-3 asli)
            - Padding Top: pt-8 (mob), md:pt-8 (tab), lg:pt-6 (lap, dari md:pt-6 asli)
          */}
                {details.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:flex-col md:text-[12px] lg:flex-row lg:text-base"
                  >
                    {/*
                Item Detail:
                - Flex Direction: flex-col (mob), md:flex-col (tab), lg:flex-row (lap, dari md:flex-row asli)
                - Font Size (default untuk children): text-[12px] (mob), md:text-[12px] (tab), lg:text-base (lap, dari md:text-base asli)
              */}
                    <span className="font-semibold text-slate-700 w-full text-[14px] md:font-semibold md:w-full md:text-[14px] lg:font-normal lg:w-[30%] lg:text-[15px]">{item.label}</span>
                    {/*
                Label Detail:
                - Font Weight: font-semibold (mob), md:font-semibold (tab), lg:font-normal (lap, dari md:font-regular, diasumsikan font-normal)
                - Width: w-full (mob), md:w-full (tab), lg:w-[30%] (lap, dari md:w-[30%] asli)
                - Font Size: text-[14px] (mob), md:text-[14px] (tab), lg:text-[15px] (lap, dari md:text-[15px] asli)
              */}
                    <span className="hidden md:hidden lg:w-[5%] lg:inline ">:</span>
                    {/*
                Colon Separator:
                - Display: hidden (mob), md:hidden (tab), lg:inline (lap, dari md:inline asli)
                - Width: (tidak berlaku jika hidden), lg:w-[5%] (lap, dari md:w-[5%] asli)
              */}
                    <span className="w-full text-[14px] mt-2 text-slate-600 md:w-full md:text-[14px] md:mt-2 lg:w-[60%] lg:text-base lg:mt-0">{item.value}</span>
                    {/*
                Value Detail:
                - Width: w-full (mob), md:w-full (tab), lg:w-[60%] (lap, dari md:w-[60%] asli)
                - Font Size: text-[14px] (mob), md:text-[14px] (tab), lg:text-base (lap, dari md:text-base asli)
                - Margin Top: mt-2 (mob), md:mt-2 (tab), lg:mt-0 (lap, dari md:mt-0 asli)
              */}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-2 border-t py-2">
                <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full px-2 py-2 rounded-2xl font-roboto text-[16px] flex items-center justify-center gap-1 transition-all duration-200 shadow-md hover:shadow-lg text-center md:w-full md:px-2 md:text-[16px] md:gap-1 lg:w-auto lg:px-3 lg:text-[15px] lg:gap-2"
                  onClick={() => handleDownload(`https://jdih.pu.go.id/internal/assets/assets/produk/putusan/PTUN/${ambilTahunBulan(dataPutusan.tanggal).tahun}/${ambilTahunBulan(dataPutusan.tanggal).bulan}/${dataPutusan.file_upload}`, dataPutusan.file_upload, dataPutusan.slug)}
                >
                  {/*
              Tombol Unduh:
              - Width: w-full (mob), md:w-full (tab), lg:w-auto (lap, dari md:w-auto asli)
              - Padding X: px-2 (mob), md:px-2 (tab), lg:px-3 (lap, dari md:px-3 asli)
              - Font Size: text-[16px] (mob), md:text-[16px] (tab), lg:text-[15px] (lap, dari md:text-[15px] asli)
              - Gap: gap-1 (mob), md:gap-1 (tab), lg:gap-2 (lap, dari md:gap-2 asli)
            */}
                  <span className="material-symbols-outlined text-xl text-kuningButton md:text-xl lg:text-lg">download</span>
                  {/*
              Ikon Unduh:
              - Font Size: text-xl (mob), md:text-xl (tab), lg:text-lg (lap, dari md:text-lg asli)
            */}
                  <span>Unduh</span>
                </button>
              </div>

              <div className="flex gap-3 mt-2 border-t py-4">
                <p className='font-roboto font-semibold text-slate-600 text-[14px] md:text-[14px] lg:text-[18px]'>Share :</p>
                {/*
            Teks "Share :":
            - Font Size: text-[14px] (mob), md:text-[14px] (tab), lg:text-[18px] (lap, dari md:text-[18px] asli)
          */}
                <div className="flex gap-3">
                  {/* Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer"
                  >
                    <i className="fa-brands fa-x-twitter text-white text-2xl"></i>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-[#3b5998] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer"
                  >
                    <i className="fa-brands fa-facebook text-2xl text-white"></i>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(document.title + ' ' + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-[#25D366] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer"
                  >
                    <i className="fa-brands fa-whatsapp text-white text-2xl"></i>
                  </a>

                  {/* Telegram */}
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-[#0088cc] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer"
                  >
                    <i className="fa-brands fa-telegram text-white text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>


      <Langganan />
      <Footer />
    </>
  );
};

export default DetailPutusan;
