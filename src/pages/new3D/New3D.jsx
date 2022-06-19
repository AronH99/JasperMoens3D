import "./new3D.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect, useContext } from "react";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "../../components/progressBar/ProgressBar";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const uploadFile = () => {
      //const name = new Date().getTime() + file.name;
      const storageRef = ref(
        storage,
        `3D/${file.name.toLowerCase().trim().replace(/\s+/g, "")}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress(
            (snapshot.bytesTransferred / snapshot.totalBytes).toFixed(2) * 100
          );
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (error) => {
          toast.error("Something went wrong with uploading your file...");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
            toast.success("Your 3D Art has been uploaded");
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  return (
    <div className="new">
      <ToastContainer />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add 3D Art (.obj + .mtl + .png/.jpeg/.svg)(3)</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  3D: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
              </div>
            </form>
            <ProgressBar bgcolor="#FF9505" progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
