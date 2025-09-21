import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rating } from "react-simple-star-rating";
import { toast } from "../components/ToastProvider";
import { postDataRating } from "../services/footer.services";


const Modal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ nama: "", email: "", saran: "", rating: 0 });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (rate) => {
    setForm({ ...form, rating: rate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input sederhana
    if (!form.nama || !form.email || !form.saran || form.rating === 0) {
      toast.error("Harap lengkapi semua kolom Terlebih Dahulu.", { position: "bottom-right"})
      return;
    }

    try {
      const response = await postDataRating(form);
      if (response.status !== 200) {
        toast.error("Data gagal disimpan.", { position: "bottom-right"})
      }else{
        toast.success("Data berhasil disimpan.", { position: "bottom-right" });
        setForm({ nama: "", email: "", saran: "", rating: 0 });
      }
      
      onClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Terjadi kesalahan, silakan coba lagi.", { position: "bottom-right"})
    }
  };

  return (
    
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg md:w-[40%] w-[85%]"
          >
            <h2 className="text-xl font-semibold font-roboto text-bluePu">Form Penilaian</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mt-4 w-full h-full">
                <label className="block text-bluePu font-roboto font-medium">Penilaian</label>
                <Rating size={40} fillColor="#FFE54E" className="block" onClick={handleRating} />
              </div>
              
              <div className="mt-4 w-full">
                <label className="block text-bluePu font-roboto font-medium">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-bluePu"
                />
              </div>
              
              <div className="mt-4 w-full">
                <label className="block text-bluePu font-roboto font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-bluePu"
                />
              </div>
              
              <div className="mt-4 w-full">
                <label className="block text-bluePu font-roboto font-medium">Saran/Komentar</label>
                <textarea
                  name="saran"
                  value={form.saran}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-bluePu"
                ></textarea>
              </div>
              
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={onClose}
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  className="bg-bluePu text-kuningButton px-4 py-2 rounded hover:bg-opacity-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    
  );
};

export default Modal;
