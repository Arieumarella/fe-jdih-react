import axios from "axios";

export const getDetailMonografi = async (slug) => {
    try{
        const data = {
            'slug' : slug
        }
        const res = await axios.post("http://localhost:3000/Monografi/detail", data);
        return res;
    }catch(err)
    {
        console.log(err);
        return err;
    }
}