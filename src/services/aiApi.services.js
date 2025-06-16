import axios from "axios";

export const getAiJdih = async (path, question, history) => {
  try {
    const page = {
        path: path,
        question: question,
        history: history,
    };

    const res = await axios.post(
      "http://localhost:3000/ai/chat",
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getAiJDIHGeneral = async (question, history) => {
  try {
    const page = {
        question: question,
        history: history,
    };

    const res = await axios.post(
      "http://localhost:3000/ai/chatGeneral",
      page
    );
    return res.data;
  } catch (err) {
    return err;
  }
}


export const getPantunAwal = async () => {
  try {

    const res = await axios.get(
      "http://localhost:3000/ai/ChatPantun"
    );

    return res.data;
  } catch (err) {
    return err;
  }
}