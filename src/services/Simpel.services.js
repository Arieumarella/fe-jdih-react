import axios from "axios";

export const getSimpel = async (pageX, searchKey, idPeraturan) => {
    try {
        const page = {
            page: pageX,
            search: searchKey,
            idPeraturan: idPeraturan,
        };

        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}simpel`, page);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
};