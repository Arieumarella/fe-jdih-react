import { React, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { getDetailArtikel } from "../services/artikel.services"
import FadeContent from '../components/react-bits/FadeContent/FadeContent';
import SplitText from "../components/react-bits/SplitText/SplitText";
import { useTranslation } from 'react-i18next';

const DetailArtikel = () => {

  const { slug } = useParams();
  const { t } = useTranslation();

  const [data, setData] = useState([]);

  useEffect(() => {
    getDetailArtikel(slug).then((result) => {
      setData(result);
    });

  }, [slug]);

  const formatTanggal = (str) => {
    const year = str.substring(0, 4);
    const month = str.substring(4, 6);
    const day = str.substring(6, 8);

    const date = new Date(`${year}-${month}-${day}`);

    const formatted = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);

    return formatted;
  };


  const capitalizeFirst = (str) => {
    if (!str) return '';

    const exceptions = ['dan', 'atau', 'yang', 'di', 'ke', 'dari', 'untuk', 'pada', 'dengan', 'sebagai'];
    const words = str.toLowerCase().split(' ');

    return words
      .map((word, index) => {
        if (index === 0 || !exceptions.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          return word;
        }
      })
      .join(' ');
  };


  const hukumMap = {
    '1': 'Hukum Umum',
    '3': 'Hukum Adat',
    '4': 'Hukum Administrasi Negara',
    '5': 'Hukum Agraria',
    '6': 'Hukum Dagang',
    '7': 'Humum Islam',
    '8': 'Hukum Internasional',
    '9': 'Hukum Lingkungan',
    '10': 'Hukum Pemburuhan',
    '11': 'Hukum Perdata',
    '12': 'Hukum Pidana',
    '13': 'Himpunan Tata Negara',
    '14': 'Himpunan Peraturan',
    '15': 'Peraturan Pengadilan',
    '16': 'Referensi'
  };

  return (
    <>
      <Headers />

      <section className="h-full bg-slate-100 py-4 ">

        <div className='md:w-[60%] w-[100%] mx-auto p-4'>

          <p className="text-left md:pl-6 pl-2 font-roboto font-semibold text-gray-500 md:text-[14px] text-[12px]">

            <SplitText
              text={data?.tgl_buat ? formatTanggal(data?.tgl_buat) : ''}
              delay={10}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
            />

          </p>

          {/* Judul */}
          <h1 className="text-left font-roboto font-bold text-bluePu md:text-[24px] text-[20px]  md:pl-6 pl-2">

            <SplitText
              text={data?.judul ? capitalizeFirst(data.judul) : ''}
              delay={15}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
            />
          </h1>

          <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0}>
            <img
              src="/artikel.jpeg"
              alt="image artikel"
              className="md:ml-6 ml-2 rounded-2xl shadow-lg  md:w-[95%] w-[90%] item-center my-4"
            />
          </FadeContent>
          <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0}>
            <div className="md:flex flex-col bg-white text-bluePu font-roboto shadow-md rounded-xl border border-gray-200 md:w-[95%] w-[100%] mx-auto my-6 p-6 min-h-[500px]">
              {/* Header */}
              <h2 className="md:text-lg text-[16px] font-semibold border-b pb-3 mb-4">
                {t("artikelLembarKerja")}
              </h2>

              {/* Konten Utama */}
              <div className="flex flex-col gap-4 text-sm sm:text-base font-roboto">
                <div className="flex flex-col sm:flex-row">
                  <span className="w-full sm:w-1/3 font-semibold text-[14px]">{t("artikelTipeDokumen")}</span>
                  <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">Artikel</span>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <span className="w-full sm:w-1/3 font-semibold text-[14px]">{t("artikelJudul")}</span>
                  <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px] text-blue-600 cursor-pointer hover:text-blue-700 transition">
                    {data?.judul ? capitalizeFirst(data.judul) : ''}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <span className="w-full sm:w-1/3 font-semibold text-[14px]">{t("artikelTeu")}</span>
                  <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">{data?.teu}</span>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <span className="w-full sm:w-1/3 font-semibold text-[14px]">{t("artikelTempatTerbit")}</span>
                  <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">{data?.tempat_terbit}</span>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <span className="w-full sm:w-1/3 font-semibold text-[14px]">{t("artikelTahunTerbit")}</span>
                  <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">{data?.tanggal_pengundangan}</span>
                </div>

                {/* Sumber */}
                <div className="flex flex-col sm:flex-row border-t pt-3">
                  <span className="w-full sm:w-1/3 font-semibold text-[14px]">{t("artikelSumber")}</span>
                  <div className="w-full sm:w-2/3 flex flex-col gap-1">
                    <span className="text-sm">Penerbit:-</span>
                    <span className="text-sm">Penulis: -</span>
                    <span className="text-sm">Foto: -</span>
                  </div>
                </div>

                {/* Subjek */}
                <div className="flex flex-col sm:flex-row border-t pt-3">
                  <span className="w-full sm:w-1/3 font-semibold text-[14px]">{t("artikelSubjek")}</span>
                  <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">{data?.subjek}</span>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <span className="w-full sm:w-1/3 font-semibold text-[14px]">{t("artikelBahasa")}</span>
                  <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">{data?.bahasa}</span>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <span className="w-full sm:w-1/3 font-semibold text-[14px]">{t("artikelBidangHukum")}</span>
                  <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">{hukumMap[data?.bidang_hukum]}</span>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <span className="w-full sm:w-1/3 font-semibold text-[14px]">{t("artikelLokasi")}</span>
                  <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">{data?.lokasi}</span>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <span className="w-full sm:w-1/3 font-semibold text-[14px]">{t("artikelLampiran")}</span>
                  <span className="w-full md:mt-0 mt-2 sm:w-2/3 text-[14px]">-</span>
                </div>
              </div>


              <div className="flex gap-3 mt-2 border-t py-4">
                <p className='font-roboto font-semibold text-slate-600 md:text-[16px] text-[14px]'>Share :</p>
                <div className="flex gap-3">
                  {/* Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center bg-[#1DA1F2] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer"
                  >
                    <i className="fa-brands fa-x-twitter text-white text-xl"></i>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center bg-[#3b5998] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer"
                  >
                    <i className="fa-brands fa-facebook text-xl text-white"></i>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(document.title + ' ' + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center bg-[#25D366] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer"
                  >
                    <i className="fa-brands fa-whatsapp text-white text-xl"></i>
                  </a>

                  {/* Telegram */}
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center bg-[#0088cc] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer"
                  >
                    <i className="fa-brands fa-telegram text-white text-xl"></i>
                  </a>
                </div>

              </div>

            </div>
          </FadeContent>


        </div>

      </section>

      <Langganan />
      <Footer />
    </>
  );
}

export default DetailArtikel