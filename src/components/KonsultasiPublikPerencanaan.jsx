import { React, useState, useEffect } from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import CardKonsultasiPublikPerencanaan from "../components/CardKonsultasiPublikPerencanaan";
import ModalMasukanJudul from "../components/ModalMasukanJudul";
import ModalMasukanKpPerencanaan from "../components/ModalMasukanKpPerencanaan";
import ModalPriviewPdf from "../components/modal";
import { useNavigate } from "react-router-dom";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import SplitText from "../components/react-bits/SplitText/SplitText";
import FadeContent from '../components/react-bits/FadeContent/FadeContent';
import { getIpUser, insertDataPengunjung } from "../services/insertDataPengunjung.services";
import { getKpPerencanaan } from "../services/kpPerencnaan.services";
import { useTranslation } from 'react-i18next';
import MetaData from "../components/metaDataTags";


const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    window.scrollTo(0, 0);
    const generatePageNumbers = () => {
        if (totalPages <= 5) {
            return [...Array(totalPages)].map((_, i) => i + 1);
        }

        let pages = [];
        if (currentPage <= 3) {
            pages = [1, 2, 3, 4, "...", totalPages];
        } else if (currentPage >= totalPages - 2) {
            pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
        }
        return pages;
    };

    return (
        <div className="flex justify-end items-center my-4 space-x-2 gap-4 md:w-[85%]">
            <span className="font-medium font-roboto md:text-[30px] text-[14px]">Halaman</span>
            <div className="flex space-x-2 font-roboto md:text-[18px] text-[14px]">
                <button
                    className={`md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition`}
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Prev
                </button>

                {generatePageNumbers().map((page, index) => (
                    <button
                        key={index}
                        className={`md:px-4 px-3 md:py-2 py-1 rounded-lg shadow-md transition ${currentPage === page
                            ? "bg-bluePu text-kuningButton"
                            : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            }`}
                        onClick={() => typeof page === "number" && onPageChange(page)}
                        disabled={page === "..."}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className={`md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition`}
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const konsultasiPublik = () => {

    
    

    const navigate = useNavigate();

    useEffect(() => {
        getIpUser()
            .then((res) => {
                const ip = res.data.ip;
                const halaman = "Halaman Konsultasi Publik Perencanaan";
                return insertDataPengunjung(ip, halaman);
            })
            .then((response) => {

            })
            .catch((err) => {
                console.error("Terjadi error:", err);
            });
    }, []);


            // Modal Priview
            const [isModalOpenAi, setIsModalOpenAi] = useState(false);
            // Modal Masukan Judul Baru
            const [showModalMasukanJudul, setShowModalMasukanJudul] = useState(false);

            function handleCloseMasukanJudul() {
                setShowModalMasukanJudul(false);
            }
            async function handleSubmitMasukanJudul(form) {
                // TODO: Integrasi submit ke backend jika diperlukan
                // Contoh: await insertMasukanJudulBaru(form);
            }
    // Modal Masukan

    // Modaal Masukan
    const [showModalMasukan, setShowModalMasukan] = useState(false);
    const [modalData, setModalData] = useState(null);
    const handleOpenMasukanModal = (data) => {
      setModalData(data);
      setShowModalMasukan(true);
    };
    const handleCloseMasukanModal = () => {
      setShowModalMasukan(false);
      setModalData(null);
    };
    // End Modal Masukan

    // Modaal Priview Pdf
    const [showModalPreviewPdf, setShowModalPreviewPdf] = useState(false);
    const [modalPreviewData, setModalPreviewData] = useState(null);
    const handleOpenPreviewPdfModal = (data) => {
      setModalPreviewData(data);
      setShowModalPreviewPdf(true);
    };
    const handleClosePreviewPdfModal = () => {
      setShowModalPreviewPdf(false);
      setModalPreviewData(null);
    };
    // End Modal Priview Pdf

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    const paginateFunction = async () => {
        await getKpPerencanaan(currentPage, search).then((result) => {
            
            setPosts(result.data.posts);
            setTotalPages(result.data.totalPages);
            setCurrentPage(result.data.currentPage);
        });
    }

    useEffect(() => {
        paginateFunction();
    }, [currentPage]);

    const { t } = useTranslation();

    return (
        <>

            <MetaData
                title="Konsultasi Publik JDIH KemenPU: Partisipasi Masyarakat dalam Pembentukan Regulasi"
                pageDescription="Ikuti dan beri masukan dalam proses konsultasi publik di JDIH Kementerian Pekerjaan Umum. Transparansi dalam perumusan kebijakan bersama masyarakat."
                pageKeywords="Konsultasi Publik KemenPU, Partisipasi Masyarakat PU, Regulasi KemenPU, JDIH Konsultasi Publik, Keterlibatan Publik PU, Penyusunan Peraturan PU, Umpan Balik Masyarakat PU"
                image="https://jdih.pu.go.id/Logogram.png"
            />

            <Headers />


            <section className='h-full bg-slate-100 md:px-[180px] px-5 py-4'>
                            

                <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4'>
                    <SplitText
                        text={t("semuaKonsultasiPublikPerencanaan")}
                        delay={15}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        easing="easeOutCubic"
                        threshold={0.2}
                    />
                </h1>
                            {/* Hapus CardKonsultasiPublikPerencanaan di luar map, hanya render di dalam map */}
                <FadeContent blur={true} duration={400} easing="ease-out" initialOpacity={0}>
                    <form onSubmit={(e) => { e.preventDefault(); paginateFunction(); }}>
                        <div className="box-border w-full mx-auto my-2 mb-[20px] rounded-lg h-[60px] bg-bluePu shadow-lg flex items-center px-4 md:w-full md:my-2 md:mb-[20px] md:h-[60px] lg:w-[50%] lg:my-4 lg:mb-[50px] lg:h-[70px]">
                            <input
                                type="text"
                                placeholder={t("pliceHolderKonsultasiPublikPerencanaan")}
                                className="w-full bg-transparent outline-none text-white placeholder-white font-roboto text-lg"
                                onInput={(e) => setSearch(e.target.value)}
                            />
                            <button type='submit' className="ml-2 w-[90px] bg-kuningButton text-bluePu px-4 py-2 rounded-lg font-roboto font-semibold hover:bg-opacity-80 transition">
                                {t("btnCariJudulKonsultasiPublikPerencanaan")}
                            </button>
                        </div>
                    </form>

                                     {posts?.length > 0 && (
                                         <div className="flex justify-end w-full max-w-6xl mx-auto mt-2 mb-4 pr-2 sm:pr-4">
                                             <button className="inline-flex items-center gap-2 bg-gradient-to-r from-bluePu to-blue-500 text-slate-100 px-4 py-2 rounded-xl font-roboto font-semibold shadow-md hover:scale-105 hover:opacity-90 transition-all text-sm md:text-base border border-white" 
                                             style={{ boxShadow: '0 2px 8px rgba(59,130,246,0.10)' }}
                                             onClick={() => setShowModalMasukanJudul(true)}
                                            >
                                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="inline-block">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                                </svg>
                                                 Masukan Judul Baru
                                                </button>
                                        </div>
                                )}
                </FadeContent>

                {posts?.length > 0 ? (
                    posts.map((item, index) => {
                        console.log(item);
                        return (
                        <AnimatedContent
                            key={item.id || index}
                            distance={150}
                            delay={100}
                            direction="horizontal"
                            reverse={index % 2 === 0}
                            config={{ tension: 400, friction: 100 }}
                            initialOpacity={0}
                            animateOpacity
                            scale={1.0}
                            threshold={0.1}
                        >
                            <CardKonsultasiPublikPerencanaan 
                            data={item} 
                            onMasukanClick={() => handleOpenMasukanModal(item)} 
                            onPreviewClick={() => handleOpenPreviewPdfModal(item.path_konsepsi)} 
                            />
                        </AnimatedContent>
                        );
                    })
                    ) : (
                    <p className='text-center text-slate-100'>Data Kosong</p>
                )}

                {/* Pagination */}
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />


            </section>

            

            <Langganan />
            <Footer />

                        <ModalMasukanJudul
                            isOpen={showModalMasukanJudul}
                            onClose={handleCloseMasukanJudul}
                            onSubmit={handleSubmitMasukanJudul}
                        />

                        <ModalMasukanKpPerencanaan isOpen={showModalMasukan} onClose={handleCloseMasukanModal} data={modalData} />

                        <ModalPriviewPdf 
                            isOpen={showModalPreviewPdf} 
                            onClose={handleClosePreviewPdfModal} 
                            title={`Preview Konsepsi Pengaturan`}
                            urlPath={modalPreviewData} />

        </>
    );
};

export default konsultasiPublik;
