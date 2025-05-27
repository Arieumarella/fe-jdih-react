import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import { toast } from "../components/ToastProvider";
import { postDataSaran } from "../services/kontakKami.services";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import SplitText from "../components/react-bits/SplitText/SplitText";
import { getIpUser, insertDataPengunjung } from "../services/insertDataPengunjung.services";
import { useTranslation } from 'react-i18next';
import MetaData from "../components/metaDataTags";

const KontakKami = () => {

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    saran: "",
  });

  const { t } = useTranslation();

  useEffect(() => {
    getIpUser()
      .then((res) => {
        const ip = res.data.ip;
        const halaman = "Halaman Kontak Kami";
        return insertDataPengunjung(ip, halaman);
      })
      .then((response) => {

      })
      .catch((err) => {
        console.error("Terjadi error:", err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.email || !formData.saran) {
      toast.error("Harap lengkapi semua kolom Terlebih Dahulu.", { position: "bottom-right" });
      return;
    }

    try {
      const response = await postDataSaran(formData);

      if (response.status !== 200) {
        toast.error("Data gagal disimpan.", { position: "bottom-right" });
      } else {
        toast.success("Data berhasil disimpan.", { position: "bottom-right" });
        setFormData({ nama: "", email: "", saran: "" });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Terjadi kesalahan, silakan coba lagi.", { position: "bottom-right" });
    }

  };


  return (
    <>
      <MetaData
        ttitle="Kontak Kami - JDIH Kementerian PU | Informasi Alamat, Telepon & Email Resmi"
        pageDescription="Hubungi tim JDIH Kementerian PU untuk pertanyaan, masukan, atau permintaan informasi. Temukan detail alamat, nomor telepon, email resmi, dan formulir kontak kami di halaman ini."
        pageKeywords="Kontak JDIH PU, Hubungi KemenPU, Alamat JDIH PU, Telepon KemenPU, Email JDIH PU, Formulir Kontak PU, Bantuan JDIH KemenPU, Call Center JDIH PU, Tanya JDIH"
        image="https://jdih.pu.go.id/Logogram.png" // Gambar default atau banner infografis jika ada
      />
      <Headers />

      <section className='h-full bg-slate-100 py-4'>
        <h1 className="text-center font-roboto font-bold text-bluePu text-[28px] my-4">
          {/* Ukuran font h1 (text-[28px]) adalah sama untuk semua ukuran layar berdasarkan kode ini.
        Jika ingin ukuran font h1 berbeda untuk laptop, perlu didefinisikan secara eksplisit.
    */}
          <SplitText
            text={t("kontakKami")}
            delay={15}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
          />
        </h1>

        <div className="w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 my-2 md:w-[95%] lg:w-[70%]">
          {/*
      Perubahan pada div card utama:
      - Mobile (default): w-[95%]
      - Tablet (md:), disamakan dengan mobile: md:w-[95%]
      - Laptop (lg:), mengambil style md:w-[70%] yang asli: lg:w-[70%]
    */}

          <div className="lg:flex lg:justify-between lg:gap-8">
            {/*
        Perubahan pada div pembungkus peta dan form:
        - Mobile & Tablet (default & md:): Tampilan block default (elemen akan menumpuk vertikal).
        - Laptop (lg:), mengambil style md:flex yang asli: lg:flex, lg:justify-between, lg:gap-8
      */}

            {/* Maps */}
            <div className="mapouter w-[100%] mb-3 md:w-[100%] lg:w-[50%]" style={{ position: "relative", height: "400px" }}>
              {/*
          Perubahan pada div mapouter (pembungkus iframe peta):
          - Mobile (default): w-[100%]
          - Tablet (md:), disamakan dengan mobile: md:w-[100%]
          - Laptop (lg:), mengambil style md:w-[50%] yang asli: lg:w-[50%]
        */}
              <div className="gmap_canvas rounded-lg" style={{ width: "100%", height: "100%" }}>
                <iframe
                  className="gmap_iframe rounded-lg"
                  width="100%"
                  height="100%"
                  src="https://maps.google.com/maps?width=100&height=400&hl=en&q=Jl. Pattimura No.20,  RT.2/RW.1, Selong, Kby. Baru, Kota Jakarta Selatan, DKI Jakarta 12110,  Indonesia&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Form saran & Komentar */}
            <div className="w-[100%] mt-10 md:w-[100%] md:mt-10 lg:w-[50%] lg:mt-0">
              {/*
          Perubahan pada div pembungkus form:
          - Width: w-[100%] (mob), md:w-[100%] (tab), lg:w-[50%] (lap, dari md:w-[50%] asli)
          - Margin Top: mt-10 (mob), md:mt-10 (tab), lg:mt-0 (lap, dari md:mt-0 asli)
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
                <h2 className="text-center font-roboto font-bold text-bluePu text-[22px]">{t("kontakKamiKritikdanKomentar")}</h2>
                {/* Ukuran font h2 (text-[22px]) adalah sama untuk semua ukuran layar. */}

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  {/* Input Nama */}
                  <div>
                    <label className="block text-bluePu font-roboto font-medium mb-1">Nama</label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                      placeholder="Masukkan nama Anda"
                      required
                    />
                  </div>

                  {/* Input Email */}
                  <div>
                    <label className="block text-bluePu font-roboto font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                      placeholder="Masukkan email Anda"
                      required
                    />
                  </div>

                  {/* Input Saran & Komentar */}
                  <div>
                    <label className="block text-bluePu font-roboto font-medium mb-1">
                      Saran & Komentar
                    </label>
                    <textarea
                      name="saran"
                      value={formData.saran}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                      placeholder="Tulis saran dan komentar Anda"
                      required
                    ></textarea>
                  </div>

                  {/* Tombol Submit */}
                  <button
                    type="submit"
                    className="w-[28%] bg-bluePu text-kuningButton py-2 rounded-lg hover:opacity-80 transition duration-300 font-semibold self-end md:w-[28%] lg:w-[15%]"
                  >
                    {/*
                Perubahan pada tombol submit:
                - Width: w-[28%] (mob), md:w-[28%] (tab), lg:w-[15%] (lap, dari md:w-[15%] asli)
              */}
                    Kirim
                  </button>
                </form>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </section>

      <Langganan />
      <Footer />
    </>
  );
}

export default KontakKami;