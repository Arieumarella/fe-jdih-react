import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import OrgChart from "@dabeng/react-orgchart";


const orgData = {
  name: "Rima Eryani",
  title: "KETUA TIM PPP",
  image: "/1.jpg", // Ganti dengan URL yang sesuai
  children: [
    {
      name: "Nicolaus B. S. Naibaho",
      title: "KETUA TIM PPP 1",
      image: "/1.jpg",
    },
    {
      name: "Arif Wibowo",
      title: "KETUA TIM PPP 2",
      image: "/1.jpg",
    },
    {
      name: "Vincentius Dhanang W.",
      title: "KETUA TIM PPP 3",
      image: "/1.jpg",
    },
  ],
};

const StrukturOrganisasi = () => {
    return (
      <>
        <Headers/>
            
        <section className='h-full bg-slate-100 py-4 h-[500px]'>

        <div className='md:flex justify-between md:w-[80%] w-full gap-4 mx-auto my-4'>
                <div className="md:w-[80%] w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">



                {/* Judul Berita */}
                <h1 className="md:text-[23px] text-[23px] font-bold font-roboto text-blue-900 mt-3 text-center">
                    STRUKTUR ORGANISASI JDIH KEMENTERIAN PU
                </h1>

                <div className="my-4 p-4 font-roboto text-slate-600 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ipsum aut voluptate ut exercitationem cum, quasi necessitatibus iure. Perferendis iste exercitationem impedit sed fugiat deserunt voluptatibus maiores cupiditate expedita eos.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cum maiores et laborum quis similique iste eaque accusantium ducimus, veniam aspernatur consectetur obcaecati dolores at commodi dolorem quidem voluptatibus laboriosam!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quisquam veritatis beatae? Assumenda tempore earum ratione possimus alias, exercitationem ex doloremque iusto hic nisi, veritatis sit omnis officia sint perspiciatis!
                </div>
                
                <img src="/StrukturOrganisasi.png" alt="image struktur organisasi"  className="w-auto mx-auto"/>

                </div>
            </div>

        </section>      
        
        <Langganan/>
        <Footer/>
      </>
    );
  };
  
  export default StrukturOrganisasi;
  