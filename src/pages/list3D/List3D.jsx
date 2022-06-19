import "./list3D.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable3D from "../../components/datatable3D/Datatable3D";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable3D />
      </div>
    </div>
  );
};

export default List;
