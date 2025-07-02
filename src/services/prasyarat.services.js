import axios from "axios";

export const getPrasayarat = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}prasyarat`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
