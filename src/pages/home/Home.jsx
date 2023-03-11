import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarToggle = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <div className="home">
      <button onClick={handleSidebarToggle}>Toggle Sidebar</button>
      {showSidebar && <Sidebar />}
      <div className="homeContainer">
        
        <Navbar />
        <Featured />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
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
