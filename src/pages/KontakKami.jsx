import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";

const KontakKami = () => {
    return (
        <>  
          <Headers/>

          <section className='h-full bg-slate-100 py-4 h-[500px]'>
            
                <h1 className="text-center font-roboto font-bold text-bluePu text-[24px] my-2">KONTAK KAMI</h1>
                
                <div className="md:w-[70%] w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300 my-2">
                
                

                </div>
            </section>

          <Langganan/>
          <Footer/>
        </>
    );
}

export default KontakKami;