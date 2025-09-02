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
        <div className="w-full mx-auto my-10 md:w-full lg:w-[70%]">
            <div className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                {/* Header */}
                <div className="flex items-center w-full bg-gray-50 p-4 border-b">
                    <div className="flex-1">
                        <h2
                            className="text-[17px] font-semibold text-gray-800 font-roboto cursor-pointer md:text-[17px] lg:text-[20px] hover:text-bluePu transition-colors"
                            onClick={(e) => { e.preventDefault(); navigateHandelClick(`Konsultasi-Publik/${data?.slug}`); }}
                        >
                            {ambilSampaiTahun(data?.judul)}
                        </h2>
                        <div className='flex mt-1 gap-3 items-center'>
                            <div className='flex gap-1 font-roboto text-[13px] text-gray-500 md:text-[13px] lg:text-[15px] items-center'>
                                <span className="material-symbols-outlined text-base">schedule</span>
                                {data?.status === 'Daring' && data?.tanggal_selesai_kp ? (
                                    <span>
                                        {ubahFormatTanggal(data?.tanggal_pelaksanaan)} - {ubahFormatTanggal(data?.tanggal_selesai_kp)}
                                    </span>
                                ) : (
                                    <span>{ubahFormatTanggal(data?.tanggal_pelaksanaan)}</span>
                                )}
                            </div>
                            <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm border transition-all duration-200
                                    ${data?.status === 'Daring'
                                        ? 'bg-green-50 text-green-700 border-green-300'
                                        : data?.status === 'Luring'
                                            ? 'bg-orange-50 text-orange-700 border-orange-300'
                                            : 'bg-gray-100 text-gray-500 border-gray-200'
                                    }`}
                                title={data?.status}
                            >
                                <span className="material-symbols-outlined text-sm align-middle"
                                    style={{
                                        color: data?.status === 'Daring' ? '#22c55e' : data?.status === 'Luring' ? '#f59e42' : '#6b7280'
                                    }}>
                                    {data?.status === 'Daring' ? 'wifi' : data?.status === 'Luring' ? 'location_on' : 'help'}
                                </span>
                                {data?.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Section */}
                <div className="p-4 border-t bg-white">
                    <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
                        <button
                            className="bg-bluePu hover:bg-blue-700 text-white w-full md:w-auto px-4 py-2 rounded-lg font-roboto text-[13px] flex items-center justify-center gap-2 transition-all duration-150 shadow-sm"
                            onClick={(e) => { e.preventDefault(); navigateHandelClick(`Konsultasi-Publik/${data?.slug}`); }}
                        >
                            <span className="material-symbols-outlined text-base md:text-lg">search</span> Detail
                        </button>
                        <div className="flex items-center gap-2 font-roboto font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                            <span className="text-sm">{data?.view}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardKonsultasiPublik;
