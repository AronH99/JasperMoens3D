import "./sidebar.scss";
import ImageIcon from "@mui/icons-material/Image";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          <Link to="/admin/images" style={{ textDecoration: "none" }}>
            <li>
              <ImageIcon className="icon" />
              <span>Images</span>
            </li>
          </Link>
          <Link to="/admin/objects" style={{ textDecoration: "none" }}>
            <li>
              <ImageIcon className="icon" />
              <span>Objects</span>
            </li>
          </Link>
          {/* <Link to="/dashboard/objects" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Objects</span>
            </li>
          </Link> */}
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
