import React from 'react';
import { useNavigate } from "react-router-dom";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';

const Pencarian = () => {

    const navigate = useNavigate();
    
      const navigateHandelClick = (link = '') => {
        navigate(`/${link}`);
        window.scrollTo(0, 0);
      };
   


  return (
    <>
    <section className=' px-5 md:px-[60px] mt-[18px]'>
        <div className="flex gap-[15px]">

        <AnimatedContent
           key={`1`}
          distance={150}
          direction="horizontal"
          reverse={false}
          config={{ tension: 95, friction: 10 }}
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
        > 
            <button type="button" onClick={(e) => { e.preventDefault(); navigateHandelClick("Search/pencarian-biasa"); }} className="text-base hover:bg-yellow-400 hover:text-slate-950 active:text-slate-950 active:bg-yellow-600  w-[150px] text-white font-semibold shadow-[1px_2px_4px_white]">Pencarian Cepat</button>
        </AnimatedContent>

        <AnimatedContent
           key={`2`}
          distance={150}
          direction="horizontal"
          reverse={false}
          config={{ tension: 95, friction: 10 }}
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
        >
            <button type="button" onClick={(e) => { e.preventDefault(); navigateHandelClick("Search/pencarian-detail"); }} className="text-base text-slate-100 hover:bg-yellow-400 hover:text-slate-950 active:text-slate-950 active:bg-yellow-600 w-[150px] font-semibold shadow-[1px_2px_4px_white]">Pencarian Detail</button>
        </AnimatedContent>
        </div>
    </section>
    </>
  );
};

export default Pencarian;