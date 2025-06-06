import axios from "axios";

export const getDokumenLangkaPagination = async (pageX, searchKey) => {
  try {
    const page = {
      page: pageX,
      search: searchKey,
    };

    const res = await axios.post(
      "http://localhost:3000/dokumenLangka/pagination",
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const addDownload = async (slug) => {
  try {
    const data = {
      slug: slug,
    };
    const res = await axios.post("http://localhost:3000/dokumenLangka/addDownload", data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addViews = async (slug) => {
  try {
    const data = {
      slug: slug,
    };
    const res = await axios.post("http://localhost:3000/dokumenLangka/addViews", data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};


export const detailDokumenLangkaFetch = async (slug) => {
  try {
    const data = {
      slug: slug,
    };
    const res = await axios.post("http://localhost:3000/dokumenLangka/detail", data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};