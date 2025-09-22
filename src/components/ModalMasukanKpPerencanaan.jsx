
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import axios from "axios";
import Turnstile from 'react-turnstile';
import { toast } from "../components/ToastProvider";
import { insertMasukanKpPerencanaan } from "../services/kpPerencnaan.services";

const Illustration = ({ className = '' }) => (
    <div className={`relative inline-flex items-center justify-center ${className}`} aria-hidden="true">
        {/* decorative outer ring */}
        <span className="absolute inset-0 flex items-center justify-center">
            <span className="block rounded-full" style={{ width: 96, height: 96, boxShadow: '0 6px 24px rgba(59,130,246,0.08)', background: 'linear-gradient(180deg, rgba(99,102,241,0.06), rgba(59,130,246,0.02))', border: '1px solid rgba(99,102,241,0.08)' }} />
        </span>

        {/* main circular icon */}
        <span className="relative inline-flex items-center justify-center rounded-full" style={{ width: 72, height: 72, background: 'linear-gradient(135deg,#ebf4ff,#e0f2fe)', boxShadow: '0 8px 28px rgba(59,130,246,0.10)' }}>
            <svg className="w-10 h-10 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M5.5 21h13M12 21V7m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2-1.8c3.073.661 2.467 2.8 5 2.8M5 8c3.359 0 2.192-2.115 5.012-2.793M7 9.556V7.75m0 1.806-1.95 4.393a.773.773 0 0 0 .37.962.785.785 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.776.776 0 0 0 .09-.716L7 9.556Zm10 0V7.313m0 2.243-1.95 4.393a.773.773 0 0 0 .37.962.786.786 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.775.775 0 0 0 .09-.716L17 9.556Z" />
            </svg>
        </span>
    </div>
);

const ModalMasukanKpPerencanaan = ({ isOpen, onClose, data }) => {
    const [captchaToken, setCaptchaToken] = useState(null);
    const BACKEND_FILE_URL = import.meta.env.VITE_BACKEND_FILE_URL;

        console.log("ModalMasukanKpPerencanaan data:", data);

        const dummyData = {
            judul: 'Rancangan Peraturan Daerah Tentang Pengelolaan Sampah',
            tahun_anggaran: '2025',
            path_konsepsi: 'https://example.com/konsepsi.pdf',
            ringkasan: 'Peraturan ini bertujuan mengatur pengelolaan sampah terpadu untuk meningkatkan kebersihan dan kesehatan masyarakat.'
        };


    const [form, setForm] = useState({ nama: '', email: '', asal: '', masukan: '', id: '', captcha: '' });
    useEffect(() => {
        setForm(f => ({ ...f, id: data?.id || '' }));
    }, [data]);

    const handleDownloadKonsepsi = async () => {
        const fileUrl =
            (data &&
            BACKEND_FILE_URL.replace(/\/$/, "") + "/" + data.path_konsepsi) ||
            dummyData.path_konsepsi;

        try {
            const response = await axios.get(fileUrl, {
            responseType: "blob", // ambil file sebagai blob
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `konsepsi pengaturan ${data?.judul || dummyData.judul}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Gagal download file:", error);
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaToken || !form.captcha) {
            toast.error('Harap Cheklist Captcha Terlebih Dahulu.');
            return;
        }
        try {
            const payload = {
                nama: form.nama,
                email: form.email,
                asal: form.asal,
                masukan: form.masukan,
                id: form.id,
                captcha: form.captcha
            };
            await insertMasukanKpPerencanaan(payload);
            toast.success('Terima kasih, masukan Anda sudah dikirim.');
            if (onClose) onClose();
            setForm({ nama: '', email: '', asal: '', masukan: '', id: '', captcha: '' });
            setCaptchaToken(null);
        } catch (err) {
            
            let msg = 'Gagal mengirim masukan. Silakan coba lagi.';
            if (err?.response?.data?.message) {
                msg = err.response.data.message;
            } else if (err?.message) {
                msg = err.message;
            }
            toast.error(msg);
        }
    };
        return (
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50 overflow-x-hidden">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg shadow-2xl w-full max-w-3xl md:max-w-4xl p-0 grid grid-cols-1 lg:grid-cols-2"
                        >
                            <div className="p-6 md:p-10">
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">Kirim Masukan</h4>
                                <p className="text-sm text-gray-500 mb-6">Isi form berikut untuk mengirim masukan terkait konsultasi publik ini.</p>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-700 block mb-1">Nama</label>
                                        <input name="nama" value={form.nama} onChange={handleChange} required className="w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                                        <input type="hidden" name="id" value={form.id} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-700 block mb-1">Email</label>
                                            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-700 block mb-1">Asal/Domisili/Instansi</label>
                                            <input name="asal" value={form.asal} onChange={handleChange} required className="w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-700 block mb-1">Masukan</label>
                                        <textarea name="masukan" value={form.masukan} onChange={handleChange} rows={4} required className="w-full border border-gray-200 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                                    </div>
                                 
                                    <div className="flex flex-col gap-2 pt-2">
                                        <div className="flex flex-col gap-0.5 w-full max-w-xs mx-auto">
                                            <label className="text-xs font-semibold text-bluePu mb-0.5">Verifikasi</label>
                                            <div className={`w-full overflow-x-auto`}>
                                                <Turnstile
                                                    sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                                                    onSuccess={token => {
                                                        setCaptchaToken(token);
                                                        setForm(f => ({ ...f, captcha: token }));
                                                    }}
                                                    onExpire={() => {
                                                        setCaptchaToken(null);
                                                        setForm(f => ({ ...f, captcha: '' }));
                                                    }}
                                                    options={{ theme: 'light' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={onClose}>
                                            Tutup
                                        </button>
                                        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700 transition">
                                            Kirim Masukan
                                        </button>
                                    </div>
                                    </div>
                                </form>
                            </div>
                            <div className="bg-gradient-to-tr from-indigo-50 to-blue-50 p-8 flex flex-col justify-center items-center gap-6">
                                <div className="w-16 h-16 flex items-center justify-center">
                                    <Illustration />
                                </div>
                                <div className="text-center px-6">
                                    <h5 className="text-lg font-bold text-gray-900">Dokumen Konsepsi</h5>
                                    <p className="text-sm text-gray-600 mt-2">Anda dapat mengunduh dokumen konsepsi pengaturan terkait untuk melihat detail lebih lanjut sebelum mengirim masukan.</p>
                                </div>
                                <div>
                                    <button onClick={handleDownloadKonsepsi} className="inline-flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-lg shadow-sm hover:bg-gray-50">Unduh Konsepsi</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        );
};

export default ModalMasukanKpPerencanaan;