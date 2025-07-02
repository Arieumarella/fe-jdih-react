import axios from "axios";

export const getDetailMonografi = async (slug) => {
  try {
    const data = {
      slug: slug,
    };
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}Monografi/detail`,
      data
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getMonografiPagination = async (pageX, searchKey) => {
  try {
    const page = {
      page: pageX,
      search: searchKey,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}Monografi/pagination`,
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
