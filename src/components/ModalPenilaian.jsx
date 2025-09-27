import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rating } from "react-simple-star-rating";
import { toast } from "../components/ToastProvider";
import { postDataRating } from "../services/footer.services";


const Modal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ nama: "", email: "", saran: "", rating: 0 });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const captchaContainerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    window.__turnstile_cb_modalPenilaian = (token) => setCaptchaToken(token);

    return () => {
      try { delete window.__turnstile_cb_modalPenilaian; } catch (err) {}
    };
  }, []);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.turnstile && captchaContainerRef.current) {
      try {
        if (widgetIdRef.current !== null && typeof window.turnstile.reset === 'function') {
          window.turnstile.reset(widgetIdRef.current);
          setCaptchaToken(null);
        }
      } catch (err) {}

      try {
        widgetIdRef.current = window.turnstile.render(captchaContainerRef.current, {
          sitekey: import.meta.env.VITE_CAPTCHA_SITE_KEY,
          callback: (token) => setCaptchaToken(token),
        });
      } catch (err) {}
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (rate) => {
    setForm({ ...form, rating: rate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nama || !form.email || !form.saran || form.rating === 0) {
      toast.error("Harap lengkapi semua kolom terlebih dahulu.", { position: "bottom-right"})
      return;
    }

    if (!captchaToken) {
      toast.error("Silakan verifikasi captcha sebelum mengirim.", { position: 'bottom-right' });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      toast.error("Format email tidak valid.", { position: 'bottom-right' });
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form, captcha: captchaToken };
      const response = await postDataRating(payload);

      if (response.status !== 200) {
        toast.error("Data gagal disimpan.", { position: "bottom-right"})
      } else {
        toast.success("Data berhasil disimpan.", { position: "bottom-right" });
        setForm({ nama: "", email: "", saran: "", rating: 0 });
        try { if (window.turnstile?.reset) window.turnstile.reset(widgetIdRef.current); } catch (err) {}
        setCaptchaToken(null);
      }
      
      onClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Terjadi kesalahan, silakan coba lagi.", { position: "bottom-right"})
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-white rounded-xl shadow-xl ring-1 ring-slate-200 overflow-hidden"
          >
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold font-roboto text-bluePu">Form Penilaian</h2>
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <span className="sr-only">Tutup</span>
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Penilaian</label>
                  <Rating 
                    size={36} 
                    fillColor="#FFA500"
                    className="block" 
                    onClick={handleRating}
                    initialValue={form.rating}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-bluePu/30 focus:border-bluePu transition-shadow"
                      placeholder="Masukkan nama anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-bluePu/30 focus:border-bluePu transition-shadow"
                      placeholder="email anda."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Saran / Komentar</label>
                  <textarea
                    name="saran"
                    value={form.saran}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-bluePu/30 focus:border-bluePu transition-shadow resize-none"
                    placeholder="Tuliskan saran atau komentar anda"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Verifikasi</label>
                  <div 
                    ref={captchaContainerRef}
                    className="cf-turnstile"
                    data-sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                    data-callback="__turnstile_cb_modalPenilaian"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-bluePu/30 disabled:opacity-50 transition-colors"
                    onClick={onClose}
                  >
                    Tutup
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      px-4 py-2 text-sm font-medium text-white rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-bluePu/30 
                      transition-all duration-200
                      ${loading 
                        ? 'bg-bluePu/60 cursor-not-allowed' 
                        : 'bg-bluePu hover:bg-indigo-600 active:bg-indigo-700 hover:shadow-md'
                      }
                    `}
                  >
                    {loading ? 'Mengirim...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    
  );
};

export default Modal;
