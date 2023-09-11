import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAEryOCq2L93JYAJWtdrtbJ5V6QrmsS_Yo",
    authDomain: "drop-box-831d7.firebaseapp.com",
    projectId: "drop-box-831d7",
    storageBucket: "drop-box-831d7.appspot.com",
    messagingSenderId: "527155165227",
    appId: "1:527155165227:web:dfacf478c71148c42f126e"
  };


  const initializeFirebase = firebase.initializeApp(firebaseConfig) 

export default initializeFirebase