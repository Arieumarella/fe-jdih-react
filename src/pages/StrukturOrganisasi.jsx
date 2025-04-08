import {React} from 'react';
import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import FadeContent from '../components/react-bits/FadeContent/FadeContent'
import SplitText from "../components/react-bits/SplitText/SplitText";


const StrukturOrganisasi = () => {

  return (
      <>
        <Headers/>
            
        <section className='h-full bg-slate-100 py-4 h-[500px]'>
        <FadeContent blur={true} duration={400} easing="ease-out" initialOpacity={0}>
        <div className='md:flex justify-between md:w-[80%] w-full gap-4 mx-auto my-4'>

                <div className="md:w-[80%] w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">

                {/* Judul Berita */}
                <h1 className="text-center font-roboto font-bold text-bluePu md:text-[30px] text-[23px] py-4">
                <SplitText
                  text={'STRUKTUR ORGANISASI JDIH KEMENTERIAN PU'}
                  delay={15}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  easing="easeOutCubic"
                  threshold={0.2}
                />
                </h1>

                <div className="my-4 p-4 font-roboto text-slate-600 text-justify">
                  <p>Organisasi JDIH Kementerian PU sesuai dengan Peraturan Menteri Pekerjaan Umum dan Perumahan Rakyat Nomor 31/PRT/M/2016 Tentang Jaringan Dokumentasi dan Informasi Hukum Kementerian Pekerjaan Umum dan Perumahan Rakyat, terdiri dari:</p>
                  <p className="mt-4">1. Pusat JDIH yaitu Biro Hukum Sekretariat Jenderal.</p>
                  <p className="mt-4">2. Anggota JDIH yaitu Unit Kerja yang memiliki tugas dan fungsi pengelolaan JDIH PU di Unit Organisasi.</p>
                </div>
                
                <img src="/StrukturOrganisasi.png" alt="image struktur organisasi"  className="w-auto mx-auto"/>

                </div>
            </div>
            </FadeContent>
        </section>      
        
        <Langganan/>
        <Footer/>
      </>
    );
  };
  
  export default StrukturOrganisasi;
  