import axios from "axios";

export const getInfografisPagination = async (pageX, searchKey) => {
  try {
    const page = {
      page: pageX,
      search: searchKey,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}infografis/pagination`,
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
};


export const getInfografisDetail = async (id) => {
  try {
    const data = {
      id
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}infografis/detail`,
      data
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const insertViewr = async (id) => {
  try {
    const data = {
      id
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}infografis/InsertViewr`,
      data
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
