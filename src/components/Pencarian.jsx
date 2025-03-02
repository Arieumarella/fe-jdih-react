import React from 'react';
import { useNavigate } from "react-router-dom";

const Pencarian = () => {

    const navigate = useNavigate();
    
      const navigateHandelClick = (link = '') => {
        navigate(`/${link}`);
      };
   


  return (
    <>
    <section className=' px-5 md:px-[60px] mt-[18px]'>
        <div className="flex gap-[15px]">
            <button type="button" onClick={(e) => { e.preventDefault(); navigateHandelClick("Search/pencarian-biasa"); }} className="text-base hover:bg-yellow-400 hover:text-slate-950 active:text-slate-950 active:bg-yellow-600  w-[150px] text-white font-semibold shadow-[1px_2px_4px_white]">Pencarian Cepat</button>
            <button type="button" onClick={(e) => { e.preventDefault(); navigateHandelClick("Search/pencarian-detail"); }} className="text-base text-slate-100 hover:bg-yellow-400 hover:text-slate-950 active:text-slate-950 active:bg-yellow-600 w-[150px] font-semibold shadow-[1px_2px_4px_white]">Pencarian Detail</button>
        </div>
    </section>
    </>
  );
};

export default Pencarian;