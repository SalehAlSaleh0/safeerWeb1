import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore"; 
const firebaseConfig = {

  apiKey: "AIzaSyBPtnQTcPfGUSKnjDIBhdXzfMFAHq1ipjQ",

  authDomain: "safeerv3-f59a4.firebaseapp.com",

  projectId: "safeerv3-f59a4",

  storageBucket: "safeerv3-f59a4.appspot.com",

  messagingSenderId: "354048220850",

  appId: "1:354048220850:web:f354ab456b628a71edb3ab",

  measurementId: "G-0GC3CF9Y2K"

};
// Initialize Firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// get a colouction reference

// get collection data


let params = new URLSearchParams(window.location.search);


let adminId = params.get('adminId');

let orderId = params.get('orderId');


 const docfef = doc(db, 'owners-admins', adminId );

 getDoc(docfef).then((doc) => {
    console.log(doc.data(), doc.id);
 });
