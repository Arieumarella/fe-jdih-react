import { React, useState, useEffect } from 'react';
import { Rating } from "react-simple-star-rating";
import { getDataRating } from '../services/footer.services';
import ModalPenilaian from '../components/ModalPenilaian';
import { toast } from "../components/ToastProvider";
import { postDataLangganan } from "../services/footer.services";
import CountUp from '../components/react-bits/CountUp/CountUp';
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import { useTranslation } from 'react-i18next';

const Langganan = () => {

  const [fatchData, setfatchData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLangganan, setFormLangganan] = useState({ nama: "", email: "" });

  const { t } = useTranslation();

  const handelFormLangganan = (e) => {
    setFormLangganan({ ...formLangganan, [e.target.name]: e.target.value });
  }

  const handleSubmitLangganan = async (e) => {
    e.preventDefault();

    if (!formLangganan.nama || !formLangganan.email) {
      toast.error("Harap lengkapi semua kolom Terlebih Dahulu.", { position: "bottom-right" });
      return;
    }

    try {
      const response = await postDataLangganan(formLangganan);

      if (response.status !== 200) {
        toast.error("Data gagal disimpan.", { position: "bottom-right" });
      } else {
        toast.success("Data berhasil disimpan.", { position: "bottom-right" });
        setFormLangganan({ nama: "", email: "" });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Terjadi kesalahan, silakan coba lagi.", { position: "bottom-right" });
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

      <section className='bg-bluePu text-white  text-center  md:flex md:justify-between md:px-[60px] items-center overflow-x-hidden'>
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
          <div className='w-full md:flex md:justify-center'>
            <p className='md:absolute font-semibold font-roboto md:text-[25px] text-[20px] py-4 md:mt-[18px] text-kuningButton text-center'>{t("indeksKepuasanMasyarakat")}</p>

            <div className='md:flex md:mt-[55px] md:mb-[30px] group w-full '>
              <div className="md:relative flex items-center justify-center w-48 h-48 rounded-full p-[13px] bg-gradient-to-r from-gradiankuning to-gradianBiru md:my-auto md:mx-1 mx-auto group">
                <div className="w-[93%] h-[93%] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                  <div className="w-[95%] h-[95%] bg-bluePu rounded-full  items-center justify-center">
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


              <div className="relative items-center flex md:ml-2 my-4 md:w-[250px] md:pl-6">

                <div className='md:flex md:flex-col font-roboto gap-1'>

                  {fatchData?.dataArray?.length > 0 ? (
                    fatchData.dataArray.map((item, index) => (
                      <div key={index} className='inline-flex items-center space-x-2 md:w-auto w-[70%]'>
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

              <div className=" md:w-[42%] md:h-48 mx-10 md:mt-[30px] group">
                <p className='md:text-left text-center mt-3 font-roboto md:text-[16px] flex-col'>{t("textIndexKepuasanMasyarakat")}</p>
                <button type='button' className='my-4 bg-kuningButton text-bluePu font-onest text-[15px] font-semibold md:w-[100px] w-[75px] md:h-[40px] h-[30px] rounded-xl md:mr-[280px] hover:bg-yellow-500 active:bg-yellow-600' onClick={() => setIsModalOpen(true)}>Review</button>
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
          <div className='group w-full md:my-0 my-10 md:mb-[40px]'>
            <p className='font-roboto font-semibold md:text-[25px] text-[20px] py-4 text-kuningButton'>{t("Berlangganan")}</p>
            <p className='font-roboto md:px-2 px-10 font-medium md:text-[16px] text-[14px]'>{t("textBerlangganan")}</p>
            <form onSubmit={handleSubmitLangganan}>
              <div className="flex flex-col items-center relative w-full group">
                <input
                  type="text"
                  name='nama'
                  value={formLangganan.nama}
                  placeholder=" Masukan Nama.."
                  onChange={handelFormLangganan}
                  className="border border-slate-100 shadow-lg bg-slate-100 text-slate-800 rounded-xl md:w-[500px] w-[290px] md:h-[40px] h-[35px] my-4 placeholder:font-onest placeholder:text-slate-500 placeholder:text-[14px]" />

                <div className="relative md:w-[500px] w-[290px]">

                  <input
                    type="email"
                    name="email"
                    value={formLangganan.email}
                    onChange={handelFormLangganan}
                    placeholder="Masukan Email.."
                    className="border border-slate-100 shadow-lg bg-slate-100 text-slate-800 rounded-xl md:w-[500px] w-[290px] md:h-[40px] h-[35px] my-1 placeholder:font-onest placeholder:text-slate-500 placeholder:text-[14px] pr-12"
                  />
                  <button
                    type="submit"
                    className="md:block hidden absolute right-2 top-1/2 -translate-y-1/2 bg-bluePu hover:bg-blue-950 text-kuningButton font-roboto w-[100px] px-3 py-1 rounded-xl"
                  >
                    Kirim
                  </button>
                </div>

                <button type='button' className='md:hidden block md:ml-[400px] my-4 bg-kuningButtonitems-end text-bluePu font-onest text-[15px] font-semibold md:w-[100px] w-[75px] md:h-[40px] h-[30px] rounded-xl relative hover:bg-yellow-500 active:bg-yellow-600'>Kirim</button>
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