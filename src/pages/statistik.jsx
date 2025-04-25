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
            <section className='h-full bg-slate-100 md:px-[180px] px-5 py-4 '>

                <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-2'>

                    <SplitText
                        text={'Statistik Peraturan'}
                        delay={10}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        easing="easeOutCubic"
                        threshold={0.2}
                    />
                </h1>

                <div className='md:flex justify-between md:w-full w-full gap-4 mx-auto my-2'>
                    <div className="md:w-full w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">

                        <div className='md:flex md:justify-between'>

                            {/* Kiri */}

                            <div className='md:w-[60%] w-full md:h-autonpm np h-[900px] px-2 py-2 text-center'>

                                <VerticalBarChart dataChart={dataPeraturanUnorTotalPeraturan} labels={labelsTotalPeraturan} tittle="Chart Dokumen" className="shadow-lg" />

                            </div>



                            {/* Kanan */}
                            <div className='md:w-[40%] w-full px-2 py-2 text-center'>
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
                                    <h3 className='font-roboto font-semibold md:text-[22px] text-[18px] text-bluePu my-1'>Tabel Rekapitulasi</h3>
                                    <table className="min-w-full divide-y divide-gray-200 md:text-sm text-[12px] font-roboto text-center shadow-lg">
                                        <thead className="bg-gray-100 text-gray-700 text-Center">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Peraturan</th>
                                                <th className="px-6 py-4 font-semibold">Total</th>
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
                                                        Data tidak ditemukan
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


                <div className='md:flex md:justify-between gmd:ap-4 w-full'>

                    <div className='md:w-[49%] w-full gap-4 mx-auto my-6'>
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
                            <div className="md:w-full w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
                                <div className='w-full h-[900px] px-2 py-2 text-center'>
                                    <VerticalBarChart dataChart={dataPeraturanUnor} labels={labels} tittle="Peraturan Unit Organisasi" className="shadow-lg" />
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>

                    <div className='md:w-[49%] w-full gap-4 mx-auto my-6'>
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
                            <div className="md:w-full w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
                                <div className='w-full h-[900px] px-2 py-2 text-center'>
                                    <VerticalBarChart dataChart={dataPeraturanDownload} labels={labelsDownload} tittle="Total Peraturan diunduh" className="shadow-lg" />
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>
                </div>

                <div className='md:flex md:justify-between gmd:ap-4 w-full'>
                    <div className='md:w-[49%] w-full gap-4 mx-auto my-6'>
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
                            <div className="md:w-full w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
                                <div className='w-full h-[900px] px-2 py-2 text-center'>
                                    <VerticalBarChart dataChart={dataPeraturanView} labels={labelsView} tittle="Total Peraturan dilihat" className="shadow-lg" />
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>
                    <div className='md:w-[49%] w-full gap-4 mx-auto my-6'>
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
                            <div className="md:w-full w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
                                <div className='w-full h-[900px] px-2 py-2 text-center'>
                                    <LineChartWithPoints dataChart={[
                                        {
                                            label: "Total Pengunjung",
                                            data: dataTotalPengunjung,
                                            borderColor: "#233b74",
                                            backgroundColor: "#233b74",
                                        }
                                    ]}
                                        labels={labelsTotalpengunjung} tittle="Data Pengunjung" className="shadow-lg" />
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