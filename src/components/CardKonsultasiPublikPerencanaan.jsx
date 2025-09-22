import { useState } from 'react';


const dummyData = {
    judul: 'Rancangan Peraturan Daerah Tentang Pengelolaan Sampah',
    tahun_anggaran: '2025',
    file_konsepsi_pengaturan: 'https://example.com/konsepsi.pdf',
    ringkasan: 'Peraturan ini bertujuan mengatur pengelolaan sampah terpadu untuk meningkatkan kebersihan dan kesehatan masyarakat.'
};

const Illustration = ({ className = '' }) => (
    <div className={`relative inline-flex items-center justify-center ${className}`} aria-hidden="true">
        {/* decorative outer ring */}
        <span className="absolute inset-0 flex items-center justify-center">
            <span className="block rounded-full" style={{ width: 96, height: 96, boxShadow: '0 6px 24px rgba(59,130,246,0.08)', background: 'linear-gradient(180deg, rgba(99,102,241,0.06), rgba(59,130,246,0.02))', border: '1px solid rgba(99,102,241,0.08)' }} />
        </span>

        {/* main circular icon */}
        <span className="relative inline-flex items-center justify-center rounded-full" style={{ width: 72, height: 72, background: 'linear-gradient(135deg,#ebf4ff,#e0f2fe)', boxShadow: '0 8px 28px rgba(59,130,246,0.10)' }}>
            <svg className="w-10 h-10 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M5.5 21h13M12 21V7m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2-1.8c3.073.661 2.467 2.8 5 2.8M5 8c3.359 0 2.192-2.115 5.012-2.793M7 9.556V7.75m0 1.806-1.95 4.393a.773.773 0 0 0 .37.962.785.785 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.776.776 0 0 0 .09-.716L7 9.556Zm10 0V7.313m0 2.243-1.95 4.393a.773.773 0 0 0 .37.962.786.786 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.775.775 0 0 0 .09-.716L17 9.556Z" />
            </svg>
        </span>
    </div>
);


const CardKonsultasiPublikPerencanaan = ({ data, onMasukanClick, onPreviewClick }) => {
    const [showPreview, setShowPreview] = useState(false);
    const pdfUrl = data?.file_konsepsi_pengaturan || dummyData.file_konsepsi_pengaturan;

    return (
        <div className="w-full mx-auto my-8 max-w-6xl px-2 sm:px-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition-all duration-200">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-0">
                    {/* Left illustration */}
                    <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-3 md:p-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                            <Illustration />
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="p-5 sm:p-8 md:p-10 flex flex-col justify-between gap-4 sm:gap-6">
                        <div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-bluePu leading-tight break-words">{data?.judul || dummyData.judul}</h3>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full font-roboto bg-gray-100 text-xs sm:text-sm text-gray-700 border border-gray-200">Tahun {data?.tahun_anggaran || dummyData.tahun_anggaran}</span>
                                <span className="text-xs sm:text-sm text-gray-500 font-roboto">&middot; Dokumen tersedia</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                                <button
                                    onClick={() => onPreviewClick && onPreviewClick()}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow-md hover:opacity-95 transition text-xs sm:text-sm"
                                >
                                    {/* Eye icon for preview */}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 12s4-7 10.5-7 10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Konsepsi Pengaturan
                                </button>

                                <button
                                    onClick={() => onMasukanClick && onMasukanClick(pdfUrl)}
                                    className="inline-flex items-center gap-2 border border-gray-200 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition text-xs sm:text-sm"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Masukan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardKonsultasiPublikPerencanaan;
