import axios from "axios";


export const getDataRating = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}footer/getDataRating`);
        return res.data.data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const postDataRating = async (form) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}footer/postRating`, form);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const postDataLangganan = async (form) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}footer/postLangganan`, form);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
};