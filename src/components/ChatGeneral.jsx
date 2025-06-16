import React, { useState, useEffect, useRef } from 'react';
import { getAiJDIHGeneral, getPantunAwal } from "../services/aiApi.services";

// --- SVG ICONS (Tidak ada perubahan) ---
const ChatIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.686-3.091a2.25 2.25 0 00-1.415-.492h-6.318a2.25 2.25 0 01-2.25-2.25V8.69c0-1.243 1.007-2.25 2.25-2.25h11.25c.612 0 1.153.221 1.575.585z" /></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const LoadingSpinnerIcon = () => (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);
// --- END SVG ICONS ---




function ChatDialog() {
    // --- State dan Hooks (Tidak ada perubahan) ---
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
        { role: 'model', parts: [{ text: 'Halo! Saya AJI (Asisten JDIH Interaktif), Chat AI 🤖. Ada yang bisa saya bantu?' }] },
        { role: 'model', parts: [{ text: 'Kamu bisa bertanya padaku soal Berita, berbagai jenis Peraturan, Monografi Hukum, Putusan Pengadilan, Agenda kegiatan, Artikel Hukum, Infografis, MoU, Dokumen Langka, sampai info tentang SiMPeL (proses pembentukan peraturan). Ada yang bisa aku bantu cari?' }] },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);

    // --- Functions (Tidak ada perubahan) ---
    const toggleChat = () => { setIsOpen(!isOpen); if (!isOpen) { setTimeout(() => { inputRef.current?.focus(); }, 100); } };
    useEffect(() => { if (chatContainerRef.current) { chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; } }, [messages]);
    useEffect(() => { if (isOpen) { inputRef.current?.focus(); } }, [isOpen]);

    useEffect(() => {
        getPantunAwal().then((result) => {
            const aiText = result?.data?.candidates[0]?.content?.parts[0]?.text;
            const aiResponse = { role: 'model', parts: [{ text: aiText }] };
            setMessages(prevMessages => [...prevMessages, aiResponse]);
        });
    }, []);

    const handleSendMessage = async () => {
        const trimmedInput = inputValue.trim();
        if (trimmedInput === '' || isLoading) return;
        const newUserMessage = { role: 'user', parts: [{ text: trimmedInput }] };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setInputValue('');
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let aiText = ``;
            await getAiJDIHGeneral(trimmedInput, updatedMessages).then((result) => {
                aiText = result?.message
            });
            const aiResponse = { role: 'model', parts: [{ text: aiText }] };
            setMessages(prevMessages => [...prevMessages, aiResponse]);
        } catch (error) {
            console.error("Error sending message or receiving AI response:", error);
            const errorResponse = { role: 'model', parts: [{ text: 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi.' }] };
            setMessages(prevMessages => [...prevMessages, errorResponse]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };
    const handleKeyPress = (event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); handleSendMessage(); } };

    // Variabel ini tidak lagi digunakan karena class didefinisikan langsung di JSX
    // const chatPositionClasses = "bottom-2 right-[75px]"; 

    return (
        <>
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className={`fixed bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 z-50 flex items-center space-x-2 group
                    
                    // --- STYLE MOBILE (Default) ---
                    // Tombol bulat di pojok kanan bawah yang lebih standar
                    bottom-4 right-4

                    // --- STYLE DESKTOP/LAPTOP (sm: Override) ---
                    // Mengembalikan style asli Anda untuk layar lebih besar
                    
                    `}
                    aria-label="Tanya AJI"
                >
                    <ChatIcon />
                    {/* Teks hanya akan muncul di layar sm ke atas, sesuai tampilan asli */}
                    <span className="hidden sm:inline-block overflow-hidden transition-all duration-300 ease-in-out">
                        Tanya A.J.I
                    </span>
                </button>
            )}

            {isOpen && (
                <div
                    className={`fixed bg-white shadow-2xl flex flex-col z-50 border border-gray-200 transition-all duration-300 ease-in-out
                    
                    // --- STYLE MOBILE & TABLET (Default) ---
                    // Tampilan "bottom sheet" yang muncul dari bawah dan memenuhi lebar
                    bottom-0 left-0 right-0 w-full h-[88vh] rounded-t-xl
                    
                    // --- STYLE DESKTOP/LAPTOP (sm: Override) ---
                    // Mengembalikan semua style asli Anda persis seperti semula untuk layar sm ke atas
                    sm:bottom-2 sm:right-[75px] sm:left-auto
                    sm:w-full sm:max-w-sm
                    sm:h-auto sm:max-h-[600px]
                    sm:rounded-xl
                    `}
                >
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
                        <h2 className="text-lg font-medium font-roboto text-gray-800">A.J.I (Asisten JDIH Interaktif)</h2>
                        <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100" title="Tutup chat">
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Container Pesan (Sudah cukup responsif, hanya perlu min-h-0) */}
                    <div ref={chatContainerRef} className="flex-grow p-4 space-y-3 overflow-y-auto min-h-0">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-xl flex items-start space-x-2 shadow-sm ${msg.role === 'user'
                                    ? 'bg-bluePu text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                    }`}>
                                    {msg.role === 'model' && (
                                        <span className="material-symbols-outlined text-bluePu text-xl mt-0.5 flex-shrink-0">
                                            smart_toy
                                        </span>
                                    )}
                                    <div
                                        className="text-sm whitespace-pre-wrap break-words [&_a]:text-blue-600 [&_a]:hover:underline [&_a]:font-medium"
                                        dangerouslySetInnerHTML={{ __html: msg.parts[0].text }}
                                    />
                                </div>
                            </div>
                        ))}
                        {isLoading && messages[messages.length - 1]?.role === 'user' && (
                            <div className="flex justify-start w-full">
                                <div className="max-w-[85%] p-3 rounded-xl flex items-center space-x-2 bg-gray-100 text-gray-700 rounded-bl-none shadow-sm">
                                    <span className="material-symbols-outlined text-bluePu text-xl animate-pulse flex-shrink-0">
                                        smart_toy
                                    </span>
                                    <p className="text-sm text-gray-500 italic">AJI sedang mengetik...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area (Tidak perlu perubahan) */}
                    <div className="p-3 sm:p-4 border-t border-gray-200 bg-white flex-shrink-0">
                        <div className="flex items-center space-x-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ketik pertanyaan Anda..."
                                className="flex-grow p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bluePu focus:border-transparent outline-none text-sm transition-colors"
                                disabled={isLoading}
                                aria-label="Input pertanyaan"
                            />
                            <button
                                onClick={handleSendMessage}
                                className={`p-2.5 w-auto sm:w-[70px] h-[42px] flex justify-center items-center bg-bluePu text-white rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-bluePu focus:ring-opacity-50 transition-all duration-150
                                            ${isLoading ? 'bg-opacity-70 cursor-not-allowed' : ''} ${inputValue.trim() === '' && !isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                                aria-label="Kirim pesan"
                                disabled={isLoading || (inputValue.trim() === '' && !isLoading)}
                                title="Kirim"
                            >
                                {isLoading ? <LoadingSpinnerIcon /> : <span className="material-symbols-outlined">send</span>}
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">
                            Informasi dari AJI mungkin tidak akurat.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatDialog;