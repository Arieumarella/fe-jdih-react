import WebViewer from '@pdftron/webviewer';
import { React, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, title, urlPath }) => {
  const viewerRef = useRef(null);
  // Kita tetap menggunakan ref untuk instance, ini sudah benar.
  const instanceRef = useRef(null);

  useEffect(() => {
    // Jangan lakukan apa-apa jika modal tidak terbuka atau elemen ref belum siap.
    if (!isOpen || !viewerRef.current) {
      return;
    }

    // Wrap inisialisasi dalam sebuah fungsi.
    const initializeWebViewer = async () => {
      try {
        const instance = await WebViewer(
          {
            path: '/webviewer',
            initialDoc: urlPath || '/a.pdf',
            licenseKey: 'YOUR_LICENSE_KEY', // Ganti jika ada
            fullAPI: true, // Pastikan full API diaktifkan
          },
          viewerRef.current,
        );

        // --- Langkah Investigasi ---
        // Log instance untuk memastikan strukturnya.
        console.log("Instance WebViewer berhasil dibuat:", instance);

        // Simpan instance ke ref
        instanceRef.current = instance;

        // Contoh kustomisasi UI
        const { UI, Core } = instance;
        UI.disableElements(['header', 'tools', 'searchButton']);

        // Anda juga bisa menambahkan event listener di sini
        Core.documentViewer.addEventListener('documentLoaded', () => {
          console.log('Dokumen berhasil dimuat.');
        });

      } catch (error) {
        console.error("Gagal menginisialisasi WebViewer:", error);
      }
    };

    initializeWebViewer();

    // Fungsi Cleanup: Ini adalah bagian krusial
    return () => {
      // Cek apakah instanceRef.current memiliki nilai
      if (instanceRef.current) {
        // --- Langkah Debugging di Cleanup ---
        console.log("Mencoba dispose instance:", instanceRef.current);

        // Cek secara eksplisit apakah metode .dispose ada SEBELUM memanggilnya
        if (typeof instanceRef.current.dispose === 'function') {
          instanceRef.current.dispose();
          instanceRef.current = null;
        } else {
          // Jika .dispose tidak ada, ini akan memberi tahu kita masalahnya
          console.error("Metode .dispose() tidak ditemukan pada instanceRef.current!");

          // Sebagai fallback, coba tutup dokumen yang terbuka jika ada
          const { Core } = instanceRef.current;
          if (Core && typeof Core.documentViewer.closeDocument === 'function') {
            Core.documentViewer.closeDocument();
          }
        }
      }
    };

    // Pastikan dependency array sudah benar
    // Kita hanya ingin efek ini berjalan ketika modal dibuka/ditutup.
    // Jika urlPath bisa berubah saat modal terbuka, tambahkan `urlPath` juga.
    // Untuk kasus sederhana, cukup `isOpen`.
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-lg shadow-lg w-full md:w-[80%] h-[90vh] flex flex-col"
          >
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h2 className="text-xl font-semibold font-roboto text-bluePu">{title || 'Preview Dokumen'}</h2>
              <button
                className="bg-bluePu text-white md:px-4 px-3 md:py-2 py-1 rounded hover:bg-opacity-80"
                onClick={onClose}
              >
                Tutup
              </button>
            </div>

            {/* Kontainer Viewer */}
            <div
              className="webviewer w-full flex-grow min-h-0"
              ref={viewerRef}
            ></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;