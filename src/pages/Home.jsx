import React, {useEffect, useState} from 'react';
import Headers from "../components/Header";
import Pencarian from "../components/pencarian";
import ImageSlider from "../components/imageSlider";
import Box from "../components/Box";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import ContainerContens from "../components/containerContens";
import SliderMonografi from "../components/sliderMonografi";
import sluet from "../assets/siluet-home.png";
import { getBanner, getNuwPeraturan } from '../services/home.services';


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
        <h1 className='font-medium text-slate-100 text-[35px] md:text-[96px] font-onest'>Selamat <div className='text-kuningButton inline-block'>Datang</div></h1>
        <h2 className='font-normal font-onest text-slate-100 py- text-[21px] md:text-[45px] md:mt-[-15px]'>Di Website Jaringan Dokumentasi <br/> dan Informasi Hukum <br/> Kementerian PU</h2>
        <p className='font-light font-roboto text-slate-100 py-1 text-[15px] md:text-[18px] mt-[50px]'>Sabtu - 6 - Juni - 2024 - 06.06</p>
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
