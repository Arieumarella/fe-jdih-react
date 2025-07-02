import axios from "axios";

export const getJenisPeraturan = async (form) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}search/getJenisPeraturan`,
      form
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getDataSubstansi = async (form) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}search/getJenisSubstansi`,
      form
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getPeraturanPagination = async (pageX, searchKey) => {
  try {
    const page = {
      page: pageX,
      search: searchKey,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}search/getDataPeraturan`,
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getPeraturanDetail = async (slug) => {
  try {
    console.log(slug);
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}search/getDetailPeraturan`,
      { slug: slug }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const postDataMasukanDanKritik = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}search/postMasukanDanKriting`,
      data
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getUnor = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}search/getUnor`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const addViews = async (slug) => {
  try {

    const body = {
      slug:slug 
    };

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}search/addViews`, body);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const addDownload = async (slug) => {
  try {

    const body = {
      slug:slug 
    };

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}search/addDownload`, body);
    return res.data;
  } catch (err) {
    return err;
  }
};
