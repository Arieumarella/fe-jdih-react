import { Viewer, Worker, SpecialZoomLevel  } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, urlPath }) => {
  
      const defaultLayoutModal = defaultLayoutPlugin();
      const BACKEND_FILE_URL = import.meta.env.VITE_BACKEND_FILE_URL;
      const [urlPathFix, setUrlPathFix] = useState('');
      
      useEffect(() => {
        const idx = urlPath?.indexOf("assets/");
        if (idx !== -1) {
          let cleanPath = urlPath?.substring(idx)?.replace(/^assets\/assets\//, "assets/");
          setUrlPathFix(urlPath ? BACKEND_FILE_URL + cleanPath : '');
        } else {
          setUrlPathFix(BACKEND_FILE_URL + urlPath);
        }
      }, [urlPath, BACKEND_FILE_URL]);
      

      console.log("Modal URL Path:",urlPathFix);


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
            <div className="webviewer w-full flex-grow min-h-0">
              <Worker workerUrl="/pdf.worker.min.js">
                 <Viewer key={'-Peraturan'} fileUrl={urlPathFix} plugins={[defaultLayoutModal]} defaultScale={SpecialZoomLevel.PageFit} />
              </Worker>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;