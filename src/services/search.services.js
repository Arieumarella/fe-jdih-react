import axios from "axios";

export const getJenisPeraturan = async (form) => {
  try {
    const res = await axios.get(
      "http://localhost:3000/search/getJenisPeraturan",
      form
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getDataSubstansi = async (form) => {
  try {
    const res = await axios.get(
      "http://localhost:3000/search/getJenisSubstansi",
      form
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
