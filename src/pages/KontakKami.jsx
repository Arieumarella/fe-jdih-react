import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { toast } from "../components/ToastProvider";
import {postDataSaran} from "../services/kontakKami.services";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import SplitText from "../components/react-bits/SplitText/SplitText";

const KontakKami = () => {

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    saran: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
     if(!formData.nama || !formData.email || !formData.saran) {
          toast.error("Harap lengkapi semua kolom Terlebih Dahulu.", { position: "bottom-right"});
          return;
        }
    
        try {
          const response = await postDataSaran(formData);
    
          if (response.status !== 200) {
            toast.error("Data gagal disimpan.", { position: "bottom-right"});
          }else{
            toast.success("Data berhasil disimpan.", { position: "bottom-right" });
            setFormData({nama: "", email: "", saran:""});
          }
        } catch (error) {
          console.error("Error submitting feedback:", error);
          toast.error("Terjadi kesalahan, silakan coba lagi.", { position: "bottom-right"});
        } 

  };


    return (
        <>  
          <Headers/>

          <section className='h-full bg-slate-100 py-4 h-[500px]'>
                            
          <h1 className="text-center font-roboto font-bold text-bluePu text-[28px] my-4">
            <SplitText
                text={'KONTAK KAMI'}
                delay={15}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
            />
          </h1>

                <div className="md:w-[70%] w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-300 my-2">

                <div className="md:flex justify-between gap-8">

                    {/* Maps */}
                    
                    <div className="mapouter md:w-[50%] w-[100%] mb-3" style={{ position: "relative", height: "400px" }}>
                   
                      <div className="gmap_canvas rounded-lg" style={{ width: "100%", height: "100%" }}>
                        <iframe
                          className="gmap_iframe rounded-lg"
                          width="100%"
                          height="100%"
                          src="https://maps.google.com/maps?width=100&amp;height=400&amp;hl=en&amp;q=Jl. Pattimura No.20,  RT.2/RW.1, Selong, Kby. Baru, Kota Jakarta Selatan, DKI Jakarta 12110,  Indonesia&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                          allowFullScreen
                        ></iframe>
                      </div>
                    
                    </div>
                    

                  {/* Form saran & Komentar */}
                  <div className="md:w-[50%] w-[100%] md:mt-0 mt-10">
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
                  <h2 className="text-center font-roboto font-bold text-bluePu text-[22px]">Saran & Komentar</h2>
        
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
                      className="md:w-[15%] w-[28%] bg-bluePu text-kuningButton  py-2 rounded-lg hover:opacity-80 transition duration-300 font-semibold self-end"
                    >
                      Kirim
                    </button>
                  </form>
                  </AnimatedContent>
                 </div>    
                 
                </div>


                </div>
            </section>

          <Langganan/>
          <Footer/>
        </>
    );
}

export default KontakKami;