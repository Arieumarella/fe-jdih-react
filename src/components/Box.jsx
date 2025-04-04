import {React, useState} from 'react';
import striptags from 'striptags';
import { useNavigate } from "react-router-dom";
import Modal from '../components/modal';
import ModalAi from '../components/modal-chatAi';
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';


const Box = (data) => {

  const navigate = useNavigate();

  // Modal Priview
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlModal, setUrlModal] = useState('');

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
    <section className=' px-5 md:px-[60px] mt-[18px] group'>
        <div className="box-content size-25 border-2 w-full rounded-xl shadow-lg bg-bluePu">
            <span className='md:text-[32px] text-[25px] font-semibold font-onest mt-[30px] block text-center text-slate-100'>Produk Hukum Terbaru</span>
            
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
              <div className='' key={index}>
                
                
                <span className='nmPeraturan'><a href="#"
                  onClick={() => navigate(`/detail-dokumen/${item.slug}`)}>{striptags(item.judul)}</a>
                </span>
                

                <div className='flex justify-start md:gap-3 gap-2'>
                    <p className='tglPeraturan'>{formatDate(item.tanggal)}</p>
                    <button className={item.status == 0 ? 'stsBerlakuPeraturan' : 'stsTidakBerlakuPeraturan'}>{item.status == 0 ? 'Berlaku' : 'Tidak Berlaku'}</button>
                    
                    <button className='downloadPeraturan'>
                    <span className="material-symbols-outlined md:text-base text-[20px]">download</span> {item.download_count == null ? 0 : item.download_count} Kali
                    </button>
                </div>

               
                
                <div className='flex '>
                  <div className='flex justify-items-start gap-3 ml-6 my-6'>
                    <button className='btnDetailPeraturan' onClick={() => showModalAi(true, item.path_file)}>
                      <span className="material-symbols-outlined md:text-xl text-[15px]">robot_2</span> Chat AI</button>
                  </div>
                  <div className='flex justify-items-start gap-3 ml-2 my-6'>
                    <button className='btnDetailPeraturan' onClick={() => showModal(true, item.path_abstrak)} ><span className="material-symbols-outlined md:text-xl text-[15px]" >visibility</span> Abstrak</button>
                  </div>
                  <div className='flex justify-items-start gap-3 ml-2 my-6'>
                    <button className='btnDetailPeraturan' onClick={() => handleDownload(item.path_file, item.file_upload)}><span className="material-symbols-outlined md:text-xl text-[15px]">download_2</span> Unduh</button>
                  </div>
                  <div className='flex justify-items-start gap-3 ml-2 my-6'>
                    <button className='btnDetailPeraturan' onClick={() => navigate(`/detail-dokumen/${item.slug}`)} ><span className="material-symbols-outlined md:text-xl text-[15px]">search</span> Detail</button>
                  </div>
                  </div>
              </div>
              </AnimatedContent>
            ))) : (
              <p className='text-center text-slate-100'>Data Kosong</p>
            )}
          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Abstrak" urlPath={urlModal}>

          </Modal>

          <ModalAi isOpen={isModalOpenAi} onClose={() => setIsModalOpenAi(false)} urlPath={urlModalAi}>

          </ModalAi>
        </div>
    </section>
    </>
  );
};

export default Box;