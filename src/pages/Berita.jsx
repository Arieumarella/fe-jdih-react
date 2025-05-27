import { React, useState, useEffect } from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { getBeritaPagination } from "../services/berita.services";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import SplitText from "../components/react-bits/SplitText/SplitText";
import FadeContent from '../components/react-bits/FadeContent/FadeContent';
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
    <div className="flex justify-end items-center my-4 space-x-2 gap-4">
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


const Home = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateHandelClick = (link = '') => {
    navigate(`/${link}`);
    window.scrollTo(0, 0);
  };

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const paginateFunction = async () => {
    await getBeritaPagination(currentPage, search).then((result) => {
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
        const halaman = "Halaman Berita";
        return insertDataPengunjung(ip, halaman);
      })
      .then((response) => {

      })
      .catch((err) => {
        console.error("Terjadi error:", err);
      });
  }, []);

  const formatDate = (dateString = null) => {
    if (dateString == null) {
      return '-'
    }

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6) - 1; // JS bulan mulai dari 0
    const day = dateString.substring(6, 8);

    const date = new Date(year, month, day);
    return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  };

  const truncateWords = (text, limit = 12) => {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };


  return (
    <>
      <MetaData
        title="Berita Terbaru JDIH Kementerian PU | Informasi & Pengumuman Resmi"
        pageDescription="Dapatkan berita, pengumuman, dan artikel terbaru dari JDIH Kementerian PU. Ikuti perkembangan terkini terkait informasi hukum dan peraturan di sektor Pekerjaan Umum."
        pageKeywords="JDIH KemenPU Berita, JDIH PU News, Berita Hukum PU, Artikel JDIH PU, Pengumuman KemenPU, Informasi Hukum Terbaru PU, Perkembangan Peraturan PU, Update JDIH KemenPU, Kementerian Pekerjaan Umum Berita, Berita Resmi JDIH"
        image="https://jdih.pu.go.id/Logogram.png"
      />
      <Headers />

      <section className='h-full bg-slate-100 md:px-[180px] px-5 py-4 '>

        <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4'>
          <SplitText
            text={t("semuaBerita")}
            delay={15}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
          />
        </h1>

        <FadeContent blur={true} duration={400} easing="ease-out" initialOpacity={0}>
          <form onSubmit={(e) => { e.preventDefault(); paginateFunction(); }}>
            <div className="box-border w-full mx-auto my-2 mb-[20px] rounded-lg h-[60px] bg-bluePu shadow-lg flex items-center px-4 md:w-full md:my-2 md:mb-[20px] md:h-[60px] lg:w-[50%] lg:my-4 lg:mb-[50px] lg:h-[70px]">
              {/* 
      Perubahan pada className div di atas:
      - Style mobile (default):
        w-full, my-2, mb-[20px], h-[60px]
      - Style tablet (md:), dibuat sama dengan mobile:
        md:w-full, md:my-2, md:mb-[20px], md:h-[60px]
      - Style laptop/desktop (lg:), menggunakan style md: yang asli:
        lg:w-[50%], lg:my-4, lg:mb-[50px], lg:h-[70px]
    */}
              <input
                type="text"
                placeholder={t("pliceHolderBerita")}
                className="w-full bg-transparent outline-none text-white placeholder-white font-roboto text-lg"
                onInput={(e) => setSearch(e.target.value)}
              />
              <button className="ml-2 w-[90px] bg-kuningButton text-bluePu px-4 py-2 rounded-lg font-roboto font-semibold hover:bg-opacity-80 transition" type='submit'>
                {t("btnCariJudulBerita")}
              </button>
            </div>
          </form>
        </FadeContent>


        <div className='items-center grid grid-cols-1 gap-4 mb-12 md:grid-cols-1 md:gap-4 lg:grid-cols-3 lg:gap-8'>
          {/*
    Perubahan pada className div di atas:
    - Mobile (default): grid-cols-1, gap-4
    - Tablet (md:), sama dengan mobile: md:grid-cols-1, md:gap-4
    - Laptop (lg:), sama dengan md: yang asli: lg:grid-cols-3, lg:gap-8
    - mb-12 dan items-center tetap berlaku untuk semua.
  */}

          {posts?.length > 0 ? (
            posts.map((item, index) => (
              <AnimatedContent
                key={item.id}
                distance={20}
                direction="vertical"
                reverse={false}
                config={{ tension: 45, friction: 15 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
              >
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer"
                  onClick={(e) => { e.preventDefault(); navigateHandelClick("Berita/" + item?.slug + ""); window.scrollTo(0, 0); }}>
                  {/* Gambar */}
                  <div className="w-full h-[180px] overflow-hidden group md:h-[180px] lg:h-[350px]">
                    {/*
              Perubahan pada className div gambar:
              - Mobile (default): h-[180px]
              - Tablet (md:), sama dengan mobile: md:h-[180px]
              - Laptop (lg:), sama dengan md: yang asli: lg:h-[350px]
            */}
                    <img src={`https://jdih.pu.go.id/internal/assets/assets/berita/${item?.gambar_1}`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500" />
                  </div>
                  {/* Konten */}
                  <div className="p-4">
                    {/* Tanggal Terbit */}
                    <p className="text-gray-500 text-[14px] font-semibold md:text-[14px] lg:text-sm">
                      {/*
                Perubahan pada className p tanggal:
                - Mobile (default): text-[14px]
                - Tablet (md:), sama dengan mobile: md:text-[14px]
                - Laptop (lg:), sama dengan md: yang asli: lg:text-sm
              */}
                      {formatDate(item?.tgl_buat)}
                    </p>

                    {/* Judul Berita */}
                    <h3 className="text-bluePu font-roboto font-semibold text-[14px] leading-tight mt-2 hover:text-opacity-70 cursor-pointer md:text-[14px] md:mt-2 lg:text-base lg:mt-1">
                      {/*
                Perubahan pada className h3 judul:
                - Mobile (default): text-[14px], mt-2
                - Tablet (md:), sama dengan mobile: md:text-[14px], md:mt-2
                - Laptop (lg:), sama dengan md: yang asli: lg:text-base, lg:mt-1
              */}
                      {truncateWords(item?.judul)}
                    </h3>

                    {/* Link Selengkapnya & Viewer */}
                    <div className="mt-1 flex justify-end items-center">
                      {/* Jumlah Viewer */}
                      <div className="flex items-center gap-1 text-bluePu text-xs bg-bluePu bg-opacity-15 px-2 py-1 rounded-full font-roboto mt-2 text-[12px] md:mt-2 md:text-[12px] lg:mt-0">
                        {/*
                  Perubahan pada className div viewer:
                  - Mobile (default): mt-2, text-[12px] (ini menimpa text-xs untuk mobile)
                  - Tablet (md:), sama dengan mobile: md:mt-2, md:text-[12px]
                  - Laptop (lg:), sama dengan md: yang asli: lg:mt-0 (text-xs akan berlaku karena tidak ada lg:text-size lain)
                */}
                        <span className="material-symbols-outlined">visibility</span> <span>{item?.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            ))) : (
            <p className='text-center text-slate-100'>Data Kosong</p>
          )}
        </div>


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

export default Home;
