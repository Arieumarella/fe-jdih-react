import axios from "axios";

export const getDetailPutusan = async (slug) => {
  try {
    const data = {
      slug: slug,
    };
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}putusan/detail`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getPutusanPagination = async (pageX, searchKey) => {
  try {
    const page = {
      page: pageX,
      search: searchKey,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}putusan/pagination`,
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const insertViews = async (slug) => {
  try {
    const data = {
      slug: slug,
    };
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}putusan/insertViews`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addDownload = async (slug) => {
  try {
    const data = {
      slug: slug,
    };
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}putusan/addDownload`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
