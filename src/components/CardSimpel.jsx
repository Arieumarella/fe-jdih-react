import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";

const CardAgenda = ({ data }) => {
    const navigate = useNavigate();

    const navigateHandelClick = (link = '') => {
        navigate(`/${link}`);
        window.scrollTo(0, 0);
    };

    const [openItems, setOpenItems] = useState([]);

    const toggleItem = (index) => {
        if (openItems.includes(index)) {
            setOpenItems(openItems.filter((item) => item !== index));
        } else {
            setOpenItems([...openItems, index]);
        }
    };

    function formatDateToReadable(dateString) {
        if (!dateString) return '';

        const date = new Date(dateString);
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const day = date.getDate().toString().padStart(2, '0');
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    return (
        <>
            <div
                className={`w-full mx-auto rounded-xl cursor-pointer overflow-hidden transition-all duration-300 ease-in-out md:w-full lg:w-[75%] lg:flex lg:flex-col ${openItems.includes(1) ? 'bg-white shadow-lg my-4' : 'bg-transparent shadow-none my-0 overflow-x-hidden'}`}
                onClick={() => toggleItem(1)}
            >
                {/*
      Perubahan pada div terluar (card container):
      - Width: w-full (mob), md:w-full (tab), lg:w-[75%] (lap, dari md:w-[75%] asli)
      - Flex: (mobile/tablet default block), lg:flex lg:flex-col (lap, dari md:flex md:flex-col asli)
    */}

                <div className="p-4 bg-white shadow-md rounded-t-lg gap-4 items-start border md:p-4 lg:p-6 lg:flex lg:justify-between">
                    {/*
        Perubahan pada div header card:
        - Padding: p-4 (mob), md:p-4 (tab), lg:p-6 (lap, dari md:p-6 asli)
        - Flex: (mobile/tablet default block atau tergantung child), lg:flex lg:justify-between (lap, dari md:flex justify-between asli)
      */}
                    {/* Logo Kiri */}
                    <div className="flex items-center justify-center bg-gradient-to-r from-[#2793a3] to-bluePu p-2 rounded-lg">
                        <span className="material-symbols-outlined text-5xl text-slate-100">
                            bookmark_manager
                        </span>
                    </div>

                    {/* Konten */}
                    <div className="flex flex-col text-left w-full gap-3 mt-4 md:mt-4 lg:mt-0">
                        {/*
          Perubahan pada div konten (dalam header):
          - Margin Top: mt-4 (mob), md:mt-4 (tab), lg:mt-0 (lap, dari md:mt-0 asli)
        */}
                        <h2 className="text-base font-semibold font-roboto text-bluePu md:text-base lg:text-[20px]">
                            {/*
            Perubahan pada h2 judul produk hukum:
            - Font Size: text-base (mob), md:text-base (tab), lg:text-[20px] (lap, dari md:text-[20px] asli)
          */}
                            {data.nm_produk_hukum}
                        </h2>
                        <h3 className='flex items-center gap-1 text-bluePu text-[14px] md:text-[14px] lg:text-[16px]'>
                            {/*
            Perubahan pada h3 tanggal:
            - Font Size: text-[14px] (mob), md:text-[14px] (tab), lg:text-[16px] (lap, dari md:text-[16px] asli)
          */}
                            <span className="material-symbols-outlined">
                                schedule
                            </span>
                            {formatDateToReadable(data.created_at)}
                        </h3>
                    </div>
                </div>

                {/* Footer (Accordion Content) */}
                <div className={`bg-gray-100 p-4 text-bluePu font-roboto text-[14px] transition-all duration-500 ease-out 
      ${openItems.includes(1) ? 'opacity-100 max-h-[900px] overflow-auto' : 'opacity-0 max-h-0 overflow-hidden'}`}
                >
                    {/* Tidak ada kelas md: spesifik di sini yang perlu diubah untuk permintaan ini,
          karena tata letak dan ukuran font di dalamnya sudah seragam atau dikontrol oleh state.
      */}
                    {/* Mapping data dukung */}
                    <div className="space-y-4">
                        <h4 className='px-2 pt-2 font-roboto font-semibold text-[18px] text-bluePu'>B03</h4>
                        {data.b03?.map((item, index) => (
                            <div
                                key={`b03-${index}`} // Lebih baik menggunakan ID unik jika ada, atau prefix untuk memastikan unik lintas section
                                className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`material-symbols-outlined text-xl ${item.path ? 'text-green-600' : 'text-red-500'}`}
                                    >
                                        {item.path ? 'check_circle' : 'cancel'}
                                    </span>
                                    <span className="text-bluePu font-medium">{item.nama}</span>
                                </div>
                                {item.path ? (
                                    <a
                                        href="#" // Sebaiknya diisi dengan link yang valid atau dibuat non-interaktif jika hanya status
                                        className="text-green-600 text-sm "
                                    >
                                        Terupload
                                    </a>
                                ) : (
                                    <span className="text-red-500 text-sm italic">Belum diupload</span>
                                )}
                            </div>
                        ))}

                        <h4 className='px-2 pt-2 font-roboto font-semibold text-[18px] text-bluePu'>B06</h4>
                        {data.b06?.map((item, index) => (
                            <div
                                key={`b06-${index}`}
                                className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`material-symbols-outlined text-xl ${item.path ? 'text-green-600' : 'text-red-500'}`}
                                    >
                                        {item.path ? 'check_circle' : 'cancel'}
                                    </span>
                                    <span className="text-bluePu font-medium">{item.nama}</span>
                                </div>
                                {item.path ? (
                                    <a
                                        href="#"
                                        className="text-green-600 text-sm "
                                    >
                                        Terupload
                                    </a>
                                ) : (
                                    <span className="text-red-500 text-sm italic">Belum diupload</span>
                                )}
                            </div>
                        ))}

                        <h4 className='px-2 pt-2 font-roboto font-semibold text-[18px] text-bluePu'>B09</h4>
                        {data.b09?.map((item, index) => (
                            <div
                                key={`b09-${index}`}
                                className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`material-symbols-outlined text-xl ${item.path ? 'text-green-600' : 'text-red-500'}`}
                                    >
                                        {item.path ? 'check_circle' : 'cancel'}
                                    </span>
                                    <span className="text-bluePu font-medium">{item.nama}</span>
                                </div>
                                {item.path ? (
                                    <a
                                        href="#"
                                        className="text-green-600 text-sm "
                                    >
                                        Terupload
                                    </a>
                                ) : (
                                    <span className="text-red-500 text-sm italic">Belum diupload</span>
                                )}
                            </div>
                        ))}

                        <h4 className='px-2 pt-2 font-roboto font-semibold text-[18px] text-bluePu'>B12</h4>
                        {data.b12?.map((item, index) => (
                            <div
                                key={`b12-${index}`}
                                className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`material-symbols-outlined text-xl ${item.path ? 'text-green-600' : 'text-red-500'}`}
                                    >
                                        {item.path ? 'check_circle' : 'cancel'}
                                    </span>
                                    <span className="text-bluePu font-medium">{item.nama}</span>
                                </div>
                                {item.path ? (
                                    <a
                                        href="#"
                                        className="text-green-600 text-sm "
                                    >
                                        Terupload
                                    </a>
                                ) : (
                                    <span className="text-red-500 text-sm italic">Belum diupload</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardAgenda;
