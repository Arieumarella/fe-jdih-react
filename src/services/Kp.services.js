import axios from "axios";

export const getDetailKp = async (slug) => {
  try {
    const data = {
      slug,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}KP/detail`,
      data
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const KPPagination = async (pageX, searchKey) => {
  try {
    const page = {
      page: pageX,
      search: searchKey,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}KP/pagination`,
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const addViewsKP = async (slug) => {
  try {
    const data = {
      slug,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}KP/addView`,
      data
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
