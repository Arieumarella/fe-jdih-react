import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";
import OrgChart from "@dabeng/react-orgchart";


const data = {
  id: "1",
  name: "Rahayu",
  role: "Karo Hukum",
  img: "/images/rahayu.jpg",
  children: [
    {
      id: "2",
      name: "Rima Eryani",
      role: "Ketua Tim PPP",
      img: "/1.jpg",
      children: [
        { id: "3", name: "Nicolaus B. S. Naibaho", role: "Ketua Tim PPP 1", img: "/images/nicolaus.jpg" },
        { id: "4", name: "Arif Wibowo", role: "Ketua Tim PPP 2", img: "/images/arif.jpg" },
        { id: "5", name: "Vincentius Dhanang W.", role: "Ketua Tim PPP 3", img: "/images/vincentius.jpg" }
      ],
    }
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
                    Struktur Organisasi
                </h1>

                
                <OrgChart
                  datasource={data}
                  pan={false}
                  zoom={false}
                  collapsible={false}
                  NodeTemplate={({ nodeData }) => (
                    <div className="node-box">
                      <img src={nodeData.img} alt={nodeData.name} className="node-img" />
                      <h3 className="node-name">{nodeData.name}</h3>
                      <p className="node-role">{nodeData.role}</p>
                    </div>
                  )}
                />

                </div>
            </div>

        </section>      
        
        <Langganan/>
        <Footer/>
      </>
    );
  };
  
  export default StrukturOrganisasi;
  