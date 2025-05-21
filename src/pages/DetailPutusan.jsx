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
        <h1 className="text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4">
          Detail Putusan
        </h1>
        <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0}>
          <div className='md:flex justify-between md:w-[80%] w-full gap-4 mx-auto'>

            {/* Card Peraturan */}
            <div className="md:max-w-[70%] max-w-[95%]  mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
              <h2 className="md:text-[22px] text-[18px] font-bold font-roboto text-bluePu mt-3 md:text-left text-center">
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

                <div className="box-border md:size-16 size-14 p-1 rounded-lg shadow-lg bg-gradient-to-r from-[#2793a3] to-bluePu flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-100 md:text-5xl text-4xl">dictionary</span>
                </div>

                <p className='font-roboto font-semibold text-slate-600 md:text-[23px] text-[18px]'>
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
              <div className="md:space-y-3 space-y-2 md:pt-6 pt-8">
                {details.map((item, index) => (
                  <div
                    key={index}
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base"
                  >
                    <span className="md:font-regular font-semibold text-slate-700 md:w-[30%] w-full md:text-[15px] text-[14px]">{item.label}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-slate-600 ">{item.value}</span>
                  </div>
                ))}
              </div>


              <div className="flex gap-3 mt-2 border-t py-2">
                <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-auto w-full md:px-3 px-2 py-2 rounded-2xl font-roboto md:text-[15px] text-[16px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg text-center"
                  onClick={() => handleDownload(`https://jdih.pu.go.id/internal/assets/assets/produk/putusan/PTUN/${ambilTahunBulan(dataPutusan.tanggal).tahun}/${ambilTahunBulan(dataPutusan.tanggal).bulan}/${dataPutusan.file_upload}`, dataPutusan.file_upload, dataPutusan.slug)}
                >
                  <span className="material-symbols-outlined md:text-lg text-xl text-kuningButton">download</span>
                  <span>Unduh</span>
                </button>
              </div>

              <div className="flex gap-3 mt-2 border-t py-4">
                <p className='font-roboto font-semibold text-slate-600 md:text-[18px] text-[14px]'>Share :</p>
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
