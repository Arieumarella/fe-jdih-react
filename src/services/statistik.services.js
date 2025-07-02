import axios from "axios";

export const getTotalPeraturan = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}statistik/getRekapJumlahPeraturan`
    );
    return res.data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getTotalPeraturanUnor = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}statistik/getTotalDokumentUnor`
    );
    return res.data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getTotalPeraturanDownload = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}statistik/getTotalDownloadDok`
    );
    return res.data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getTotalViewPeraturan = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}statistik/getTotalViewPeraturan`
    );
    return res.data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getTotalPengunjung = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}statistik/getTotalPengunjung`
    );
    return res.data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
