import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import Turnstile from 'react-turnstile';
import { toast } from "../components/ToastProvider";
import { insertDataTambahanusulanJudul } from "../services/kpPerencnaan.services.js";

const ModalMasukanJudul = ({ isOpen, onClose, onSubmit }) => {
    const [captchaToken, setCaptchaToken] = useState(null);
    const [form, setForm] = useState({
        nama: '',
        asal: '',
        email: '',
        judul: '',
        substansi: '',
        captcha: ''
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validasi semua field harus diisi
        if (
            !form.nama.trim() ||
            !form.asal.trim() ||
            !form.email.trim() ||
            !form.judul.trim() ||
            !form.substansi.trim() ||
            !captchaToken ||
            !form.captcha
        ) {
            toast.error('Semua inputan wajib diisi dan captcha harus dicentang.');
            return;
        }
        try {
            const res = await insertDataTambahanusulanJudul(form);
            // Tampilkan pesan dari backend jika ada
            if (res && res.message) {
                toast.success(res.message);
            } else {
                toast.success('Berhasil mengirim data.');
            }
            if (onClose) onClose();
            setForm({ nama: '', asal: '', email: '', judul: '', substansi: '', captcha: '' });
            setCaptchaToken(null);
        } catch (err) {
            // Tampilkan pesan error dari backend jika ada
            const msg = err?.response?.data?.message || err?.message || 'Terjadi kesalahan server.';
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
                        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-blue-100 p-6 md:p-10 mx-auto"
                    >
                        <h4 className="text-3xl font-extrabold text-bluePu mb-2 text-center tracking-tight">Masukan Judul Baru</h4>
                        <p className="text-base text-gray-500 mb-8 text-center">Isi form berikut untuk mengusulkan judul baru konsultasi publik.</p>
                                                <form onSubmit={handleSubmit} className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-bluePu font-semibold mb-1">Nama</label>
                                                            <input name="nama" value={form.nama} onChange={handleChange} required className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50/40 placeholder-gray-400 transition" placeholder="Nama lengkap" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-bluePu font-semibold mb-1">Asal/Domisili/Instansi</label>
                                                            <input name="asal" value={form.asal} onChange={handleChange} required className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50/40 placeholder-gray-400 transition" placeholder="Asal/Domisili/Instansi" />
                                                        </div>
                                                    </div>
                                                    
                                                        <div>
                                                            <label className="block text-bluePu font-semibold mb-1">Email</label>
                                                            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50/40 placeholder-gray-400 transition" placeholder="Alamat email aktif" />
                                                        </div>
                                                    
                                                    <div>
                                                        <label className="block text-bluePu font-semibold mb-1">Judul Masukan</label>
                                                        <input name="judul" value={form.judul} onChange={handleChange} required className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50/40 placeholder-gray-400 transition" placeholder="Judul usulan" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-bluePu font-semibold mb-1">Substansi</label>
                                                        <textarea name="substansi" value={form.substansi} onChange={handleChange} rows={6} required className="w-full border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50/40 placeholder-gray-400 transition" placeholder="Tuliskan substansi atau alasan pengusulan judul secara singkat dan jelas..." />
                                                    </div>
                                                    <div className="flex flex-col gap-2 pt-2">
                                                        <div className="flex flex-col gap-0.5 w-full max-w-xs mx-auto">
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
                                                        <div className="flex justify-end gap-2 mt-4">
                                                            <button type="button" className="bg-gray-300 text-bluePu px-5 py-2 rounded-lg font-semibold hover:bg-gray-400 transition" onClick={onClose}>
                                                                Tutup
                                                            </button>
                                                            <button type="submit" className="bg-gradient-to-r from-bluePu to-blue-600 text-white px-7 py-2 rounded-lg font-bold shadow-md hover:opacity-90 transition-all">
                                                                Kirim Masukan
                                                            </button>
                                                        </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ModalMasukanJudul;
