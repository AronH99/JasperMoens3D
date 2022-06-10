import "./newimage.scss";
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
      const storageRef = ref(storage, `images/${file.name}`);
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
            toast.success("Your file has been uploaded");
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(data);

  /* const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  }; */
  /* 
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const userLoginRef = doc(db, "usersUploadInfo", currentUser.uid);
      await setDoc(doc(userLoginRef), {
        ...data,
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  }; */

  return (
    <div className="new">
      <ToastContainer />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
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

              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))} */}
              {/* <button onClick={notify}>Send</button> */}
            </form>
            <ProgressBar bgcolor="#FF9505" progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
