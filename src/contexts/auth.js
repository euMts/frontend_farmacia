import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../connection/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStoreData = () => {
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
        localStorage.setItem("user_email", email);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("profile_pic_url", response.data.profile_pic_url);
      }
    } catch(error) {
      alert("Usuário ou senha incorretos")
      setUser(null)
    }
  };

  const signOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("username");
    localStorage.removeItem("profile_pic_url");
    setUser(null);
    window.location.href = "/"
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
