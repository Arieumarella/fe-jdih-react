import logoPu from "../assets/logoPu.png";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="pt-4 text-center bg-slate-100 overflow-x-hidden">

      {/* Mengubah md:flex menjadi lg:flex */}
      {/* Mengubah md:px-[60px] menjadi lg:px-[60px] */}
      <section className="px-5 lg:px-[60px] justify-between lg:flex font-roboto text-bluePu my-8">
        {/* Untuk spasi antar kolom di LG, Anda bisa menambahkan lg:gap-x di sini jika diperlukan, misal lg:gap-x-8 */}

        {/* Kolom 1: Info Kontak */}
        <div className="text-left w-full mb-8 lg:mb-0"> {/* Menambah mb-8 untuk mobile/tablet, lg:mb-0 untuk desktop */}
          {/* Kelas w-full dipertahankan, di dalam lg:flex ia akan mengambil proporsi (sekitar 1/3) */}

          {/* Mengubah md:text-[18px] -> lg:text-[18px], md:w-[350px] -> lg:w-[350px] */}
          <div className="flex group lg:text-[18px] text-[16px] lg:w-[350px] gap-2 items-center ">
            <img src={logoPu} alt="logo pu" className="h-[50px]" />
            <p className="font-bold font-onest">{t("namaWebsite")} <br />{t("namaWebsite2")}</p>
          </div>

          {/* Mengubah md:text-[18px] -> lg:text-[18px], md:w-[500px] -> lg:w-[500px], md:mt-10 -> lg:mt-10 */}
          <div className="lg:text-[18px] text-[14px] lg:w-[500px] w-full gap-2 items-center lg:mt-10 mt-6 font-onest">
            <p>{t("alamat")}<br />
              {t("alamat2")}
              <br />{t("alamat3")} {t("alamat4")}<br /> {t("alamat5")}</p>
          </div>

          {/* Typo: md:text-[158x] -> lg:text-[15px] (asumsi) */}
          {/* Mengubah md:text-[15px] -> lg:text-[15px], md:w-[400px] -> lg:w-[400px], md:mt-8 -> lg:mt-8 */}
          <div className="lg:text-[15px] text-[14px] lg:w-[400px] w-full items-center lg:mt-8 mt-4 font-onest">
            <p className="my-1"><i className="fa-solid fa-phone mr-2"></i> (021) 739-6783</p>
            <p className="my-1"><i className="fa-solid fa-phone mr-2"></i> (021) 723-5216</p> {/* Memperbaiki typo backtick di akhir my-1 */}
            <p className="my-1"><i className="fa-solid fa-envelope mr-2"></i> jdih@pu.go.id</p>
          </div>
        </div>

        {/* Kolom 2: Temukan Kami (Sosial Media) */}
        <div className="w-full text-left lg:mt-0 mt-6 mb-8 lg:mb-0"> {/* Menambah mb-8 untuk mobile/tablet */}
          {/* Mengubah md:mt-0 -> lg:mt-0 */}
          <p className="font-bold text-bluePu lg:text-[30px] text-[18px] font-onest">
            {/* Mengubah md:text-[30px] -> lg:text-[30px] */}
            {t("temukanKami")}
          </p>
          {/* Kelas ikon asli dipertahankan. Responsivitas ukuran ikon bisa dipertimbangkan jika fa-3x terlalu besar di mobile. */}
          <div className="flex mx-1 lg:my-4 my-0 text-bluePu lg:gap-5 gap-2">
            {/* Mengubah md:my-4 -> lg:my-4, md:gap-5 -> lg:gap-5 */}
            <a href="#"><i className="fa-brands fa-instagram md:fa-3x fa-3x"></i></a> {/* href="#" ditambahkan */}
            <a href="#"><i className="fa-brands fa-twitter md:fa-3x fa-3x"></i></a>
            <a href="#"><i className="fa-brands fa-facebook md:fa-3x fa-3x"></i></a>
            <a href="#"><i className="fa-brands fa-youtube md:fa-3x fa-3x"></i></a>
            <a href="#"><i className="fa-brands fa-google-play md:fa-3x fa-3x"></i></a>
          </div>
        </div>

        {/* Kolom 3: Sitemap */}
        <div className="text-left w-full"> {/* mb-8 tidak perlu jika ini kolom terakhir yang bertumpuk */}
          {/* Mengubah md:ml-[300px] -> lg:ml-[300px], md:mt-0 -> lg:mt-0 */}
          {/* PERHATIAN: lg:ml-[300px] adalah offset tetap. Ini mungkin tidak ideal untuk semua lebar layar LG+. */}
          {/* Pertimbangkan untuk menghapusnya dan membiarkan flexbox menangani alignment, atau gunakan lg:ml-auto jika ingin ke kanan. */}
          <div className="group lg:ml-[300px] lg:mt-0 mt-6">
            <p className="font-bold text-bluePu lg:text-[23px] text-[18px] font-onest">
              {/* Mengubah md:text-[23px] -> lg:text-[23px] */}
              SITEMAP
            </p>
            {/* Mengubah md:text-[16px] -> lg:text-[16px] */}
            <ul className="mt-2 space-y-2 text-bluePu lg:text-[16px] text-[14px] font-onest font-semibold group">
              <li className="flex items-center"><span className="material-symbols-outlined">arrow_right</span> <a href="/" className="hover:text-slate-900">Beranda</a></li>
              <li className="flex items-center"><span className="material-symbols-outlined">arrow_right</span> <a href="/about" className="hover:text-slate-900">Tentang Kami</a></li>
              <li className="flex items-center"><span className="material-symbols-outlined">arrow_right</span> <a href="/services" className="hover:text-slate-900">Layanan</a></li>
              <li className="flex items-center"><span className="material-symbols-outlined">arrow_right</span> <a href="/contact" className="hover:text-slate-900">Kontak</a></li>
              <li className="flex items-center"><span className="material-symbols-outlined">arrow_right</span> <a href="/sitemap.xml" className="hover:text-slate-900">Sitemap XML</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-bluePu w-full p-1">
        {/* Mengubah md:text-[14px] -> lg:text-[14px] */}
        <div className="text-center text-slate-100 py-4 font-semibold font-onest lg:text-[14px] text-[10px]">{t("hakcipta")}</div>
      </section>
    </footer>
  );
};

export default Footer;
