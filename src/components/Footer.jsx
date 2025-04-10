import logoPu from "../assets/logoPu.png";

const Footer = () => {
    return (
      <footer className="pt-4 text-center bg-slate-100 overflow-x-hidden">

      <section className="px-5 md:px-[60px] justify-between md:flex font-roboto text-bluePu my-8">

      <div className="text-left w-full">
       
        <div className="flex group md:text-[18px] text-[16px] md:w-[350px] gap-2 items-center ">
          <img src={logoPu} alt="logo pu" className="h-[50px] " />
          <p className="font-bold font-onest">Jaringan Dokumentasi <br />dan Informasi Hukum</p>
        </div>

        <div className="md:text-[18px] text-[14px] md:w-[500px] w-full gap-2 items-center md:mt-10 mt-6 font-onest">
        <p>Biro Hukum, Sekretariat Jenderal<br/>
        Kementerian Pekerjaan Umum 
        <br />Lt. 7 Gedung Utama,Jl. Pattimura No.20,
        Rt.2/RW/1. Selon, Kebayoran. Baru, Kota Jakarta Selatan, <br /> Jakarta 12110, Indonesia,</p>
        </div>

        <div className="md:text-[158x] text-[14px] md:w-[400px] w-full items-center md:mt-8 mt-4 font-onest">
          <p className="my-1"><i className="fa-solid fa-phone mr-2"></i> (021) 739-6783</p>
          <p className="my-1`"><i className="fa-solid fa-phone mr-2"></i> (021) 723-5216</p>
          <p className="my-1"><i className="fa-solid fa-envelope mr-2"></i> jdih@pu.go.id</p>
        </div>
        
      </div>

      <div className=" w-full text-left md:mt-0 mt-6">
        <p className="font-bold text-bluePu md:text-[30px] text-[18px] font-onest">Temukan Kami :</p>
        <div className="flex mx-1 md:my-4 my-0 text-bluePu md:gap-5 gap-2">
          <a href=""><i className="fa-brands fa-instagram md:fa-3x fa-3x" ></i></a>
          <a href=""><i className="fa-brands fa-twitter md:fa-3x fa-3x" ></i></a>
          <a href=""><i className="fa-brands fa-facebook md:fa-3x fa-3x" ></i></a>
          <a href=""><i className="fa-brands fa-youtube md:fa-3x fa-3x" ></i></a>
          <a href=""><i className="fa-brands fa-google-play md:fa-3x fa-3x" ></i></a>
        </div>
      </div>

      <div className="text-left  w-full">
        <div className="group md:ml-[300px] md:mt-0 mt-6">
          <p className="font-bold text-bluePu md:text-[23px] text-[18px] font-onest">SITEMAP</p>
          <ul className="mt-2 space-y-2 text-bluePu md:text-[16px] text-[14px] font-onest font-semibold group">
              <li className="flex items-center"><span className="material-symbols-outlined">arrow_right</span>  <a href="/" className="hover:text-slate-900">Beranda</a></li>
              <li className="flex items-center"><span className="material-symbols-outlined">arrow_right</span> <a href="/about" className="hover:text-slate-900">Tentang Kami</a></li>
              <li className="flex items-center"><span className="material-symbols-outlined">arrow_right</span>  <a href="/services" className="hover:text-slate-900">Layanan</a></li>
              <li className="flex items-center"><span className="material-symbols-outlined">arrow_right</span>  <a href="/contact" className="hover:text-slate-900">Kontak</a></li>
              <li className="flex items-center"><span className="material-symbols-outlined">arrow_right</span>  <a href="/sitemap.xml" className="hover:text-slate-900">Sitemap XML</a></li>
            </ul> 
        </div>
      </div>

      </section>

      <section className="bg-bluePu w-full p-1">
      <div className="text-center text-slate-100 font-onest py-4 font-semibold font-onest md:text-[14px] text-[10px]">Hak Cipta © 2025 Kementerian Pekerjaan Umum Republik Indonesia. All Rights Reserved</div>
      </section>

      </footer>
    );
  };
  
  export default Footer;
  