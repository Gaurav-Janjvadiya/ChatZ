import axiosInstance from "./axios";

export const register = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/user/register", userData);
    return data;
  } catch (error) {
    console.log("register error", error);
  }
};

export const login = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/user/login", userData);
    return data;
  } catch (error) {
    console.log("login error", error);
  }
};
