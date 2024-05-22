import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore"; 
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



 // get a document reference inside the owner-admins collection inside orders sub-collection
  const docRef = doc(db, 'owners-admins', adminId, 'orders', orderId);
  //
 const  docrefto = getDoc(docRef).then((doc) => {
    console.log(doc.data(), doc.id);
  });

  /**
   * address: "abdli hospital"
​
clientName: "tami@gmail.com"
​
latitude: "31.9677646"
​
locationLink: "https://www.google.com/maps/place/Abdali+Hospital+%D9%85%D8%B3%D8%AA%D8%B4%D9%81%D9%89+%D8%A7%D9%84%D8%B9%D8%A8%D8%AF%D9%84%D9%8A%E2%80%AD/@31.9677646,35.920252,14.81z/data=!4m5!3m4!1s0x151ca076b4d54ad1:0xfbc09d08e0771e30!8m2!3d31.9639685!4d35.9101814?entry=ttu"
​
longitude: "35.920252"
​
paymentMethod: "Visa"
​
phone: "0785564321"
​
riderEmail: "rami@gmail.com"
​
riderId: "YBYVvg3rqJWilOn1cu4fgtG3mut1"
​
totalPrice: 29
   */

//get refernce to form
const form = document.getElementById('orderForm');

//add event listener to form submit 
//add validation for location link to only accept google maps links that starts with https://www.google.com/maps

form.addEventListener('submit', (e) => {
  e.preventDefault();
  //get form data
  const data = new FormData(form);
  //create object from form data
  const formObject = Object.fromEntries(data.entries());

  //validate location link
  if (!formObject.locationLink.startsWith('https://www.google.com/maps')) {
    alert('Please enter a valid google maps link');
    return;
  }
  //validate phone number
  if (formObject.phone.length !== 10) {
    alert('Please enter a valid phone number');
    return;}

    if (formObject.phone.startsWith('07')) {
      alert('Please enter a valid phone number');
      return;
    }

    //extract latitude and longitude from the location link
    const lat = formObject.locationLink.split('@')[1].split(',')[0];
    const long = formObject.locationLink.split('@')[1].split(',')[1];


  //create a new order object
  const order = {
    address: formObject.address,
    clientName: formObject.clientName,
    // state: formObject.state,
    note: formObject.note,
    locationLink: formObject.locationLink,
    latitude: lat,
    longitude: long,
    phone: formObject.phone,
  };
  // update order in database using the owner-admins and orders id 
  const docRef = doc(db, 'owners-admins', adminId, 'orders', orderId);
  //update the document
  updateDoc(docRef, order).then(() => {
    console.log('Document updated successfully');
    //add class hide to FormContainer
    document.getElementById('formCont').classList.add('hide');
    //remove class hide from buttons
    document.getElementById('buttons').classList.remove('hide');
   
    //send a dialog massage to the user that the order has been updated successfully
    alert('Order has been updated successfully');
  }).catch((error) => {
    console.error('Error updating document: ', error);
  });
  

});

//get the status of the order from the database add the color to the li that has the same status
const getStatus = async () => {
  const docRef = doc(db, 'owners-admins', adminId, 'orders', orderId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const order = docSnap.data();
    console.log('Document data:', order);
    const status = order['orderStatus'];
    //get the ul that contains the li
    const ul = document.getElementById('statusList');
    //get the li elements
    const lis = ul.children;
    //loop over the li elements and add the color to the li that has the same status
    for (let i = 0; i < lis.length; i++) {
      console.log(lis[i].id);
      console.log(status);
      if (lis[i].id === status) {
        lis[i].classList.add('active');
      }
    }
  } else {
    console.log('No such document!');
  }
};


// add event listener to the orderFormBtn to show the form // and hide the buttons dive
document.getElementById('orderFormBtn').addEventListener('click', () => {
  document.getElementById('formCont').classList.remove('hide');
  document.getElementById('buttons').classList.add('hide');
});

// add event listener to the back button to hide the form and show the buttons

document.getElementById('backBtn').addEventListener('click', () => {

  document.getElementById('formCont').classList.add('hide');
  document.getElementById('buttons').classList.remove('hide');
});

document.getElementById('backBtn2').addEventListener('click', () => {

  document.getElementById('orderTracking').classList.add('hide');
  document.getElementById('buttons').classList.remove('hide');
});

// add event listener to show oder tracking div and hide the buttons div
document.getElementById('orderTrackingBtn').addEventListener('click', () => {
  document.getElementById('orderTracking').classList.remove('hide');
  document.getElementById('buttons').classList.add('hide');
  getStatus();
});

// add event listener for feebaack button to show the feedback form and hide the buttons div
document.getElementById('feedbackFormBtn').addEventListener('click', () => {
  document.getElementById('feedbackCont').classList.remove('hide');
  document.getElementById('buttons').classList.add('hide');
});

// add event listener for back button to hide the feedback form and show the buttons div
document.getElementById('backBtn3').addEventListener('click', () => {
  document.getElementById('feedbackCont').classList.add('hide');
  document.getElementById('buttons').classList.remove('hide');
});

// add event listener for submit button to submit the feedback form
document.getElementById('feedbackForm').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Feedback form submitted');
  const data = new FormData(document.getElementById('feedbackForm'));
  console.log(data);
  const formObject = Object.fromEntries(data.entries());

  console.log(formObject.feedbackText);
  const feedback = {
    feedback: formObject.feedbackText,
    riderRate: formObject.riderRate,
    serviceRate: formObject.serviceRate,
  };
  const docRef = doc(db, 'owners-admins', adminId, 'orders', orderId);
  updateDoc(docRef, feedback).then(() => {
    console.log('Document updated successfully');
    document.getElementById('feedbackCont').classList.add('hide');
    document.getElementById('buttons').classList.remove('hide');
    alert('Feedback has been submitted successfully');
  }).catch((error) => {
    console.error('Error updating document: ', error);
  });
});
