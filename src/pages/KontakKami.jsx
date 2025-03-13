import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import React, { useState } from "react";

const KontakKami = () => {

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    saran: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Terima kasih atas saran & komentar Anda!");
    console.log(formData);
    // Bisa dikirim ke backend API di sini
  };


    return (
        <>  
          <Headers/>

          <section className='h-full bg-slate-100 py-4 h-[500px]'>
                            
          <h1 className="text-center font-roboto font-bold text-bluePu text-[24px] my-4">KONTAK KAMI</h1>

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