import axios from "axios";

export const getDetailPutusan = async (slug) => {
  try {
    const data = {
      slug: slug,
    };
    const res = await axios.post("http://localhost:3000/putusan/detail", data);
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
      "http://localhost:3000/putusan/pagination",
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
    const res = await axios.post("http://localhost:3000/putusan/insertViews", data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
