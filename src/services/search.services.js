import axios from "axios";

export const getJenisPeraturan = async (form) => {
  try {
    const res = await axios.get(
      "http://localhost:3000/search/getJenisPeraturan",
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
      "http://localhost:3000/search/getJenisSubstansi",
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
      "http://localhost:3000/search/getDataPeraturan",
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
      "http://localhost:3000/search/getDetailPeraturan",
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
      "http://localhost:3000/search/postMasukanDanKriting",
      data
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getUnor = async () => {
  try {
    const res = await axios.get("http://localhost:3000/search/getUnor");
    return res.data;
  } catch (err) {
    return err;
  }
};
