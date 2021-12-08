
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_YT_API_KEY,
  authDomain: "clone-9cca6.firebaseapp.com",
  projectId: "clone-9cca6",
  storageBucket: "clone-9cca6.appspot.com",
  messagingSenderId: "411261574564",
  appId: "1:411261574564:web:808889d8b4144e861cf531",
  measurementId: "G-PRM11XF8HP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.auth()