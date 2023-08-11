import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import { PrivateRoute } from "./privateRoutes";
import ForgotPassword from "../pages/forgotPassword";
import Vendasestoque from "../pages/vendasestoque";
import Panorama from "../pages/panorama";
import Predicao from "../pages/predicao";

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="*" element={<Login />} exact />
        <Route path="/recovery" element={<ForgotPassword />} exact />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} exact />
        </Route>
        <Route path="/vendasestoque" element={<PrivateRoute />}>
          <Route path="/vendasestoque" element={<Vendasestoque />} exact />
        </Route>
        <Route path="/panorama" element={<PrivateRoute />}>
          <Route path="/panorama" element={<Panorama />} exact />
        </Route>
        <Route path="/predicao" element={<PrivateRoute />}>
          <Route path="/predicao" element={<Predicao />} exact />
        </Route>
      </Routes>
    </Router>
  );
}

export default RoutesApp;
