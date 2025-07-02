import axios from "axios";

export const getAgendaPagination = async (pageX, searchKey) => {
  try {
    const page = {
      page: pageX,
      search: searchKey,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}agenda/pagination`,
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
