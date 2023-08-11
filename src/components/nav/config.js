import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { BsCart4 } from "react-icons/bs";
import { Icon } from "@iconify/react";

const navConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <TrendingUpIcon />,
  },
  {
    title: "Vendas / Estoque",
    path: "/vendasestoque",
    icon: <BsCart4 style={{ fontSize: "25px" }} />,
  },
  {
    title: "Panorama",
    path: "/panorama",
    icon: (
      <Icon style={{ fontSize: "25px" }} icon="ic:baseline-perm-data-setting" />
    ),
  },
  // {
  //   title: "Histórico",
  //   path: "/historico",
  //   icon: <Icon style={{ fontSize: "25px" }} icon="ic:baseline-history" />,
  // },
  {
    title: "Predição",
    path: "/predicao",
    icon: (
      <Icon style={{ fontSize: "25px" }} icon="fluent:predictions-20-filled" />
    ),
  },
];

export default navConfig;
