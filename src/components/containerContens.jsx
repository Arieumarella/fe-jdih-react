import React from 'react';
import {Rectangle, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import kuesioner from "/src/assets/kuesioner.png";


const data = [
    { name: 'Senin', Pengunjung: 3200},
    { name: 'Selasa', Pengunjung: 2800},
    { name: 'Rabu', Pengunjung: 2600},
    { name: 'Kamis', Pengunjung: 3000},
    { name: 'Jumat', Pengunjung: 2700},
    { name: 'Sabtu', Pengunjung: 2900},
    { name: 'Minggu', Pengunjung: 3100},
  ];

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

  return (
    <>
    <section className=' px-5 md:px-[60px] mt-[18px] group'>

        <div className="box-content size-25 border-2 md:w-full rounded-xl bg-bluePu md:flex">

        <div className="group md:px-6 px-6 md:py-4 text-center w-full md:my-4 my-2 md:text-[18px] text-[14px] ">
            <p className='font-onest font-semibold text-slate-100 md:text-[23px] text-[18px]'>Unit Organisasi</p>
            <div className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4">
              <a href="">Sekretariat Jenderal</a>
            </div>
            <div className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4">
                 <a href="">Sekretariat Jenderal</a>
            </div>
            <div className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4 ">
                 <a href="">Sekretariat Jenderal</a>
            </div>
            <div className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4 ">
                 <a href="">Sekretariat Jenderal</a>
            </div>
            <div className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4 ">
                 <a href="">Sekretariat Jenderal</a>
            </div>
            <div className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4 ">
                 <a href="">Sekretariat Jenderal</a>
            </div>
            <div className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4 ">
                 <a href="">Sekretariat Jenderal</a>
            </div>
            <div className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4 ">
                 <a href="">Sekretariat Jenderal</a>
            </div>
            <div className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4 ">
                 <a href="">Sekretariat Jenderal</a>
            </div>
            <div className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4 ">
                 <a href="">Sekretariat Jenderal</a>
            </div>
            <div className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4 ">
                 <a href="">Sekretariat Jenderal</a>
            </div>

        </div>   

        <div className="group px-6 md:py-4 py-1 text-center w-full md:my-4 ">
            <div className='group'>
            <p className='font-onest font-semibold text-slate-100 md:text-[23px] text-[18px]'>Link Terkait</p>

            <div className="box-border border-2 p-4 w-full h-auto px-2 my-2 rounded-lg text-left group">
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 md:my-2'>
                    <span className="material-symbols-outlined -rotate-45">link</span> <a href="">Badan Pembina Hukum Nasional</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined -rotate-45">link</span> <a href="">JDIHN</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined -rotate-45">link</span> <a href="">Kemenko Infra</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined -rotate-45">link</span> <a href="">Kementerian Perhubungan</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined -rotate-45">link</span> <a href="">Kementerian LHK</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined -rotate-45">link</span> <a href="">Kementerian Parekaf</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined -rotate-45">link</span> <a href="">Kementerian Kelautan & Perikanan</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined -rotate-45">link</span> <a href="">Arsip Nasional</a>
                </div>
            </div>

            </div>

            <div className='group md:my-4 my-6'>
                <div className="box-border border-2 p-4 w-full h-auto px-2 my-2 rounded-lg text-center">
                    <p className='font-onest font-semibold text-slate-100 md:text-[20px] text-[18px]'>Statistik Pengunjung</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data} margin={{right:10, top:20}} barSize={30} >
                        <CartesianGrid strokeDasharray="" />
                        <XAxis dataKey="name" stroke="#ffffff" />
                        <YAxis stroke="#ffffff" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="Pengunjung" fill="#FFE54E" activeBar={<Rectangle fill="#d1bc42" stroke="#d1bc42" />}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div> 
        
        <div className="group px-6 md:py-4 text-center w-full">
            <div className='group md:my-4'>
            <p className='font-onest font-semibold text-slate-100 md:text-[23px] text-[18px]'>Jenis Produk Hukum</p>

            <div className="box-border border-2 p-4 w-full h-auto px-2 my-2 rounded-lg text-left">
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Undang-undang</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">PP Pengganti Undang-undang</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Peraturan Pemerintah</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Peraturan Presiden</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Keputusan Presiden</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Instruksi Presiden</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Peraturan Menteri</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Keputusan Menteri</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Surat Edaran Menteri</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Instruksi Menteri</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Keputusan Menteri</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Keputusan Sekertaris Jenderal</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Surat Edaran Sekretaris Jenderal</a>
                </div>
                <div className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="">Terjemahan</a>
                </div>

            </div>

            </div>

            <div className='group my-4'>
            <div className="box-border border-2 w-full h-auto my-2 rounded-lg text-center">
             <a href=""><img src={kuesioner} alt="Kuesioner" className='rounded-lg' /></a> 
            </div>
            </div>
        </div> 

           

        </div>
    </section>
    </>
  );
};

export default containerContens;
