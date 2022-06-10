import "./datatable2.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tick, MTLModel } from "react-3d-viewer";
import benchViseMTL from "../../objectTest/benchVise.mtl";

const Datatable = () => {
  const [data, setData] = useState([]);
  const objectListRef = ref(storage, "objects");

  useEffect(() => {
    listAll(objectListRef).then((response) => {
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setData((prev) => [
            ...prev,
            { id: nanoid(4), name: item._location.path_.slice(8), url },
          ]);
        });
      });
    });
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    const deleteRef = ref(
      storage,
      `${data
        .filter((item) => item.id === id)
        .map((item) => `objects/${item.name}`)}`
    );
    deleteObject(deleteRef)
      .then(() => {
        toast.success("Object Deleted");
      })
      .catch((err) => {
        toast.error("Something went wrong with deleting your file...");
      });
  };

  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "Object",
      headerName: "Object",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellWithObj">
            <MTLModel
              width="60"
              height="50"
              src={params.row.url}
              mtl={benchViseMTL}
              texPath=""
            />
            {params.row.name}
          </div>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => {
                handleDelete(params.row.id);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <ToastContainer />
      <div className="datatableTitle">
        Objects
        <Link to="/admin/images/newobject" className="link">
          Add New Object (.obj + .mtl)
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
