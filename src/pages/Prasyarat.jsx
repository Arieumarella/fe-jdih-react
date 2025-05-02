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
            <Headers />
            <section className='h-full bg-slate-100 py-4'>


                <h1 className="text-center font-roboto font-bold text-bluePu text-[30px] my-2">
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
                    <div className="md:w-[70%] w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300 my-2">

                        <div className="font-normal font-roboto text-slate-600 text-[18px] p-2 text-justify">
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
