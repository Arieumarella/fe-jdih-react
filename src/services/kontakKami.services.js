import axios from "axios";

export const postDataSaran = async (form) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}kontakKami`, form);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
