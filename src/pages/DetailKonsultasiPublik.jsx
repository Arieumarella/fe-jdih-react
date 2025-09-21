import { React, useEffect, useState, useRef, useMemo } from 'react';
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
import { toast } from "../components/ToastProvider";
import { useTranslation } from 'react-i18next';
import { getDetailKp, addViewsKP, submitKonsultasiPublik } from '../services/Kp.services';
import Turnstile from 'react-turnstile';


// Ambil backend url dari env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_FILE_URL = import.meta.env.VITE_BACKEND_FILE_URL;

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
    const [captchaToken, setCaptchaToken] = useState(null);
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [masukan, setMasukan] = useState("");
    const [file, setFile] = useState(null);
    // Tambah state asal
    const [asal, setAsal] = useState("");
    const turnstileRef = useRef(null);

    // Tambah: cek apakah periode daring sudah berakhir (pakai end-of-day)
    const isPeriodOver = useMemo(() => {
        if (data?.tipe !== 'online') return false;
        if (!data?.tanggalSelesai) return false;
        const end = new Date(data.tanggalSelesai);
        if (isNaN(end)) return false;
        end.setHours(23, 59, 59, 999);
        return new Date() > end;
    }, [data?.tipe, data?.tanggalSelesai]);

    // Hapus zoom PDF viewer di localStorage agar selalu pakai initialZoom
    useEffect(() => {
        localStorage.removeItem('rpv-core__zoom');
    }, []);

    // Dummy fetch, ganti dengan fetch asli
    useEffect(() => {
        
        getDetailKp(slug).then((result) => {
            // Ambil gambar_1..gambar_5, filter yang tidak null/kosong
            console.log("Detail Konsultasi Publik Result:", result);
            const gambarKeys = ['gambar_1', 'gambar_2', 'gambar_3', 'gambar_4', 'gambar_5'];
            const dokumentasi = gambarKeys
                .map(key => result?.data?.[key])
                .filter(Boolean)
                .map(gambar => {
                    // Jika sudah absolute url, pakai langsung. Jika relatif, prefix dengan backend url
                    if (!gambar) return null;
                    if (/^https?:\/\//i.test(gambar)) return gambar;
                    return BACKEND_URL.replace(/\/$/, '') + '/' + gambar.replace(/^\/?/, '');
                });

            setData({
                judul: result?.data?.judul_rancangan_peraturan,
                narasi: result?.data?.keterangan,
                tipe: result?.data?.status == 'Luring' ? 'offline' : 'online',
                // Metadata fields
                pemrakarsa: result?.data?.pemrakarsa || result?.data?.deptcode || 'Tidak Tersedia',
                jenisPerencanaan: result?.data?.jenis_perencanaan,
                tempatPelaksanaan: result?.data?.Tempat_pelaksanaan,
                tglPenyusunan: result?.data?.tgl_pelaksanaan_penyusunan,
                tanggalPelaksanaan: result?.data?.tanggal_pelaksanaan,
                tanggalSelesai: result?.data?.tanggal_selesai_kp,
                // File paths dengan pengecekan null/kosong
                draftPdf: result?.data?.file_draft ? BACKEND_FILE_URL.replace(/\/$/, '') + '/' + result?.data?.file_draft : null,
                konsepPdf: result?.data?.file_konsepsi_pengaturan ? BACKEND_FILE_URL.replace(/\/$/, '') + '/' + result?.data?.file_konsepsi_pengaturan : null,
                notulensiPdf: result?.data?.file_notulensi ? BACKEND_FILE_URL.replace(/\/$/, '') + '/' + result?.data?.file_notulensi : null,
                andakPdf: result?.data?.file_andak ? BACKEND_FILE_URL.replace(/\/$/, '') + '/' + result?.data?.file_andak : null,
                dokumentasi,
            });
        });

          addViewsKP(slug);

    }, [slug]);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            // Tambah: guard jika periode sudah berakhir
            if (isPeriodOver) {
                toast.error("Konsultasi Publik telah selesai dilaksanakan.", { position: "bottom-right" });
                return;
            }
            if (!captchaToken) {
                toast.error("Harap Cheklist Captcha Terlebih Dahulu.", { position: "bottom-right" });
                return;
            }
            // Data yang akan dikirim ke service
            const formData = new FormData();
            formData.append('slug', slug);
            formData.append('nama', nama);
            formData.append('asal', asal);
            formData.append('email', email);
            formData.append('masukan', masukan);
            if (file) formData.append('file', file);
            formData.append('captchaToken', captchaToken);
            
            const result = await submitKonsultasiPublik(formData);
            console.log("Submit Konsultasi Publik Result:", result);
            
            // Reset form jika berhasil
            setNama("");
            setEmail("");
            setMasukan("");
            setFile(null);
            setAsal("");
            toast.success("Data berhasil disimpan.", { position: "bottom-right" });
            
        } catch (error) {
            console.error("Submit error:", error);
            // Handle different types of errors
            if (error.response) {
                // Server responded with error status
                toast.error(error.response.data?.message || "Terjadi kesalahan pada server", { position: "bottom-right" });
            } else if (error.request) {
                // Network error
                toast.error("Koneksi bermasalah. Periksa jaringan internet Anda.", { position: "bottom-right" });
            } else {
                // Other error
                toast.error("Terjadi kesalahan yang tidak diketahui", { position: "bottom-right" });
            }
        } finally {
            // Selalu refresh captcha setiap submit
            setCaptchaToken(null);
            turnstileRef.current?.reload();
        }
    };

    const ubahFormatTanggal = (tanggalString) => {
        if (!tanggalString) return '-';
        const date = new Date(tanggalString);
        const options = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' };
        return date.toLocaleDateString('id-ID', options);
    };

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
                            
                            {/* Metadata Section */}
                            <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0}>
                                <div className="bg-white rounded-xl p-8 mb-8 border border-gray-200 shadow-sm">
                                    <div className="border-l-4 border-bluePu pl-6 mb-6">
                                        <h3 className="text-lg font-bold text-bluePu font-roboto mb-2">Informasi Konsultasi Publik</h3>
                                        <p className="text-gray-500 text-sm font-roboto">Detail informasi mengenai rancangan peraturan</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-5">
                                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-bluePu">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 bg-bluePu rounded-full flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-white text-sm">person</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-bluePu uppercase tracking-wide font-roboto">Pemrakarsa</span>
                                                </div>
                                                <p className="text-gray-800 font-semibold font-roboto ml-11">{data?.pemrakarsa || '-'}</p>
                                            </div>
                                            
                                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border-l-4 border-purple-500">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-white text-sm">category</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-purple-700 uppercase tracking-wide font-roboto">Jenis Perencanaan</span>
                                                </div>
                                                <p className="text-gray-800 font-semibold font-roboto ml-11">{data?.jenisPerencanaan || '-'}</p>
                                            </div>
                                            
                                            {data?.tipe === 'offline' && data?.tempatPelaksanaan && (
                                                <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border-l-4 border-amber-500">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-white text-sm">location_on</span>
                                                        </div>
                                                        <span className="text-sm font-bold text-amber-700 uppercase tracking-wide font-roboto">Tempat Pelaksanaan</span>
                                                    </div>
                                                    <p className="text-gray-800 font-semibold font-roboto ml-11">{data?.tempatPelaksanaan}</p>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="space-y-5">
                                            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-4 border-l-4 border-emerald-500">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-white text-sm">edit_calendar</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-emerald-700 uppercase tracking-wide font-roboto">Tanggal Perencanaan</span>
                                                </div>
                                                <p className="text-gray-800 font-semibold font-roboto ml-11">{ubahFormatTanggal(data?.tglPenyusunan)}</p>
                                            </div>
                                            
                                            {data?.tanggalPelaksanaan && (
                                                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4 border-l-4 border-indigo-500">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-white text-sm">event</span>
                                                        </div>
                                                        <span className="text-sm font-bold text-indigo-700 uppercase tracking-wide font-roboto">
                                                            {data?.tipe === 'online' ? 'Periode Pelaksanaan' : 'Tanggal Pelaksanaan'}
                                                        </span>
                                                    </div>
                                                    <div className="ml-11">
                                                        {data?.tipe === 'online' && data?.tanggalSelesai ? (
                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                                                    <span className="text-sm text-gray-600 font-roboto">Mulai:</span>
                                                                    <span className="text-gray-800 font-semibold font-roboto">{ubahFormatTanggal(data?.tanggalPelaksanaan)}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                                                    <span className="text-sm text-gray-600 font-roboto">Selesai:</span>
                                                                    <span className="text-gray-800 font-semibold font-roboto">{ubahFormatTanggal(data?.tanggalSelesai)}</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-800 font-semibold font-roboto">{ubahFormatTanggal(data?.tanggalPelaksanaan)}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </FadeContent>

                            {/* Deskripsi Berita */}
                            <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0}>
                                <p
                                    className="text-gray-600 text-sm md:text-base my-4 text-justify leading-relaxed font-roboto"
                                    dangerouslySetInnerHTML={{ __html: data?.narasi || "" }}
                                />
                            </FadeContent>

                            {/* Section Preview Draft PDF (daring) */}
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

                            {/* Section: Notulensi */}
                            {data?.notulensiPdf && (
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

                            {/* Section: File Andak */}
                            {data?.andakPdf && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold text-bluePu mb-2 leading-relaxed font-roboto">
                                        <SplitText
                                            text={`File Andak`}
                                            delay={10}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                        />
                                    </h2>
                                    <div className="w-full h-[80vh] border rounded-lg overflow-auto">
                                        <Worker workerUrl="/pdf.worker.min.js"> 
                                            <Viewer key={slug + '-andak'} fileUrl={data?.andakPdf} plugins={[defaultLayoutPluginNotulensi]} defaultScale={SpecialZoomLevel.PageFit} />
                                        </Worker>
                                    </div>
                                </div>
                            )}

                            {/* Section: Dokumentasi (luring) */}
                            {data?.tipe === 'offline' && data.dokumentasi && data.dokumentasi.length > 0 && (
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

                                    {/* Tambah: Informasi jika sudah selesai */}
                                    {isPeriodOver && (
                                        <div className="p-3 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 text-sm font-roboto text-center">
                                            Konsultasi Publik telah selesai dilaksanakan.
                                        </div>
                                    )}

                                    <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
                                        <div className="flex flex-col gap-0.5">
                                            <label className="text-xs font-semibold text-bluePu mb-0.5">Nama</label>
                                            <input
                                                type="text"
                                                value={nama}
                                                onChange={e => setNama(e.target.value)}
                                                disabled={isPeriodOver}
                                                className="w-full border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-bluePu outline-none transition placeholder:text-slate-400 text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                                                placeholder="Nama Anda"
                                                required
                                            />
                                        </div>

                                        {/* Tambah: Input Asal di bawah Nama */}
                                        <div className="flex flex-col gap-0.5">
                                            <label className="text-xs font-semibold text-bluePu mb-0.5">Asal</label>
                                            <input
                                                type="text"
                                                value={asal}
                                                onChange={e => setAsal(e.target.value)}
                                                disabled={isPeriodOver}
                                                className="w-full border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-bluePu outline-none transition placeholder:text-slate-400 text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                                                placeholder="Asal (Instansi/Daerah)"
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col gap-0.5">
                                            <label className="text-xs font-semibold text-bluePu mb-0.5">Email</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                disabled={isPeriodOver}
                                                className="w-full border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-bluePu outline-none transition placeholder:text-slate-400 text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                                                placeholder="Email Anda"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <label className="text-xs font-semibold text-bluePu mb-0.5">Masukan</label>
                                            <textarea
                                                value={masukan}
                                                onChange={e => setMasukan(e.target.value)}
                                                disabled={isPeriodOver}
                                                className="w-full border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-bluePu outline-none transition placeholder:text-slate-400 resize-none text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                                                placeholder="Tulis masukan Anda di sini..."
                                                rows={3}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <label className="text-xs font-semibold text-bluePu mb-0.5">Upload File (PDF)</label>
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                onChange={e => setFile(e.target.files[0])}
                                                disabled={isPeriodOver}
                                                className="w-full border border-slate-300 rounded-md px-3 py-1.5 bg-white file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-bluePu file:text-kuningButton file:font-semibold transition text-xs disabled:bg-slate-100 disabled:cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-0.5 w-full max-w-xs mx-auto">
                                            <label className="text-xs font-semibold text-bluePu mb-0.5">Verifikasi</label>
                                            <div className={`w-full overflow-x-auto ${isPeriodOver ? 'pointer-events-none opacity-60' : ''}`}>
                                                <Turnstile
                                                    ref={turnstileRef}
                                                    sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                                                    onSuccess={token => setCaptchaToken(token)}
                                                    onExpire={() => setCaptchaToken(null)}
                                                    options={{ theme: 'light' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2 gap-2">
                                            <a
                                                href="/format-masukan.pdf"
                                                download
                                                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-100 to-blue-300 text-blue-900 px-4 py-1.5 rounded-lg font-semibold border border-blue-400 shadow hover:from-blue-200 hover:to-blue-400 hover:text-blue-800 transition-all duration-200 text-xs"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 12l-4-4m4 4l4-4m-8 8h12" />
                                                </svg>
                                                Download Format
                                            </a>
                                            <button
                                                type="submit"
                                                disabled={isPeriodOver}
                                                className="bg-bluePu text-kuningButton px-6 py-1.5 rounded-lg hover:bg-blue-700 font-semibold shadow transition-all duration-200 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Kirim
                                            </button>
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

