import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import satu from "/src/assets/1.jpg";
import FadeContent from '../components/react-bits/FadeContent/FadeContent';

// Menggunakan destructuring { data } adalah praktik yang baik.
const ImageSlider = ({ data }) => {

    return (
        <FadeContent blur={true} duration={800} easing="ease-out" initialOpacity={0} className='overflow-x-hidden'>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="rounded-sm shadow-xl"
            >
                {/* [PERBAIKAN] Cek `data.length` bukan `data.data.length` */}
                {data?.length > 0 ? (
                    // [PERBAIKAN] Gunakan `data.map` bukan `data.data.map`
                    data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={item.path_file}
                                alt={`image ${index}`}
                                className="w-full h-[240px] md:h-[440px] object-cover"
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    // Fallback jika data kosong atau undefined
                    <SwiperSlide>
                        <img
                            src={satu}
                            alt="Default Slide"
                            className="w-full h-[240px] md:h-[440px] object-cover"
                        />
                    </SwiperSlide>
                )}
            </Swiper>
        </FadeContent>
    );
};

export default ImageSlider;