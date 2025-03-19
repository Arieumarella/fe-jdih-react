import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Halo! Bagaimana saya bisa membantu?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Terima kasih sudah menghubungi saya!" },
      ]);
    }, 1000);
  };

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
            className="bg-white p-4 rounded-lg shadow-lg w-[90%] md:w-[60%] h-[80vh] flex flex-col"
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
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg max-w-[60%] font-roboto h-auto ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Chat */}
            <div className="border-t p-2 flex items-center gap-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg outline-none"
                placeholder="Ketik pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
