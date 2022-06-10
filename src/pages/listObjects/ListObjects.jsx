import "./listObjects.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable2 from "../../components/datatable2/Datatable2";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable2 />
      </div>
    </div>
  );
};

export default List;
