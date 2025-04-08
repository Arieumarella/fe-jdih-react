import axios from "axios";

export const getTentangKami = async () => {
  try {
    const res = await axios.get("http://localhost:3000/tentangKami");
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
