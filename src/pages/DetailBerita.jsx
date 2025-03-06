import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";

const DetailBerita = () => {

    const { slug } = useParams();

    const details = [
      { label: "Tipe", value: "Peraturan Perundang-undangan" },
      { label: "Judul", value: "Peraturan Menteri Koordinator Bidang Kemaritiman dan Investasi Nomor 5 Tahun 2024 tentang Tugas dan Tata Kerja Tim Koordinasi Serta Pedoman Teknis Tata Kelola Kompleks Candi Borobudur" },
      { label: "T.E.U. Badan / Pengarang", value: "Indonesia. Kementerian Koordinator Bidang Kemaritiman dan Investasi" },
      { label: "No. Peraturan", value: "5" },
      { label: "Jenis/Bentuk Peraturan", value: "Peraturan Menteri" },
      { label: "Singkatan Jenis/Bentuk Peraturan", value: "Permen" },
      { label: "Tempat Penetapan", value: "Jakarta" },
      { label: "Tanggal-Bulan-Tahun Penetapan", value: "16 Oktober 2024" },
      { label: "Tanggal-Bulan-Tahun Pengundangan", value: "18 Oktober 2024" },
      { label: "Sumber", value: "BN 2024 (718):14 hlm" },
      { label: "Subjek", value: "CANDI BOROBUDUR - TIM KOORDINASI" },
      { label: "Status Peraturan", value: "Berlaku" },
      { label: "Bahasa", value: "Bahasa Indonesia" },
      { label: "Lokasi", value: "Biro Hukum Kementerian Koordinator Bidang Kemaritiman dan Investasi" },
      { label: "Bidang Hukum", value: "Kepariwisataan dan Ekonomi Kreatif" },
      { label: "Lampiran", value: "-" },
    ];

    return (
      <>
        <Headers/>
            
        <section className="h-full bg-slate-100 py-4 h-[500px] ">
        

            <div className='md:flex justify-between md:w-[80%] w-full gap-4 mx-auto my-4'>
                <div className="md:w-[80%] w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">

                <div className='font-roboto font-semibold text-sm text-gray-600'>21 Feb 2024</div>


                {/* Judul Berita */}
                <h1 className="md:text-[23px] text-[23px] font-bold font-roboto text-blue-900 mt-3 text-center">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat nesciunt quam harum debitis, placeat labore suscipit, ipsa quis tempora
                </h1>

                {/* Gambar Berita */}
                <div className="w-full h-[200px] md:h-[300px] overflow-hidden rounded-lg mt-4">
                    <img
                    src="/1.jpg"
                    alt="Gambar Berita"
                    className="w-full h-full object-fill"
                    />
                </div>

                {/* Deskripsi Berita */}
                <p className="text-gray-600 text-sm md:text-base mt-4 text-justify leading-relaxed font-roboto">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut sapiente temporibus neque, repellendus necessitatibus dignissimos, consequatur praesentium molestias molestiae mollitia sit laudantium delectus saepe quam ratione distinctio sequi iste architecto quasi ipsam recusandae ad! Alias, dolorum modi excepturi consequuntur molestias nulla accusamus, provident eos architecto ab libero id? Neque enim quia tempore, dolorum, expedita facere incidunt recusandae quod distinctio aut, corporis unde id? Voluptate culpa enim minima corrupti, ab ad error officiis impedit exercitationem sunt possimus dignissimos, eos nulla maxime, id autem repellendus doloremque ex. Omnis nam accusamus qui voluptates, maiores soluta consectetur doloribus dolorum nihil magni vel natus perferendis dignissimos aut eos architecto autem. Tempora necessitatibus saepe illo! Incidunt non voluptate laboriosam. Fuga, quae recusandae cumque ab a iusto molestiae provident reprehenderit perferendis non doloribus amet nesciunt voluptas adipisci error laboriosam suscipit illo reiciendis deserunt odio, molestias voluptatum neque! Incidunt libero omnis enim, sunt dolorem saepe dolores id voluptatibus minima architecto, explicabo praesentium quo distinctio temporibus quas laudantium quis laborum consectetur veniam iusto exercitationem inventore ab mollitia. Reprehenderit sed dolores quisquam nisi repellendus laudantium, unde quam voluptates ipsum porro, laborum doloremque et ab nemo accusantium alias enim harum sapiente sint aliquid. Impedit fuga culpa harum doloremque illum commodi reiciendis nisi, eveniet modi repellendus inventore excepturi odit ducimus, vero ex consequuntur alias. Ipsum ea in iure aliquam, sed ipsam voluptate reiciendis nam repudiandae ad.
                </p>
                
                {/* Tombol Kembali */}
                <div className="mt-6">
                <button 
                    onClick={() => window.history.back()} 
                    className="flex items-center gap-2 bg-bluePu text-kuningButton hover:bg-opacity-80 font-bold py-2 px-2
                     rounded-md shadow-md transition-all duration-300 text-[14px]">
                    <i className="fa-solid fa-arrow-left"></i> Kembali
                </button>
                </div>

                <div className='flex justify-between border-t pt-2 mt-2'>
                   
                    <div className='flex-col'>
                    <p className='font-bold font-roboto text-slate-600'>Share :</p>
                    <div className="flex gap-3 mt-2">
                    {/* Twitter */}
                    <div className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                        <i className="fa-brands fa-x-twitter text-white text-2xl"></i>
                    </div>

                    {/* Facebook */}
                    <div className="w-10 h-10 flex items-center justify-center bg-[#3b5998] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                        <i className="fa-brands fa-facebook text-2xl text-white"></i>
                    </div>

                    {/* WhatsApp */}
                    <div className="w-10 h-10 flex items-center justify-center bg-[#25D366] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                        <i className="fa-brands fa-whatsapp text-white text-2xl"></i>
                    </div>

                    {/* Telegram */}
                    <div className="w-10 h-10 flex items-center justify-center bg-[#0088cc] rounded-md shadow-lg hover:bg-opacity-70 transition-all duration-400 hover:scale-125 cursor-pointer">
                        <i className="fa-brands fa-telegram text-white text-2xl"></i>
                    </div>
                    </div>
                    </div>

                    <div className="flex gap-4 mt-2 px-2">
                        <div className="flex items-center gap-1 font-roboto font-medium text-bluePu">
                        <span className="material-symbols-outlined text-lg text-bluePu">visibility</span>
                        <p className="text-sm">123</p>
                        </div>
                    </div>
                </div>


                </div>
            </div>

        </section>

        
        <Langganan/>
        <Footer/>
      </>
    );
  };
  
  export default DetailBerita;
  