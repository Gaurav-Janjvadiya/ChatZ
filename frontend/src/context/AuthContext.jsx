import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false, name: null });

  const login = (name) => setUser({ name, isLoggedIn: true });
  const logout = () => {
    setUser({ name: null, isLoggedIn: false });
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const { name } = jwtDecode(token);
      setUser({ isLoggedIn: true, name });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

export default function useAuth() {
  return useContext(AuthContext);
}
