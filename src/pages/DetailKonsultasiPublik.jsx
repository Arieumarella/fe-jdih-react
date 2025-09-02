import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Viewer, Worker, SpecialZoomLevel  } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Headers from '../components/Header';
import Footer from '../components/Footer';
import Langganan from '../components/Langganan';
import SplitText from "../components/react-bits/SplitText/SplitText";
import FadeContent from '../components/react-bits/FadeContent/FadeContent';
import { useTranslation } from 'react-i18next';
import { getDetailKp, addViewsKP } from '../services/Kp.services';

const DetailKonsultasiPublik = () => {
    // Plugin untuk react-pdf-viewer (harus satu instance per viewer)
    const defaultLayoutPluginDraft = defaultLayoutPlugin({scale:50});
    const defaultLayoutPluginKonsep = defaultLayoutPlugin();
    const defaultLayoutPluginNotulensi = defaultLayoutPlugin();

    const { slug } = useParams();
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    // Tambahkan state untuk preview gambar
    const [previewImg, setPreviewImg] = useState(null);

    // Hapus zoom PDF viewer di localStorage agar selalu pakai initialZoom
    useEffect(() => {
        localStorage.removeItem('rpv-core__zoom');
    }, []);

    // Dummy fetch, ganti dengan fetch asli
    useEffect(() => {
        
        getDetailKp(slug).then((result) => {
            setData({
                judul: result?.data?.judul,
                narasi: result?.data?.keterangan,
                tipe: result?.data?.status == 'Luring' ? 'offline' : 'online',
                draftPdf: '/b.pdf',
                konsepPdf: '/b.pdf',
                notulensiPdf: '/b.pdf',
                dokumentasi: [
                    'https://jdih.pu.go.id/Logogram.png',
                    'https://jdih.pu.go.id/Logo%20-%20pu.svg',
                ],
            });
        });

          addViewsKP(slug);

    }, [slug]);

    console.log("Detail Konsultasi Publik Data:", data);

    return (
        <>
            {/* Modal Preview Gambar */}
            {previewImg && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                    onClick={() => setPreviewImg(null)}
                >
                    <img
                        src={previewImg}
                        alt="Preview Dokumentasi"
                        className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white"
                        onClick={e => e.stopPropagation()}
                    />
                    <button
                        className="absolute top-4 right-4 text-white text-3xl font-bold"
                        onClick={() => setPreviewImg(null)}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
            )}
            <Headers />
            <section className="h-full bg-slate-100 py-6 min-h-screen mt-4">
                <div className="w-[85%] mx-auto px-2 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
                        {/* Kiri: Konten utama */}
                        
                        <div className={`w-full min-w-0 ${data?.tipe === 'online' ? `lg:w-[75%] lg:basis-[75%]` : 'lg:w-[100%] lg:basis-[100%]'} bg-white shadow-xl rounded-xl p-4 md:p-12 border border-gray-200 relative`}>
                            {/* Badge status daring/luring */}
                            
                            <div className="absolute right-6 top-6 z-10">
                                <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0}>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md border ${data?.tipe === 'offline' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                                    {data?.tipe === 'offline' ? 'Luring' : 'Daring'}
                                </span>
                                </FadeContent>
                            </div>
                            <h1 className="text-center font-roboto font-extrabold text-bluePu text-[25px] mb-8 md:text-[32px] lg:text-[40px] tracking-tight">
                                
                            <SplitText
                                text={data?.judul}
                                delay={10}
                                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                easing="easeOutCubic"
                                threshold={0.2}
                            />

                            </h1>
                            {/* Deskripsi Berita */}
                            <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0}>
                                <p
                                    className="text-gray-600 text-sm md:text-base my-4 text-justify leading-relaxed font-roboto"
                                    dangerouslySetInnerHTML={{ __html: data?.narasi || "" }}
                                />
                            </FadeContent>

                            {/* Section Preview Draft PDF (online) */}
                            {data?.tipe === 'online' && data?.draftPdf && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-bluePu mb-2 leading-relaxed font-roboto">
                                        <SplitText
                                            text={`Draft Peraturan`}
                                            delay={10}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                        />
                                    </h2>
                                    <div className="w-full h-[80vh] border rounded-lg overflow-auto">
                                        <Worker workerUrl="/pdf.worker.min.js">
                                            <Viewer key={slug + '-draft'} fileUrl={data?.draftPdf} plugins={[defaultLayoutPluginDraft]} defaultScale={SpecialZoomLevel.PageFit} />
                                        </Worker>
                                    </div>
                                </div>
                            )}

                            {/* Section: Preview Konsepsi Pengaturan */}
                            {data?.konsepPdf && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-bluePu mb-2 leading-relaxed font-roboto">
                                        <SplitText
                                            text={`Konsepsi Pengaturan`}
                                            delay={10}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                        />
                                    </h2>
                                    <div className="w-full h-[80vh] border rounded-lg overflow-auto">
                                        <Worker workerUrl="/pdf.worker.min.js">
                                            <Viewer key={slug + '-konsep'} fileUrl={data?.konsepPdf} plugins={[defaultLayoutPluginKonsep]} defaultScale={SpecialZoomLevel.PageFit} />
                                        </Worker>
                                    </div>
                                </div>
                            )}

                            {/* Section: Notulensi (online) */}
                            {data?.tipe === 'offline' && data?.notulensiPdf && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold text-bluePu mb-2 leading-relaxed font-roboto">
                                        <SplitText
                                            text={`Notulensi`}
                                            delay={10}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                        />
                                    </h2>
                                    <div className="w-full h-[80vh] border rounded-lg overflow-auto">
                                        <Worker workerUrl="/pdf.worker.min.js"> 
                                            <Viewer key={slug + '-notulensi'} fileUrl={data?.notulensiPdf} plugins={[defaultLayoutPluginNotulensi]} defaultScale={SpecialZoomLevel.PageFit} />
                                        </Worker>
                                    </div>
                                </div>
                            )}
                            {/* Section: Dokumentasi (online) */}
                            {data?.tipe === 'offline' && data.dokumentasi && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold text-bluePu mb-2 leading-relaxed font-roboto">
                                        <SplitText
                                            text={`Dokumentasi`}
                                            delay={10}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                        />
                                    </h2>
                                    <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0}>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {data?.dokumentasi.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt="Dokumentasi"
                                                    className="w-full h-28 sm:h-32 md:h-36 object-cover rounded shadow cursor-pointer transition-transform hover:scale-105"
                                                    onClick={() => setPreviewImg(img)}
                                                />
                                            ))}
                                        </div>
                                    </FadeContent>
                                </div>
                            )}
                        </div>
                        {/* Kanan: Form Masukan */}
                        {data?.tipe === 'online' && (
                            <div className="w-full min-w-0 lg:w-[25%] lg:basis-[25%] mb-8 lg:mb-0">
                                <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-lg flex flex-col gap-4">
                                    <h2 className="text-lg font-bold text-bluePu mb-4 leading-relaxed font-roboto text-center">Form 
                                        <SplitText
                                            text={`Masukan Konsultasi Publik`}
                                            delay={10}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                        />
                                    </h2>
                                    <form className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-0.5">
                                            <label className="text-xs font-semibold text-bluePu mb-0.5">Nama</label>
                                            <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-bluePu outline-none transition placeholder:text-slate-400 text-sm" placeholder="Nama Anda" required />
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <label className="text-xs font-semibold text-bluePu mb-0.5">Email</label>
                                            <input type="email" className="w-full border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-bluePu outline-none transition placeholder:text-slate-400 text-sm" placeholder="Email Anda" required />
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <label className="text-xs font-semibold text-bluePu mb-0.5">Masukan</label>
                                            <textarea className="w-full border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-bluePu outline-none transition placeholder:text-slate-400 resize-none text-sm" placeholder="Tulis masukan Anda di sini..." rows={3} required></textarea>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <label className="text-xs font-semibold text-bluePu mb-0.5">Upload File (PDF)</label>
                                            <input type="file" accept="application/pdf" className="w-full border border-slate-300 rounded-md px-3 py-1.5 bg-white file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-bluePu file:text-kuningButton file:font-semibold transition text-xs" />
                                        </div>
                                        <div className="flex justify-between items-center mt-2 gap-2">
                                            <a
                                                href="/format-masukan.pdf" // ganti dengan path file format yang benar
                                                download
                                                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-100 to-blue-300 text-blue-900 px-4 py-1.5 rounded-lg font-semibold border border-blue-400 shadow hover:from-blue-200 hover:to-blue-400 hover:text-blue-800 transition-all duration-200 text-xs"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 12l-4-4m4 4l4-4m-8 8h12" />
                                                </svg>
                                                Download Format
                                            </a>
                                            <button type="submit" className="bg-bluePu text-kuningButton px-6 py-1.5 rounded-lg hover:bg-blue-700 font-semibold shadow transition-all duration-200 text-xs">Kirim</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Langganan />
            <Footer />
        </>
    );
};



export default DetailKonsultasiPublik;
