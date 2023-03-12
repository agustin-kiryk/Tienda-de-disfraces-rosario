import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth > 768) {
      setSidebarVisible(true);
    }
  };

  window.addEventListener("resize", handleResize);

  return (
    <div className={sidebarVisible ? "sidebar" : "sidebar hidden"}>
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo"> Rosario Disfraces</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Panel</span>
            </li>
          </Link>
          <p className="title">LISTAS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Usuarios</span>
            </li>
          </Link>
          <Link to="/disfraces" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Disfraces</span>
            </li>
          </Link>
          <Link to="/histfac" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Facturacion</span>
            </li>
          </Link>
          <p className="title">USUARIO</p>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Salir</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
    
      </div>
    </div>
  );
};

export default Sidebar;
