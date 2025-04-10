import {React, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import Card from "../components/Card";
import {getJenisPeraturan, getDataSubstansi} from "../services/search.services"

function getYearsArray(startYear = 2019) {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
}

let arrayTahun = getYearsArray();

const Search = () => {

    const { tipePencarian } = useParams();
    const [pencarianDetail, setpencarianDetail] = useState(tipePencarian === 'pencarian-biasa' ? false : true);
    const [IconPencarianDetail, setIconPencarianDetail] = useState(tipePencarian === 'pencarian-biasa' ? '+' :  '-');
    const [jnsPeraturan, setJenisPeraturan] = useState([]);
    const [paramJnsPeraturan, setParamJnsPeraturan] = useState(tipePencarian != 'pencarian-biasa' || tipePencarian != 'pencarian-detail' ? tipePencarian : '');
    const [dataSubstansi, setDataSubstansi] = useState([]);
    
    useEffect(() => {    
        getJenisPeraturan().then((result) => {
          setJenisPeraturan(result);
        });

        getDataSubstansi().then((result) => {
          setDataSubstansi(result);
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


    return (
      <>
        <Headers/>
            
        <section className='h-full bg-slate-100 md:px-[180px] px-5 py-4 h-[500px]'>

        <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4'>Pencarian Peraturan</h1>

        <div className="box-border w-full md:w-[70%] mx-auto my-4 rounded-lg bg-bluePu shadow-lg p-4">
            {/* Input Nama Peraturan */}
            <label className="block text-white font-semibold mb-1">Nama Peraturan</label>
            <input
                type="text"
                placeholder="Nama Peraturan"
                className="md:w-[90%] w-[100%] h-[50px] px-4 rounded-md text-gray-800 placeholder-gray-500 outline-none"
            />

            {/* Tombol Cari */}
            <button className="md:ml-2 mt-2 w-[90px] bg-kuningButton text-bluePu px-4 py-3 rounded-lg font-roboto font-semibold hover:bg-opacity-80 transition cursor-pointer">
                Cari
            </button>
            <span className='block text-white font-semibold my-4 font-roboto cursor-pointer' onClick={hendelPencarianDetail}>Pencarian Detail <p className='inline' id='stsPencarianIcon'>{IconPencarianDetail}</p></span>
            {/* Advanced Search */}
            <div className={`mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 max-h-0 transition-all duration-500 ${pencarianDetail ? 'max-h-screen opacity-100' : 'opacity-0'}`}>
                {/* Jenis Dokumen */}
                <div>
                    <label className="block text-white font-semibold mb-1">Jenis Peraturan</label>
                    <select className="w-full h-[50px] px-4 rounded-md text-gray-800">
                      <option value="">-- Pilih Jenis Peraturan --</option>
                    {jnsPeraturan?.data?.data?.length > 0 ? (
                      jnsPeraturan?.data?.data?.map((item, index) => (
                        <option 
                        key={index} 
                        value={item.peraturan_category_id}
                        selected={paramJnsPeraturan === item.singkatan_file}
                       >
                          {item.percategoryname}
                       </option>
                      ))) : (
                        <p className='text-center text-slate-100'>Data Kosong</p>
                    )}   
                    </select>
                </div>

                {/* Tema Peraturan */}
                
                <div>
                    <label className="block text-white font-semibold mb-1">Jenis Substansi</label>
                    <select className="w-full h-[50px] px-4 rounded-md text-gray-800">
                    <option value="">-- Pilih Jenis Substansi --</option>
                    {dataSubstansi?.data?.data?.length > 0 ? (
                      dataSubstansi?.data?.data?.map((item, index) => (                        
                        <option
                          key={index+5}
                          value={item?.tag_id}
                        >
                          {item?.tagname}
                        </option>
                      ))) : (
                        <p className='text-center text-slate-100'>Data Kosong</p>
                    )} 
                   
                   
                    </select>
                </div>

                {/* Tahun */}
                <div>
                    <label className="block text-white font-semibold mb-1">Tahun</label>
                    <select className="w-full h-[50px] px-4 rounded-md text-gray-800">
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
                        <p className='text-center text-slate-100'>Data Kosong</p>
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
                />
                </div>

            </div>
            </div>



        <Card/>
        
         {/* Pagination */}
         <div className='flex justify-end items-center my-4 space-x-2 gap-4 w-full md:w-[70%] mx-auto'>
          <span className='font-medium font-roboto md:text-[30px] text-[15px]'>Halaman</span>
          <div className='flex space-x-2 font-roboto md:text-[18px] text-[14px] shedow-lg'>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-bluePu text-kuningButton rounded-lg shadow-md hover:bg-opacity-80 transition">
              1
            </button>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
              2
            </button>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
              3
            </button>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
              4
            </button>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
              5
            </button>
            <button className="md:px-4 px-3 md:py-2 py-1 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
              Next
            </button>
          </div>
        </div>

        </section>      
        
        <Langganan/>
        <Footer/>
      </>
    );
  };
  
  export default Search;
  