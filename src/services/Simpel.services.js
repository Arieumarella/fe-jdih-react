import axios from "axios";

export const getSimpel = async (pageX, searchKey, idPeraturan) => {
    try {
        const page = {
            page: pageX,
            search: searchKey,
            idPeraturan: idPeraturan,
        };

        const res = await axios.post("http://localhost:3000/simpel", page);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
};