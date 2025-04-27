import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAiJdih } from "../services/aiApi.services";
import DOMPurify from "dompurify";

const Modal = ({ isOpen, onClose, urlPath }) => {
  const [history, setHistory] = useState([
    {
      role: "model",
      parts: [{ text: "Halo! Bagaimana saya bisa membantu?" }],
    },
  ]);

  const [input, setInput] = useState("");
  const [pathState, setPathState] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Menambahkan state loading

  const lastMessageRef = useRef(null); // <-- Tambah ini

  if (pathState !== urlPath) {
    setPathState(urlPath);
    setHistory([
      {
        role: "model",
        parts: [{ text: "Halo! Bagaimana saya bisa membantu?" }],
      },
    ]);
  }

  const sendMessage = () => {
    if (input.trim() === "") return;

    // Menambahkan pesan user sebelum loading
    setHistory((prev) => [
      ...prev,
      { role: "user", parts: [{ text: input }] },
    ]);

    setInput(""); // Menghapus input setelah pesan terkirim
    setIsLoading(true); // Menandai proses sedang berjalan

    getAiJdih(urlPath, input, history)
      .then((result) => {
        setIsLoading(false); // Menghentikan loading setelah respons diterima
        if (result.status) {
          setHistory((prev) => [
            ...prev,
            {
              role: "model",
              parts: [{ text: result?.data?.candidates[0]?.content?.parts[0]?.text }],
            },
          ]);
        } else {
          setHistory((prev) => [
            ...prev,
            {
              role: "model",
              parts: [{ text: result.msg }],
            },
          ]);
        }
      })
      .catch(() => {
        setIsLoading(false); // Menghentikan loading jika ada error
      });
  };

  // Setelah history berubah, scroll ke atas chat baru
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [history]);

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
            className="bg-white p-4 rounded-lg shadow-lg w-[90%] md:w-[60%] h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold font-roboto text-bluePu flex items-center">
                <i className="fa-solid fa-robot mr-2"></i> Chat AI
              </h2>
              <button onClick={onClose} className="flex items-center">
                <i className="fa-solid fa-x text-[20px] text-slate-400"></i>
              </button>
            </div>

            {/* Area Chat */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {history.map((msg, index) => (
                <div
                  key={index}
                  ref={index === history.length - 1 ? lastMessageRef : null} // <-- ref di item terakhir
                  className={`p-3 rounded-lg max-w-[55%] font-roboto h-auto ${msg.role === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-gray-800"
                    }`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        msg?.parts[0]?.text
                          ?.replace(/^(`{0,3}\s*)?html\s*/i, '') // Hapus ` dan kata html di awal
                          ?.replace(/^"|"$/g, '') // Hapus tanda kutip
                          ?.trim()
                      ),
                    }}
                  />
                </div>
              ))}

              {/* Menambahkan indikator loading jika isLoading true */}
              {isLoading && (
                <div className="p-3 text-center text-gray-500">Menunggu balasan...</div>
              )}
            </div>

            {/* Input Chat */}
            <div className="border-t p-2 flex items-center gap-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg outline-none"
                placeholder="Ketik pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()} // Menonaktifkan enter saat loading
                disabled={isLoading} // Menonaktifkan input saat loading
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                disabled={isLoading} // Menonaktifkan tombol saat loading
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner animate-spin"></i> // Ikon loading
                ) : (
                  <i className="fa-solid fa-paper-plane"></i>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
