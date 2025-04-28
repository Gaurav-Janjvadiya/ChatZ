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

export const logout = async () => {
  try {
    const { data } = await axiosInstance.post("/logout", {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    return data;
  } catch (error) {
    console.log("users fetching error", error);
  }
};

export const fetchUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/user", {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    return data;
  } catch (error) {
    console.log("users fetching error", error);
  }
};
