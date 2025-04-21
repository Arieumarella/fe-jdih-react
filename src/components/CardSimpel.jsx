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
            <div className={`w-full md:w-[75%] mx-auto rounded-xl md:flex md:flex-col cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${openItems.includes(1) ? 'bg-white shadow-lg my-4' : 'bg-transparent shadow-none my-0 overflow-x-hidden'}`}
                onClick={() => toggleItem(1)}>

                <div className="p-4 md:p-6 bg-white shadow-md rounded-t-lg md:flex justify-between gap-4 items-start border">
                    {/* Logo Kiri */}
                    <div className="flex items-center justify-center bg-gradient-to-r from-[#2793a3] to-bluePu p-2 rounded-lg">
                        <span className="material-symbols-outlined text-5xl text-slate-100">
                            bookmark_manager
                        </span>
                    </div>

                    {/* Konten */}
                    <div className="flex flex-col text-left w-full gap-3 md:mt-0 mt-4">
                        <h2 className="text-base md:text-[20px] font-semibold font-roboto text-bluePu">
                            {data.nm_produk_hukum}
                        </h2>
                        <h3 className='flex items-center gap-1 text-bluePu md:text-[16px] text-[14px]'>
                            <span className="material-symbols-outlined">
                                schedule
                            </span>
                            {formatDateToReadable(data.created_at)}
                        </h3>
                    </div>
                </div>

                {/* Footer */}
                <div className={`bg-gray-100 p-4 text-bluePu font-roboto text-[14px] transition-all duration-500 ease-out 
                  ${openItems.includes(1) ? 'opacity-100 max-h-[900px] overflow-auto' : 'opacity-0 max-h-0 overflow-hidden'}`}
                >
                    {/* Mapping data dukung */}
                    <div className="space-y-4">
                        <h4 className='px-2 pt-2 font-roboto font-semibold text-[18px] text-bluePu'>B03</h4>
                        {data.b03?.map((item, index) => (
                            <div
                                key={index}
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

                        <h4 className='px-2 pt-2 font-roboto font-semibold text-[18px] text-bluePu'>B06</h4>
                        {data.b06?.map((item, index) => (
                            <div
                                key={index}
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
                                key={index}
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
                                key={index}
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
