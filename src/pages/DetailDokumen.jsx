import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import {getPeraturanDetail} from "../services/search.services";
import Modal from '../components/modal';
import ModalAi from '../components/modal-chatAi';
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import SplitText from "../components/react-bits/SplitText/SplitText";
import { useNavigate } from "react-router-dom";
import FadeContent from '../components/react-bits/FadeContent/FadeContent';


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

    const { slug } = useParams();

    const [data, setData] = useState([]);
    
    const navigate = useNavigate();
    const navigateHandelClick = (link = '') => {
      navigate(`/${link}`);
      window.scrollTo(0, 0);
    };

      useEffect(() => {    
        getPeraturanDetail(slug).then((result) => {
            setData(result);
        });
            
      }, [slug]);

      // Modal Priview
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [urlModal, setUrlModal] = useState('');
      
      // Modal Priview
      const [isModalOpenAi, setIsModalOpenAi] = useState(false);
      const [urlModalAi, setUrlModalAi] = useState('');

      const showModal = async (stateCondition, urlPath) => {
        setIsModalOpen(stateCondition);
        setUrlModal(urlPath);
      }

      const showModalAi = async (stateCondition, urlPath) => {
        setIsModalOpenAi(stateCondition);
        setUrlModalAi(urlPath);
      }

      const handleDownload = async (urlDownload, fileName) => {
        try {
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
      { label: "Tipe", value: "Peraturan Perundang-undangan" },
      { label: "Judul", value: data?.data?.judul?.replace(/<[^>]+>/g, '') },
      { label: "T.E.U. Badan / Pengarang", value: data?.data?.teu },
      { label: "No. Peraturan", value: data?.data?.noperaturan },
      { label: "Jenis/Bentuk Peraturan", value: data?.dataCategory?.percategoryname },
      { label: "Singkatan Jenis/Bentuk Peraturan", value: data?.dataCategory?.singkatan },
      { label: "Tempat Penetapan", value: data?.data?.tempat_terbit },
      { label: "Tanggal-Bulan-Tahun Penetapan", value: formatTanggal(data?.data?.tanggal_penetapan) },
      { label: "Tanggal-Bulan-Tahun Pengundangan", value: formatTanggal(data?.data?.tanggal_pengundangan) },
      { label: "Sumber", value: data?.data?.sumber },
      { label: "Subjek", value: data?.data?.subjek },
      { label: "Status Peraturan", value: "Berlaku" },
      { label: "Bahasa", value: data?.data?.bahasa },
      { label: "Lokasi", value: data?.data?.lokasi },
      { label: "Bidang Hukum", value: data?.data?.bidang_hukum },
      { label: "Lampiran", value: "-" },
    ];

    const getSebelumTentang = (str='-') => {
      const split = str.split('tentang');
      return split[0] ? split[0].trim() : '';
    };

    const getIsiTentang = (str='-') => {
      const split = str.split('tentang');
      return split[1] ? split[1].trim() : '';
    };

    return (
      <>
        <Headers/>
            
        <section className="h-full bg-slate-100 py-4 h-[500px] ">
          {/* Judul */}
          <h1 className="text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4">
            <SplitText
              text={`Detail Peraturan`}
              delay={20}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
            />                    
          </h1>

          <div className='md:flex justify-between md:w-[80%] w-full gap-4 mx-auto'>

          {/* Card Peraturan */}
          
          <div className="md:w-[75%]  mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
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
            className="md:w-[75%]  mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300"
            >

            <h2 className="md:text-[24px] text-[18px] font-bold font-roboto text-bluePu mt-3 md:text-left text-center">
            <SplitText
              text={getSebelumTentang(data?.data?.judul).replace(/<[^>]+>/g, '')}
              delay={20}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
            />
            </h2>
            <p className="text-gray-700 mt-2 font-roboto text-sm md:text-[17px] leading-relaxed md:text-left text-center">
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

            <div className="box-border md:size-16 size-14 p-1 rounded-lg shadow-lg bg-gradient-to-r from-[#2793a3] to-bluePu flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-100 md:text-5xl text-4xl">dictionary</span>
            </div>

            <p className='font-roboto font-semibold text-slate-600 md:text-[23px] text-[18px]'>
              <SplitText
              text={`Meta Data Peraturan`}
              delay={20}
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

              onClick={() => showModalAi(true,`https://jdih.pu.go.id/internal/assets/assets/produk/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4,6)}/${data?.data?.file_upload}`)}
              
              >
                <span className="material-symbols-outlined md:text-lg text-xl text-kuningButton">robot_2</span>
                <span>Chat AI</span>
              </button>
            </div>

            <div className="flex gap-3 mt-2 border-t py-4">
            <p className='font-roboto font-semibold text-slate-600 md:text-[18px] text-[14px]'>Share :</p>
            <div className="flex gap-3">
              {/* Twitter */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-x-twitter text-white text-2xl"></i>
              </div>

              {/* Facebook */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#3b5998] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-facebook text-2xl text-white"></i>
              </div>

              {/* WhatsApp */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#25D366] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-whatsapp text-white text-2xl"></i>
              </div>

              {/* Telegram */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#0088cc] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                <i className="fa-brands fa-telegram text-white text-2xl"></i>
              </div>
            </div>
            </div>
            </AnimatedContent> 
          </div>
          

          <div className='flex-col md:w-[30%] max-w-[95%] md:mt-0 mt-4 mx-auto'>
          
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
            className="w-full  mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex-col mb-4"
          >
          <div className="w-full  mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex-col mb-4">
            <p className='font-roboto font-semibold text-slate-600 md:text-[14px] text-[12px] flex items-center gap-2 border-b pb-2'><span className="material-symbols-outlined">description</span> ABSTRAK</p>
            <div className='flex gap-2 p-2 w-full my-2'>
              <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => showModal(true, `https://jdih.pu.go.id/internal/assets/assets/produk_abstrak/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4,6)}/${data?.data?.abstrak}`)}
              >
                <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">visibility</span> 
                Preview
              </button>
              <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => handleDownload(data?.data?.abstrak, `https://jdih.pu.go.id/internal/assets/assets/produk_abstrak/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4,6)}/${data?.data?.abstrak}`)}
              >
                <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">download</span> 
                Download
              </button>
            </div>
          </div>
          </AnimatedContent>
          
          <AnimatedContent
            distance={150}
            delay={200}
            direction="horizontal"
            reverse={false}
            config={{ tension: 400, friction: 100 }}
            initialOpacity={0}
            animateOpacity
            scale={1.0}
            threshold={0.1}
            className='w-full  mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex-col my-4'
          >
          <div className="w-full  mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex-col my-4">
            <p className='font-roboto font-semibold text-slate-600 md:text-[14px] text-[12px] flex items-center gap-2 border-b pb-2'><span className="material-symbols-outlined">description</span> FILE PERATURAN</p>
            <div className='flex gap-2 p-2 w-full my-2'>
              <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg"

              onClick={() => showModal(true, `https://jdih.pu.go.id/internal/assets/assets/produk/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4,6)}/${data?.data?.file_upload}`)}
              
              >
                <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">visibility</span> 
                Preview
              </button>
              <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg"
              
              onClick={() => handleDownload(data?.data?.file_upload, `https://jdih.pu.go.id/internal/assets/assets/produk/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4,6)}/${data?.data?.file_upload}`)}

              >
                <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">download</span> 
                Download
              </button>
            </div>
          </div>
          </AnimatedContent>
          
          {data?.dataFileParsial?.length > 0 ? (
          <AnimatedContent
            distance={150}
            delay={300}
            direction="horizontal"
            reverse={false}
            config={{ tension: 400, friction: 100 }}
            initialOpacity={0}
            animateOpacity
            scale={1.0}
            threshold={0.1}
            className="w-full  mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex-col my-4"
          >
          <div className="w-full  mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex-col my-4">
            <p className='font-roboto font-semibold text-slate-600 md:text-[14px] text-[12px] flex items-center gap-2 pb-2 border-b'><span className="material-symbols-outlined">description</span> BERKAS PARSIAL</p>

            {data?.dataFileParsial?.map((item, index) => (
            <div className='p-2' key={index}>
              <p className='my-2 mx-2 font-roboto font-semibold md:text-[16px] text-[13px] text-bluePu'>{index+1}. Berkas Parsial Ke-{index+1}</p> 
              <div className='flex gap-2 '>
                <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg"
                
                onClick={() => showModal(true, `https://jdih.pu.go.id/internal/assets/assets/produk_parsial/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4,6)}/${item.file}`)}

                >
                  <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">visibility</span> 
                  Preview
                </button>
                <button className="bg-bluePu hover:bg-opacity-70 text-kuningButton hover:bg-kuningHover md:w-full w-full h-[40px] rounded-2xl font-roboto md:text-[14px] text-[11px] flex items-center justify-center md:gap-2 gap-1 transition-all duration-200 shadow-md hover:shadow-lg"
                
                onClick={() => handleDownload(item?.dataFileParsial?.file, `https://jdih.pu.go.id/internal/assets/assets/produk_parsial/${data?.dataCategory?.percategorycode}/${data?.data?.tanggal?.substring(0, 4)}/${data?.data?.tanggal?.substring(4,6)}/${item.file}`)}

                >
                  <span className="material-symbols-outlined md:text-xl text-sm text-kuningButton">download</span> 
                  Download
                </button>
              </div>
            </div>
            ))}
         
          </div>
          </AnimatedContent>
          ):''}
          
          {data?.daraLogPeraturan?.length > 0 ? (
          
          <div className="w-full  mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 flex-col my-4">
            <p className='font-roboto font-semibold text-slate-600 md:text-[14px] text-[12px] flex items-center gap-1 border-b pb-2'><span className="material-symbols-outlined -rotate-12">priority_high</span> STATUS PERATURAN</p>
            {data?.daraLogPeraturan?.map((item, index) => (
            <div className='p-2 w-full my-2' key={index}>
              <div className="bg-blue-100 text-bluePu px-3 py-1 rounded-md w-fit text-[14px]">
                {item?.status}
              </div>
              <p className="text-bluePu md:text-[14px] text-[12px] mt-2">
                <span className="text-blue-600 font-medium cursor-pointer"
                onClick={(e) => { e.preventDefault(); navigateHandelClick(`detail-dokumen/${item?.slug}`); }}
                >{item?.noperaturan}</span> tentang {item?.tentang}
              </p>
            </div>
            ))}
          </div>
          ):''}
          

          </div>
          </div>

        </section>
        
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Preview Dokumen" urlPath={urlModal}>

        </Modal>

        <ModalAi isOpen={isModalOpenAi} onClose={() => setIsModalOpenAi(false)} urlPath={urlModalAi}>

        </ModalAi>
        
        <Langganan/>
        <Footer/>
      </>
    );
  };
  
  export default DetailDokumen;
  