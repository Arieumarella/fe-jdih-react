import { React, useState, useEffect, useRef } from 'react';
import { Rating } from "react-simple-star-rating";
import ModalPenilaian from '../components/ModalPenilaian';
import { toast } from "../components/ToastProvider";
import { postDataLangganan, getDataRating } from "../services/footer.services";
import CountUp from '../components/react-bits/CountUp/CountUp';
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import { useTranslation } from 'react-i18next';

const Langganan = () => {

  const [fatchData, setfatchData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLangganan, setFormLangganan] = useState({ nama: "", email: "" });

  const { t } = useTranslation();

  // Captcha state for langganan
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  const captchaWidgetId = useRef(null);

  // Inject Turnstile script once
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  // Render Turnstile widget hanya sekali saat mount
  useEffect(() => {
    const renderCaptcha = () => {
      if (captchaRef.current && window.turnstile) {
        // Bersihkan node captcha lama
        captchaRef.current.innerHTML = '';
        setCaptchaToken(null);
        captchaWidgetId.current = window.turnstile.render(captchaRef.current, {
          sitekey: import.meta.env.VITE_CAPTCHA_SITE_KEY,
          callback: (token) => setCaptchaToken(token),
        });
      }
    };
    if (window.turnstile) {
      renderCaptcha();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          renderCaptcha();
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, []);

  const handelFormLangganan = (e) => {
    setFormLangganan({ ...formLangganan, [e.target.name]: e.target.value });
  }

  const handleSubmitLangganan = async (e) => {
    e.preventDefault();

    if (!formLangganan.nama || !formLangganan.email) {
      toast.error("Harap lengkapi semua kolom Terlebih Dahulu.", { position: "bottom-right" });
      return;
    }
    if (!captchaToken) {
      toast.error("Silakan verifikasi captcha sebelum mengirim.", { position: "bottom-right" });
      // Reset captcha jika gagal
      if (window.turnstile && captchaWidgetId.current !== null && typeof window.turnstile.reset === 'function') {
        try { window.turnstile.reset(captchaWidgetId.current); } catch (err) {}
      }
      setCaptchaToken(null);
      return;
    }

    try {
      const payload = { ...formLangganan, captcha: captchaToken };
      const response = await postDataLangganan(payload);

      if (response.status !== 200) {
        toast.error("Data gagal disimpan.", { position: "bottom-right" });
      } else {
        toast.success("Data berhasil disimpan.", { position: "bottom-right" });
        setFormLangganan({ nama: "", email: "" });
        // Reset captcha setelah submit
        if (window.turnstile && captchaWidgetId.current !== null && typeof window.turnstile.reset === 'function') {
          try { window.turnstile.reset(captchaWidgetId.current); } catch (err) {}
        }
        setCaptchaToken(null);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Terjadi kesalahan, silakan coba lagi.", { position: "bottom-right" });
      // Reset captcha jika error
      if (window.turnstile && captchaWidgetId.current !== null && typeof window.turnstile.reset === 'function') {
        try { window.turnstile.reset(captchaWidgetId.current); } catch (err) {}
      }
      setCaptchaToken(null);
    }
  }


  useEffect(() => {

    // Data fatch
    getDataRating().then((result) => {
      setfatchData(result);
    });



  }, []);

  return (
    <>

      <section className='bg-bluePu text-white text-center items-center overflow-x-hidden lg:flex lg:justify-between lg:px-[60px]'>
        {/*
    SECTION:
    - Mobile & Tablet (default & md): (default block, no px)
    - Laptop (lg): lg:flex, lg:justify-between, lg:px-[60px] (dari md:flex md:justify-between md:px-[60px] asli)
  */}
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
          <div className='w-full lg:flex lg:justify-center'>
            {/*
        WRAPPER INDEKS KEPUASAN:
        - Mobile & Tablet (default & md): w-full (default block)
        - Laptop (lg): lg:flex lg:justify-center (dari md:flex md:justify-center asli)
      */}
            <p className='font-semibold font-roboto text-[20px] py-4 text-kuningButton text-center md:text-[20px] lg:text-[25px] lg:absolute lg:mt-[18px]'>
              {/*
          JUDUL "Indeks Kepuasan Masyarakat":
          - Font Size: text-[20px] (mob), md:text-[20px] (tab), lg:text-[25px] (lap, dari md:text-[25px] asli)
          - Positioning & Margin: (static, py-4 default), lg:absolute lg:mt-[18px] (lap, dari md:absolute md:mt-[18px] asli)
        */}
              {t("indeksKepuasanMasyarakat")}
            </p>

            <div className='group w-full lg:flex lg:mt-[55px] lg:mb-[30px]'>
              {/*
          CONTENT KEPUASAN (Lingkaran + Progress Bar + Teks):
          - Mobile & Tablet (default & md): w-full (default block)
          - Laptop (lg): lg:flex, lg:mt-[55px], lg:mb-[30px] (dari md:flex md:mt-[55px] md:mb-[30px] asli)
        */}
              <div className="flex items-center justify-center w-48 h-48 rounded-full p-[13px] bg-gradient-to-r from-gradiankuning to-gradianBiru mx-auto group md:mx-auto lg:relative lg:my-auto lg:mx-1">
                {/*
            LINGKARAN RATING:
            - Positioning: mx-auto (mob), md:mx-auto (tab), lg:relative lg:my-auto lg:mx-1 (lap, dari md:relative md:my-auto md:mx-1 asli)
          */}
                <div className="w-[93%] h-[93%] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                  <div className="w-[95%] h-[95%] bg-bluePu rounded-full items-center justify-center">
                    <p className="text-2xl font-bold text-slate-200 font-onest text-[35px] mt-[35px]">
                      {fatchData.rataRata}
                    </p>
                    <Rating initialValue={fatchData.rataRata} ratingValue="4" size={25} fillColor="#FFE54E" className="block" readonly={true} />
                    <p className="font-semibold text-slate-200 font-onest text-[14px] ">
                      <CountUp
                        key={2}
                        from={0}
                        to={Number(fatchData.totalPemberiRating) || 0}
                        separator=","
                        direction="up"
                        duration={2}
                        className='mr-1'
                      />
                      reviewer
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative items-center flex my-4 md:my-4 lg:ml-2 lg:w-[250px] lg:pl-6">
                {/*
            PROGRESS BAR CONTAINER:
            - Margin: my-4 (mob), md:my-4 (tab)
            - Positioning & Width (Laptop): lg:ml-2, lg:w-[250px], lg:pl-6 (dari md:ml-2 md:w-[250px] md:pl-6 asli)
          */}
                <div className='font-roboto gap-1 md:block lg:flex lg:flex-col'>
                  {/*
              PROGRESS BAR ITEMS WRAPPER:
              - Display: (default block/inline-flex tergantung child)
              - Laptop: lg:flex lg:flex-col (dari md:flex md:flex-col asli)
            */}
                  {fatchData?.dataArray?.length > 0 ? (
                    fatchData.dataArray.map((item, index) => (
                      <div key={index} className='inline-flex items-center space-x-2 w-[70%] md:w-[70%] lg:w-auto'>
                        {/*
                    PROGRESS BAR ITEM:
                    - Width: w-[70%] (mob), md:w-[70%] (tab), lg:w-auto (lap, dari md:w-auto asli)
                  */}
                        <p>{item.rating}</p>
                        <span className="material-symbols-outlined text-gradianBiru">
                          stars
                        </span>
                        <progress value={parseFloat(item.totData)} max={fatchData.totalPemberiRating} className='progres-bar' />
                        <p>{item.totData}</p>
                      </div>
                    ))) : (
                    <p className='text-center text-slate-100'>{t("statistikDataTIdakDitemukan")}</p>
                  )}
                </div>
              </div>

              <div className="mx-10 group md:mx-10 lg:w-[42%] lg:h-48 lg:mt-[30px]">
                {/*
            TEXT PENJELASAN & REVIEW BUTTON:
            - Margin X: mx-10 (mob), md:mx-10 (tab)
            - Laptop specific: lg:w-[42%], lg:h-48, lg:mt-[30px] (dari md:w-[42%] md:h-48 md:mt-[30px] asli)
          */}
                <p className='text-center mt-3 font-roboto flex-col md:text-center md:text-[16px] lg:text-left lg:text-[16px]'>
                  {/*
              TEXT PENJELASAN:
              - Text Align: text-center (mob), md:text-center (tab), lg:text-left (lap, dari md:text-left asli)
              - Font Size: (default), md:text-[16px] (tab), lg:text-[16px] (lap, dari md:text-[16px] asli - jika sama, tidak perlu md)
            */}
                  {t("textIndexKepuasanMasyarakat")}
                </p>
                <button type='button' className='my-4 bg-kuningButton text-bluePu font-onest text-[15px] font-semibold w-[75px] h-[30px] rounded-xl hover:bg-yellow-500 active:bg-yellow-600 md:w-[75px] md:h-[30px] lg:w-[100px] lg:h-[40px] lg:mr-[280px]' onClick={() => setIsModalOpen(true)}>
                  {/*
              REVIEW BUTTON:
              - Size: w-[75px] h-[30px] (mob), md:w-[75px] md:h-[30px] (tab)
              - Laptop Size: lg:w-[100px] lg:h-[40px] (dari md:w-[100px] md:h-[40px] asli)
              - Laptop Margin: lg:mr-[280px] (dari md:mr-[280px] asli)
            */}
                  Review
                </button>
              </div>
            </div>
          </div>
        </AnimatedContent>

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
          <div className='group w-full my-10 md:my-10 lg:my-0 lg:mb-[40px]'>
            {/*
        WRAPPER BERLANGGANAN:
        - Margin Y: my-10 (mob), md:my-10 (tab)
        - Laptop Margin: lg:my-0 lg:mb-[40px] (dari md:my-0 md:mb-[40px] asli)
      */}
            <p className='font-roboto font-semibold text-[20px] py-4 text-kuningButton md:text-[20px] lg:text-[25px]'>{t("Berlangganan")}</p>
            {/*
        JUDUL "Berlangganan":
        - Font Size: text-[20px] (mob), md:text-[20px] (tab), lg:text-[25px] (lap, dari md:text-[25px] asli)
      */}
            <p className='font-roboto px-10 font-medium text-[14px] md:px-10 md:text-[14px] lg:px-2 lg:text-[16px]'>{t("textBerlangganan")}</p>
            {/*
        TEXT BERLANGGANAN:
        - Padding X: px-10 (mob), md:px-10 (tab), lg:px-2 (lap, dari md:px-2 asli)
        - Font Size: text-[14px] (mob), md:text-[14px] (tab), lg:text-[16px] (lap, dari md:text-[16px] asli)
      */}
            <form onSubmit={handleSubmitLangganan}>
              <div className="flex flex-col items-center relative w-full group">
                <input
                  type="text"
                  name='nama'
                  value={formLangganan.nama}
                  placeholder=" Masukan Nama.."
                  onChange={handelFormLangganan}
                  className="border border-slate-100 shadow-lg bg-slate-100 text-slate-800 rounded-xl w-[290px] h-[35px] my-4 placeholder:font-onest placeholder:text-slate-500 placeholder:text-[14px] md:w-[290px] md:h-[35px] lg:w-[500px] lg:h-[40px]" />
                {/*
            INPUT NAMA:
            - Size: w-[290px] h-[35px] (mob), md:w-[290px] md:h-[35px] (tab)
            - Laptop Size: lg:w-[500px] lg:h-[40px] (dari md:w-[500px] md:h-[40px] asli)
          */}
                <div className="relative w-[290px] md:w-[290px] lg:w-[500px]">
                  {/*
              WRAPPER INPUT EMAIL + BUTTON KIRIM (Desktop):
              - Width: w-[290px] (mob), md:w-[290px] (tab), lg:w-[500px] (lap, dari md:w-[500px] asli)
            */}
                  <input
                    type="email"
                    name="email"
                    value={formLangganan.email}
                    onChange={handelFormLangganan}
                    placeholder="Masukan Email.."
                    className="border border-slate-100 shadow-lg bg-slate-100 text-slate-800 rounded-xl w-[290px] h-[35px] my-1 placeholder:font-onest placeholder:text-slate-500 placeholder:text-[14px] pr-12 md:w-[290px] md:h-[35px] lg:w-[500px] lg:h-[40px]"
                  />
                  {/*
              INPUT EMAIL:
              - Size: w-[290px] h-[35px] (mob), md:w-[290px] md:h-[35px] (tab)
              - Laptop Size: lg:w-[500px] lg:h-[40px] (dari md:w-[500px] md:h-[40px] asli)
            */}
                  <button
                    type="submit"
                    className="hidden lg:block absolute right-2 top-1/2 -translate-y-1/2 bg-bluePu hover:bg-blue-950 text-kuningButton font-roboto w-[100px] px-3 py-1 rounded-xl"
                  >
                    {/*
                BUTTON KIRIM (Desktop):
                - Display: hidden (mob & tab), lg:block (lap, dari md:block hidden asli)
              */}
                    Kirim
                  </button>
                </div>

                {/* Captcha */}
                <div className="w-full flex justify-center my-2">
                  <div ref={captchaRef} className="cf-turnstile" data-sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}></div>
                </div>
                <button type='submit' className='block my-4 bg-kuningButton text-bluePu font-onest text-[15px] font-semibold w-[75px] h-[30px] rounded-xl relative hover:bg-yellow-500 active:bg-yellow-600 md:block lg:hidden'>
                  {/*
              BUTTON KIRIM (Mobile/Tablet):
              - Display: block (mob), md:block (tab), lg:hidden (lap, dari md:hidden block asli)
              - Salah ketik: bg-kuningButtonitems-end -> bg-kuningButton
            */}
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </AnimatedContent>
      </section>

      <ModalPenilaian isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

      </ModalPenilaian>
    </>
  );
};

export default Langganan;