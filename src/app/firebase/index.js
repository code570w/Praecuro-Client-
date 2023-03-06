import firebase from "firebase/app";
import "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyBn3Qgdeotyhwqvi3D_PzZBhXspA0HG1-s",
//     authDomain: "crud-1054b.firebaseapp.com",
//     databaseURL: "https://crud-1054b.firebaseio.com",
//     projectId: "crud-1054b",
//     storageBucket: "crud-1054b.appspot.com",
//     messagingSenderId: "55050072470",
//     appId: "1:55050072470:web:4d7f40717ad04c6f1f2db7",
//     measurementId: "G-N0ZT91P3SV"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyAlBAdCH5Wfp6HBI_6UrdhI9uYI6jI4860",
  authDomain: "praecuro-99c4b.firebaseapp.com",
  databaseURL: "https://praecuro-99c4b-default-rtdb.firebaseio.com",
  projectId: "praecuro-99c4b",
  storageBucket: "praecuro-99c4b.appspot.com",
  messagingSenderId: "469108171707",
  appId: "1:469108171707:web:85d8590570290b4a599a9e",
  measurementId: "G-XT1RR77JC8",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
