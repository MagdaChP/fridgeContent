import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAA47dgKYIGQe-Om70umFxouWFW6OYGtQk",
  authDomain: "fridge-content.firebaseapp.com",
  databaseURL: "https://fridge-content.firebaseio.com",
  projectId: "fridge-content",
  storageBucket: "fridge-content.appspot.com",
  messagingSenderId: "953365246661",
  appId: "1:953365246661:web:028b0b612b6ea4d2"
};

firebase.initializeApp(firebaseConfig);

export default firebase