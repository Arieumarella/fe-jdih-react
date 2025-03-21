import axios from "axios";


export const getDataRating = async () => {
    try {
        const res = await axios.get("http://localhost:3000/footer/getDataRating");
        return res.data.data;
    } catch (err) {
        return err;
    }
};

export const postDataRating = async (form) => {
    try {
        const res = await axios.post("http://localhost:3000/footer/postRating", form);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
};