import { React, useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import Headers from "../components/Header"; // Pastikan path ini benar
import Langganan from "../components/Langganan"; // Pastikan path ini benar
import Footer from "../components/Footer"; // Pastikan path ini benar
import Card from "../components/Card"; // Pastikan path ini benar
import { getJenisPeraturan, getDataSubstansi, getPeraturanPagination, getUnor, addDownload } from "../services/search.services"; // Pastikan path ini benar
import { Atom } from 'react-loading-indicators';
import { peraturanBySingkata } from "../assets/object/peraturanBySingkata"; // Pastikan path ini benar dan objeknya valid
import Modal from '../components/modal'; // Pastikan path ini benar
import ModalAi from '../components/modal-chatAi'; // Pastikan path ini benar
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent'; // Pastikan path ini benar
import FadeContent from '../components/react-bits/FadeContent/FadeContent'; // Pastikan path ini benar
import SplitText from "../components/react-bits/SplitText/SplitText"; // Pastikan path ini benar
import { getIpUser, insertDataPengunjung } from "../services/insertDataPengunjung.services"; // Pastikan path ini benar
import { useTranslation } from 'react-i18next';

// Fungsi untuk mendapatkan array tahun dari tahun tertentu hingga tahun sekarang
function getYearsArray(startYear = 2019) {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
}

const arrayTahun = getYearsArray();

// Komponen Pagination
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const generatePageNumbers = () => {
    if (totalPages <= 1) return []; // Jika hanya 1 halaman, tidak perlu angka
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

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-end items-center my-4 space-x-2 gap-4 w-full md:w-[70%] mx-auto">
      <span className="font-medium font-roboto md:text-[30px] text-[14px]">Halaman</span>
      <div className="flex space-x-2 font-roboto md:text-[18px] text-[14px]">
        <button
          className={`md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed`}
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
              } ${page === "..." ? "cursor-default" : ""}`}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className={`md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const Search = () => {
  const { tipePencarian } = useParams();
  const [searchParams] = useSearchParams();
  const deptIdParameter = searchParams.get('dept_id');
  const { t } = useTranslation();

  const [pencarianDetail, setPencarianDetail] = useState(false);
  const [IconPencarianDetail, setIconPencarianDetail] = useState('+');

  const [jnsPeraturan, setJenisPeraturan] = useState([]);
  const [dataSubstansi, setDataSubstansi] = useState([]);
  const [dataUnor, setDataUnor] = useState([]);

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const initialSearchState = {
    judul: "",
    peraturan_category_id: "",
    jns_substansi: "",
    nomor: "",
    tahun: "",
    unor: "",
  };
  const [search, setSearch] = useState(initialSearchState);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlModal, setUrlModal] = useState('');
  const [isModalOpenAi, setIsModalOpenAi] = useState(false);
  const [urlModalAi, setUrlModalAi] = useState('');

  const showModal = (stateCondition, urlPath) => {
    setIsModalOpen(stateCondition);
    setUrlModal(urlPath);
  };

  const showModalAi = (stateCondition, urlPath) => {
    setIsModalOpenAi(stateCondition);
    setUrlModalAi(urlPath);
  };

  const handleDownload = async (urlDownload, fileName, slug) => {
    try {
      await addDownload(slug);
      const fileUrl = urlDownload;
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download gagal:", error);
    }
  };

  const paginateFunction = useCallback(async (pageToFetch = 1, filtersToUse) => {
    setIsLoading(true);
    // console.log(`Memulai pencarian untuk halaman: ${pageToFetch} dengan filter:`, filtersToUse);
    try {
      const result = await getPeraturanPagination(pageToFetch, filtersToUse);
      // console.log("Hasil dari getPeraturanPagination:", result);

      if (result && result.data) {
        setPosts(result.data.posts || []);
        setTotalPages(result.data.totalPages || 1);
        setCurrentPage(result.data.currentPage || 1);
      } else {
        console.warn("Struktur data pagination tidak sesuai atau data kosong:", result);
        setPosts([]);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Gagal mengambil data pagination:", error);
      setPosts([]);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchDataDropdowns = async () => {
      try {
        const [jnsPeraturanRes, dataSubstansiRes, dataUnorRes] = await Promise.all([
          getJenisPeraturan(),
          getDataSubstansi(),
          getUnor()
        ]);

        // Sesuaikan dengan struktur data API Anda
        setJenisPeraturan(jnsPeraturanRes?.data?.data || jnsPeraturanRes?.data || jnsPeraturanRes || []);
        setDataSubstansi(dataSubstansiRes?.data?.data || dataSubstansiRes?.data || dataSubstansiRes || []);
        setDataUnor(dataUnorRes?.data || dataUnorRes || []);

      } catch (error) {
        console.error("Gagal mengambil data dropdown:", error);
        setJenisPeraturan([]);
        setDataSubstansi([]);
        setDataUnor([]);
      }
    };
    fetchDataDropdowns();
  }, []);

  useEffect(() => {
    getIpUser()
      .then((res) => {
        const ip = res.data.ip;
        let pageName = "Pencarian Umum";
        if (tipePencarian && tipePencarian !== 'pencarian-biasa' && tipePencarian !== 'pencarian-detail') {
          pageName = `Pencarian Kategori: ${tipePencarian}`;
        } else if (tipePencarian === 'pencarian-detail') {
          pageName = "Form Pencarian Detail";
        } else if (tipePencarian === 'pencarian-biasa') {
          pageName = "Form Pencarian Biasa";
        }
        return insertDataPengunjung(ip, pageName);
      })
      // .then(() => console.log("Data pengunjung dicatat untuk:", tipePencarian))
      .catch((err) => {
        console.error("Terjadi error saat mencatat pengunjung:", err);
      });
  }, [tipePencarian]);

  useEffect(() => {
    // console.log("Parameter URL berubah. tipePencarian:", tipePencarian, "deptIdParameter:", deptIdParameter);

    const isSpecificCategorySearch = tipePencarian &&
      tipePencarian !== 'pencarian-biasa' &&
      tipePencarian !== 'pencarian-detail';

    setPencarianDetail(isSpecificCategorySearch);
    setIconPencarianDetail(isSpecificCategorySearch ? '-' : '+');

    const categoryIdFromParam = isSpecificCategorySearch
      ? (peraturanBySingkata[tipePencarian] || "")
      : "";

    const newFilters = {
      ...initialSearchState,
      peraturan_category_id: categoryIdFromParam,
      unor: deptIdParameter || "",
    };

    // console.log("Filter baru berdasarkan URL:", newFilters);
    setSearch(newFilters);
    paginateFunction(1, newFilters);

  }, [tipePencarian, deptIdParameter, paginateFunction]);


  const handlePageChange = (newPage) => {
    paginateFunction(newPage, search);
  };

  const handleSubmitSearchForm = (e) => {
    e.preventDefault();
    paginateFunction(1, search);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function hendelPencarianDetail() {
    setPencarianDetail(prev => !prev);
    setIconPencarianDetail(prev => (prev === '+' ? '-' : '+'));
  }

  return (
    <>
      <Headers />
      <section className='h-full bg-slate-100 md:px-[180px] px-5 py-4 min-h-screen'> {/* min-h-screen agar footer tidak naik jika konten sedikit */}
        <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4'>
          <SplitText
            text={t("pencarianTittle")}
            delay={15}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
          />
        </h1>
        <FadeContent blur={true} duration={400} easing="ease-out" initialOpacity={0}>
          <form onSubmit={handleSubmitSearchForm}>
            <div className="box-border w-full lg:w-[70%] mx-auto my-4 rounded-lg bg-bluePu shadow-lg p-4">
              <label className="block text-white font-semibold mb-1">{t("pencarianJudul")}</label>
              <div className="lg:flex lg:items-center">
                <input
                  type="text"
                  placeholder={t("pencarianJudul")}
                  className="lg:w-[85%] w-[100%] h-[50px] px-4 rounded-md text-gray-800 placeholder-gray-500 outline-none mb-2 lg:mb-0"
                  name="judul"
                  value={search.judul}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="lg:ml-2 w-full lg:w-[90px] bg-kuningButton text-bluePu px-4 py-3 rounded-lg font-roboto font-semibold hover:bg-opacity-80 transition cursor-pointer"
                >
                  {t("btnPencarianSubmit")}
                </button>
              </div>

              <span className='block text-white font-semibold my-4 font-roboto cursor-pointer' onClick={hendelPencarianDetail}>
                {t("pencarianDetail")} <p className='inline' id='stsPencarianIcon'>{IconPencarianDetail}</p>
              </span>

              <div className={`mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ease-in-out overflow-hidden ${pencarianDetail ? 'max-h-[1000px] opacity-100 py-2' : 'max-h-0 opacity-0 py-0'}`}>
                <div>
                  <label className="block text-white font-semibold mb-1">{t("JenisPeraturan")}</label>
                  <select
                    className="w-full h-[50px] px-4 rounded-md text-gray-800"
                    name="peraturan_category_id"
                    value={search.peraturan_category_id || ""}
                    onChange={handleChange}
                  >
                    <option value="">-- {t("JenisPeraturan")} --</option>
                    {jnsPeraturan?.map((item, index) => (
                      <option key={item.peraturan_category_id || index} value={item.peraturan_category_id}>
                        {item.percategoryname}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-1">{t("JenisSubstansi")}</label>
                  <select
                    className="w-full h-[50px] px-4 rounded-md text-gray-800"
                    name="jns_substansi"
                    value={search.jns_substansi || ""}
                    onChange={handleChange}
                  >
                    <option value="">-- {t("JenisSubstansi")} --</option>
                    {dataSubstansi?.map((item, index) => (
                      <option key={item?.tag_id || `substansi-${index}`} value={item?.tag_id}>
                        {item?.tagname}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-1">{t("tahunPeraturan")}</label>
                  <select
                    className="w-full h-[50px] px-4 rounded-md text-gray-800"
                    name="tahun"
                    value={search.tahun || ""}
                    onChange={handleChange}
                  >
                    <option value="">-- {t("tahunPeraturan")} --</option>
                    {arrayTahun?.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-1">{t("noPeraturan")}</label>
                  <input
                    type="text"
                    placeholder={'Input ' + t("noPeraturan")}
                    className="w-full h-[50px] px-4 rounded-md text-gray-800 placeholder-gray-500 outline-none"
                    name="nomor"
                    value={search.nomor}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-white font-semibold mb-1">{t("pilihUnitOrganisasi")}</label>
                  <select
                    className="w-full h-[50px] px-4 rounded-md text-gray-800"
                    name="unor"
                    value={search.unor || ""}
                    onChange={handleChange}
                  >
                    <option value="">-- {t("pilihUnitOrganisasi")} --</option>
                    {dataUnor?.map((item, index) => (
                      <option key={item?.dept_id || `unor-${index}`} value={item?.dept_id}>
                        {item?.deptname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </FadeContent>

        {isLoading ? (
          <div className="flex justify-center items-center my-[40px] min-h-[200px]"> {/* min-h untuk loading */}
            <Atom color="#233b74" size="large" text="Loading..." textColor="#233b74" />
          </div>
        ) : posts?.length > 0 ? (
          posts.map((item, index) => (
            <AnimatedContent
              key={item.perundang_id || `post-${index}`}
              distance={100}
              delay={100 + (index * 50)}
              direction="horizontal"
              reverse={index % 2 === 0}
              config={{ tension: 500, friction: 100 }}
              initialOpacity={0}
              animateOpacity
              scale={1.0}
              threshold={0.1}
            >
              <Card data={item} showModal={showModal} showModalAi={showModalAi} handleDownload={handleDownload} />
            </AnimatedContent>
          ))
        ) : (
          <div className="text-center text-gray-600 py-8 min-h-[200px] flex items-center justify-center"> {/* min-h untuk no data */}
            <p>{t("statistikDataTIdakDitemukan")}</p>
          </div>
        )}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Abstrak" urlPath={urlModal} />
        <ModalAi isOpen={isModalOpenAi} onClose={() => setIsModalOpenAi(false)} urlPath={urlModalAi} />
      </section>

      <Langganan />
      <Footer />
    </>
  );
};

export default Search;