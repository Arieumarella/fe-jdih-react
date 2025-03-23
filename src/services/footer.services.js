import axios from "axios";


export const getDataRating = async () => {
    try {
        const res = await axios.get("http://localhost:3000/footer/getDataRating");
        return res.data.data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const postDataRating = async (form) => {
    try {
        const res = await axios.post("http://localhost:3000/footer/postRating", form);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const postDataLangganan = async (form) => {
    try {
        const res = await axios.post("http://localhost:3000/footer/postLangganan", form);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
};