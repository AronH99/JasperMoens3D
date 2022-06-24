import "./datatable3D.scss";
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
  const objectListRef = ref(storage, "3D");

  useEffect(() => {
    listAll(objectListRef).then((response) => {
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setData((prev) => [
            ...prev,
            { id: item.name.substring(0, 3) + nanoid(3), name: item.name, url },
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
        .map((item) => `3D/${item.name}`)}`
    );
    deleteObject(deleteRef)
      .then(() => {
        toast.success("3D Art Deleted");
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
        if (params.row.name.includes(".obj")) {
          return <div className="cellWithObj">{params.row.name}</div>;
        } else if (params.row.name.includes(".mtl")) {
          return <div className="cellWithObj">{params.row.name}</div>;
        } else {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.url} alt="avatar" />
              {params.row.name}
            </div>
          );
        }
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
        3D Art
        <Link to="/admin/3D/new3D" className="link">
          Add 3D Art
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
