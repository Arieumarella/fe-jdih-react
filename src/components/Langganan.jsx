import {React, useState} from 'react';
import { Rating } from "react-simple-star-rating";

const Langganan = () => {

  const [rating, setRating] = useState(4.1);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <>
    
    <section className='bg-bluePu text-white  text-center mt-4  md:flex md:justify-between md:px-[60px] items-center'>

    <div className='w-full md:flex md:justify-center'>
      <p className='md:absolute font-semibold font-roboto md:text-[25px] text-[20px] py-4 text-kuningButton text-center'>Indeks Kepuasan Masyarakat</p>
     
      <div className='md:flex group w-full '>
        <div className="md:relative flex items-center justify-center w-48 h-48 rounded-full p-[13px] bg-gradient-to-r from-gradiankuning to-gradianBiru md:my-auto md:mx-4 mx-auto group">
          <div className="w-[93%] h-[93%] bg-[#D9D9D9] rounded-full flex items-center justify-center">
            <div className="w-[95%] h-[95%] bg-bluePu rounded-full  items-center justify-center">
              <p className="text-2xl font-bold text-slate-200 font-onest text-[35px] mt-[35px]">4.1</p>
              <Rating onClick={handleRating} ratingValue="4.1" size={25} fillColor="#FFE54E" className="block"/>
              <p className="font-semibold text-slate-200 font-onest text-[14px] ">154 reviewer</p>
            </div>
          </div>
        </div>
        
      
        <div className="relative items-center flex justify-centermy-auto my-5"> 
          
          <div className='md:flex md:flex-col font-roboto gap-1'>        
            <div className='inline-flex items-center space-x-2 md:w-auto w-[70%]'>
              <p>5</p>
              <span class="material-symbols-outlined text-gradianBiru">
              stars
              </span>
              <progress value={75} max={100} className='progres-bar'/>
              <p>106</p>
            </div>

            <div className='inline-flex items-center space-x-2 md:w-auto w-[70%]'>
              <p>4</p>
              <span class="material-symbols-outlined text-gradianBiru">
              stars
              </span>
              <progress value={75} max={100} className='progres-bar'/>
              <p>9</p>
            </div>

            <div className='inline-flex items-center space-x-2 md:w-auto w-[70%]'>
              <p>3</p>
              <span class="material-symbols-outlined text-gradianBiru">
              stars
              </span>
              <progress value={75} max={100} className='progres-bar'/>
              <p>6</p>
            </div>

            <div className='inline-flex items-center space-x-2 md:w-auto w-[70%]'>
              <p>2</p>
              <span class="material-symbols-outlined text-gradianBiru">
              stars
              </span>
              <progress value={75} max={100} className='progres-bar'/>
              <p>14</p>
            </div>

            <div className='inline-flex items-center space-x-2 md:w-auto w-[70%]'>
              <p>1</p>
              <span class="material-symbols-outlined text-gradianBiru">
              stars
              </span>
              <progress value={75} max={100} className='progres-bar'/>
              <p>19</p>
            </div>
          </div>
        </div>

        <div className=" md:w-[42%] md:h-48 my-auto group">
         <p className='text-left mt-3 font-roboto md:text-[16px] flex-col'>Terima Kasih Telah Mengirimkan Indeks Kepuasan Masyarakat</p>
         <button type='button' className='my-4 bg-kuningButton hover:bg-yellow-300 items-end text-bluePu font-onest text-[15px] font-semibold md:w-[100px] w-[75px] md:h-[40px] h-[30px] rounded-xl mr-[280px] hover:bg-yellow-500 active:bg-yellow-600'>Review</button>
        </div>

      </div>
    </div>
      
      {/* <div className='group w-full'>
          <p className='font-roboto font-semibold md:text-[25px] text-[20px] py-4 text-kuningButton'>Berlangganan</p>
          <p className='font-roboto px-2 font-medium md:text-[16px] text-[14px]'>Anda dapat berlangganan untuk mendapatkan notifikasi dan info penting di bidang pekerjaan umum dari pengelola JDIH PU langsung lewat inbox email Anda. </p>
          <div className="flex flex-col items-center relative  w-full group">
              <input type="text" placeholder=" Masukan Nama.." className="border border-slate-100 shadow-lg bg-slate-100 text-slate-800 rounded-xl md:w-[500px] w-full md:h-[40px] h-[35px] my-4 placeholder:font-onest placeholder:text-slate-500 placeholder:text-[14px]"/>
              <input type="text" placeholder=" Masukan Email.." className="border border-slate-100 shadow-lg bg-slate-100 rounded-xl md:w-[500px] w-full md:h-[40px] h-[35px] my-1 placeholder:font-onest placeholder:text-slate-500 placeholder:text-[14px]" />
              <button type='button' className='ml-[400px] my-4 bg-kuningButton hover:bg-yellow-300 items-end text-bluePu font-onest text-[15px] font-semibold md:w-[100px] w-[75px] md:h-[40px] h-[30px] rounded-xl relative hover:bg-yellow-500 active:bg-yellow-600'>Kirim</button>
          </div>
        </div> */}
    
    </section>
    </>
  );
};

export default Langganan;