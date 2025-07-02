import axios from "axios";

export const getMouPagination = async (pageX, searchKey) => {
  try {
    const page = {
      page: pageX,
      search: searchKey,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}Mou/pagination`,
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
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}Mou/addDownload`, data);
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
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}Mou/addViews`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};


export const detailMouFetch = async (slug) => {
  try {
    const data = {
      slug: slug,
    };
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}Mou/detail`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};