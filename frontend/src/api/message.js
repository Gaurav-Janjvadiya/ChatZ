import axios from "axios";
import axiosInstance from "./axios";

const getJWT = () => {
  const jwt = window.localStorage.getItem("jwt");
  if (!jwt) throw Error("JWT NOT FOUND");
  return jwt;
};

export const sendMessage = async (content, receiver) => {
  const jwt = getJWT;
  try {
    const { data } = await axiosInstance.post(
      "/message",
      {
        content,
        receiver,
      },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    return data;
  } catch (error) {
    console.log("msg sending error", error);
  }
};

export const fetchMessages = async (name) => {
  const jwt = getJWT;
  try {
    const { data } = await axiosInstance.get(`/message/${name}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return data;
  } catch (error) {
    console.log("msg fetching error", error);
  }
};
