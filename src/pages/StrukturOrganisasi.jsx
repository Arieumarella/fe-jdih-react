import { React, useEffect, useState } from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import FadeContent from '../components/react-bits/FadeContent/FadeContent'
import SplitText from "../components/react-bits/SplitText/SplitText";
import { getTentangKami } from "../services/tentangKami.services"
import { getIpUser, insertDataPengunjung } from "../services/insertDataPengunjung.services";
import { useTranslation } from 'react-i18next';

const StrukturOrganisasi = () => {

  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    getTentangKami().then((result) => {
      setData(result);
    });

    getIpUser()
      .then((res) => {
        const ip = res.data.ip;
        const halaman = "Halaman Struktur Organisasi";
        return insertDataPengunjung(ip, halaman);
      })
      .then((response) => {

      })
      .catch((err) => {
        console.error("Terjadi error:", err);
      });

  }, []);

  console.log(data)

  return (
    <>
      <Headers />
      <section className='h-full bg-slate-100 py-4'>
        <FadeContent blur={true} duration={400} easing="ease-out" initialOpacity={0}>
          <div className='w-full gap-4 mx-auto my-4 md:w-full lg:flex lg:justify-between lg:w-[80%]'>
            {/*
        Perubahan pada div terluar (wrapper):
        - Mobile (default): w-full (block by default)
        - Tablet (md:), disamakan dengan mobile: md:w-full (block by default)
        - Laptop (lg:), mengambil style md: yang asli: lg:flex, lg:justify-between, lg:w-[80%]
      */}

            <div className="w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300 md:w-[95%] lg:w-[80%]">
              {/*
          Perubahan pada div card (konten):
          - Mobile (default): w-[95%]
          - Tablet (md:), disamakan dengan mobile: md:w-[95%]
          - Laptop (lg:), mengambil style md: yang asli: lg:w-[80%]
        */}

              {/* Judul */}
              <h1 className="text-center font-roboto font-bold text-bluePu text-[23px] py-4 md:text-[23px] lg:text-[30px]">
                {/*
            Perubahan pada h1 Judul:
            - Mobile (default): text-[23px]
            - Tablet (md:), disamakan dengan mobile: md:text-[23px]
            - Laptop (lg:), mengambil style md: yang asli: lg:text-[30px]
          */}
                <SplitText
                  text={t("STRUKTURORGANISASI")}
                  delay={15}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  easing="easeOutCubic"
                  threshold={0.2}
                />
              </h1>

              <div className="my-4 p-4 font-roboto text-slate-600 text-justify">
                <p>Organisasi JDIH Kementerian PU sesuai dengan Peraturan Menteri Pekerjaan Umum dan Perumahan Rakyat Nomor 31/PRT/M/2016 Tentang Jaringan Dokumentasi dan Informasi Hukum Kementerian Pekerjaan Umum dan Perumahan Rakyat, terdiri dari:</p>
                <p className="mt-4">1. Pusat JDIH yaitu Biro Hukum Sekretariat Jenderal.</p>
                <p className="mt-4">2. Anggota JDIH yaitu Unit Kerja yang memiliki tugas dan fungsi pengelolaan JDIH PU di Unit Organisasi.</p>
              </div>

              <img src="/StrukturOrganisasi.png" alt="image struktur organisasi" className="w-auto mx-auto" />

            </div>
          </div>
        </FadeContent>
      </section>
      <Langganan />
      <Footer />
    </>
  );
};

export default StrukturOrganisasi;
