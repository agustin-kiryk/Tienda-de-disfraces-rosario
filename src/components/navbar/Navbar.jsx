import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
     
      <div className="wrapper">
        <div className="">
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <a href="/login">
            <img
              src="https://scontent.fmdz10-1.fna.fbcdn.net/v/t1.18169-9/11065898_1436668163292741_4511619089602013877_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=nmwikjTZx0kAX860uSO&_nc_ht=scontent.fmdz10-1.fna&oh=00_AfDEdu6cBVMP4gNfelnooVHWGahldb0pcz5nrpmYeqeUCg&oe=642F0728"
              alt=""
              className="avatar"
            />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
