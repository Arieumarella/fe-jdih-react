import { React, useState, useEffect } from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import CardAgenda from "../components/CardAgenda";
import { useNavigate } from "react-router-dom";
import { getAgendaPagination } from "../services/agenda.services";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import SplitText from "../components/react-bits/SplitText/SplitText";
import { getIpUser, insertDataPengunjung } from "../services/insertDataPengunjung.services";
import { useTranslation } from 'react-i18next';
import MetaData from "../components/metaDataTags";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const generatePageNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    let pages = [];
    if (currentPage <= 3) {
      pages = [1, 2, 3, 4, "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    }
    return pages;
  };

  return (
    <div className="flex justify-end items-center my-4 space-x-2 gap-4 md:w-[85%]">
      <span className="font-medium font-roboto md:text-[30px] text-[14px]">Halaman</span>
      <div className="flex space-x-2 font-roboto md:text-[18px] text-[14px]">
        <button
          className={`md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>

        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            className={`md:px-4 px-3 md:py-2 py-1 rounded-lg shadow-md transition ${currentPage === page
              ? "bg-bluePu text-kuningButton"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className={`md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const Agenda = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateHandelClick = (link = '') => {
    navigate(`/${link}`);
    window.scrollTo(0, 0);
  };

  let [posts, setPosts] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);
  let [search, setSearch] = useState('');

  const paginateFunction = async () => {
    await getAgendaPagination(currentPage, search).then((result) => {
      setPosts(result.data.posts);
      setTotalPages(result.data.totalPages);
      setCurrentPage(result.data.currentPage);
    });
  }

  useEffect(() => {
    paginateFunction();
  }, [currentPage]);

  useEffect(() => {
    getIpUser()
      .then((res) => {
        const ip = res.data.ip;
        const halaman = "Halaman Agenda";
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
        title="Agenda Kegiatan & Jadwal Terbaru JDIH Kementerian PU | Info Acara Resmi"
        pageDescription="Dapatkan update jadwal dan agenda kegiatan resmi JDIH Kementerian PU. Ikuti informasi seminar, konsultasi publik, workshop, dan acara penting lainnya di bidang hukum pekerjaan umum."
        pageKeywords="Agenda JDIH PU, Jadwal KemenPU, Kalender Kegiatan PU, Seminar Hukum PU, Workshop KemenPU, Acara JDIH PU, Kegiatan Kementerian Pekerjaan Umum, Jadwal Konsultasi Publik PU, Event JDIH PU"
        image="https://jdih.pu.go.id/Logogram.png"
      />



      <Headers />

      <section className='h-full bg-slate-100 px-5 py-4 md:px-5 lg:px-[180px]'>
        {/*
    Perubahan pada className section:
    - Mobile (default): px-5
    - Tablet (md:), disamakan dengan mobile: md:px-5
    - Laptop (lg:), mengambil style md:px-[180px] yang asli: lg:px-[180px]
  */}
        <h1 className='text-center font-roboto font-bold text-bluePu text-[23px] py-4 md:text-[23px] lg:text-[35px]'>
          {/*
      Perubahan pada className h1:
      - Mobile (default): text-[23px]
      - Tablet (md:), disamakan dengan mobile: md:text-[23px]
      - Laptop (lg:), mengambil style md:text-[35px] yang asli: lg:text-[35px]
    */}
          <SplitText
            text={t("agenda")}
            delay={15}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
          />
        </h1>

        {posts?.length > 0 ? (
          posts.map((item, index) => (
            <AnimatedContent
              key={item.id} // Key sebaiknya ada di elemen terluar dalam loop
              distance={100}
              delay={200}
              direction="horizontal"
              reverse={index % 2 === 0}
              config={{ tension: 400, friction: 100 }}
              initialOpacity={0}
              animateOpacity
              scale={1.0}
              threshold={0.1}
            >
              <CardAgenda data={item} />
            </AnimatedContent>
          ))) : (
          <p className='text-center text-slate-100'>Data Kosong</p>
        )}

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </section>

      <Langganan />
      <Footer />
    </>
  );
};

export default Agenda;
