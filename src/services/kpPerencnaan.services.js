import axios from "axios";

// Service untuk insert masukan konsultasi publik perencanaan
export const insertMasukanKpPerencanaan = async (payload) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}kp-perencanaan/masukan`,
      payload
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getKpPerencanaan = async (pageX, searchKey) => {
  try {
    const page = {
      page: pageX,
      search: searchKey,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}kp-perencanaan/pagination`,
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const insertDataTambahanusulanJudul = async (form) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}kp-perencanaan/insert-jdudul`,
      form
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
