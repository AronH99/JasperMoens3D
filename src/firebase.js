import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "jaspermoens3dwebsite.firebaseapp.com",
  projectId: "jaspermoens3dwebsite",
  storageBucket: "jaspermoens3dwebsite.appspot.com",
  messagingSenderId: "276580949157",
  appId: "1:276580949157:web:38f86157d5c38adf9ec14c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
