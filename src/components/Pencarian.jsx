import React from 'react';
import { useNavigate } from "react-router-dom";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import { useTranslation } from 'react-i18next';

const Pencarian = () => {

  const navigate = useNavigate();

  const navigateHandelClick = (link = '') => {
    navigate(`/${link}`);
    window.scrollTo(0, 0);
  };

  const { t, i18n } = useTranslation();



  return (
    <>
      <section className=' mt-[10px]'>
        <div className="flex gap-[25px]">
          <AnimatedContent
            key={1}
            distance={150}
            direction="horizontal"
            reverse={false}
            config={{ tension: 95, friction: 10 }}
            initialOpacity={0.2}
            animateOpacity
            scale={1.05}
            threshold={0.2}
          >
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); navigateHandelClick("Search/pencarian-biasa"); }}
              className="relative bg-white/20 backdrop-blur-md text-white text-lg font-semibold py-4 px-8 rounded-xl shadow-lg border border-white/30 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 hover:opacity-30 transition-opacity duration-300"></span>
              <span className="relative z-10">{t('btnPencarian')}</span>
            </button>
          </AnimatedContent>

          <AnimatedContent
            key={2}
            distance={150}
            direction="horizontal"
            reverse={false}
            config={{ tension: 95, friction: 10 }}
            initialOpacity={0.2}
            animateOpacity
            scale={1.05}
            threshold={0.2}
          >
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); navigateHandelClick("Search/pencarian-detail"); }}
              className="relative bg-white/20 backdrop-blur-md text-white text-lg font-semibold py-4 px-8 rounded-xl shadow-lg border border-white/30 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-0 hover:opacity-30 transition-opacity duration-300"></span>
              <span className="relative z-10">{t('btnPencarianDetail')}</span>
            </button>
          </AnimatedContent>
        </div>
      </section>
    </>
  );
};

export default Pencarian;