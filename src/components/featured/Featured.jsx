import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";

const Featured = () => {
  return (
    <div className="featured">
     
      <div className="bottom">
        <div className="featuredChart">
        </div>
        <p className="title">Ingresos Totales del Mes</p>
        <p className="amount">$100.000</p>

        <button class="learn-more">
        <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
        </span>
        <Link to="/facturacion" style={{ textDecoration: "none" }}>
        <span class="button-text">Ver Detalles</span>
        </Link>
        </button>
        <p className="desc">
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemResult negative">
            </div>
          </div>
          <div className="item">
            <div className="itemResult positive">
            </div>
          </div>
          <div className="item">
            <div className="itemResult positive">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
