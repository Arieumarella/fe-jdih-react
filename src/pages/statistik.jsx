import { React, useState, useEffect } from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { getTotalPeraturan, getTotalPeraturanUnor, getTotalPeraturanDownload, getTotalViewPeraturan, getTotalPengunjung } from "../services/statistik.services";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import VerticalBarChart from '../components/VerticalBarChart';
import LineChartWithPoints from '../components/LineChartWithPoints';
import SplitText from "../components/react-bits/SplitText/SplitText";
import { getIpUser, insertDataPengunjung } from "../services/insertDataPengunjung.services";
import { useTranslation } from 'react-i18next';

const Statistik = () => {

    let [dataTotalPeraturan, setDataTotalPeraturan] = useState([]);

    let [labelsTotalPeraturan, setLabelsTotalPeraturan] = useState([]);
    let [dataPeraturanUnorTotalPeraturan, setDataPeraturanUnorTotalPeraturan] = useState([]);

    let [labels, setLabels] = useState([]);
    let [dataPeraturanUnor, setDataPeraturanUnor] = useState([]);

    let [labelsDownload, setLabelsDownload] = useState([]);
    let [dataPeraturanDownload, setDataPeraturanDownload] = useState([]);

    let [labelsView, setLabelsView] = useState([]);
    let [dataPeraturanView, setDataPeraturanView] = useState([]);

    let [labelsTotalpengunjung, setLabelsTotalpengunjung] = useState([]);
    let [dataTotalPengunjung, setDataTotalPengunjung] = useState([]);
    const { t } = useTranslation();


    useEffect(() => {
        getTotalPeraturan().then((result) => {
            setDataTotalPeraturan(result);
            let labelsTotalPeraturan = result?.map(item => item.percategorycode || "Tidak diketahui");
            let dataTotalPeraturan = result?.map(item => parseInt(item.jml_peraturan));
            setLabelsTotalPeraturan(labelsTotalPeraturan);
            setDataPeraturanUnorTotalPeraturan(dataTotalPeraturan);
        });

        getTotalPeraturanUnor().then((result) => {
            let labels = result?.map(item => item.deptcode || "Tidak diketahui");
            let data = result?.map(item => parseInt(item.tot_dok));
            setLabels(labels);
            setDataPeraturanUnor(data);
        });

        getTotalPeraturanDownload().then((result) => {
            let labelsDownloadx = result?.map(item => item.percategorycode || "Tidak diketahui");
            let dataDownload = result?.map(item => parseInt(item.jml_download));
            setLabelsDownload(labelsDownloadx);
            setDataPeraturanDownload(dataDownload);
        });

        getTotalViewPeraturan().then((result) => {
            let labelsViewx = result?.map(item => item.percategorycode || "Tidak diketahui");
            let dataView = result?.map(item => parseInt(item.jml_view));
            setLabelsView(labelsViewx);
            setDataPeraturanView(dataView);
        });

        getTotalPengunjung().then((result) => {
            let labelsTotalPengunjung = result?.map(item => item.nama_bulan || "Tidak diketahui");
            let dataTotalPengunjung = result?.map(item => parseInt(item.tot_pengunjung));
            setLabelsTotalpengunjung(labelsTotalPengunjung);
            setDataTotalPengunjung(dataTotalPengunjung);
        });

        getIpUser()
            .then((res) => {
                const ip = res.data.ip;
                const halaman = "Halaman Statistik";
                return insertDataPengunjung(ip, halaman);
            })
            .then((response) => {

            })
            .catch((err) => {
                console.error("Terjadi error:", err);
            });


    }, []);



    return (
        <div>
            <Headers />
            <section className='h-full bg-slate-100 px-5 py-4 md:px-5 lg:px-[180px]'>
                {/*
      SECTION:
      - Mobile: px-5
      - Tablet (md): md:px-5
      - Laptop (lg): lg:px-[180px] (dari md:px-[180px] asli)
    */}
                <h1 className='text-center font-roboto font-bold text-bluePu text-[23px] py-2 md:text-[23px] lg:text-[35px]'>
                    {/*
        H1:
        - Mobile: text-[23px]
        - Tablet (md): md:text-[23px]
        - Laptop (lg): lg:text-[35px] (dari md:text-[35px] asli)
      */}
                    <SplitText
                        text={t("statistikPengunjungPage")}
                        delay={10}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        easing="easeOutCubic"
                        threshold={0.2}
                    />
                </h1>

                <div className='w-full gap-4 mx-auto my-2 md:w-full lg:flex lg:justify-between lg:w-full'>
                    {/*
        FIRST MAIN CONTENT WRAPPER (Chart Kiri + Tabel Kanan):
        - Mobile: w-full (block default)
        - Tablet (md): md:w-full (block default)
        - Laptop (lg): lg:flex lg:justify-between lg:w-full (dari md:flex justify-between md:w-full asli)
      */}
                    <div className="w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300 md:w-[95%] lg:w-full">
                        {/*
          CARD (Pembungkus Chart Kiri + Tabel Kanan):
          - Mobile: w-[95%]
          - Tablet (md): md:w-[95%]
          - Laptop (lg): lg:w-full (dari md:w-full asli, yang sekarang diinterpretasikan sebagai lg:w-full)
        */}
                        <div className='md:block lg:flex lg:justify-between'>
                            {/*
            INNER LAYOUT (untuk chart kiri dan tabel kanan):
            - Mobile: block default
            - Tablet (md): md:block (tidak ada md:flex asli, jadi tetap block)
            - Laptop (lg): lg:flex lg:justify-between (dari md:flex md:justify-between asli)
          */}

                            {/* Kiri - Chart */}
                            <div className='w-full h-[900px] px-2 py-2 text-center md:w-full md:h-[900px] lg:w-[60%] lg:h-auto'>
                                {/*
              LEFT CHART CONTAINER:
              - Width: w-full (mob), md:w-full (tab), lg:w-[60%] (lap, dari md:w-[60%] asli)
              - Height: h-[900px] (mob), md:h-[900px] (tab), lg:h-auto (lap, dari md:h-auto - mengasumsikan typo md:h-autonpm np)
            */}
                                <VerticalBarChart dataChart={dataPeraturanUnorTotalPeraturan} labels={labelsTotalPeraturan} tittle="Chart Dokumen" className="shadow-lg" />
                            </div>

                            {/* Kanan - Tabel */}
                            <div className='w-full px-2 py-2 text-center md:w-full lg:w-[40%]'>
                                {/*
              RIGHT TABLE CONTAINER:
              - Width: w-full (mob), md:w-full (tab), lg:w-[40%] (lap, dari md:w-[40%] asli)
            */}
                                <AnimatedContent
                                    distance={150}
                                    delay={100}
                                    direction="horizontal"
                                    reverse={false}
                                    config={{ tension: 400, friction: 100 }}
                                    initialOpacity={0}
                                    animateOpacity
                                    scale={1.0}
                                    threshold={0.1}
                                >
                                    <h3 className='font-roboto font-semibold text-[18px] text-bluePu my-1 md:text-[18px] lg:text-[22px]'>{t("statistikTabelRekapitulasi")}</h3>
                                    {/*
                TABLE H3:
                - Mobile: text-[18px]
                - Tablet (md): md:text-[18px]
                - Laptop (lg): lg:text-[22px] (dari md:text-[22px] asli)
              */}
                                    <table className="min-w-full divide-y divide-gray-200 text-[12px] font-roboto text-center shadow-lg md:text-[12px] lg:text-sm">
                                        {/*
                  TABLE:
                  - Mobile: text-[12px]
                  - Tablet (md): md:text-[12px]
                  - Laptop (lg): lg:text-sm (dari md:text-sm asli)
                */}
                                        <thead className="bg-gray-100 text-gray-700 text-Center">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">{t("statistikPeraturan")}</th>
                                                <th className="px-6 py-4 font-semibold">{t("statistikTotal")}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 bg-white">
                                            {dataTotalPeraturan?.length > 0 ? (
                                                dataTotalPeraturan?.map((item, index) => (
                                                    <tr className="hover:bg-gray-50 transition duration-200" key={index}>
                                                        <td className="px-6 py-4 font-medium text-gray-900">{item?.percategorycode}</td>
                                                        <td className="px-6 py-4 text-gray-600">{item?.jml_peraturan}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2" className="px-6 py-4 text-gray-600">
                                                        {t("statistikDataTIdakDitemukan")}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </AnimatedContent>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BARIS KEDUA CHART (2 chart) */}
                <div className='w-full md:block lg:flex lg:justify-between lg:gap-4'>
                    {/*
        SECOND ROW WRAPPER (2 charts):
        - Mobile: w-full (block default)
        - Tablet (md): md:block (karena md:flex asli, tapi kita mau mobile look)
        - Laptop (lg): lg:flex lg:justify-between lg:gap-4 (dari md:flex md:justify-between md:gap-4 asli - mengasumsikan typo gmd:ap-4)
      */}
                    <div className='w-full gap-4 mx-auto my-6 md:w-full lg:w-[49%]'>
                        {/*
          LEFT CHART CONTAINER (SECOND ROW):
          - Width: w-full (mob), md:w-full (tab), lg:w-[49%] (lap, dari md:w-[49%] asli)
        */}
                        <AnimatedContent
                            distance={150}
                            delay={100}
                            direction="horizontal"
                            reverse={true}
                            config={{ tension: 400, friction: 100 }}
                            initialOpacity={0}
                            animateOpacity
                            scale={1.0}
                            threshold={0.1}
                        >
                            <div className="w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300 md:w-[95%] lg:w-full">
                                {/*
              CARD (SECOND ROW, LEFT):
              - Width: w-[95%] (mob), md:w-[95%] (tab), lg:w-full (lap, dari md:w-full asli)
            */}
                                <div className='w-full h-[900px] px-2 py-2 text-center'>
                                    <VerticalBarChart dataChart={dataPeraturanUnor} labels={labels} tittle={t("statistikPeraturanUnitOrganisasi")} className="shadow-lg" />
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>

                    <div className='w-full gap-4 mx-auto my-6 md:w-full lg:w-[49%]'>
                        {/*
          RIGHT CHART CONTAINER (SECOND ROW):
          - Width: w-full (mob), md:w-full (tab), lg:w-[49%] (lap, dari md:w-[49%] asli)
        */}
                        <AnimatedContent
                            distance={150}
                            delay={100}
                            direction="horizontal"
                            reverse={false}
                            config={{ tension: 400, friction: 100 }}
                            initialOpacity={0}
                            animateOpacity
                            scale={1.0}
                            threshold={0.1}
                        >
                            <div className="w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300 md:w-[95%] lg:w-full">
                                {/*
              CARD (SECOND ROW, RIGHT):
              - Width: w-[95%] (mob), md:w-[95%] (tab), lg:w-full (lap, dari md:w-full asli)
            */}
                                <div className='w-full h-[900px] px-2 py-2 text-center'>
                                    <VerticalBarChart dataChart={dataPeraturanDownload} labels={labelsDownload} tittle={t("statistikTotalPeraturandiunduh")} className="shadow-lg" />
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>
                </div>

                {/* BARIS KETIGA CHART (2 chart) */}
                <div className='w-full md:block lg:flex lg:justify-between lg:gap-4'>
                    {/*
        THIRD ROW WRAPPER (2 charts):
        - Mobile: w-full (block default)
        - Tablet (md): md:block (karena md:flex asli, tapi kita mau mobile look)
        - Laptop (lg): lg:flex lg:justify-between lg:gap-4 (dari md:flex md:justify-between md:gap-4 asli - mengasumsikan typo gmd:ap-4)
      */}
                    <div className='w-full gap-4 mx-auto my-6 md:w-full lg:w-[49%]'>
                        {/*
          LEFT CHART CONTAINER (THIRD ROW):
          - Width: w-full (mob), md:w-full (tab), lg:w-[49%] (lap, dari md:w-[49%] asli)
        */}
                        <AnimatedContent
                            distance={150}
                            delay={100}
                            direction="horizontal"
                            reverse={true}
                            config={{ tension: 400, friction: 100 }}
                            initialOpacity={0}
                            animateOpacity
                            scale={1.0}
                            threshold={0.1}
                        >
                            <div className="w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300 md:w-[95%] lg:w-full">
                                {/*
              CARD (THIRD ROW, LEFT):
              - Width: w-[95%] (mob), md:w-[95%] (tab), lg:w-full (lap, dari md:w-full asli)
            */}
                                <div className='w-full h-[900px] px-2 py-2 text-center'>
                                    <VerticalBarChart dataChart={dataPeraturanView} labels={labelsView} tittle={t("statistikTotalPeraturandilihat")} className="shadow-lg" />
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>
                    <div className='w-full gap-4 mx-auto my-6 md:w-full lg:w-[49%]'>
                        {/*
          RIGHT CHART CONTAINER (THIRD ROW):
          - Width: w-full (mob), md:w-full (tab), lg:w-[49%] (lap, dari md:w-[49%] asli)
        */}
                        <AnimatedContent
                            distance={150}
                            delay={100}
                            direction="horizontal"
                            reverse={false}
                            config={{ tension: 400, friction: 100 }}
                            initialOpacity={0}
                            animateOpacity
                            scale={1.0}
                            threshold={0.1}
                        >
                            <div className="w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300 md:w-[95%] lg:w-full">
                                {/*
              CARD (THIRD ROW, RIGHT):
              - Width: w-[95%] (mob), md:w-[95%] (tab), lg:w-full (lap, dari md:w-full asli)
            */}
                                <div className='w-full h-[900px] px-2 py-2 text-center'>
                                    <LineChartWithPoints dataChart={[
                                        {
                                            label: "Total Pengunjung",
                                            data: dataTotalPengunjung,
                                            borderColor: "#233b74",
                                            backgroundColor: "#233b74",
                                        }
                                    ]}
                                        labels={labelsTotalpengunjung} tittle={t("statistikTotalPengunjung")} className="shadow-lg" />
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>
                </div>
            </section >
            <Langganan />
            <Footer />
        </div >
    );
};

export default Statistik;