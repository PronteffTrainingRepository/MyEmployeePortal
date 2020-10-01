import * as firebase from "firebase";
import "@firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB-RZkfxTh34eshdC6gzzGn7wKVR3A_Zpk",
  authDomain: "my-employee-portal-project.firebaseapp.com",
  databaseURL: "https://my-employee-portal-project.firebaseio.com",
  projectId: "my-employee-portal-project",
  storageBucket: "my-employee-portal-project.appspot.com",
  messagingSenderId: "138259516852",
  appId: "1:138259516852:android:8e098873c2a0b3fd0c38e6",
  //   measurementId: "G-XXXXXXX",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
