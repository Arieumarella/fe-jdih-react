// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap'; // 1. Impor plugin sitemap

// --- DATA PENDUKUNG SITEMAP ---
// 2. GANTI DENGAN DOMAIN PRODUKSI ANDA YANG SEBENARNYA
const HOSTNAME = 'https://www.jdih.pu.go.id';
// Jika API Anda di domain/port berbeda saat build, definisikan di sini
// const API_BASE_URL = 'http://localhost:3001/api'; // Contoh untuk development
// const API_BASE_URL_PROD = 'https://api.kementerian-pu.go.id/v1'; // Contoh untuk produksi

// 3. Daftar rute statis Anda (sesuaikan berdasarkan file Routes Anda)
const staticRoutes = [
  '/',
  '/Berita',
  '/Monografi',
  '/struktur-organisasi',
  '/putusan-pengadilan', // Perbaikan dari 'putasn-pengadilan'
  '/agenda',
  '/artikel',
  '/tentang-kami',
  '/prasyarat',
  '/kontak-kami',
  '/statistik',
  '/infografis',
  '/Mou',
  '/Dokumen-Langka',
  // Tambahkan rute statis lain yang mungkin ada di menu atau tidak tercakup di atas
  // misalnya, jika ada halaman daftar produk hukum sebelum detail:
  // '/jenis-produk-hukum',
  // '/informasi-hukum',
];

// 4. FUNGSI PLACEHOLDER UNTUK MENGAMBIL DATA DINAMIS (SLUGS/IDs)
// GANTI INI DENGAN IMPLEMENTASI FETCHING DATA YANG SEBENARNYA DARI API ANDA
// Fungsi ini akan dijalankan saat proses build (`npm run build`)

// Contoh: Mengambil semua slug berita
const getBeritaSlugs = async () => {
  try {
    // GANTI DENGAN ENDPOINT API ANDA:
    // const response = await fetch(`${API_BASE_URL_PROD}/berita/all-slugs`);
    // if (!response.ok) throw new Error(`Failed to fetch berita slugs: ${response.status}`);
    // const data = await response.json(); // Misal data: [{ slug: 'berita-satu' }, { slug: 'berita-dua' }]
    // return data.map(item => item.slug);
    console.log("Fetching berita slugs (placeholder)...");
    return ['judul-berita-pertama', 'artikel-berita-kedua-yang-panjang']; // Placeholder
  } catch (error) {
    console.warn('Error fetching berita slugs:', error.message);
    return [];
  }
};

const getMonografiSlugs = async () => {
  // IMPLEMENTASIKAN: fetch semua slug monografi
  console.log("Fetching monografi slugs (placeholder)...");
  return ['monografi-a', 'monografi-b']; // Placeholder
};

const getDetailDokumenSlugs = async () => {
  // IMPLEMENTASIKAN: fetch semua slug untuk /detail-dokumen/:slug
  console.log("Fetching detail dokumen slugs (placeholder)...");
  return ['dokumen-penting-1', 'dokumen-lain-2']; // Placeholder
};

const getPutusanPengadilanSlugs = async () => {
  // IMPLEMENTASIKAN: fetch semua slug untuk /putusan-pengadilan/:slug
  console.log("Fetching putusan pengadilan slugs (placeholder)...");
  return ['putusan-nomor-123', 'putusan-nomor-456']; // Placeholder
};

const getArtikelSlugs = async () => {
  // IMPLEMENTASIKAN: fetch semua slug untuk /artikel/:slug
  console.log("Fetching artikel slugs (placeholder)...");
  return ['artikel-menarik-pertama', 'artikel-opini-kedua']; // Placeholder
};

const getSimpelSlugs = async () => {
  // IMPLEMENTASIKAN: fetch semua slug untuk /SiMPeL/:slug
  console.log("Fetching SiMPeL slugs (placeholder)...");
  return ['simpel-data-a', 'simpel-data-b']; // Placeholder
};

const getInfografisIds = async () => {
  // IMPLEMENTASIKAN: fetch semua ID untuk /infografis/:id
  console.log("Fetching infografis IDs (placeholder)...");
  return ['101', '102', '103']; // Placeholder (pastikan berupa string jika ID adalah string)
};

const getMouDetailSlugs = async () => {
  // IMPLEMENTASIKAN: fetch semua slug untuk /Mou-detail/:slug
  console.log("Fetching MoU detail slugs (placeholder)...");
  return ['mou-kerjasama-x', 'mou-proyek-y']; // Placeholder
};

const getDokumenLangkaSlugs = async () => {
  // IMPLEMENTASIKAN: fetch semua slug untuk /Dokumen-Langka/:slug
  console.log("Fetching dokumen langka slugs (placeholder)...");
  return ['dokumen-sejarah-1', 'dokumen-langka-penting-2']; // Placeholder
};

// Untuk /Search/:tipePencarian, jika ada tipe pencarian spesifik yang ingin diindeks
const searchTypesToIncludeInSitemap = ['produk-hukum', 'berita', 'artikel']; // Contoh
// --- AKHIR DATA PENDUKUNG SITEMAP ---


// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => { // Ubah menjadi fungsi async
  let dynamicSitemapRoutes = [];

  // 5. Hanya jalankan fetch data dinamis saat proses build
  if (command === 'build') {
    console.log("Sitemap generation: Fetching dynamic routes for production build...");
    const beritaSlugs = await getBeritaSlugs();
    const monografiSlugs = await getMonografiSlugs();
    const detailDokumenSlugs = await getDetailDokumenSlugs();
    const putusanPengadilanSlugs = await getPutusanPengadilanSlugs();
    const artikelSlugs = await getArtikelSlugs();
    const simpelSlugs = await getSimpelSlugs();
    const infografisIds = await getInfografisIds();
    const mouDetailSlugs = await getMouDetailSlugs();
    const dokumenLangkaSlugs = await getDokumenLangkaSlugs();

    dynamicSitemapRoutes = [
      ...beritaSlugs.map(slug => `/Berita/${slug}`),
      ...monografiSlugs.map(slug => `/Monografi/${slug}`),
      ...detailDokumenSlugs.map(slug => `/detail-dokumen/${slug}`),
      ...putusanPengadilanSlugs.map(slug => `/putusan-pengadilan/${slug}`),
      ...artikelSlugs.map(slug => `/artikel/${slug}`),
      ...simpelSlugs.map(slug => `/SiMPeL/${slug}`),
      ...infografisIds.map(id => `/infografis/${id}`),
      ...mouDetailSlugs.map(slug => `/Mou-detail/${slug}`),
      ...dokumenLangkaSlugs.map(slug => `/Dokumen-Langka/${slug}`),
      ...searchTypesToIncludeInSitemap.map(type => `/Search/${type}`),
    ];
    console.log(`Sitemap generation: Fetched ${dynamicSitemapRoutes.length} dynamic routes.`);
  }

  const allSitemapRoutes = [...new Set([...staticRoutes, ...dynamicSitemapRoutes])];

  return {
    assetsInclude: ['**/*.glb'],
    plugins: [
      react(),
      // 6. Konfigurasi plugin Sitemap
      Sitemap({
        hostname: HOSTNAME,
        dynamicRoutes: allSitemapRoutes, // Gunakan gabungan rute
        // Opsi tambahan (sesuaikan dengan kebutuhan)
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date(), // Default last modification adalah tanggal build
        robots: [
          { userAgent: '*', allow: '/' },
          // Tambahkan aturan disallow jika ada bagian yang tidak ingin di-crawl
          // { userAgent: '*', disallow: '/admin' },
          // { userAgent: 'Googlebot', disallow: '/specific-for-google' },
        ],
        // Jika Anda ingin lebih detail per rute (prioritas, lastmod, changefreq):
        // routes: allSitemapRoutes.map(route => ({
        //   url: route,
        //   changefreq: route.startsWith('/Berita/') ? 'daily' : (route === '/' ? 'monthly' : 'weekly'),
        //   priority: route === '/' ? 1.0 : (route.startsWith('/Berita/') ? 0.9 : 0.7),
        //   // lastmod: ambil dari API jika ada data tanggal update per item
        // })),
      }),
    ],
  };
});