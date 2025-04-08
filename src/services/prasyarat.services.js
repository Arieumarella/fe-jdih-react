import axios from "axios";

export const getPrasayarat = async () => {
  try {
    const res = await axios.get("http://localhost:3000/prasyarat");
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
