import Headers from "../components/Header";
import Langganan from "../components/Langganan";
import Footer from "../components/Footer";

const Prasyarat = () => {
    return (
        <>
            <Headers/>
            <section className='h-full bg-slate-100 py-4 h-[500px]'>
            

                <h1 className="text-center font-roboto font-bold text-bluePu text-[24px] my-2">PRASYARAT</h1>
                
                <div className="md:w-[70%] w-[95%] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300 my-2">
                
                <div className="font-normal font-roboto text-slate-600 text-[18px] p-2 text-justify">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, quasi excepturi dolores itaque minus eius soluta libero voluptate accusantium, quaerat suscipit veniam reprehenderit officiis fugit officia mollitia perspiciatis debitis ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut inventore rerum iure perferendis consequuntur aperiam repellendus sint voluptas atque ex. Accusamus numquam voluptatibus excepturi quasi aliquid molestias voluptates iusto et? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim cum in deserunt obcaecati maxime iste earum porro, illum qui consequatur totam voluptatibus quibusdam, eveniet dignissimos dolor optio perferendis vel voluptas.
                </div>

                </div>
            </section>
            <Langganan/>
            <Footer/>
        </>
    );
};

export default Prasyarat;
