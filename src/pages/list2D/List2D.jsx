import "./list2D.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable2D from "../../components/datatable2D/Datatable2D";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable2D />
      </div>
    </div>
  );
};

export default List;
