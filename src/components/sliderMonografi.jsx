import { React, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { getBeritaHome, getMonografiHome } from '../services/home.services';
import { useNavigate } from "react-router-dom";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import { useTranslation } from 'react-i18next';

const ImageSlider = () => {

  const [berita, setBerita] = useState([]);
  const [monografi, setMonografi] = useState([]);

  const { t } = useTranslation();

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
    // 1. Ubah md:flex menjadi lg:flex.
    // 2. Ubah md:justify-between menjadi lg:justify-between (jika masih relevan untuk layout kolom).
    // 3. Ubah md:px-[60px] menjadi lg:px-[60px] untuk padding.
    // 4. Ubah md:mt-[18px] menjadi lg:mt-[18px] untuk margin.
    <div className="lg:flex lg:justify-between px-5 lg:px-[60px] mt-4 lg:mt-[18px] overflow-x-hidden mb-6">
      {/* Margin atas mobile/tablet (mt-4) bisa sedikit berbeda dari desktop (lg:mt-[18px]) jika diinginkan */}

      {/* Ini adalah slider Berita */}
      {/* 5. Ubah md:w-[50%] menjadi lg:w-[50%] */}
      {/* 6. Ubah md:p-2 menjadi lg:p-2 (atau biarkan padding mobile/tablet jika p-0 atau p-lainnya) */}
      {/*    Jika tidak ada padding spesifik untuk mobile/tablet, maka tidak perlu lg:p-2, cukup p-2 akan berlaku di semua. */}
      {/*    Saya akan asumsikan Anda ingin padding hanya di lg jika kolom berdampingan, atau padding yang sama di semua layar. */}
      {/*    Untuk contoh ini, saya akan buat paddingnya sama di semua layar (p-2), dan biarkan gap di parent mengatur spasi antar kolom di lg. */}
      <div className="w-full lg:w-[49%] mb-4 lg:mb-0"> {/* lg:w-[48%] untuk memberi ruang bagi gap, mb-4 untuk spasi di mobile/tablet */}
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
          <div className="box-border border-2 p-4 w-full h-auto rounded-lg text-center bg-bluePu">
            <p className="font-onest font-semibold text-slate-100 text-[14px] lg:text-[20px] my-4">
              {/* 7. Ubah md:text-[20px] menjadi lg:text-[20px] */}
              {t('beritaTerbaru')}
            </p>
            <div className="relative w-full">
              <Swiper
                slidesPerView={1} // Default untuk mobile dan tablet (sebelum breakpoint Swiper)
                spaceBetween={20}
                breakpoints={{
                  // Breakpoints Swiper mungkin perlu disesuaikan jika layout kolom utama berubah ke lg
                  // Jika di tablet (md) Anda ingin 1 slide, maka slidesPerView: 1 sudah cukup.
                  // Jika ingin beberapa slide di tablet, Anda bisa atur di sini, tapi pastikan tidak terlalu sempit.
                  // Defaultnya Swiper: 640px (sm), 768px (md), 1024px (lg)
                  // Karena layout kolom sekarang di lg (1024px), breakpoints Swiper ini mungkin masih OK
                  // atau Anda bisa menyesuaikannya agar lebih pas dengan lebar kolom lg:w-[48%]
                  640: { slidesPerView: 2, spaceBetween: 10 }, // sm
                  768: { slidesPerView: 2, spaceBetween: 15 }, // md (tablet) - mungkin ingin 2 atau 3 slide
                  // Jika ingin 1 slide di tablet, hapus breakpoint 768 ini
                  1024: { slidesPerView: 3, spaceBetween: 15 }, // lg (ketika dalam kolom lg:w-[48%])
                  1280: { slidesPerView: 4, spaceBetween: 20 }  // xl
                }}
                pagination={false}
                navigation={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper w-full"
              >
                {berita.map((item, key) => (
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
                        <div className="h-[50px] bg-kuningButton text-slate-900 text-center text-sm transition-all duration-300 group-hover:bg-yellow-500 group-hover:font-semibold font-onest flex items-center justify-center p-1"> {/* p-1 untuk padding text */}
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

      {/* Ini adalah slider Monografi */}
      <div className="w-full lg:w-[49%]"> {/* lg:w-[48%] untuk memberi ruang bagi gap */}
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
          <div className="box-border border-2 p-4 w-full h-auto rounded-lg text-center bg-bluePu">
            <p className="font-onest font-semibold text-slate-100 text-[14px] lg:text-[20px] my-4">
              {t('monografi')}
            </p>
            <div className="relative w-full">
              <Swiper
                slidesPerView={1} // Default untuk mobile dan tablet
                spaceBetween={20}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 10 },
                  768: { slidesPerView: 2, spaceBetween: 15 }, // md (tablet)
                  // Jika ingin 1 slide di tablet, hapus breakpoint 768 ini
                  1024: { slidesPerView: 3, spaceBetween: 15 }, // lg
                  1280: { slidesPerView: 4, spaceBetween: 20 }  // xl
                }}
                pagination={false}
                navigation={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper w-full"
              >
                {monografi.map((item, index) => (
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
                        <div className="h-[50px] bg-kuningButton text-slate-900 text-center text-sm transition-all duration-300 group-hover:bg-yellow-500 group-hover:font-semibold font-onest flex items-center justify-center p-1">
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

export default ImageSlider;
