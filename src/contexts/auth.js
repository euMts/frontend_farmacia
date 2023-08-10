import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../connection/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageUser = localStorage.getItem("access_token");

      if (storageUser) {
        setUser(storageUser);
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async (email, password) => {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);
    try {
      const response = await api.post("/user/login", params);
      if (response.status === 422) {
        // alert("Usuário ou senha incorretos")
      } else {
        setUser(response.data);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        localStorage.setItem("access_token", response.data.access_token);
      }
    } catch(error) {
      alert("Usuário ou senha incorretos")
      setUser(null)
    }
  };

  const signOut = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
