// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD03eaq4m4XoHAxoyntggVvUBB0FYSQ2Sc",
  authDomain: "money-tracking-app-d30a3.firebaseapp.com",
  projectId: "money-tracking-app-d30a3",
  storageBucket: "money-tracking-app-d30a3.appspot.com",
  messagingSenderId: "591672319072",
  appId: "1:591672319072:web:83ba0e6f4d148276f1f705"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);