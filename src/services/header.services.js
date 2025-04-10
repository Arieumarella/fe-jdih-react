import axios from "axios";

export const getJenisPeraturan = async (form) => {
  try {
    const res = await axios.get(
      "http://localhost:3000/header/getJenisPeraturan",
      form
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
