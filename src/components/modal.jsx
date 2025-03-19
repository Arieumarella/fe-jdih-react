import React from "react";
import { motion, AnimatePresence } from "framer-motion";


const Modal = ({ isOpen, onClose, title, urlPath }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Animasi modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg md:w-[60%] w-[85%]"
          >
            <h2 className="text-xl font-semibold font-roboto text-bluePu">{title}</h2>
            <div className="mt-4 w-full h-full">
            <iframe src={urlPath} className="w-full md:h-[750px] h-[500px]"></iframe>
            </div>
            <button
              className="mt-4 bg-bluePu text-kuningButton md:px-4 px-3 md:py-2 py-1 rounded hover:bg-opacity-50"
              onClick={onClose}
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
