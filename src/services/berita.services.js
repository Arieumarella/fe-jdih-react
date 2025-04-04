import axios from "axios";

export const getDetailBerita = async (slug) => {
  try {
    const data = {
      slug: slug,
    };

    const res = await axios.post("http://localhost:3000/berita/detail", data);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

export const getBeritaPagination = async (pageX, searchKey) => {
  try {
    const page = {
      page: pageX,
      search: searchKey,
    };

    const res = await axios.post(
      "http://localhost:3000/Berita/pagination",
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
