import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { getDetailMonografi } from "../services/monografi.services";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import SplitText from "../components/react-bits/SplitText/SplitText";
import { useTranslation } from 'react-i18next';

const DetailMonografi = () => {

  const { slug } = useParams();
  const [dataMonografi, setDataMonografi] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getDetailMonografi(slug).then((result) => {
      setDataMonografi(result.data.data);
    });
  }, [slug]);

  return (
    <>
      <Headers />

      <section className="h-full bg-slate-100 py-4  ">

        <div className="md:flex bg-white shadow-lg rounded-2xl border border-gray-300 md:w-[70%] w-[95%] mx-auto my-6 p-6">

          {/* Bagian Kiri - Gambar Buku */}
          <div className="md:w-1/3 w-full flex flex-col mt-6">
            <AnimatedContent
              distance={150}
              delay={100}
              direction="horizontal"
              reverse={true}
              config={{ tension: 400, friction: 100 }}
              initialOpacity={0}
              animateOpacity
              scale={1.0}
              threshold={0.1}
            >
              <img
                src={`https://jdih.pu.go.id/internal/assets/assets/produk/monografi/BukuHukum/${dataMonografi?.tanggal?.substring(0, 4)}/11/${dataMonografi.file_upload}`}
                alt="Cover Buku"
                className="rounded-xl shadow-md  md:w-full object-cover h-2/3"
              />
              {/* Judul Buku */}
              <div className=' w-full mt-4'>
                <h2 className="text-[18px] font-roboto font-bold text-bluePu">
                  <SplitText
                    text={dataMonografi.judul}
                    delay={20}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    easing="easeOutCubic"
                    threshold={0.2}
                  />

                </h2>
                <p className="text-bluePu text-[14px] mt-1">Oleh: <span className="font-semibold">
                  <SplitText
                    text={dataMonografi.teu}
                    delay={50}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    easing="easeOutCubic"
                    threshold={0.2}
                  />

                </span></p>
              </div>

              <div className="flex gap-3 mt-2 border-t py-4">
                <p className='font-roboto font-semibold text-slate-600 md:text-[16px] text-[14px]'>Share :</p>
                <div className="flex gap-3">
                  {/* Twitter (X) */}
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
            </AnimatedContent>
          </div>

          {/* Bagian Kanan - Detail Buku */}
          <div className="md:w-2/3 w-full md:pl-8 mt-6 md:mt-0">
            <AnimatedContent
              distance={150}
              delay={100}
              direction="horizontal"
              reverse={false}
              config={{ tension: 400, friction: 100 }}
              initialOpacity={0}
              animateOpacity
              scale={1.0}
              threshold={0.1}
            >
              {/* Deskripsi */}
              <div className="mt-4 border-b border-gray-300 pb-4">
                <h3 className="font-bold text-bluePu text-[20px] font-roboto">Deskripsi</h3>
                <p className="text-[16px] text-bluePu mt-1 leading-relaxed font-roboto text-base">
                  {dataMonografi.judul}
                </p>
              </div>

              {/* Detail Informasi */}
              <div className="mt-6">
                <h3 className="font-bold font-roboto text-[20px] text-bluePu ">{t("monografiDetailInformasi")}</h3>
                <div className="md:space-y-3 space-y-2 md:pt-6 pt-8">

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base"
                  >
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiTipeDokumen")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Monografi</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiJudul")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.judul}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiJenisMonografi")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.deskripsi_fisik}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiSingkatan")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi?.deskripsi_fisik?.replace(/\s/g, "")}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiTeu")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.teu}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiNomorPanggil")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.nomor_panggil}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiCetakan")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.cetakan}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiTempatTerbit")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.tempat_terbit}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiPenerbit")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.penerbit}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiTahunTerbit")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.tanggal_pengundangan}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiDeskripsiFisik")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.deskripsi_fisik}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiSubjek")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.subjek}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiISBN")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.nomor_induk_buku || '-'}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiBahasa")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">Indonesia</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiBidangHukum")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.bidang_hukum}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiNib")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.nomor_induk_buku || '-'}</span>
                  </div>

                  <div
                    className="flex md:flex-row flex-col items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] md:text-base">
                    <span className="md:font-regular font-semibold text-bluePu md:w-[30%] w-full md:text-[15px] text-[14px]">{t("monografiLokasi")}</span>
                    <span className="md:w-[5%] hidden md:inline ">:</span>
                    <span className="md:w-[60%] w-full md:text-base text-[14px] md:mt-0 mt-2 text-bluePu ">{dataMonografi.lokasi}</span>
                  </div>

                </div>
              </div>
            </AnimatedContent>
          </div>

        </div>


      </section>


      <Langganan />
      <Footer />
    </>
  );
};

export default DetailMonografi;