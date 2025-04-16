import {React, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "../components/ToastProvider";
import {postDataMasukanDanKritik} from "../services/search.services";


const ModalKritik = ({ isOpen, onClose, title, dataPeraturan }) => {
  
  const [formKiritkdanSaran, setformKiritkdanSaran] = useState({id: dataPeraturan?.data?.peraturan_id, nama: "", email: "", saran:""});

  const handelFormKritik = (e) => {
    setformKiritkdanSaran({...formKiritkdanSaran, [e.target.name]: e.target.value});
  }

  let handleSubmitForm = async (e) => {

      e.preventDefault();
        
      if(!formKiritkdanSaran.nama || !formKiritkdanSaran.email || !formKiritkdanSaran.saran) {
        toast.error("Harap lengkapi semua kolom Terlebih Dahulu.", { position: "bottom-right"});
        return;
      }
    
      try {
        const response = await postDataMasukanDanKritik(formKiritkdanSaran);
        console.log(response.status)
        if (response.status !== true) {
          toast.error("Data gagal disimpan.", { position: "bottom-right"});
        }else{
          toast.success("Data berhasil disimpan.", { position: "bottom-right" });
          setformKiritkdanSaran({nama: "", email: "", saran:""});
          onClose();
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        toast.error("Terjadi kesalahan, silakan coba lagi.", { position: "bottom-right"});
      } 

  }
  

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-lg md:w-[45%] w-[85%]"
        >
          <h2 className="text-xl font-semibold font-roboto text-bluePu">{title}</h2>
          <div className="mt-4 w-full h-full">
            {/* Form input */}
            <form className="space-y-4" onSubmit={handleSubmitForm}>
              
            <div>
                <label className="block text-bluePu text-sm font-medium mb-1" htmlFor="nama">Nama</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  placeholder="Nama Lengkap"
                  value={formKiritkdanSaran.nama}
                  onChange={handelFormKritik}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-bluePu text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  value={formKiritkdanSaran.email}
                  onChange={handelFormKritik}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
      
              <div>
                <label className="block text-bluePu text-sm font-medium mb-1" htmlFor="saran">Saran & Komentar</label>
                <textarea
                  id="saran"
                  name="saran"
                  rows="4"
                  placeholder="Tulis saran dan komentar Anda..."
                  value={formKiritkdanSaran.saran}
                  onChange={handelFormKritik}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                ></textarea>
              </div>
      
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-bluePu text-kuningButton md:px-4 px-3 md:py-2 py-1 rounded hover:bg-opacity-80 transition"
                >
                  Kirim
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-bluePu md:px-4 px-3 md:py-2 py-1 rounded hover:bg-gray-400 transition"
                >
                  Tutup
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

export default ModalKritik;
