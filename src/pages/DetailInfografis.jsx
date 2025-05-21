import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { getInfografisDetail, insertViewr } from '../services/infografis.services';
import SplitText from "../components/react-bits/SplitText/SplitText";
import FadeContent from '../components/react-bits/FadeContent/FadeContent'

const DetailInfografis = () => {

    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {

        // Get Jenis Peraturan
        getInfografisDetail(id).then((result) => {
            setData(result);
        });

        // insert viewr
        insertViewr(id)

    }, [id]);

    console.log(data);

    const formatDate = (dateString = null) => {
        if (dateString == null) {
            return '-'
        }

        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6) - 1; // JS bulan mulai dari 0
        const day = dateString.substring(6, 8);

        const date = new Date(year, month, day);
        return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
    };


    return (
        <>
            <Headers />

            <section className="h-full bg-slate-100 py-4">


                <div className='md:flex justify-between md:w-[80%] w-full gap-4 mx-auto my-4'>
                    <div className="md:w-[80%] w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">

                        <div className='font-roboto font-semibold text-sm text-gray-600'>
                            <SplitText
                                text={formatDate(data?.data?.tgl_buat)}
                                delay={100}
                                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                easing="easeOutCubic"
                                threshold={0.2}
                            />
                        </div>


                        {/* Judul Berita */}
                        <h1 className="md:text-[23px] text-[23px] font-bold font-roboto text-blue-900 mt-3 text-center">
                            <SplitText
                                text={data?.data?.judul}
                                delay={10}
                                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                easing="easeOutCubic"
                                threshold={0.2}
                            />
                        </h1>

                        {/* Gambar Berita */}
                        <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0}>
                            <div className="w-full h-full overflow-hidden rounded-lg mt-4">
                                <img
                                    src={`https://jdih.pu.go.id/internal/assets/assets/infografis/${data?.data?.gambar_1}`}
                                    alt="Gambar infografis"
                                    className="w-full h-full object-fill"
                                />
                            </div>
                        </FadeContent>

                        {/* Deskripsi Berita */}
                        <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0}>
                            <p
                                className="text-gray-600 text-sm md:text-base mt-4 text-justify leading-relaxed font-roboto"
                                dangerouslySetInnerHTML={{ __html: data?.data?.isi || "" }}
                            />
                        </FadeContent>

                        {/* Tombol Kembali */}
                        <div className="mt-6">
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2 bg-bluePu text-kuningButton hover:bg-opacity-80 font-bold py-2 px-2
                     rounded-md shadow-md transition-all duration-300 text-[14px]">
                                <i className="fa-solid fa-arrow-left"></i> Kembali
                            </button>
                        </div>

                        <div className='flex justify-between border-t pt-2 mt-2'>

                            <div className='flex-col'>
                                <p className='font-bold font-roboto text-slate-600'>Share :</p>
                                <div className="flex gap-3 mt-2">
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

                            <div className="flex gap-4 mt-2 px-2">
                                <div className="flex items-center gap-1 font-roboto font-medium text-bluePu">
                                    <span className="material-symbols-outlined text-lg text-bluePu">visibility</span>
                                    <p className="text-sm">{data?.data?.viewr}</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </section>


            <Langganan />
            <Footer />
        </>
    );
};

export default DetailInfografis;
