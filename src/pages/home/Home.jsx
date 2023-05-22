import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const handleSidebarToggle = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <div className="home">
      {showSidebar && <Sidebar />}
      <div className="toggleSidebarContainer" onClick={handleSidebarToggle}>
        <div class="container" onClick={handleSidebarToggle}>
          <input class="label-check" id="label-check" type="checkbox" />
          <label for="label-check" class="hamburger-label" onClick={handleSidebarToggle} >
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
            <label></label></label></div>

      </div>
      <div className="homeContainer">

        <Navbar />
        <Featured />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        <div className="buttonContainer">
          <button className="learn-more2">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <Link to="/nuevopedido" style={{ textDecoration: "none" }}>
              <span className="button-text">Nuevo Pedido</span>
            </Link>
          </button>
          <button className="learn-more2">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <Link to="/retiro" style={{ textDecoration: "none" }}>
              <span className="button-text">Retiro/Devolucion</span>
            </Link>
          </button>
          <button className="learn-more2">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <Link to="/nuevacompra" style={{ textDecoration: "none" }}>
              <span className="button-text">Nueva Venta</span>
            </Link>
          </button>
        </div>


        <div className="charts"></div>
        <div className="listContainer">
          <div className="listTitle">Vista Previa de Alquileres </div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
