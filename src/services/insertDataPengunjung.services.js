import axios from "axios";

export const getIpUser = async () => {
  try {
    const res = await axios.get(
      "https://api.ipify.org?format=json"
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};


export const insertDataPengunjung = async (ip, halaman) => {
  try {
    const data = {
      ip: ip,
      halaman: halaman,
    };
    const res = await axios.post(
      "http://localhost:3000/Pengunjung/insertData",
      data
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
