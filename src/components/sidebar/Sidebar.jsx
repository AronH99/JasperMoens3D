import "./sidebar.scss";
import ImageIcon from "@mui/icons-material/Image";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import DescriptionIcon from "@mui/icons-material/Description";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar2">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <p className="title">LIST</p>
          <Link to="/admin/2D" style={{ textDecoration: "none" }}>
            <li>
              <ImageIcon className="icon" />
              <span>2D</span>
            </li>
          </Link>
          <Link to="/admin/3D" style={{ textDecoration: "none" }}>
            <li>
              <DataObjectIcon className="icon" />
              <span>3D</span>
            </li>
          </Link>
          <Link to="/admin/description" style={{ textDecoration: "none" }}>
            <li>
              <DescriptionIcon className="icon" />
              <span>Description</span>
            </li>
          </Link>
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
