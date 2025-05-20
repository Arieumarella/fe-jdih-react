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

            <section className='h-full bg-slate-100 md:px-[300px] px-5 py-4 '>

                <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4'>
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
                        <div className="box-border md:w-[50%] w-full mx-auto md:my-4 my-2 md:mb-[50px] mb-[20px]  rounded-lg md:h-[70px] h-[60px] bg-bluePu shadow-lg flex items-center px-4">
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


                <div className='items-center grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 mb-12'>

                    {/* Box Monografi */}
                    {posts?.length > 0 ? (
                        posts.map((item, index) => (
                            <AnimatedContent
                                key={item.peraturan_id}
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
                                    <div className="w-full h-full bg-slate-400 md:aspect-[3/4] aspect-[3/4] rounded-2xl overflow-hidden relative shadow-xl">

                                        {/* Gambar Background */}
                                        <div className={`w-full h-full bg-cover bg-center absolute group-hover:scale-110 transition-all duration-500`}
                                            style={{
                                                backgroundImage: `url("https://jdih.pu.go.id/internal/assets/assets/infografis/${item.gambar_1}")`,
                                            }}
                                        ></div>

                                        {/* Kotak Keterangan di Bagian Bawah */}
                                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-bluePu/90 to-bluePu/60 backdrop-blur-lg group-hover:bg-opacity-100 text-white font-medium md:text-[16px] text-[12px] p-4 px-6 font-roboto h-[100px] transition-all duration-500 flex flex-col justify-between">

                                            {/* Judul di kiri atas */}
                                            <div className="text-white line-clamp-2">
                                                {terminetTextLong(item.judul)}
                                            </div>

                                            {/* Viewer di kanan bawah */}
                                            <div className="flex justify-end items-center gap-1 text-white/70 text-[11px] md:text-[13px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    {/* End Box Monografi */}

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
