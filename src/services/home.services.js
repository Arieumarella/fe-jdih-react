import axios from "axios";

export const getBanner = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}home/getBanner`);
        return res.data.data;
    } catch (err) {
        return err;
    }
};


export const getNuwPeraturan = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}home/getNuwPeraturan`);
        return res.data.data;
    } catch (err) {
        return err;
    }
};

export const getUnor = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}home/getUnitOrganisasi`);
        return res.data.data;
    } catch (err) {
        return err;
    }
};

export const getLinkTerkait = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}home/getLinkTerkait`);
        return res.data.data;
    } catch (err) {
        return err;
    }
};

export const getJnsPeraturan = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}home/getJenisPeraturan`);
        return res.data.data;
    } catch (err) {
        return err;
    }
};

export const getKurvaPengunjung = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}home/getKurvaPengunjung`);
        return res.data.data;
    } catch (err) {
        return err;
    }
};

export const getBeritaHome = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}home/getDataBerita`);
        return res.data.data;
    } catch (err) {
        return err;
    }
};


export const getMonografiHome = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}home/getDataMonografi`);
        return res.data.data;
    } catch (err) {
        return err;
    }
};
