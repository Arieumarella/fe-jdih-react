import React from 'react';

const Langganan = () => {
  return (
    <>
    <section className='bg-bluePu text-white  text-center mt-4 px-2 md:px-[60px]'>
        <p className='font-onest font-semibold md:text-[25px] text-[20px] py-4 text-kuningButton'>Berlangganan</p>
        <p className='font-onest font-medium md:text-[16px] text-[14px]'>Anda dapat berlangganan untuk mendapatkan notifikasi dan info penting di bidang pekerjaan umum dari pengelola JDIH PU langsung lewat inbox email Anda. </p>
        <div className="flex flex-col items-center md:px-[600px] group">
            <input type="text" placeholder=" Masukan Nama.." className="border border-slate-100 shadow-lg bg-slate-100 text-slate-800 rounded-xl md:w-full w-full md:h-[40px] h-[35px] my-4 placeholder:font-onest placeholder:text-slate-500 placeholder:text-[14px]"/>
            <input type="text" placeholder=" Masukan Email.." className="border border-slate-100 shadow-lg bg-slate-100 rounded-xl md:w-full w-full md:h-[40px] h-[35px] my-1 placeholder:font-onest placeholder:text-slate-500 placeholder:text-[14px]" />
            <button type='button' className='ml-auto my-4 bg-kuningButton hover:bg-yellow-300 items-end text-bluePu font-onest text-[15px] font-semibold md:w-[100px] w-[75px] md:h-[40px] h-[30px] rounded-xl relative'>Kirim</button>
        </div>
    </section>
    </>
  );
};

export default Langganan;