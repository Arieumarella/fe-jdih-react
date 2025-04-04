import React, {useEffect, useState} from 'react';
import Headers from "../components/Header";
import Pencarian from "../components/Pencarian";
import ImageSlider from "../components/imageSlider";
import Box from "../components/Box";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import ContainerContens from "../components/containerContens";
import SliderMonografi from "../components/sliderMonografi";
import sluet from "../assets/siluet-home.png";
import { getBanner, getNuwPeraturan } from '../services/home.services';
import BlurText from "../components/react-bits/BlurText/BlurText";
import SplitText from "../components/react-bits/SplitText/SplitText";

const Home = () => {

  const [banner, setBanner] = useState([]);
  const [nuwPeraturan, setNuwPeraturan] = useState([]);


  useEffect(() => {
    
    // Data Nammer
    getBanner().then((result) => {
      setBanner(result);
    });

    // get Nuw Peraturan
    getNuwPeraturan().then((result) => {
      setNuwPeraturan(result);
    });

  }, []);

  return (
    <>
    <Headers/>
    <section className='container py-4 px-5 md:px-[60px] mt-[20px] flex justify-between item-center'>
      <div className='group'>
        
        <h1 className='font-medium text-slate-100 text-[35px] md:text-[96px] font-onest flex gap-2'> 

          <BlurText
          text="Selamat"
          delay={200}
          animateBy="words"
          direction="top"
          className='inline-block'
          />
            

          <BlurText
          text="Datang"
          delay={50}
          animateBy="words"
          direction="top"
          className='text-kuningButton inline-block'
          />

         </h1>
        
        <h2 className='font-normal font-onest text-slate-100 py- text-[21px] md:text-[45px] md:mt-[-15px]'>
         

          <SplitText
            text="Di Website Jaringan Dokumentasi"
            delay={25}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
          />
          <br />
          <SplitText
            text="dan Informasi Hukum"
            delay={25}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
          />
          <br />
          <SplitText
            text="Kementerian PU"
            delay={25}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
          />

        </h2>
        <p className='font-light font-roboto text-slate-100 py-1 text-[15px] md:text-[18px] mt-[50px]'> 
          <BlurText
          text="Sabtu - 6 - Juni - 2024 - 06.06"
          delay={10}
          animateBy="words"
          direction="bottom"
          />
        </p>
      </div>

      <img className='md:mr-[-100px] md:block hidden h-[382px]' src={sluet} alt="siluet" />

    </section>
    
    <Pencarian/>
    <ImageSlider data={banner}/>  
    <Box data={nuwPeraturan}/>
    <ContainerContens/>
    <SliderMonografi/>
    <Langganan/>
    <Footer/>
    </>
  );
};

export default Home;
