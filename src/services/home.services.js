import axios from "axios";

export const getBanner = async () => {
    try {
        const res = await axios.get("http://localhost:3000/home/getBanner");
        return res.data.data;
    } catch (err) {
        return err;
    }
};


export const getNuwPeraturan = async () => {
    try {
        const res = await axios.get("http://localhost:3000/home/getNuwPeraturan");
        return res.data.data;
    } catch (err) {
        return err;
    }
};

export const getUnor = async () => {
    try {
        const res = await axios.get("http://localhost:3000/home/getUnitOrganisasi");
        return res.data.data;
    } catch (err) {
        return err;
    }
};

export const getLinkTerkait = async () => {
    try {
        const res = await axios.get("http://localhost:3000/home/getLinkTerkait");
        return res.data.data;
    } catch (err) {
        return err;
    }
};

export const getJnsPeraturan = async () => {
    try {
        const res = await axios.get("http://localhost:3000/home/getJenisPeraturan");
        return res.data.data;
    } catch (err) {
        return err;
    }
};

export const getKurvaPengunjung = async () => {
    try {
        const res = await axios.get("http://localhost:3000/home/getKurvaPengunjung");
        return res.data.data;
    } catch (err) {
        return err;
    }
};

export const getBeritaHome = async () => {
    try {
        const res = await axios.get("http://localhost:3000/home/getDataBerita");
        return res.data.data;
    } catch (err) {
        return err;
    }
};


export const getMonografiHome = async () => {
    try {
        const res = await axios.get("http://localhost:3000/home/getDataMonografi");
        return res.data.data;
    } catch (err) {
        return err;
    }
};
