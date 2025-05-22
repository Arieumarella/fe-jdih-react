import { React, useState, useEffect } from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { getArtikelPagination } from "../services/artikel.services";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import SplitText from "../components/react-bits/SplitText/SplitText";
import FadeContent from '../components/react-bits/FadeContent/FadeContent';
import { getIpUser, insertDataPengunjung } from "../services/insertDataPengunjung.services";
import { useTranslation } from 'react-i18next';

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

const formatedDate = (datetimeString = null) => {
  if (!/^\d{14}$/.test(datetimeString)) {
    return "Format tidak valid (harus 14 digit: YYYYMMDDHHmmss)";
  }

  const year = datetimeString.slice(0, 4);
  const month = datetimeString.slice(4, 6);
  const day = datetimeString.slice(6, 8);

  const date = new Date(`${year}-${month}-${day}`);

  const bulan = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);

  return `${day} - ${bulan} - ${year}`;
}

const Artikel = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const terminateText = (str = null) => {
    return str.length > 130 ? str.substring(0, 130) + "..." : str;
  }

  const navigateHandelClick = (link = '') => {
    navigate(`/${link}`);
  };

  let [posts, setPosts] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);
  let [search, setSearch] = useState('');

  const paginateFunction = async () => {
    await getArtikelPagination(currentPage, search).then((result) => {
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
        const halaman = "Halaman Artikel";
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

      <section className='h-full bg-slate-100 px-5 py-4 md:px-5 lg:px-[300px]'>
        {/*
    Perubahan pada className section:
    - Mobile (default): px-5
    - Tablet (md:), disamakan dengan mobile: md:px-5
    - Laptop (lg:), mengambil style md:px-[300px] yang asli: lg:px-[300px]
  */}

        <h1 className='text-center font-roboto font-bold text-bluePu text-[23px] py-4 md:text-[23px] lg:text-[35px]'>
          {/*
      Perubahan pada className h1:
      - Mobile (default): text-[23px]
      - Tablet (md:), disamakan dengan mobile: md:text-[23px]
      - Laptop (lg:), mengambil style md:text-[35px] yang asli: lg:text-[35px]
    */}
          <SplitText
            text={t("semuaArtikel")}
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
          Perubahan pada className div search bar:
          - Mobile: w-full, my-2, mb-[20px], h-[60px]
          - Tablet (md): md:w-full, md:my-2, md:mb-[20px], md:h-[60px]
          - Laptop (lg): lg:w-[50%], lg:my-4, lg:mb-[50px], lg:h-[70px]
        */}
              <input
                type="text"
                placeholder={t("pliceHolderArtikel")}
                className="w-full bg-transparent outline-none text-white placeholder-white font-roboto text-lg"
                onInput={(e) => setSearch(e.target.value)}
              />
              <button className="ml-2 w-[90px] bg-kuningButton text-bluePu px-4 py-2 rounded-lg font-roboto font-semibold hover:bg-opacity-80 transition"
                type='submit'
              >
                {t("btnCariJudulArtikel")}
              </button>
            </div>
          </form>
        </FadeContent>

        <div className='items-center grid grid-cols-1 gap-4 mb-12 md:grid-cols-1 md:gap-4 lg:grid-cols-3 lg:gap-10'>
          {/*
      Perubahan pada className div grid container:
      - Mobile: grid-cols-1, gap-4
      - Tablet (md): md:grid-cols-1, md:gap-4
      - Laptop (lg): lg:grid-cols-3, lg:gap-10
    */}

          {posts?.length > 0 ? (
            posts.map((item, index) => ( // Gunakan item.id jika ada dan unik, jika tidak, index adalah fallback
              <AnimatedContent
                key={item.id || index} // Prefer item.id if available and unique
                distance={20}
                direction="vertical"
                reverse={false}
                config={{ tension: 45, friction: 15 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
              >
                <div
                  className="group relative cursor-pointer transition-transform duration-500 hover:scale-[1.05] hover:shadow-2xl"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateHandelClick(`artikel/${item.slug}`);
                    window.scrollTo(0, 0);
                  }}
                // key di sini (jika AnimatedContent hanya Fragment) atau di AnimatedContent.
                // Karena sudah ada di AnimatedContent, ini bisa dihilangkan kecuali ada alasan spesifik.
                // Saya akan menghapusnya dari sini karena key sudah ada di AnimatedContent
                >
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-300 aspect-[3/4] md:aspect-[3/4] lg:aspect-[4/4]">
                    {/*
                Perubahan pada className div card image container:
                - Mobile: aspect-[3/4]
                - Tablet (md): md:aspect-[3/4]
                - Laptop (lg): lg:aspect-[4/4] (dari md:aspect-[4/4] asli)
              */}
                    {/* Gambar Background */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url("${item?.gambar || './1.jpg'}")` }} // Menggunakan item.gambar jika ada
                    ></div>

                    {/* Overlay Gradasi */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Kotak Keterangan */}
                    <div className="absolute bottom-0 left-0 w-full p-4 text-center text-white">
                      <p className="font-semibold text-lg line-clamp-2 md:text-lg lg:text-xl">{terminateText(item?.judul)}</p>
                      {/*
                  Perubahan pada className p judul card:
                  - Mobile: text-lg
                  - Tablet (md): md:text-lg
                  - Laptop (lg): lg:text-xl (dari md:text-xl asli)
                */}
                      <p className="mt-1 text-sm text-gray-300 md:text-sm lg:text-base">{formatedDate(item?.tanggal)}</p>
                      {/*
                  Perubahan pada className p tanggal card:
                  - Mobile: text-sm
                  - Tablet (md): md:text-sm
                  - Laptop (lg): lg:text-base (dari md:text-base asli)
                */}
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

}

export default Artikel;