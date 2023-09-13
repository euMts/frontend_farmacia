import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
// import Sidebar from "../components/sidebar";
import Nav from "../components/nav";

export const PrivateRoute = () => {
  const { signed } = useContext(AuthContext);
  

  return signed ? ( // remover '!' para deploy.
    <div style={{ display: "flex" }}>
      <Nav />
      <div style={{ marginLeft: "280px", width: "100%", height: "100%" }}>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
