import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Datatable = () => {
  const [data, setData] = useState([]);
  const imageListRef = ref(storage, "images");

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setData((prev) => [
            ...prev,
            { id: item.name.substring(0, 2) + nanoid(3), name: item.name, url },
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
        .map((item) => `images/${item.name}`)}`
    );
    deleteObject(deleteRef)
      .then(() => {
        toast.success("Image Deleted");
      })
      .catch((err) => {
        toast.error("Something went wrong with deleting your file...");
      });
  };

  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "Image",
      headerName: "Image",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.url} alt="avatar" />
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
        Images
        <Link to="/admin/images/newimage" className="link">
          Add New Image
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
