import {React, useState, useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import {getBeritaHome, getMonografiHome} from '../services/home.services';
import { useNavigate } from "react-router-dom";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';

export default function ImageSlider() {

  const [berita, setBerita] = useState([]);
  const [monografi, setMonografi] = useState([]);

  useEffect(() => {    
      // Get Jenis Peraturan
      getBeritaHome().then((result) => {
        setBerita(result);
      });

      // Get Jenis Monografi
      getMonografiHome().then((result) => {
        setMonografi(result);
      });
      
  }, []);

  const navigate = useNavigate()

  return (

    <div className="md:flex md:justify-between px-5 md:px-[60px] md:mt-[18px]">
    
    {/* Ini adalah slider Berita */}
    <div className="md:w-[50%] md:p-2">
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
      <div className="box-border border-2 p-4 w-full h-auto px-2 my-2 rounded-lg text-center bg-bluePu">
    <p className="font-onest font-semibold text-slate-100 md:text-[20px] text-[14px] my-4">
      BERITA
    </p>
    <div className="relative w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 }, // Sesuaikan agar tidak terlalu kecil
        }}
        pagination={ false }
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper w-full" // Ubah max-w menjadi w-full
      >
        {berita.map((item,key) => (
          <SwiperSlide key={key}>
            <div className="group relative rounded-lg overflow-hidden shadow-lg transition-all duration-300">
              <a href="#" className="block" onClick={(e) => {
                e.preventDefault(); 
                navigate(`/Berita/${item.slug}`)
                window.scrollTo(0, 0);
                }}>
                <img
                  src={item.path_file}
                  alt={item.judul}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="h-[50px] bg-kuningButton text-slate-900 text-center text-sm font-onest transition-all duration-300 group-hover:bg-yellow-500 group-hover:font-semibold font-onest flex items-center justify-center">
                  {item.judul.length > 15 ? item.judul.substring(0, 15) + "..." : item.judul}
                </div>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
  </AnimatedContent>
</div>

    {/* Ini adalah slider Berita */}
    <div className="md:w-[50%] md:p-2">
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
    <div className="box-border border-2 p-4 w-full h-auto px-2 my-2 rounded-lg text-center bg-bluePu">
    <p className="font-onest font-semibold text-slate-100 md:text-[20px] text-[14px] my-4">
      MONOGRAFI
    </p>
    <div className="relative w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 }, // Sesuaikan agar tidak terlalu kecil
        }}
        pagination={ false }
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper w-full" // Ubah max-w menjadi w-full
      >
        {monografi.map((item,index) => (
          <SwiperSlide key={index}>
            <div className="group relative rounded-lg overflow-hidden shadow-lg transition-all duration-300">
              <a href={`/Monografi/${item.slug}`} className="block" onClick={(e) => {
                  e.preventDefault();
                    navigate(`/Monografi/${item.slug}`);
                    window.scrollTo(0, 0);
                  }}>
  
                <img
                  src={item.path_file}
                  alt={item.judul}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="h-[50px] bg-kuningButton text-slate-900 text-center text-sm font-onest transition-all duration-300 group-hover:bg-yellow-500 group-hover:font-semibold font-onest flex items-center justify-center">
                  {item.judul.length > 15 ? item.judul.substring(0, 15) + "..." : item.judul}
                </div>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
  </AnimatedContent>
</div>


    </div>
  );
}
