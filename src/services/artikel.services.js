import axios from "axios";

export const getDetailArtikel = async (slug) => {
  try {
    const data = {
      slug: slug,
    };

    const res = await axios.post(
      "http://localhost:3000/artikel/detailArtikel",
      data
    );
    return res.data.data;
  } catch (err) {
    return err;
  }
};

export const getArtikelPagination = async (pageX, searchKey) => {
  try {
    const page = {
      page: pageX,
      search: searchKey,
    };

    const res = await axios.post(
      "http://localhost:3000/artikel/pagination",
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
