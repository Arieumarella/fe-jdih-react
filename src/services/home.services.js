import axios from "axios";

export const getBanner = async () => {
    try {
        const res = await axios.get("http://localhost:3000/home/getBanner");
        return res.data.data;
    } catch (err) {
        return err;
    }
};
