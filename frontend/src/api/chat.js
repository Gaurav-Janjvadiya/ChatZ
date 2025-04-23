import axiosInstance from "../api/axios.js";

const getJWT = () => {
  const jwt = window.localStorage.getItem("jwt");
  if (!jwt) throw Error("JWT NOT FOUND");
  return jwt;
};

export const createChat = async (name) => {
  const jwt = getJWT();
  try {
    const { data } = await axiosInstance.post("/chat", name, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return data;
  } catch (error) {
    console.log("chat creating errror", error);
  }
};

export const fetchChats = async () => {
  const jwt = getJWT();
  try {
    const { data } = await axiosInstance("/chat", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return data;
  } catch (error) {
    console.log("chat creating errror", error);
  }
};
