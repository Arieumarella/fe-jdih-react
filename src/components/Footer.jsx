import logoPu from "../assets/logoPu.png"; // Pastikan path ke logoPu benar
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Data menu Anda (bisa juga di-import dari file terpisah)
const menuLinksConfig = {
  "home": "Beranda",
  "jenisProdukHukum": "Jenis Produk Hukum",
  "informasiHukum": "Informasi Hukum",
  "berita": "Berita",
  "monografi": "Monografi",
  "putusanPengadilan": "Putusan pengadilan",
  "agenda": "Agenda",
  "artikel": "Artikel",
  "simpel": "SiMPeL",
  "prolegnas": "Prolegnas RUU Prioritas Tahunan",
  "progsun": "Progsun PP/PERPRES",
  "prolegPupr": "PROLEG PUPR",
  "ipRpp": "IP RPP/RPERPRES",
  "ipRpermen": "IP RPERMEN",
  "statistik": "Statistik",
  "tentangJdih": "Tentang JDIH",
  "strukturOrganisasi": "Struktur Organisasi",
  "tentangKami": "Tentang Kami",
  "prasyarat": "Prasyarat",
  "kontakKami": "Kontak Kami",
  "infografis": "Infografis",
  "Mou": "Nota Kesepahaman",
  "dokumenLangka": "Dokumen Langka"
};

// Helper function untuk konversi camelCase ke kebab-case
const camelToKebabCase = (str) => {
  if (!str) return '';
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
};

// Fungsi untuk membuat path URL dari key menu
const generatePath = (key) => {
  if (key === 'home') {
    return '/';
  }
  if (key === 'Mou') {
    return '/nota-kesepahaman'; // atau '/mou'
  }
  return `/${camelToKebabCase(key)}`;
};


const Footer = () => {
  const { t } = useTranslation();
  const menuItems = Object.entries(menuLinksConfig);

  // Tentukan berapa banyak item per kolom sitemap (sesuaikan dengan kebutuhan)
  // Ini akan membagi daftar menu menjadi sekitar 2 kolom
  const itemsPerSitemapColumn = Math.ceil(menuItems.length / 2);

  return (
    <footer className="pt-4 text-center bg-slate-100 overflow-x-hidden">
      {/* SECTION UTAMA FOOTER: Dibagi menjadi 3 kolom pada layar besar (lg) */}
      <section className="px-5 lg:px-[60px] justify-between lg:flex lg:gap-x-8 font-roboto text-bluePu my-8">

        {/* Kolom 1: Info Kontak */}
        <div className="text-left w-full mb-8 lg:mb-0 lg:w-1/3"> {/* lg:w-1/3 untuk distribusi lebar */}
          <div className="flex group lg:text-[18px] text-[16px] gap-2 items-center "> {/* Dihapus lg:w-[350px] */}
            <img src={logoPu} alt={t("logoPuAlt", "Logo Kementerian PU")} className="h-[50px]" />
            <p className="font-bold font-onest">{t("namaWebsite", "JDIH Kementerian PUPR")} <br />{t("namaWebsite2", "Kementerian Pekerjaan Umum dan Perumahan Rakyat")}</p>
          </div>
          <div className="lg:text-[18px] text-[14px] w-full gap-2 items-center lg:mt-10 mt-6 font-onest"> {/* Dihapus lg:w-[500px] */}
            <p>{t("alamat", "Jl. Pattimura No. 20")}<br />
              {t("alamat2", "Kebayoran Baru")}
              <br />{t("alamat3", "Jakarta Selatan")} {t("alamat4", "12110")}<br /> {t("alamat5", "Indonesia")}</p>
          </div>
          <div className="lg:text-[15px] text-[14px] w-full items-center lg:mt-8 mt-4 font-onest"> {/* Dihapus lg:w-[400px] */}
            <p className="my-1"><i className="fa-solid fa-phone mr-2"></i> (021) 739-6783</p>
            <p className="my-1"><i className="fa-solid fa-phone mr-2"></i> (021) 723-5216</p>
            <p className="my-1"><i className="fa-solid fa-envelope mr-2"></i> jdih@pu.go.id</p>
          </div>
        </div>

        {/* Kolom 2: Temukan Kami (Sosial Media) */}
        <div className="w-full text-left lg:mt-0 mt-6 mb-8 lg:mb-0 lg:w-1/3"> {/* lg:w-1/3 untuk distribusi lebar */}
          <p className="font-bold text-bluePu lg:text-[30px] text-[18px] font-onest">
            {t("temukanKami", "Temukan Kami")}
          </p>
          <div className="flex mx-1 lg:my-4 my-0 text-bluePu lg:gap-5 gap-2">
            {/* Ganti '#' dengan URL sosial media yang sebenarnya */}
            <a href="https://instagram.com/kemenpupr" target="_blank" rel="noopener noreferrer" aria-label={t("sosmed.instagram", "Instagram Kementerian PUPR")}><i className="fa-brands fa-instagram md:fa-3x fa-3x"></i></a>
            <a href="https://twitter.com/kemenpu" target="_blank" rel="noopener noreferrer" aria-label={t("sosmed.twitter", "Twitter Kementerian PUPR")}><i className="fa-brands fa-twitter md:fa-3x fa-3x"></i></a>
            <a href="https://facebook.com/KementerianPUPR" target="_blank" rel="noopener noreferrer" aria-label={t("sosmed.facebook", "Facebook Kementerian PUPR")}><i className="fa-brands fa-facebook md:fa-3x fa-3x"></i></a>
            <a href="https://www.youtube.com/user/kemenPU" target="_blank" rel="noopener noreferrer" aria-label={t("sosmed.youtube", "YouTube Kementerian PUPR")}><i className="fa-brands fa-youtube md:fa-3x fa-3x"></i></a>
            {/* <a href="#" target="_blank" rel="noopener noreferrer" aria-label={t("sosmed.playstore", "Google Play Store")}><i className="fa-brands fa-google-play md:fa-3x fa-3x"></i></a> */}
          </div>
        </div>

        {/* Kolom 3: Sitemap (Dengan Grid untuk membagi list sitemap) */}
        <div className="text-left w-full lg:w-1/3"> {/* lg:w-1/3 untuk distribusi lebar, dihapus lg:ml-[300px] */}
          <div className="group lg:mt-0 mt-6"> {/* Dihapus lg:ml-[300px] karena layout kolom diatur oleh flex parent */}
            <p className="font-bold text-bluePu lg:text-[23px] text-[18px] font-onest mb-2"> {/* Menambah mb-2 untuk spasi bawah judul */}
              {t("footer.sitemapTitle", "PETA SITUS")}
            </p>
            {/* Kontainer grid untuk list sitemap, menjadi 2 kolom di layar md ke atas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6"> {/* gap-x-6 untuk spasi antar kolom sitemap */}
              {/* Kolom Sitemap 1 */}
              <ul className="space-y-2 text-bluePu lg:text-[16px] text-[14px] font-onest font-semibold">
                {menuItems.slice(0, itemsPerSitemapColumn).map(([key, textValue]) => (
                  <li key={key} className="flex items-center">
                    <span className="material-symbols-outlined mr-2 text-sm">arrow_right</span>
                    <Link
                      to={generatePath(key)}
                      className="hover:text-slate-900 transition-colors duration-200"
                    >
                      {textValue}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Kolom Sitemap 2 */}
              <ul className="space-y-2 text-bluePu lg:text-[16px] text-[14px] font-onest font-semibold mt-4 md:mt-0"> {/* mt-4 untuk mobile, md:mt-0 untuk tablet ke atas */}
                {menuItems.slice(itemsPerSitemapColumn).map(([key, textValue]) => (
                  <li key={key} className="flex items-center">
                    <span className="material-symbols-outlined mr-2 text-sm">arrow_right</span>
                    <Link
                      to={generatePath(key)}
                      className="hover:text-slate-900 transition-colors duration-200"
                    >
                      {textValue}
                    </Link>
                  </li>
                ))}
                {/* Link manual ke sitemap.xml diletakkan di akhir kolom kedua */}
                <li className="flex items-center mt-2"> {/* mt-2 untuk spasi dari item terakhir */}
                  <span className="material-symbols-outlined mr-2 text-sm">arrow_right</span>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 transition-colors duration-200"
                  >
                    {t("footer.sitemapXmlLink", "Sitemap XML")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION HAK CIPTA */}
      <section className="bg-bluePu w-full p-1">
        <div className="text-center text-slate-100 py-4 font-semibold font-onest lg:text-[14px] text-[10px]">{t("hakcipta", "© 2023 JDIH Kementerian PUPR. All rights reserved.")}</div>
      </section>
    </footer>
  );
};

export default Footer;