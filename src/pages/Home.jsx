import React, { useEffect, useState } from 'react';
import Headers from "../components/Header";
import Pencarian from "../components/Pencarian";
import ImageSlider from "../components/imageSlider";
import Box from "../components/Box";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import ContainerContens from "../components/containerContens";
import SliderMonografi from "../components/sliderMonografi";
import sluet from "/lady of justice.png";
import { getBanner, getNuwPeraturan } from '../services/home.services';
import BlurText from "../components/react-bits/BlurText/BlurText";
import SplitText from "../components/react-bits/SplitText/SplitText";
import { getIpUser, insertDataPengunjung } from "../services/insertDataPengunjung.services";
import { useTranslation } from 'react-i18next';


export function getFormattedWaktu() {
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const now = new Date();
  const namaHari = hari[now.getDay()];
  const tanggal = now.getDate();
  const namaBulan = bulan[now.getMonth()];
  const tahun = now.getFullYear();
  const jam = String(now.getHours()).padStart(2, '0');
  const menit = String(now.getMinutes()).padStart(2, '0');

  return `${namaHari} - ${tanggal} - ${namaBulan} - ${tahun} - ${jam}.${menit}`;
}

const galleryData = [
  { path_file: '/1.jpg' },
  { path_file: '/1.jpg' },
  { path_file: '/atas-pu.jpg' }
];

const Home = () => {

  const [banner, setBanner] = useState([]);
  const [nuwPeraturan, setNuwPeraturan] = useState([]);
  const { t, i18n } = useTranslation();
  let waktuSaatIni = getFormattedWaktu();


  useEffect(() => {

    // Data Nammer
    getBanner().then((result) => {
      setBanner(result);
    });

    // get Nuw Peraturan
    getNuwPeraturan().then((result) => {
      setNuwPeraturan(result);
    });

    getIpUser()
      .then((res) => {
        const ip = res.data.ip;
        const halaman = "Halaman Utama";
        return insertDataPengunjung(ip, halaman);
      })
      .then((response) => {

      })
      .catch((err) => {
        console.error("Terjadi error:", err);
      });

  }, []);



  return (
    <>
      <Headers />
      <section className='w-full py-4 mt-[20px] flex flex-col md:flex-row justify-between items-start gap-6 px-4 md:px-[60px]'>
        {/* Kiri: Teks Sambutan */}
        <div className='group w-full md:w-2/3'>
          <h1 className='font-medium text-slate-100 text-[35px] md:text-[96px] font-onest flex gap-2'>
            <BlurText
              text={t('homeSelmat')}
              delay={200}
              animateBy="words"
              direction="top"
              className='inline-block'
            />
            <BlurText
              text={t('homeDatang')}
              delay={50}
              animateBy="words"
              direction="top"
              className='text-kuningButton inline-block'
            />
          </h1>
          <h2 className='font-normal font-onest text-slate-100 text-[21px] md:text-[45px] md:mt-[-15px]'>
            <SplitText
              text={t('homeDiJdih')}
              delay={25}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
            />
            <br />
            <SplitText
              text={t('homeDiJdih2')}
              delay={25}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
            />
            <br />
            <SplitText
              text={t('homeDiJdih3')}
              delay={25}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
            />
          </h2>
          <p className='font-light font-roboto text-slate-100 py-1 text-[15px] md:text-[18px] mt-[5px]'>
            <BlurText
              text={waktuSaatIni}
              delay={10}
              animateBy="words"
              direction="bottom"
            />
          </p>
          <Pencarian />
        </div>

        {/* Kanan: Image Slider */}
        <div className='w-full md:w-3/5w-full md:w-[60%] md:max-w-[1000px]'>
          <ImageSlider data={galleryData} />
        </div>
      </section>
      <Box data={nuwPeraturan} />
      <ContainerContens />
      <SliderMonografi />
      <Langganan />
      <Footer />
    </>
  );
};

export default Home;
