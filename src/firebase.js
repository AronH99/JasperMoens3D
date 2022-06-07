import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.envREACT_APP_FIREBASE_KEY,
  authDomain: "jaspermoens3dwebsite.firebaseapp.com",
  projectId: "jaspermoens3dwebsite",
  storageBucket: "jaspermoens3dwebsite.appspot.com",
  messagingSenderId: "276580949157",
  appId: "1:276580949157:web:38f86157d5c38adf9ec14c",
};

const app = initializeApp(firebaseConfig);
