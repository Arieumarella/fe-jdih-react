import { React, useEffect, useState } from 'react';
import { Rectangle, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import kuesioner from "/src/assets/kuesioner.png";
import { getUnor, getLinkTerkait, getJnsPeraturan, getKurvaPengunjung } from '../services/home.services';
import { useNavigate } from "react-router-dom";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import { useTranslation } from 'react-i18next';


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#f0f0f0', color: '#233b74', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
        <p>Pengunjung : {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const containerContens = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [unor, setUnor] = useState([]);
  const [linkTerkait, setlinkTerkait] = useState([]);
  const [jnsPeraturan, setJnsPeraturan] = useState([]);
  const [dataKurvaPengunjung, setDataKurvaPengunjung] = useState([]);


  useEffect(() => {

    // get all unor
    getUnor().then((result) => {
      setUnor(result);
    });

    // Get Link Terkait
    getLinkTerkait().then((result) => {
      setlinkTerkait(result);
    });

    // Get Jenis Peraturan
    getJnsPeraturan().then((result) => {
      setJnsPeraturan(result);
    });

    // Get Jenis Peraturan
    getKurvaPengunjung().then((result) => {
      setDataKurvaPengunjung(result);
    });

  }, []);


  return (
    <>
      <section className='px-5 lg:px-[60px] mt-[18px] group overflow-x-hidden'>
        {/* Padding section: px-5 untuk mobile dan tablet, lg:px-[60px] untuk desktop */}

        {/* Kelas 'size-25' dihapus. */}
        {/* Mengubah md:flex menjadi lg:flex agar tampilan tablet sama seperti mobile (bertumpuk) */}
        {/* Mengubah md:w-full menjadi w-full karena di mobile/tablet akan selalu full width per bagian */}
        <div className="box-content border-2 w-full rounded-xl bg-bluePu lg:flex lg:gap-6">
          {/* lg:gap-6 untuk spasi antar kolom HANYA di layar besar */}

          {/* Kolom 1: Unit Organisasi */}
          {/* Di mobile & tablet: w-full (default block) */}
          {/* Di lg ke atas: akan menjadi bagian dari flex, mengambil 1/3 ruang jika semua w-full */}
          <div className="group lg:px-6 px-6 py-4 text-center w-full my-2 lg:my-4 text-[14px] lg:text-[18px]">
            {/* Padding, margin, dan ukuran font disesuaikan: nilai mobile/tablet, lalu nilai lg */}
            <p className='font-onest font-semibold text-slate-100 text-[18px] lg:text-[23px] mb-4'>
              {t('unitOrganisasi')}
            </p>

            {unor?.length > 0 ? (
              unor.map((item, index) => (
                <AnimatedContent
                  key={item.dept_id || index} // Gunakan ID unik
                  distance={80}
                  direction="vertical"
                // ... (props AnimatedContent lainnya)
                >
                  <div
                    key={item.dept_id || `unor-item-${index}`}
                    className="box-border p-2 border-2 w-full h-auto rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4 cursor-pointer"
                    onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); navigate(`/Search/-?dept_id=${item.dept_id}`); }}
                  >
                    {item.deptname}
                  </div>
                </AnimatedContent>
              ))
            ) : (
              <AnimatedContent
                key="unor-empty"
              // ... (props AnimatedContent lainnya)
              >
                <p className='text-center text-slate-100 py-4'>{t('statistikDataTIdakDitemukan')}</p>
              </AnimatedContent>
            )}
          </div>

          {/* Kolom 2: Link Terkait & Statistik Pengunjung */}
          <div className="group lg:px-6 px-6 py-4 text-center w-full my-2 lg:my-4">
            <div className='group mb-6'>
              <p className='font-onest font-semibold text-slate-100 text-[18px] lg:text-[23px] mb-4'>
                {t('linkTerkait')}
              </p>
              <div className="box-border border-2 p-4 w-full h-auto rounded-lg text-left group">
                {linkTerkait?.length > 0 ? (
                  linkTerkait.map((item, index) => (
                    <AnimatedContent
                      key={item.linkid || `link-${index}`}
                    // ... (props AnimatedContent lainnya)
                    >
                      <div
                        key={item.linkid_sub || `link-item-${index}`}
                        className='flex items-center font-onest text-slate-100 hover:text-kuningButton text-[14px] lg:text-[18px] gap-2 my-2'
                      >
                        <span className="material-symbols-outlined -rotate-45 text-xl">link</span>
                        <a href={item.linkurl} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">
                          {item.linkname}
                        </a>
                      </div>
                    </AnimatedContent>
                  ))
                ) : (
                  <AnimatedContent
                    key="link-empty"
                  // ... (props AnimatedContent lainnya)
                  >
                    <p className='text-center text-slate-100 py-4'>{t('statistikDataTIdakDitemukan')}</p>
                  </AnimatedContent>
                )}
              </div>
            </div>

            <div className='group my-6'>
              <div className="box-border border-2 p-4 w-full h-auto rounded-lg text-center">
                <p className='font-onest font-semibold text-slate-100 text-[18px] lg:text-[20px] mb-6'>
                  {t('statistikPengunjung')}
                </p>
                <ResponsiveContainer width="100%" height={300}>
                  {/* Konfigurasi BarChart tetap sama, karena sudah responsif terhadap parentnya */}
                  <BarChart data={dataKurvaPengunjung} margin={{ right: 10, top: 20, left: -20 }} barSize={20} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                    <XAxis dataKey="name" stroke="#ffffff" fontSize="12px" />
                    <YAxis stroke="#ffffff" domain={[0, dataMax => Math.ceil(dataMax / 10) * 10]} fontSize="12px" />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar
                      dataKey="Pengunjung"
                      fill="#FFE54E"
                      activeBar={<Rectangle fill="#d1bc42" stroke="#d1bc42" />}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Kolom 3: Jenis Produk Hukum & Kuesioner */}
          <div className="group lg:px-6 px-6 py-4 text-center w-full my-2 lg:my-4">
            <div className='group mb-6'>
              <p className='font-onest font-semibold text-slate-100 text-[18px] lg:text-[23px] mb-4'>
                {t('jnsProdukHukum')}
              </p>
              <div className="box-border border-2 p-4 w-full h-auto rounded-lg text-left">
                {jnsPeraturan?.length > 0 ? (
                  jnsPeraturan.map((item, index) => (
                    <AnimatedContent
                      key={item.percategoryid || `peraturan-${index}`}
                    // ... (props AnimatedContent lainnya)
                    >
                      <div
                        key={item.percategoryid_sub || `peraturan-item-${index}`}
                        className='flex items-center font-onest text-slate-100 hover:text-kuningButton text-[14px] lg:text-[18px] gap-2 my-2'
                      >
                        <span className="material-symbols-outlined text-xl">receipt_long</span>
                        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); navigate(`/Search/${item.singkatan_file}`) }} className="truncate hover:underline">
                          {item.percategoryname}
                        </a>
                      </div>
                    </AnimatedContent>
                  ))
                ) : (
                  <AnimatedContent
                    key="peraturan-empty"
                  // ... (props AnimatedContent lainnya)
                  >
                    <p className='text-center text-slate-100 py-4'>{t('statistikDataTIdakDitemukan')}</p>
                  </AnimatedContent>
                )}
              </div>
            </div>

            <div className='group my-4'>
              <div className="box-border border-2 w-full h-auto my-2 rounded-lg text-center overflow-hidden">
                <a href="#">
                  <img src={kuesioner} alt="Kuesioner" className='w-full h-auto rounded-lg block' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default containerContens;
