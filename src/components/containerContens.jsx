import {React, useEffect, useState} from 'react';
import {Rectangle, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import kuesioner from "/src/assets/kuesioner.png";
import { getUnor, getLinkTerkait, getJnsPeraturan, getKurvaPengunjung } from '../services/home.services';
import { useNavigate } from "react-router-dom";
import AnimatedContent from '../components/react-bits/AnimatedContent/AnimatedContent';
import Aurora from '../components/react-bits/Aurora/Aurora';

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
    <section className=' px-5 md:px-[60px] mt-[18px] group overflow-x-hidden'>

        <div className="box-content size-25 border-2 md:w-full rounded-xl bg-bluePu md:flex">

        <div className="group md:px-6 px-6 md:py-4 text-center w-full md:my-4 my-2 md:text-[18px] text-[14px] ">
            <p className='font-onest font-semibold text-slate-100 md:text-[23px] text-[18px]'>Unit Organisasi</p>
            
            {unor?.length > 0 ? (
              unor.map((item, index) => (
              <AnimatedContent
                key={index}
                distance={80}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1}
                threshold={0.2}
              >
                <div key={index} className="box-border p-2 border-2 w-full h-auto my-2 rounded-lg font-onest text-slate-100 hover:text-kuningButton my-4">
                <a href="#"
                onClick={() => navigate(`/detail-dokumen/1`)}>{item.deptname}</a>
                </div>
              </AnimatedContent>
             ))) : (
              <AnimatedContent
                key={1}
                distance={80}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1}
                threshold={0.2}
              >
                <p className='text-center text-slate-100'>Data Kosong</p>
                </AnimatedContent>
            )}

        </div>   

        <div className="group px-6 md:py-4 py-1 text-center w-full md:my-4 ">
            <div className='group'>
            <p className='font-onest font-semibold text-slate-100 md:text-[23px] text-[18px]'>Link Terkait</p>

            <div className="box-border border-2 p-4 w-full h-auto px-2 my-2 rounded-lg text-left group">
            {linkTerkait?.length > 0 ? (
              linkTerkait.map((item, index) => (
              <AnimatedContent
                key={index+10}
                distance={80}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1}
                threshold={0.2}
              >
                <div key={index} className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 md:my-2'>
                    <span className="material-symbols-outlined -rotate-45">link</span> <a href={item.linkurl} target="_blank">{item.linkname}</a>
                </div>
              </AnimatedContent>
            ))) : (
              <AnimatedContent
                key={2}
                distance={80}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1}
                threshold={0.2}
              >
                <p className='text-center text-slate-100'>Data Kosong</p>
              </AnimatedContent>
            )}
            </div>

            </div>

            <div className='group md:my-4 my-6'>
              
                <div className="box-border border-2 p-4 w-full h-auto px-2 my-2 rounded-lg text-center">
                    <p className='font-onest font-semibold text-slate-100 md:text-[20px] text-[18px] mb-6'>Statistik Pengunjung</p>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={dataKurvaPengunjung} margin={{ right: 10, top: 20 }} barSize={25} barGap={5}>
                          <CartesianGrid strokeDasharray="" />
                          <XAxis dataKey="name" stroke="#ffffff" />
                          <YAxis stroke="#ffffff" domain={[0, dataMax => Math.ceil(dataMax / 10) * 10]} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar 
                              dataKey="Pengunjung" 
                              fill="#FFE54E" 
                              activeBar={<Rectangle fill="#d1bc42" stroke="#d1bc42" />} 
                          />
                      </BarChart>
                  </ResponsiveContainer>

                </div>
            </div>
        </div> 
        
        <div className="group px-6 md:py-4 text-center w-full">
            <div className='group md:my-4'>
            <p className='font-onest font-semibold text-slate-100 md:text-[23px] text-[18px]'>Jenis Produk Hukum</p>

            <div className="box-border border-2 p-4 w-full h-auto px-2 my-2 rounded-lg text-left">
                
            {jnsPeraturan?.length > 0 ? (
              jnsPeraturan.map((item, index) => (
              <AnimatedContent
                key={index+20}
                distance={80}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1}
                threshold={0.2}
              >
                <div key={index} className='flex font-onest text-slate-100 hover:text-kuningButton md:text-[18px] text-[14px] gap-1 my-2'>
                    <span className="material-symbols-outlined">receipt_long</span> <a href="#" onClick={() => navigate(`/Search/pencarian-detail/${item.peraturan_category_id}`)}>{item.percategoryname}</a>
                </div>
              </AnimatedContent>
             ))) : (
              <AnimatedContent
                key={3}
                distance={80}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1}
                threshold={0.2}
              >
                <p className='text-center text-slate-100'>Data Kosong</p>
              </AnimatedContent>
            )}                

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
