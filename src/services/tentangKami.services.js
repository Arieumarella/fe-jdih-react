import axios from "axios";

export const getTentangKami = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}tentangKami`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
