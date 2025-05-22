import { React, useState, useEffect } from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { getInfografisPagination } from "../services/infografis.services.js";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import SplitText from "../components/react-bits/SplitText/SplitText";
import FadeContent from '../components/react-bits/FadeContent/FadeContent';
import { getIpUser, insertDataPengunjung } from "../services/insertDataPengunjung.services";
import { useTranslation } from 'react-i18next';

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
        <div className="flex justify-end items-center my-4 space-x-2 gap-4">
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

const Infografis = () => {
    const { t } = useTranslation();
    let terminetTextLong = (text = null) => {
        return text.length > 30 ? text.substring(0, 120) + "..." : text;
    }

    const navigate = useNavigate();

    const navigateHandelClick = (link = '') => {
        navigate(`/${link}`);
        window.scrollTo(0, 0);
    };

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    const paginateFunction = async () => {
        await getInfografisPagination(currentPage, search).then((result) => {
            setPosts(result.data.posts);
            setTotalPages(result.data.totalPages);
            setCurrentPage(result.data.currentPage);
            console.log(posts);
        });
    }

    useEffect(() => {
        paginateFunction();
    }, [currentPage]);

    useEffect(() => {
        getIpUser()
            .then((res) => {
                const ip = res.data.ip;
                const halaman = "Halaman Monografi";
                return insertDataPengunjung(ip, halaman);
            })
            .then((response) => {

            })
            .catch((err) => {
                console.error("Terjadi error:", err);
            });
    }, []);

    return (
        <>
            <Headers />

            <section className='h-full bg-slate-100 px-5 py-4 md:px-5 lg:px-[300px]'>
                {/*
    Perubahan pada className section:
    - Mobile (default): px-5
    - Tablet (md:), disamakan dengan mobile: md:px-5
    - Laptop (lg:), mengambil style md:px-[300px] yang asli: lg:px-[300px]
  */}

                <h1 className='text-center font-roboto font-bold text-bluePu text-[23px] py-4 md:text-[23px] lg:text-[35px]'>
                    {/*
      Perubahan pada className h1:
      - Mobile (default): text-[23px]
      - Tablet (md:), disamakan dengan mobile: md:text-[23px]
      - Laptop (lg:), mengambil style md:text-[35px] yang asli: lg:text-[35px]
    */}
                    <SplitText
                        text={t("infografis")}
                        delay={15}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        easing="easeOutCubic"
                        threshold={0.2}
                    />
                </h1>

                <FadeContent blur={true} duration={400} easing="ease-out" initialOpacity={0}>
                    <form onSubmit={(e) => { e.preventDefault(); paginateFunction(); }}>
                        <div className="box-border w-full mx-auto my-2 mb-[20px] rounded-lg h-[60px] bg-bluePu shadow-lg flex items-center px-4 md:w-full md:my-2 md:mb-[20px] md:h-[60px] lg:w-[50%] lg:my-4 lg:mb-[50px] lg:h-[70px]">
                            {/*
          Perubahan pada className div search bar:
          - Mobile: w-full, my-2, mb-[20px], h-[60px]
          - Tablet (md): md:w-full, md:my-2, md:mb-[20px], md:h-[60px]
          - Laptop (lg): lg:w-[50%], lg:my-4, lg:mb-[50px], lg:h-[70px]
        */}
                            <input
                                type="text"
                                placeholder={t("pliceHolderInfografis")}
                                className="w-full bg-transparent outline-none text-white placeholder-white font-roboto text-lg"
                                onInput={(e) => setSearch(e.target.value)}
                            />
                            <button className="ml-2 w-[90px] bg-kuningButton text-bluePu px-4 py-2 rounded-lg font-roboto font-semibold hover:bg-opacity-80 transition">
                                {t("btnCariJudulInfografis")}
                            </button>
                        </div>
                    </form>
                </FadeContent>

                <div className='items-center grid grid-cols-1 gap-4 mb-12 md:grid-cols-1 md:gap-4 lg:grid-cols-3 lg:gap-8'>
                    {/*
      Perubahan pada className div grid container:
      - Mobile: grid-cols-1, gap-4
      - Tablet (md): md:grid-cols-1, md:gap-4
      - Laptop (lg): lg:grid-cols-3, lg:gap-8
    */}

                    {/* Box Infografis */}
                    {posts?.length > 0 ? (
                        posts.map((item, index) => (
                            <AnimatedContent
                                key={item.id || item.peraturan_id || index} // Menggunakan item.id jika ada, fallback ke peraturan_id atau index
                                distance={20}
                                direction="vertical"
                                reverse={false}
                                config={{ tension: 45, friction: 15 }}
                                initialOpacity={0.2}
                                animateOpacity
                                scale={1.1}
                                threshold={0.2}
                            >
                                <div className="group text-center cursor-pointer transition-all duration-500 hover:scale-105"
                                    onClick={(e) => { e.preventDefault(); navigateHandelClick(`infografis/${item.id}`); }}>
                                    <div className="w-full h-full bg-slate-400 aspect-[3/4] rounded-2xl overflow-hidden relative shadow-xl">
                                        {/*
                Perubahan pada className div card image container:
                - Mobile: aspect-[3/4]
                - Tablet (md): md:aspect-[3/4] (sama dengan mobile, karena md:aspect-[3/4] asli)
                - Laptop (lg): lg:aspect-[3/4] (sama dengan mobile/tablet, karena md:aspect-[3/4] asli)
                Jika md: asli sudah sama dengan mobile, maka 'aspect-[3/4]' saja cukup.
              */}

                                        {/* Gambar Background */}
                                        <div className={`w-full h-full bg-cover bg-center absolute group-hover:scale-110 transition-all duration-500`}
                                            style={{
                                                backgroundImage: `url("https://jdih.pu.go.id/internal/assets/assets/infografis/${item.gambar_1}")`,
                                            }}
                                        ></div>

                                        {/* Kotak Keterangan di Bagian Bawah */}
                                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-bluePu/90 to-bluePu/60 backdrop-blur-lg group-hover:bg-opacity-100 text-white font-medium text-[12px] p-4 px-6 font-roboto h-[100px] transition-all duration-500 flex flex-col justify-between md:text-[12px] lg:text-[16px]">
                                            {/*
                  Perubahan pada className div kotak keterangan (font size umum):
                  - Mobile: text-[12px]
                  - Tablet (md): md:text-[12px]
                  - Laptop (lg): lg:text-[16px] (dari md:text-[16px] asli)
                */}

                                            {/* Judul di kiri atas */}
                                            <div className="text-white line-clamp-2">
                                                {terminetTextLong(item.judul)}
                                            </div>

                                            {/* Viewer di kanan bawah */}
                                            <div className="flex justify-end items-center gap-1 text-white/70 text-[11px] md:text-[11px] lg:text-[13px]">
                                                {/*
                    Perubahan pada className div viewer (font size):
                    - Mobile: text-[11px]
                    - Tablet (md): md:text-[11px]
                    - Laptop (lg): lg:text-[13px] (dari md:text-[13px] asli)
                  */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/60 md:h-4 md:w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    {/*
                      Perubahan pada className svg viewer (size):
                      - Mobile: h-4 w-4
                      - Tablet (md): md:h-4 md:w-4
                      - Laptop (lg): lg:h-5 lg:w-5 (dari md:h-5 md:w-5 asli)
                    */}
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                <span>{item.viewr ?? 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedContent>
                        ))) : (
                        <AnimatedContent
                            key={1}
                            distance={150}
                            direction="vertical"
                            reverse={false}
                            config={{ tension: 45, friction: 15 }}
                            initialOpacity={0.2}
                            animateOpacity
                            scale={1.1}
                            threshold={0.2}
                        >
                            <p className='text-center text-slate-100'>Data Kosong</p>
                        </AnimatedContent>
                    )}
                    {/* End Box Infografis */}
                </div>

                {/* Pagination */}
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </section>

            <Langganan />
            <Footer />
        </>
    );
};

export default Infografis;
