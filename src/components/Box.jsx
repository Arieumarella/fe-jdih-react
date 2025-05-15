import { React, useState } from 'react';
import striptags from 'striptags';
import { useNavigate } from "react-router-dom";
import Modal from '../components/modal';
import ModalAi from '../components/modal-chatAi';
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import { useTranslation } from 'react-i18next';


const Box = (data) => {


  const navigate = useNavigate();

  // Modal Priview
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlModal, setUrlModal] = useState('');

  const { t, i18n } = useTranslation();

  const showModal = async (stateCondition, urlPath) => {
    setIsModalOpen(stateCondition);
    setUrlModal(urlPath);
  }

  // Modal Priview
  const [isModalOpenAi, setIsModalOpenAi] = useState(false);
  const [urlModalAi, setUrlModalAi] = useState('');

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
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download gagal:", error);
    }
  };

  const formatDate = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6) - 1; // Bulan dimulai dari 0 (Januari = 0)
    const day = dateString.slice(6, 8);

    const date = new Date(year, month, day);

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <section className='px-5 md:px-[60px] mt-[18px] group overflow-x-hidden'>
        <div className="box-content border-2 w-full rounded-xl shadow-lg bg-bluePu py-6">
          <span className='md:text-[32px] text-[25px] font-semibold font-onest block text-center text-slate-100'>{t('produkHukumTerbaik')}</span>

          <div className='mt-6 space-y-4'>
            {data?.data?.length > 0 ? (
              data.data.map((item, index) => (
                <AnimatedContent
                  key={index}
                  distance={80}
                  direction="horizontal"
                  reverse={false}
                  config={{ tension: 80, friction: 20 }}
                  initialOpacity={0.2}
                  animateOpacity
                  scale={1}
                  threshold={0.2}
                >
                  <div className='px-4 md:px-6 py-3'>
                    <span className='nmPeraturan block mb-1'><a href="#"
                      onClick={() => navigate(`/detail-dokumen/${item.slug}`)}>{striptags(item.judul)}</a>
                    </span>

                    <div className='flex justify-start md:gap-3 gap-2 items-center mb-2 ml-[5px]'>
                      <p className='tglPeraturan text-sm'>{formatDate(item.tanggal)}</p>
                      <button className={item.status == 0 ? 'stsBerlakuPeraturan text-xs md:text-sm' : 'stsTidakBerlakuPeraturan text-xs md:text-sm'}>{item.status == 0 ? 'Berlaku' : 'Tidak Berlaku'}</button>
                      <button className='downloadPeraturan text-xs md:text-sm flex items-center gap-1'>
                        <span className="material-symbols-outlined md:text-base text-[16px]">download</span> {item.download_count == null ? 0 : item.download_count} Kali
                      </button>
                    </div>

                    <div className='flex flex-wrap gap-2 mt-2 ml-[20px]'>
                      <button className='btnDetailPeraturan text-xs md:text-sm flex items-center gap-1' onClick={() => showModalAi(true, item.path_file)}>
                        <span className="material-symbols-outlined md:text-base text-[16px]">robot_2</span> Chat AI
                      </button>
                      <button className='btnDetailPeraturan text-xs md:text-sm flex items-center gap-1' onClick={() => showModal(true, item.path_abstrak)} >
                        <span className="material-symbols-outlined md:text-base text-[16px]" >visibility</span> Abstrak
                      </button>
                      <button className='btnDetailPeraturan text-xs md:text-sm flex items-center gap-1' onClick={() => handleDownload(item.path_file, item.file_upload)}>
                        <span className="material-symbols-outlined md:text-base text-[16px]">download_2</span> Unduh
                      </button>
                      <button className='btnDetailPeraturan text-xs md:text-sm flex items-center gap-1' onClick={() => navigate(`/detail-dokumen/${item.slug}`)} >
                        <span className="material-symbols-outlined md:text-base text-[16px]">search</span> Detail
                      </button>
                    </div>
                  </div>
                </AnimatedContent>
              ))
            ) : (
              <p className='text-center text-slate-100'>Data Kosong</p>
            )}
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Abstrak" urlPath={urlModal}>
            {/* Konten Modal */}
          </Modal>

          <ModalAi isOpen={isModalOpenAi} onClose={() => setIsModalOpenAi(false)} urlPath={urlModalAi}>
            {/* Konten Modal AI */}
          </ModalAi>
        </div>
      </section>
    </>
  );
};

export default Box;