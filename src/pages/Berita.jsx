import {React, useState, useEffect} from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {getBeritaPagination}  from "../services/berita.services";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';


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
            className={`md:px-4 px-3 md:py-2 py-1 rounded-lg shadow-md transition ${
              currentPage === page
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
    
    const navigateHandelClick = (link = '') => {
      navigate(`/${link}`);
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
        console.log(posts);
      });
    } 
    
    useEffect(() => {
      paginateFunction(); 
    }, [currentPage]);

    const formatDate = (dateString=null) => {
      if(dateString==null){
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
        <Headers/>
            
        <section className='h-full bg-slate-100 md:px-[180px] px-5 py-4 '>
          
          <h1 className='text-center font-roboto font-bold text-bluePu md:text-[35px] text-[23px] py-4'>Semua Berita</h1>
    
          <form onSubmit={(e) => {e.preventDefault(); paginateFunction();}}>
          <div className="box-border md:w-[50%] w-full mx-auto md:my-4 my-2 md:mb-[50px] mb-[20px]  rounded-lg md:h-[70px] h-[60px] bg-bluePu shadow-lg flex items-center px-4">
            <input 
              type="text" 
              placeholder="Cari judul berita..." 
              className="w-full bg-transparent outline-none text-white placeholder-white font-roboto text-lg"
              onInput={(e) => setSearch(e.target.value)}
            />
            <button className="ml-2 w-[90px] bg-kuningButton text-bluePu px-4 py-2 rounded-lg font-roboto font-semibold hover:bg-opacity-80 transition" type='submit'>
              Cari
            </button>
          </div>
          </form>


          <div className='items-center grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 mb-12'>

          {posts?.length > 0 ? (
              posts.map((item, index) => (
                <AnimatedContent
                key={item.id}
                distance={150}
              
                direction="vertical"
              
                reverse={false}
              
                config={{ tension: 45, friction: 15 }}
              
                initialOpacity={0.2}
              
                animateOpacity
              
                scale={1.1}
              
                threshold={0.2}
              
              >
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer"
                  onClick={(e) => { e.preventDefault(); navigateHandelClick("Berita/"+item?.slug+""); window.scrollTo(0, 0); }}>
                    {/* Gambar */}
                    <div className="w-full h-[180px] md:h-[350px] overflow-hidden group">
                      <img src={`https://jdih.pu.go.id/internal/assets/assets/berita/${item?.gambar_1}`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500" />
                    </div>
                    {/* Konten */}
                    <div className="p-4">
                      {/* Tanggal Terbit */}
                      <p className="text-gray-500 md:text-sm text-[14px] font-semibold">{formatDate(item?.tgl_buat)}</p>

                      {/* Judul Berita */}
                      <h3 className="text-bluePu font-roboto font-semibold text-[14px] md:text-base leading-tight md:mt-1 mt-2 hover:text-opacity-70 cursor-pointer ">
                        {truncateWords(item?.judul)}
                      </h3>

                      {/* Link Selengkapnya */}
                      <div className="mt-1 flex justify-end items-center">

                        {/* Jumlah Viewer */}
                        <div className="flex items-center gap-1 text-bluePu text-xs bg-bluePu bg-opacity-15 px-2 py-1 rounded-full font-roboto md:mt-0 mt-2 text-[12px]">
                        <span className="material-symbols-outlined">visibility</span> <span>3083</span>
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
        
        <Langganan/>
        <Footer/>
      </>
    );
  };
  
  export default Home;
  