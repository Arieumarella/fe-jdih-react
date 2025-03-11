import {React, useState} from 'react';
import { useNavigate } from "react-router-dom";

const CardAgenda = () => {

  const navigate = useNavigate();

  const navigateHandelClick = (link = '') => {
    navigate(`/${link}`);
  };

  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
  <>

<div className={`w-full md:w-[75%] mx-auto rounded-xl md:flex md:flex-col cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${openItems.includes(1) ? 'bg-white shadow-lg my-4' : 'bg-transparent shadow-none my-0'}`}
      onClick={() => toggleItem(1)}>
      
  <div className="p-4 md:p-6 bg-white shadow-md rounded-t-lg md:flex justify-between gap-4 items-start border">
    {/* Logo Kiri */}
    <div className="flex items-center justify-center bg-gradient-to-r from-[#2793a3] to-bluePu p-2 rounded-lg">
      <span className="material-symbols-outlined text-5xl text-slate-100">
        calendar_month
      </span>
    </div>

    {/* Konten */}
    <div className="flex flex-col text-left w-full gap-3 md:mt-0 mt-4">
      <h2 className="text-base md:text-[20px] font-semibold font-roboto text-bluePu">
        Penyusunan Rancangan Keputusan Kepala BPIP tentang Standar Materi PIP untuk TNI dan Polri
      </h2>
    </div>

    <div className="flex flex-col gap-2 md:mt-0 mt-4">
      <p className="text-sm md:text-[14px] text-slate-500 font-semibold font-roboto flex gap-2">
        <span className="material-symbols-outlined">schedule</span>
        10 September 2024
      </p>
      <p className="text-sm md:text-[14px] text-slate-500 flex justify-center gap-2 mt-2 font-semibold font-roboto md:mr-0 mr-4">
        <span className="material-symbols-outlined">location_on</span>
        Kantor Balai Jasa Konstruksi Wilayah III
      </p>
    </div>
  </div>

  {/* Footer */}
  <div className={`bg-gray-100 p-4 text-bluePu font-roboto text-[14px] transition-all duration-500 ease-out 
                  ${openItems.includes(1) ? 'opacity-100 max-h-[500px] overflow-auto' : 'opacity-0 max-h-0 overflow-hidden'}`}>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, rem. Tempora nesciunt molestiae, architecto quos ducimus vitae numquam voluptas similique officia deserunt aliquam iure, quisquam neque incidunt harum ullam minus.
  </div>
</div>

  </>
  );
};

export default CardAgenda;
