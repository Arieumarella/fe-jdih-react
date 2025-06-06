import { React, useEffect, useState } from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { getPrasayarat } from "../services/prasyarat.services";
import DOMPurify from "dompurify";
import FadeContent from '../components/react-bits/FadeContent/FadeContent'
import SplitText from "../components/react-bits/SplitText/SplitText";
import { getIpUser, insertDataPengunjung } from "../services/insertDataPengunjung.services";
import { useTranslation } from 'react-i18next';
import MetaData from "../components/metaDataTags";

const Prasyarat = () => {

    const [data, setData] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        getPrasayarat().then((result) => {
            setData(result);
        });

    }, []);

    useEffect(() => {
        getIpUser()
            .then((res) => {
                const ip = res.data.ip;
                const halaman = "Halaman Prasayarat";
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
                title="Prasyarat Layanan JDIH Kementerian PU | Syarat, Ketentuan & Kebijakan Privasi"
                pageDescription="Baca prasyarat, syarat dan ketentuan penggunaan, serta kebijakan privasi layanan JDIH Kementerian PU. Pahami hak, kewajiban pengguna, disclaimer, dan aturan layanan kami."
                pageKeywords="Prasyarat JDIH PU, Syarat dan Ketentuan PU, Kebijakan Privasi KemenPU, Disclaimer JDIH, Terms of Use PU, Ketentuan Layanan KemenPU, Aturan Penggunaan JDIH, Perlindungan Data Pribadi PU, Legal Notice KemenPU"
                image="https://jdih.pu.go.id/Logogram.png" // Gambar default atau banner infografis jika ada
            />
            <Headers />
            <section className='h-full bg-slate-100 py-4'>
                <h1 className="text-center font-roboto font-bold text-bluePu text-[30px] my-2">
                    {/* Ukuran font h1 (text-[30px]) adalah sama untuk semua ukuran layar berdasarkan kode ini.
          Jika ingin ukuran font h1 berbeda untuk laptop, perlu didefinisikan secara eksplisit.
      */}
                    <SplitText
                        text={t("PRASYARAT")}
                        delay={15}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        easing="easeOutCubic"
                        threshold={0.2}
                    />
                </h1>

                <FadeContent blur={true} duration={400} easing="ease-out" initialOpacity={0}>
                    <div className="w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300 my-2 md:w-[95%] lg:w-[70%]">
                        {/*
          Penjelasan Perubahan pada className div ini:
          - Mobile (default): w-[95%]
          - Tablet (md:), disamakan dengan mobile: md:w-[95%]
          - Laptop (lg:), mengambil style md:w-[70%] yang asli: lg:w-[70%]
          - Kelas lain (mx-auto, bg-white, shadow-lg, dll.) tetap berlaku untuk semua ukuran.
        */}
                        <div className="font-normal font-roboto text-slate-600 text-[18px] p-2 text-justify">
                            {/* Ukuran font konten (text-[18px]) juga sama untuk semua ukuran layar. */}
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.data?.data?.widgetcontent) }} />
                            <div className='mt-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.data?.data?.widgetmore) }} />
                        </div>
                    </div>
                </FadeContent>
            </section>
            <Langganan />
            <Footer />
        </>
    );
};

export default Prasyarat;
