import logoPu from "../assets/logoPu.png";

const Footer = () => {
    return (
      <footer className="pt-4 text-center bg-slate-100">

      <section className="px-5 md:px-[60px] justify-between flex font-roboto text-bluePu my-8">

      <div className="text-left  w-full">
       
        <div className="flex group text-[18px] w-[350px] gap-2 items-center ">
          <img src={logoPu} alt="logo pu" className="h-[50px] " />
          <p className="font-bold font-onest">Jaringan Dokumentasi <br />dan Informasi Hukum</p>
        </div>

        <div className="text-[18px] w-[500px] gap-2 items-center mt-10 font-onest">
        <p>Sekretariat Jenderal<br/>
        Kementerian Pekerjaan Umum 
        Jl. Pattimura No.20,
        Rt.2/RW/1. Selon, Kebayoran. Baru, <br />
        Kota Jakarta Selatan, DKI Jakarta 12110, Indonesia,</p>
        </div>

        <div className="text-[158x] w-[400px] items-center mt-8 font-onest">
          <p className="my-1"><i class="fa-solid fa-phone mr-2"></i> (021) 739-6783</p>
          <p className="my-1`"><i class="fa-solid fa-phone mr-2"></i> (021) 723-5216</p>
          <p className="my-1"><i class="fa-solid fa-envelope mr-2"></i> jdih@pu.go.id</p>
        </div>
        
      </div>

      <div className=" w-full text-left">
        <p className="font-bold text-bluePu text-[30px] font-onest">Temukan Kami :</p>
        <div className="flex mx-1 my-4 text-bluePu gap-5">
          <a href=""><i class="fa-brands fa-instagram fa-4x" ></i></a>
          <a href=""><i class="fa-brands fa-twitter fa-4x" ></i></a>
          <a href=""><i class="fa-brands fa-facebook fa-4x" ></i></a>
          <a href=""><i class="fa-brands fa-youtube fa-4x" ></i></a>
          <a href=""><i class="fa-brands fa-google-play fa-4x" ></i></a>
        </div>
      </div>

      <div className="text-left  w-full">
        <div className="group ml-[300px]">
          <p className="font-bold text-bluePu text-[23px] font-onest">SITEMAP</p>
          <ul className="mt-2 space-y-2 text-bluePu text-[16px] font-onest font-semibold group">
              <li className="flex items-center"><span class="material-symbols-outlined">arrow_right</span>  <a href="/" className="hover:text-slate-900">Beranda</a></li>
              <li className="flex items-center"><span class="material-symbols-outlined">arrow_right</span> <a href="/about" className="hover:text-slate-900">Tentang Kami</a></li>
              <li className="flex items-center"><span class="material-symbols-outlined">arrow_right</span>  <a href="/services" className="hover:text-slate-900">Layanan</a></li>
              <li className="flex items-center"><span class="material-symbols-outlined">arrow_right</span>  <a href="/contact" className="hover:text-slate-900">Kontak</a></li>
              <li className="flex items-center"><span class="material-symbols-outlined">arrow_right</span>  <a href="/sitemap.xml" className="hover:text-slate-900">Sitemap XML</a></li>
            </ul> 
        </div>
      </div>

      </section>

      <section className="bg-bluePu w-full p-1">
      <div className="text-center text-slate-100 font-onest py-4 font-semibold font-onest text-[14px]">Hak Cipta © 2025 Kementerian Pekerjaan Umum Republik Indonesia. All Rights Reserved</div>
      </section>

      </footer>
    );
  };
  
  export default Footer;
  