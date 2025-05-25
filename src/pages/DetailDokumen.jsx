import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { getPeraturanDetail, addViews, addDownload } from "../services/search.services";
import Modal from '../components/modal';
import ModalAi from '../components/modal-chatAi';
import KritikDanSaranModal from '../components/kritikDanSaranModal';
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import SplitText from "../components/react-bits/SplitText/SplitText";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { toast } from "../components/ToastProvider";


const formatTanggal = (tanggalString) => {
  if (!tanggalString) return '-';

  const tahun = tanggalString.substring(0, 4);
  const bulan = tanggalString.substring(4, 6);
  const hari = tanggalString.substring(6, 8);

  const bulanNama = [
    '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const bulanIndex = parseInt(bulan, 10);
  if (bulanIndex < 1 || bulanIndex > 12) return '-';

  return `${parseInt(hari, 10)} ${bulanNama[bulanIndex]} ${tahun}`;
};

const DetailDokumen = () => {

  const { t } = useTranslation();

  const { slug } = useParams();

  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const navigateHandelClick = (link = '') => {
    navigate(`/${link}`);
    window.scrollTo(0, 0);
  };


  // Modal Priview
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlModal, setUrlModal] = useState('');

  // Modal Priview
  const [isModalOpenAi, setIsModalOpenAi] = useState(false);
  const [urlModalAi, setUrlModalAi] = useState('');

  // Modal Kritik & Saran
  const [isModalOpenKritik, setIsModalOpenKritik] = useState(false);
  const [urlModalKritik, setUrlModalKritik] = useState('');

  useEffect(() => {
    getPeraturanDetail(slug).then((result) => {
      setData(result);
    });

    addViews(slug)

  }, [slug]);

  useEffect(() => {
    if (data) {
      setUrlModalAi(
        `https://jdih.pu.go.id/internal/assets/assets/produk/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4, 6)}/${data?.data?.file_upload}`
      );
    }
  }, [data]);

  const showModal = async (stateCondition, urlPath) => {
    const isPDF = typeof urlPath === 'string' && urlPath.toLowerCase().endsWith('.pdf');
    if (!isPDF) {
      toast.error("Tidak Bisa Menemukan Dokumen.!", { position: "bottom-right" });
      return false;
    }

    setIsModalOpen(stateCondition);
    setUrlModal(urlPath);
  }

  const showModalAi = async (stateCondition, urlPath) => {
    const isPDF = typeof urlPath === 'string' && urlPath.toLowerCase().endsWith('.pdf');
    if (!isPDF) {
      toast.error("Tidak Bisa Menemukan Dokumen.!", { position: "bottom-right" });
      return false;
    }
    setIsModalOpenAi(stateCondition);
    setUrlModalKritik(urlPath);
  }

  const showModalKritik = async (stateCondition) => {
    setIsModalOpenKritik(stateCondition);
  }

  const handleDownload = async (urlDownload, fileName, slug) => {
    try {
      const isPDF = typeof fileName === 'string' && fileName.toLowerCase().endsWith('.pdf');
      if (!isPDF) {
        toast.error("Tidak Bisa Menemukan Dokumen.!", { position: "bottom-right" });
        return false;
      }

      addDownload(slug)
      const fileUrl = urlDownload;
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      console.log(link)
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download gagal:", error);
    }
  }

  const details = [
    { label: t("detailPeraturanTipe"), value: "Peraturan Perundang-undangan" },
    { label: t("detailPeraturanJudul"), value: data?.data?.judul?.replace(/<[^>]+>/g, '') },
    { label: t("detailPeraturanTeu"), value: data?.data?.teu },
    { label: t("detailPeraturanNoPutusan"), value: data?.data?.noperaturan },
    { label: t("detailPeraturanJenis"), value: data?.dataCategory?.percategoryname },
    { label: t("detailPeraturanSingkatan"), value: data?.dataCategory?.singkatan },
    { label: t("detailPeraturanTempatPenetapan"), value: data?.data?.tempat_terbit },
    { label: t("detailPeraturanTanggal"), value: formatTanggal(data?.data?.tanggal_penetapan) },
    { label: t("detailPeraturanTanggalPengundangan"), value: formatTanggal(data?.data?.tanggal_pengundangan) },
    { label: t("detailPeraturanSumber"), value: data?.data?.sumber },
    { label: t("detailPeraturanSubjek"), value: data?.data?.subjek },
    { label: t("detailPeraturanStatusPeraturan"), value: "Berlaku" },
    { label: t("detailPeraturanBahasa"), value: data?.data?.bahasa },
    { label: t("detailPeraturanLokasi"), value: data?.data?.lokasi },
    { label: t("detailPeraturanBidangHukum"), value: data?.data?.bidang_hukum },
    { label: t("detailPeraturanLampiran"), value: "-" },
  ];

  const getSebelumTentang = (str = '-') => {
    const split = str.split('tentang');
    return split[0] ? split[0].trim() : '';
  };

  const getIsiTentang = (str = '-') => {
    const split = str.split('tentang');
    return split[1] ? split[1].trim() : '';
  };

  return (
    <>
      <Headers />

      <section className="h-full bg-slate-100 py-4 ">
        {/* Judul */}
        <h1 className="text-center font-roboto font-bold text-bluePu text-[23px] lg:text-[35px] py-4">
          <SplitText
            text={t('detailPeraturan')}
            delay={20}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
          />
        </h1>

        <div className='w-full px-4 md:px-6 lg:px-0 lg:w-[70%] mx-auto lg:flex lg:justify-between lg:gap-4'>

          {/* Card Peraturan Utama */}
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
            className="w-full mb-6 lg:mb-0 lg:w-[calc(70%-0.5rem)]"
          >
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-300 h-full w-full lg:m-0">
              <h2 className="text-[18px] lg:text-[24px] font-bold font-roboto text-bluePu mt-3 text-center lg:text-left">
                <SplitText
                  text={getSebelumTentang(data?.data?.judul).replace(/<[^>]+>/g, '')}
                  delay={20}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  easing="easeOutCubic"
                  threshold={0.2}
                />
              </h2>
              <p className="text-gray-700 mt-2 font-roboto text-sm lg:text-[17px] leading-relaxed text-center lg:text-left">
                <SplitText
                  text={`tentang ${data?.data?.tentang?.replace(/<[^>]+>/g, '')}`}
                  delay={10}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  easing="easeOutCubic"
                  threshold={0.2}
                />
              </p>

              <div className="flex items-center border-b border-t mt-4 py-4 gap-4">
                <div className="box-border size-14 lg:size-16 p-1 rounded-lg shadow-lg bg-gradient-to-r from-[#2793a3] to-bluePu flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-100 text-4xl lg:text-5xl">dictionary</span>
                </div>
                <p className='font-roboto font-semibold text-slate-600 text-[18px] lg:text-[23px]'>
                  <SplitText
                    text={t('detailPeraturanMetaData')}
                    delay={20}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    easing="easeOutCubic"
                    threshold={0.2}
                  />
                </p>
              </div>

              <div className="space-y-2 lg:space-y-3 pt-8 lg:pt-6">
                {details.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col lg:flex-row items-start border-gray-200 pb-2 text-gray-800 font-roboto text-[12px] lg:text-base"
                  >
                    <span className="font-semibold lg:font-normal text-slate-700 w-full lg:w-[30%] text-[14px] lg:text-[15px]">{item.label}</span>
                    <span className="w-[5%] hidden lg:inline ">:</span>
                    <span className="w-full lg:w-[60%] text-[14px] lg:text-base mt-2 lg:mt-0 text-slate-600 ">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col lg:flex-row gap-3 mt-2 border-t py-2">
                <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full lg:w-auto px-2 lg:px-3 py-2 rounded-2xl font-roboto text-[16px] lg:text-[15px] flex items-center justify-center gap-1 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg text-center"
                  onClick={() => showModalKritik(true)}
                >
                  <span className="material-symbols-outlined text-xl lg:text-lg text-kuningButton">edit_square</span>
                  <span>{t("detailPeraturanKeritikdanSaran")}</span>
                </button>
                <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full lg:w-auto px-2 lg:px-3 py-2 rounded-2xl font-roboto text-[16px] lg:text-[15px] flex items-center justify-center gap-1 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg text-center"
                  onClick={() => showModalAi(true, `https://jdih.pu.go.id/internal/assets/assets/produk/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4, 6)}/${data?.data?.file_upload}`)}
                >
                  <span className="material-symbols-outlined text-xl lg:text-lg text-kuningButton">robot_2</span>
                  <span>Chat AI</span>
                </button>
              </div>

              <div className="flex gap-3 mt-2 border-t py-4 items-center">
                <p className='font-roboto font-semibold text-slate-600 text-[14px] lg:text-[18px]'>Share :</p>
                <div className="flex gap-3">
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                    <i className="fa-brands fa-x-twitter text-white text-2xl"></i>
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-[#3b5998] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                    <i className="fa-brands fa-facebook text-2xl text-white"></i>
                  </a>
                  <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(document.title + ' ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-[#25D366] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                    <i className="fa-brands fa-whatsapp text-white text-2xl"></i>
                  </a>
                  <a href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-[#0088cc] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                    <i className="fa-brands fa-telegram text-white text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedContent>

          {/* Sidebar */}
          <div className='flex flex-col w-full lg:w-[calc(30%-0.5rem)] gap-6 lg:gap-4'>

            {/* Card Abstrak */}
            <AnimatedContent
              distance={150} delay={100} direction="horizontal" reverse={false} config={{ tension: 400, friction: 100 }} initialOpacity={0} animateOpacity scale={1.0} threshold={0.1}
              className="w-full"
            >
              <div className="bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex flex-col h-full">
                <p className='font-roboto font-semibold text-slate-600 text-[12px] lg:text-[14px] flex items-center gap-2 border-b pb-2'><span className="material-symbols-outlined">description</span> ABSTRAK</p>
                {/* PERUBAHAN KONTAINER TOMBOL */}
                <div className='flex flex-col md:flex-row gap-2 p-2 w-full my-2'>
                  {/* PERUBAHAN TOMBOL INDIVIDUAL */}
                  <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full md:flex-1 h-[40px] rounded-2xl font-roboto text-[11px] md:text-[13px] lg:text-[14px] flex items-center justify-center gap-1 md:gap-1.5 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => showModal(true, `https://jdih.pu.go.id/internal/assets/assets/produk_abstrak/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4, 6)}/${data?.data?.abstrak}`)}
                  >
                    <span className="material-symbols-outlined text-sm md:text-base lg:text-xl text-kuningButton">visibility</span>
                    Preview
                  </button>
                  <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full md:flex-1 h-[40px] rounded-2xl font-roboto text-[11px] md:text-[13px] lg:text-[14px] flex items-center justify-center gap-1 md:gap-1.5 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => handleDownload(data?.data?.abstrak, `https://jdih.pu.go.id/internal/assets/assets/produk_abstrak/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4, 6)}/${data?.data?.abstrak}`, data?.data?.slug)}
                  >
                    <span className="material-symbols-outlined text-sm md:text-base lg:text-xl text-kuningButton">download</span>
                    Download
                  </button>
                </div>
              </div>
            </AnimatedContent>

            {/* Card File Peraturan */}
            <AnimatedContent
              distance={150} delay={200} direction="horizontal" reverse={false} config={{ tension: 400, friction: 100 }} initialOpacity={0} animateOpacity scale={1.0} threshold={0.1}
              className='w-full'
            >
              <div className="bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex flex-col h-full">
                <p className='font-roboto font-semibold text-slate-600 text-[12px] lg:text-[14px] flex items-center gap-2 border-b pb-2'><span className="material-symbols-outlined">description</span> FILE PERATURAN</p>
                {/* PERUBAHAN KONTAINER TOMBOL */}
                <div className='flex flex-col md:flex-row gap-2 p-2 w-full my-2'>
                  {/* PERUBAHAN TOMBOL INDIVIDUAL */}
                  <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full md:flex-1 h-[40px] rounded-2xl font-roboto text-[11px] md:text-[13px] lg:text-[14px] flex items-center justify-center gap-1 md:gap-1.5 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => showModal(true, `https://jdih.pu.go.id/internal/assets/assets/produk/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4, 6)}/${data?.data?.file_upload}`)}
                  >
                    <span className="material-symbols-outlined text-sm md:text-base lg:text-xl text-kuningButton">visibility</span>
                    Preview
                  </button>
                  <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full md:flex-1 h-[40px] rounded-2xl font-roboto text-[11px] md:text-[13px] lg:text-[14px] flex items-center justify-center gap-1 md:gap-1.5 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => handleDownload(data?.data?.file_upload, `https://jdih.pu.go.id/internal/assets/assets/produk/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4, 6)}/${data?.data?.file_upload}`, data?.data?.slug)}
                  >
                    <span className="material-symbols-outlined text-sm md:text-base lg:text-xl text-kuningButton">download</span>
                    Download
                  </button>
                </div>
              </div>
            </AnimatedContent>

            {/* Card Berkas Parsial */}
            {data?.dataFileParsial?.length > 0 ? (
              <AnimatedContent
                distance={150} delay={300} direction="horizontal" reverse={false} config={{ tension: 400, friction: 100 }} initialOpacity={0} animateOpacity scale={1.0} threshold={0.1}
                className="w-full"
              >
                <div className="bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex flex-col h-full">
                  <p className='font-roboto font-semibold text-slate-600 text-[12px] lg:text-[14px] flex items-center gap-2 pb-2 border-b'><span className="material-symbols-outlined">description</span> BERKAS PARSIAL</p>
                  {data?.dataFileParsial?.map((item, index) => (
                    <div className='p-2' key={index}>
                      <p className='my-2 mx-2 font-roboto font-semibold text-[13px] lg:text-[16px] text-bluePu'>{index + 1}. Berkas Parsial Ke-{index + 1}</p>
                      {/* PERUBAHAN KONTAINER TOMBOL */}
                      <div className='flex flex-col md:flex-row gap-2'>
                        {/* PERUBAHAN TOMBOL INDIVIDUAL */}
                        <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full md:flex-1 h-[40px] rounded-2xl font-roboto text-[11px] md:text-[13px] lg:text-[14px] flex items-center justify-center gap-1 md:gap-1.5 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                          onClick={() => showModal(true, `https://jdih.pu.go.id/internal/assets/assets/produk_parsial/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4, 6)}/${item.file}`)}
                        >
                          <span className="material-symbols-outlined text-sm md:text-base lg:text-xl text-kuningButton">visibility</span>
                          Preview
                        </button>
                        <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover w-full md:flex-1 h-[40px] rounded-2xl font-roboto text-[11px] md:text-[13px] lg:text-[14px] flex items-center justify-center gap-1 md:gap-1.5 lg:gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                          onClick={() => handleDownload(item?.file, `https://jdih.pu.go.id/internal/assets/assets/produk_parsial/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4, 6)}/${item.file}`, data?.data?.slug)}
                        >
                          <span className="material-symbols-outlined text-sm md:text-base lg:text-xl text-kuningButton">download</span>
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedContent>
            ) : ''}

            {/* Card Status Peraturan */}
            {data?.daraLogPeraturan?.length > 0 ? (
              <div className="w-full bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex flex-col">
                <p className='font-roboto font-semibold text-slate-600 text-[12px] lg:text-[14px] flex items-center gap-1 border-b pb-2'><span className="material-symbols-outlined -rotate-12">priority_high</span> STATUS PERATURAN</p>
                {data?.daraLogPeraturan?.map((item, index) => (
                  <div className='p-2 w-full my-2' key={index}>
                    <div className="bg-blue-100 text-bluePu px-3 py-1 rounded-md w-fit text-[14px]">
                      {item?.status}
                    </div>
                    <p className="text-bluePu text-[12px] lg:text-[14px] mt-2">
                      <span className="text-blue-600 font-medium cursor-pointer"
                        onClick={(e) => { e.preventDefault(); navigateHandelClick(`detail-dokumen/${item?.slug}`); }}
                      >{item?.noperaturan}</span> tentang {item?.tentang}
                    </p>
                  </div>
                ))}
              </div>
            ) : ''}
          </div>
        </div>
      </section>

      <KritikDanSaranModal isOpen={isModalOpenKritik} onClose={() => setIsModalOpenKritik(false)} title="Form Kritik & Saran" dataPeraturan={data}>

      </KritikDanSaranModal>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Preview Dokumen" urlPath={urlModal}>

      </Modal>

      <ModalAi isOpen={isModalOpenAi} onClose={() => setIsModalOpenAi(false)} urlPath={urlModalAi}>

      </ModalAi>

      <Langganan />
      <Footer />
    </>
  );
};

export default DetailDokumen;
