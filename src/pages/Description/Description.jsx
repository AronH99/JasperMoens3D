import React, { useState, useEffect } from "react";
import "./description.scss";
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
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import DeleteIcon from "@mui/icons-material/Delete";

const Description = () => {
  const [descriptionData, setDescriptionData] = useState({});
  const [allOptionsForDocuments, setAllOptionsForDocuments] = useState([]);
  const [value, setValue] = useState(null);
  const [updateTitle, setUpdateTitle] = useState();
  const [updateDescription, setUpdateDescription] = useState();
  const [addNewTitle, setAddNewTitle] = useState("");
  const [addNewDescription, setAddNewDescription] = useState("");
  const [submitNewTitle, setSubmitNewTitle] = useState();
  const [submitNewDescription, setSubmitNewDescription] = useState();
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  //Create New Document
  useEffect(() => {
    const setDocs = async () => {
      setAllOptionsForDocuments([]);
      if (submitNewTitle && submitNewDescription) {
        try {
          await setDoc(
            doc(
              db,
              "JaspiTexts",
              submitNewTitle.toLowerCase().trim().replace(/\s+/g, "")
            ),
            {
              name: submitNewTitle.trim(),
              comment: submitNewDescription,
              id: nanoid(4),
            }
          );
          toast.success("New Description has been added");
        } catch {
          toast.error("Something went wrong adding the new Description...");
        }
      }
    };
    setDocs();
  }, [submitNewTitle, submitNewDescription, triggerSubmit]);

  //Get All Documents
  useEffect(() => {
    const getAllDocsFromFireBase = async () => {
      const querySnapshot = await getDocs(collection(db, "JaspiTexts"));
      querySnapshot.forEach((doc) => {
        setAllOptionsForDocuments((prev) => [
          ...prev,
          {
            id: doc.id,
            name: doc._document.data.value.mapValue.fields.name.stringValue,
          },
        ]);
      });
    };
    getAllDocsFromFireBase();
  }, [submitNewTitle, submitNewDescription, triggerSubmit]);

  //Get Specific Document
  useEffect(() => {
    if (value) {
      const getDocsFromFireBase = async () => {
        const docRef = doc(db, "JaspiTexts", value);
        const docSnap = await getDoc(docRef);
        docSnap.exists()
          ? setDescriptionData(docSnap.data())
          : console.log("No such document!");
      };
      getDocsFromFireBase();
    }
  }, [value]);

  //Update Specific Document
  useEffect(() => {
    (async () => {
      if (value) {
        try {
          const updateRef = doc(db, "JaspiTexts", value);
          if (value && updateTitle) {
            await updateDoc(updateRef, {
              name: updateTitle,
            });
            toast.success("Title has been updated");
            setUpdateTitle();
          } else if (value && updateDescription) {
            await updateDoc(updateRef, {
              comment: updateDescription,
            });
            toast.success("Description has been updated");
            setUpdateDescription();
          }
        } catch {
          toast.error("Something went wrong with updating the description");
        }
      }
    })();
  }, [updateTitle, updateDescription]);

  return (
    <>
      <div className="list">
        <ToastContainer />
        <Sidebar />
        <div className="DescriptionContainer">
          <Navbar />
          <h2 className="updateDocumentTitle2">Add New Description</h2>
          <form
            className="formMakeNewDescription"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitNewDescription(addNewDescription);
              setSubmitNewTitle(addNewTitle);
              setTriggerSubmit(!triggerSubmit);
              setAddNewDescription("");
              setAddNewTitle("");
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
                placeholder="Give in the right name according to your other
                file uploads..."
                value={addNewTitle}
              />
            </label>
            <label className="labelDescription">
              <p className="widthP">Description</p>
              <textarea
                className="textareaDescription"
                onChange={(e) => {
                  setAddNewDescription(e.target.value);
                }}
                placeholder="Some text about how great Malenia is... :)"
                value={addNewDescription}
              />
            </label>
            <button type="submit" className="descriptionButton">
              Submit
            </button>
          </form>
          {allOptionsForDocuments.length > 0 && (
            <>
              <h2 className="updateDocumentTitle">
                Update Existing Description
              </h2>
              <Stack spacing={2} width="300px">
                <Autocomplete
                  value={value}
                  options={allOptionsForDocuments.map((x) => x.name)}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Choose" />
                  )}
                  onChange={(event: any, newValue: string | null) => {
                    setValue(newValue.toLowerCase().trim().replace(/\s+/g, ""));
                  }}
                  className="InputAuto"
                />
              </Stack>
            </>
          )}
          {descriptionData?.id?.length > 0 && (
            <div key={descriptionData?.id} className="flexTitleAndComment">
              <h2
                className="h2metminderlineheight"
                onBlur={(e) => {
                  setUpdateTitle(e.target.innerText);
                }}
                contentEditable={true}
              >
                {descriptionData?.name}
              </h2>
              <p
                className="comment"
                onBlur={(e) => {
                  setUpdateDescription(e.target.innerText);
                }}
                contentEditable={true}
              >
                {descriptionData?.comment}
              </p>
            </div>
          )}

          {allOptionsForDocuments.length > 0 && (
            <>
              <h2 className="updateDocumentTitle">Delete Description</h2>
              <div className="DeleteDescriptionSection">
                {allOptionsForDocuments.map(({ name, id }) => (
                  <ul key={id} className="flexitemanddelete">
                    <li className="liStyling">{name} </li>
                    <DeleteIcon
                      onClick={(e) => {
                        (async () => {
                          try {
                            await deleteDoc(
                              doc(
                                db,
                                "JaspiTexts",
                                name.toLowerCase().trim().replace(/\s+/g, "")
                              )
                            );
                            setAllOptionsForDocuments(
                              allOptionsForDocuments.filter(
                                (option) => option.name !== name
                              )
                            );
                            setDescriptionData({});
                            toast.success("Description Deleted");
                          } catch {
                            toast.error(
                              "Something went wrong with deleting the description "
                            );
                          }
                        })();
                      }}
                    />
                  </ul>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Description;
