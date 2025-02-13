import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import satu from "/src/assets/1.jpg";
import dua from "../assets/2.jpg";

const ImageSlider = () => {
    return (
      <>
        <div className="px-5 md:px-[60px] py-4">
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={100}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="rounded-md shadow-xl"
        >
            <SwiperSlide>
            <img
                src={satu}
                alt="Slide 1"
                className="w-full md:h-[600px] sm:h-[10px] object-cover rounded-xl"
            />
            </SwiperSlide>
            <SwiperSlide>
            <img
                src={dua}
                alt="Slide 2"
                className="w-full md:h-[600px] sm:h-[10px] object-cover rounded-xl"
            />
            </SwiperSlide>
            <SwiperSlide>
            <img
                src={dua}
                alt="Slide 3"
                className="w-full md:h-[600px] sm:h-[10px] object-cover rounded-xl"
            />
            </SwiperSlide>
        </Swiper>
        </div>
      </>
    );
  };
  
  export default ImageSlider;