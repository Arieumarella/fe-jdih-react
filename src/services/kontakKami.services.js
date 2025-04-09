import axios from "axios";

export const postDataSaran = async (form) => {
  try {
    const res = await axios.post("http://localhost:3000/kontakKami", form);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
