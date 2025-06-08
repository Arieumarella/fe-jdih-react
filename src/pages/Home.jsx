import React, { useEffect, useState } from 'react';
import Headers from "../components/Header";
import Pencarian from "../components/Pencarian";
import ImageSlider from "../components/imageSlider";
import Box from "../components/Box";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import ContainerContens from "../components/containerContens";
import SliderMonografi from "../components/sliderMonografi";
import MetaData from "../components/metaDataTags";
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
      <MetaData
        title="Home - JDIH Kementerian PU"
        description="JDIH - Jaringan Dokumentasi dan Informasi Hukum Kementerian Pekerjaan Umum"
        keywords="JDIH PU, Peraturan PU, Hukum PU, Hukum PUPR, Jaringan Dokumentasi Informasi Hukum PU, Produk Hukum PU, Website JDIH PU, Kementerian Pekerjaan Umum, Kementerian PU, Cari Peraturan PU"
        image="https://jdih.pu.go.id/Logogram.png"
      />

      <Headers />
      <section className='w-full py-2 sm:mt-[0px] md:mt-[0px] lg:mt-[20px] flex flex-col lg:flex-row justify-between items-start gap-6 px-4 lg:px-[60px]'>
        {/* 1. Mengubah md:flex-row menjadi lg:flex-row */}
        {/* 2. Mengubah md:px-[60px] menjadi lg:px-[60px] untuk padding section */}

        {/* Kiri: Teks Sambutan */}
        {/* Lebar: Penuh di mobile dan tablet, 2/3 di lg ke atas */}
        <div className='group w-full lg:w-2/3'>
          {/* 3. Mengubah md:w-2/3 menjadi lg:w-2/3 */}
          <h1 className='font-medium text-slate-100 text-[35px] lg:text-[73px] gap-2 font-onest flex flex-wrap'>
            {/* 4. Mengubah md:text-[96px] menjadi lg:text-[96px] */}
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
          <h2 className='font-normal font-onest text-slate-100 text-[21px] lg:text-[40px] lg:mt-[-15px]'>
            {/* 5. Mengubah md:text-[45px] dan md:mt-[-15px] menjadi lg:text-[45px] dan lg:mt-[-15px] */}
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
          <p className='font-light font-roboto text-slate-100 py-1 text-[15px] lg:text-[18px] mt-[5px]'>
            {/* 6. Mengubah md:text-[18px] menjadi lg:text-[18px] */}
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
        {/* Lebar: Penuh di mobile dan tablet, 60% di lg ke atas */}
        {/* Kelas visibilitas disederhanakan: selalu block (terlihat), layout diatur oleh parent flex */}
        <div className='w-full lg:w-[60%] lg:max-w-[1000px]'>
          {/* 7. Mengubah md:w-[60%] dan md:max-w-[1000px] menjadi lg:w-[60%] dan lg:max-w-[1000px] */}
          {/* 8. Menghapus kelas visibilitas md:hidden sm:block lg:block yang rumit. */}
          {/*    Karena parentnya flex-col secara default, dan lg:flex-row, slider akan otomatis di bawah */}
          {/*    di mobile/tablet, dan di kanan pada lg. */}
          <ImageSlider data={banner} />
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
