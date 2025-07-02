import axios from "axios";

export const getJenisPeraturan = async (form) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}header/getJenisPeraturan`,
      form
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
