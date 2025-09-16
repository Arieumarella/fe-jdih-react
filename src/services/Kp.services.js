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

export const submitKonsultasiPublik = async (formData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_CI3_URL}Kp/submitKonsultasiPublik`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
