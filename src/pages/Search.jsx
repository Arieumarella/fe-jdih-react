import { React, useState, useEffect } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { getJenisPeraturan, getDataSubstansi, getPeraturanPagination, getUnor } from "../services/search.services";
import { Atom } from 'react-loading-indicators';
import { peraturanBySingkata } from "../assets/object/peraturanBySingkata";
import Modal from '../components/modal';
import ModalAi from '../components/modal-chatAi';
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import FadeContent from '../components/react-bits/FadeContent/FadeContent';
import SplitText from "../components/react-bits/SplitText/SplitText";
import { getIpUser, insertDataPengunjung } from "../services/insertDataPengunjung.services";

function getYearsArray(startYear = 2019) {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
}

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
    <div className="flex justify-end items-center my-4 space-x-2 gap-4 w-full md:w-[70%] mx-auto">
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

let arrayTahun = getYearsArray();

const Search = () => {

  let { tipePencarian } = useParams();
  let [pencarianDetail, setpencarianDetail] = useState(tipePencarian === 'pencarian-biasa' ? false : true);
  let [IconPencarianDetail, setIconPencarianDetail] = useState(tipePencarian === 'pencarian-biasa' ? '+' : '-');
  let [jnsPeraturan, setJenisPeraturan] = useState([]);
  let [paramJnsPeraturan, setParamJnsPeraturan] = useState(tipePencarian != 'pencarian-biasa' || tipePencarian != 'pencarian-detail' ? tipePencarian : '');
  let [dataSubstansi, setDataSubstansi] = useState([]);
  let [dataUnor, setDataUnor] = useState([]);
  let [posts, setPosts] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);
  let [searchParams] = useSearchParams();
  let deptIdParameter = searchParams.get('dept_id');
  let [search, setSearch] = useState({
    judul: "",
    peraturan_category_id: peraturanBySingkata[paramJnsPeraturan],
    jns_substansi: "",
    nomor: "",
    tahun: "",
    unor: deptIdParameter,
  });

  let [isLoading, setIsLoading] = useState(false);

  // Modal Priview
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlModal, setUrlModal] = useState('');

  const showModal = async (stateCondition, urlPath) => {
    setIsModalOpen(stateCondition);
    setUrlModal(urlPath);
  }

  // Modal Priview
  const [isModalOpenAi, setIsModalOpenAi] = useState(false);
  const [urlModalAi, setUrlModalAi] = useState('');

  const showModalAi = async (stateCondition, urlPath) => {
    setIsModalOpenAi(stateCondition);
    setUrlModalAi(urlPath);
  }


  const handleDownload = async (urlDownload, fileName) => {
    try {
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

  const paginateFunction = async (e = null) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    const delay = new Promise(resolve => setTimeout(resolve, 300));

    try {
      const [result] = await Promise.all([
        getPeraturanPagination(currentPage, search),
        delay
      ]);

      setPosts(result.data.posts);
      setTotalPages(result.data.totalPages);
      setCurrentPage(result.data.currentPage);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    paginateFunction();
  }, [currentPage]);

  useEffect(() => {
    getJenisPeraturan().then((result) => {
      setJenisPeraturan(result);
    });

    getDataSubstansi().then((result) => {
      setDataSubstansi(result);
    });

    getUnor().then((result) => {
      setDataUnor(result);
    });

    getIpUser()
      .then((res) => {
        const ip = res.data.ip;
        const halaman = "Pencarian " + tipePencarian === 'pencarian-biasa' ? 'Biasa' : 'Detail';
        return insertDataPengunjung(ip, halaman);
      })
      .then((response) => {

      })
      .catch((err) => {
        console.error("Terjadi error:", err);
      });


  }, []);

  function hendelPencarianDetail() {
    if (pencarianDetail) {
      setpencarianDetail(false);
      setIconPencarianDetail('+');
    } else {
      setpencarianDetail(true);
      setIconPencarianDetail('-');
    }

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(search);
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <>
      <Headers />

      <section className='h-full bg-slate-100 md:px-[180px] px-5 py-4 h-[500px]'>

        <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4'>

          <SplitText
            text={'Pencarian Peraturan'}
            delay={15}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
          />
        </h1>
        <FadeContent blur={true} duration={400} easing="ease-out" initialOpacity={0}>
          <form onSubmit={paginateFunction}>
            <div className="box-border w-full md:w-[70%] mx-auto my-4 rounded-lg bg-bluePu shadow-lg p-4">
              {/* Input Nama Peraturan */}
              <label className="block text-white font-semibold mb-1">Nama Peraturan</label>
              <input
                type="text"
                placeholder="Nama Peraturan"
                className="md:w-[90%] w-[100%] h-[50px] px-4 rounded-md text-gray-800 placeholder-gray-500 outline-none"
                name="judul"
                value={search.judul}
                onChange={handleChange}
              />

              {/* Tombol Cari */}
              <button type="submit" className="md:ml-2 mt-2 w-[90px] bg-kuningButton text-bluePu px-4 py-3 rounded-lg font-roboto font-semibold hover:bg-opacity-80 transition cursor-pointer">
                Cari
              </button>
              <span className='block text-white font-semibold my-4 font-roboto cursor-pointer' onClick={hendelPencarianDetail}>Pencarian Detail <p className='inline' id='stsPencarianIcon'>{IconPencarianDetail}</p></span>
              {/* Advanced Search */}
              <div className={`mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 max-h-0 transition-all duration-500 ${pencarianDetail ? 'max-h-screen opacity-100' : 'opacity-0'}`}>
                {/* Jenis Dokumen */}
                <div>
                  <label className="block text-white font-semibold mb-1">Jenis Peraturan</label>
                  <select className="w-full h-[50px] px-4 rounded-md text-gray-800"
                    name="peraturan_category_id"
                    value={search.peraturan_category_id}
                    onChange={handleChange}
                    defaultValue={peraturanBySingkata[paramJnsPeraturan]}
                  >
                    <option value="">-- Pilih Jenis Peraturan --</option>
                    {jnsPeraturan?.data?.data?.length > 0 ? (
                      jnsPeraturan?.data?.data?.map((item, index) => (
                        <option
                          key={index}
                          value={item.peraturan_category_id}
                        >
                          {item.percategoryname}
                        </option>
                      ))) : (
                      <option
                        value=""
                        disabled
                      >-- Data Kosong --</option>
                    )}
                  </select>
                </div>

                {/* Tema Peraturan */}

                <div>
                  <label className="block text-white font-semibold mb-1">Jenis Substansi</label>
                  <select className="w-full h-[50px] px-4 rounded-md text-gray-800"
                    name="jns_substansi"
                    value={search.jns_substansi}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih Jenis Substansi --</option>
                    {dataSubstansi?.data?.data?.length > 0 ? (
                      dataSubstansi?.data?.data?.map((item, index) => (
                        <option
                          key={index + 5}
                          value={item?.tag_id}
                        >
                          {item?.tagname}
                        </option>
                      ))) : (
                      <option
                        value=""
                        disabled
                      >-- Data Kosong --</option>
                    )}


                  </select>
                </div>

                {/* Tahun */}
                <div>
                  <label className="block text-white font-semibold mb-1">Tahun</label>
                  <select className="w-full h-[50px] px-4 rounded-md text-gray-800"
                    name="tahun"
                    value={search.tahun}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih Tahun --</option>
                    {arrayTahun
                      .length > 0 ? (
                      arrayTahun
                        .map((item, index) => (
                          <option
                            key={index}
                            value={item}
                          >{item}</option>
                        ))) : (
                      <option
                        value=""
                        disabled
                      >-- Data Kosong --</option>
                    )}
                  </select>
                </div>

                {/* Nomor Peraturan (Baru Ditambahkan) */}
                <div>
                  <label className="block text-white font-semibold mb-1">Nomor Peraturan</label>
                  <input
                    type="text"
                    placeholder="Masukkan Nomor"
                    className="w-full h-[50px] px-4 rounded-md text-gray-800 placeholder-gray-500 outline-none"
                    name="nomor"
                    value={search.nomor}
                    onChange={handleChange}
                  />
                </div>

                {/* Unit Organisasi (Baru Ditambahkan) */}
                <div>
                  <label className="block text-white font-semibold mb-1">Pilih Unit Organisasi</label>
                  <select className="w-full h-[50px] px-4 rounded-md text-gray-800"
                    name="unor"
                    value={search.unor}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih Unit Organisasi --</option>
                    {dataUnor?.data?.length > 0 ? (
                      dataUnor?.data?.map((item, index) => (
                        <option
                          key={index + 5}
                          value={item?.dept_id}
                        >
                          {item?.deptname}
                        </option>
                      ))) : (
                      <option
                        key={67}
                        value=""
                        disabled
                      >-- Data Kosong --</option>
                    )}


                  </select>
                </div>


              </div>
            </div>
          </form>
        </FadeContent>

        {isLoading ? (
          <div className="flex justify-center items-center my-[40px]">
            <Atom color="#233b74" size="large" text="Loading..." textColor="" />
          </div>
        ) : posts?.length > 0 ? (
          posts.map((item, index) => (
            <AnimatedContent
              key={index}
              distance={100}
              delay={200}
              direction="horizontal"
              reverse={index % 2 === 0}
              config={{ tension: 500, friction: 100 }}
              initialOpacity={0}
              animateOpacity
              scale={1.0}
              threshold={0.1}
            >
              <Card key={index} data={item} showModal={showModal} showModalAi={showModalAi} handleDownload={handleDownload} />
            </AnimatedContent>
          ))
        ) : (
          <p className="text-center text-slate-100">Data Kosong</p>
        )}


        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Abstrak" urlPath={urlModal}>

        </Modal>

        <ModalAi isOpen={isModalOpenAi} onClose={() => setIsModalOpenAi(false)} urlPath={urlModalAi}>

        </ModalAi>

      </section>



      <Langganan />
      <Footer />
    </>
  );
};

export default Search;
