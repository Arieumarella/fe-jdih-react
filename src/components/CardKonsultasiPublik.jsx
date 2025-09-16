import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { addDownload } from "../services/mou.services";
import { toast } from "../components/ToastProvider";

const CardKonsultasiPublik = ({ data, showModalAi }) => {

    console.log("data card konsultasi publik", data);

    const navigate = useNavigate();

    const navigateHandelClick = (link = '') => {
        navigate(`/${link}`);
        window.scrollTo(0, 0);
    };

    const ambilSampaiTahun = (judul) => {
        const match = judul.match(/^(.*?Tahun \d{4})/);
        return match ? match[1] : judul;
    };

    const ubahFormatTanggal = (tanggalString) => {
        const date = new Date(tanggalString);

        const options = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' };
        const formattedDate = date.toLocaleDateString('id-ID', options);

        return formattedDate;
    };

    const ambilTahunBulan = (waktuString) => {
        const tahun = waktuString.slice(0, 4);
        const bulan = waktuString.slice(4, 6);
        return { tahun, bulan };
    };

    const handleDownload = async (path, nmFile, slug) => {

        const isPDF = typeof nmFile === 'string' && nmFile.toLowerCase().endsWith('.pdf');
        if (!isPDF) {
            toast.error("Tidak Bisa Menemukan Dokumen.!", { position: "bottom-right" });
            return false;
        }


        addDownload(slug)
        const fileUrl = path;
        const fileName = nmFile;

        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = fileName; // Nama file yang akan diunduh
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Gagal download:', err);
        }
    };



    return (
        <div className="w-full mx-auto my-4 md:my-6 md:w-full lg:w-[70%]">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg flex flex-col overflow-hidden border border-gray-100 transition-all duration-300 group">
                {/* Header */}
                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-5 border-b border-gray-100">
                    {/* Status Badge - positioned absolutely */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-4">
                        <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-roboto font-semibold shadow-md border transition-all duration-200
                                ${data?.status === 'Daring'
                                    ? 'bg-emerald-500 text-white border-emerald-400'
                                    : data?.status === 'Luring'
                                        ? 'bg-amber-500 text-white border-amber-400'
                                        : 'bg-gray-400 text-white border-gray-300'
                                }`}
                            title={data?.status}
                        >
                            <span className="material-symbols-outlined text-sm">
                                {data?.status === 'Daring' ? 'wifi' : data?.status === 'Luring' ? 'location_on' : 'help'}
                            </span>
                            <span className="hidden sm:inline font-roboto">{data?.status}</span>
                        </span>
                    </div>

                    <div className="pr-16 sm:pr-20">
                        <h2
                            className="text-base font-bold text-bluePu font-roboto cursor-pointer md:text-lg lg:text-xl hover:text-bluePu transition-colors duration-200 line-clamp-2 group-hover:text-bluePu leading-tight"
                            onClick={(e) => { e.preventDefault(); navigateHandelClick(`Konsultasi-Publik/${data?.slug}`); }}
                        >
                            {ambilSampaiTahun(data?.judul_rancangan_peraturan)}
                        </h2>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-4 md:p-5 bg-white">
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-5">
                        <div className="space-y-2.5 md:space-y-3">
                            <div className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 bg-bluePu rounded-full mt-1.5 flex-shrink-0"></div>
                                <div className="min-w-0">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block font-roboto">Pemrakarsa</span>
                                    <p className="text-sm text-gray-800 font-medium font-roboto">{data?.deptcode || '-'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 bg-bluePu rounded-full mt-1.5 flex-shrink-0"></div>
                                <div className="min-w-0">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block font-roboto">Jenis Perencanaan</span>
                                    <p className="text-sm text-gray-800 font-medium break-words font-roboto">{data?.jenis_perencanaan || '-'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2.5 md:space-y-3">
                            {data?.status === 'Luring' && (
                                <div className="flex items-start gap-2.5">
                                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <div className="min-w-0">
                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block font-roboto">Tempat Pelaksanaan</span>
                                        <p className="text-sm text-gray-800 font-medium break-words font-roboto">{data?.Tempat_pelaksanaan || '-'}</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                <div className="min-w-0">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block font-roboto">Tanggal Penyusunan</span>
                                    <p className="text-sm text-gray-800 font-medium font-roboto">
                                        {data?.tgl_pelaksanaan_penyusunan ? ubahFormatTanggal(data?.tgl_pelaksanaan_penyusunan) : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline untuk Daring */}
                    {data?.status === 'Daring' && data?.tanggal_pelaksanaan && data?.tanggal_selesai_kp && (
                        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-3 md:p-4 mb-4 md:mb-5 border border-emerald-100">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-emerald-600 text-base">event</span>
                                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide font-roboto">Jadwal Pelaksanaan</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs">
                                <span className="bg-white px-2.5 py-1.5 rounded-md border border-emerald-200 font-medium text-emerald-800 text-center font-roboto">
                                    {ubahFormatTanggal(data?.tanggal_pelaksanaan)}
                                </span>
                                <span className="text-emerald-600 text-center sm:text-left font-roboto">→</span>
                                <span className="bg-white px-2.5 py-1.5 rounded-md border border-emerald-200 font-medium text-emerald-800 text-center font-roboto">
                                    {ubahFormatTanggal(data?.tanggal_selesai_kp)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Footer */}
                <div className="bg-gray-50 p-4 md:p-5 border-t border-gray-100">
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3'>
                        <button
                            className="bg-gradient-to-r from-bluePu to-blue-900 hover:from-blue-1000 hover:to-blue-900 text-kuningButton px-5 py-2.5 rounded-lg font-roboto font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            onClick={(e) => { e.preventDefault(); navigateHandelClick(`Konsultasi-Publik/${data?.slug}`); }}
                        >
                            <span className="material-symbols-outlined text-base">visibility</span> 
                            <span className="hidden xs:inline font-roboto">Lihat </span><span className="font-roboto">Detail</span>
                        </button>
                        <div className="flex items-center justify-center sm:justify-end">
                            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                                <span className="material-symbols-outlined text-base text-gray-500">visibility</span>
                                <span className="text-sm font-semibold text-gray-700 font-roboto">{data?.view || 0}</span>
                                <span className="text-xs text-gray-500 hidden sm:inline font-roboto">views</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardKonsultasiPublik;
