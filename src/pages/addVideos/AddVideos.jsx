import React, { useState, useEffect } from "react";
import "./addvideos.scss";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import {
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../../components/sidebar/Sidebar";

const AddVideos = () => {
  const [allOptionsForURLS, setAllOptionsForURLS] = useState([]);
  const [addNewTitle, setAddNewTitle] = useState("");
  const [addNewURL, setAddNewURL] = useState("");
  const [submitNewTitle, setSubmitNewTitle] = useState();
  const [submitNewURL, setSubmitNewURL] = useState();
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  //Create New Document
  useEffect(() => {
    const setDocs = async () => {
      setAllOptionsForURLS([]);
      if (submitNewTitle && submitNewURL) {
        try {
          await setDoc(
            doc(
              db,
              "JaspiURLS",
              submitNewTitle.toLowerCase().trim().replace(/\s+/g, "")
            ),
            {
              name: submitNewTitle.trim(),
              URL: submitNewURL.trim(),
              id: nanoid(4),
            }
          );
          toast.success("New Video has been added");
        } catch {
          toast.error("Something went wrong adding the new Video...");
        }
      }
    };
    setDocs();
  }, [submitNewTitle, submitNewURL, triggerSubmit]);

  //Get All Video Names
  useEffect(() => {
    const getAllDocsFromFireBase = async () => {
      const querySnapshot = await getDocs(collection(db, "JaspiURLS"));
      querySnapshot.forEach((doc) => {
        setAllOptionsForURLS((prev) => [
          ...prev,
          {
            id: doc.id,
            URL: doc._document.data.value.mapValue.fields.URL.stringValue,
            name: doc._document.data.value.mapValue.fields.name.stringValue,
          },
        ]);
      });
    };
    getAllDocsFromFireBase();
  }, [submitNewTitle, submitNewURL, triggerSubmit]);

  return (
    <div className="list">
      <Sidebar />
      <ToastContainer />
      <div className="addVideoContainer">
        <Navbar />
        <h2 className="updateDocumentTitle2">Add New Video (URL)</h2>
        <form
          className="formMakeNewDescription"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitNewURL(addNewURL);
            setSubmitNewTitle(addNewTitle);
            setTriggerSubmit(!triggerSubmit);
            setAddNewTitle("");
            setAddNewURL("");
          }}
        >
          <label className="labelDescription">
            <p className="widthP">Name</p>
            <input
              type="text"
              className="inputNewDescription"
              onChange={(e) => {
                setAddNewTitle(e.target.value);
              }}
              placeholder="Name of Youtube Video"
              value={addNewTitle}
            />
          </label>
          <label className="labelDescription">
            <p className="widthP">Url</p>
            <input
              className="textareaDescriptionURL"
              onChange={(e) => {
                setAddNewURL(e.target.value);
              }}
              placeholder="Youtube Url"
              value={addNewURL}
            />
          </label>
          <button type="submit" className="descriptionButton">
            Submit
          </button>
        </form>
        <h2 className="updateDocumentTitle">Delete Video</h2>
        <div className="DeleteDescriptionSection">
          {allOptionsForURLS.map(({ name, id }) => (
            <ul key={id} className="flexitemanddelete">
              <li className="liStyling">{name}</li>
              <DeleteIcon
                onClick={(e) => {
                  (async () => {
                    try {
                      await deleteDoc(
                        doc(
                          db,
                          "JaspiURLS",
                          name.toLowerCase().trim().replace(/\s+/g, "")
                        )
                      );
                      setAllOptionsForURLS(
                        allOptionsForURLS.filter(
                          (option) => option.name !== name
                        )
                      );
                      toast.success("Video Deleted");
                    } catch {
                      toast.error(
                        "Something went wrong with deleting the video"
                      );
                    }
                  })();
                }}
              />
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddVideos;
