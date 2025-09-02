import WebViewerWithLicense from './WebViewerWithLicense';
import { React, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, title, urlPath }) => {
  // Tidak perlu ref dan useEffect, gunakan komponen WebViewerWithLicense

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
              <WebViewerWithLicense initialDoc={urlPath || '/a.pdf'} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;