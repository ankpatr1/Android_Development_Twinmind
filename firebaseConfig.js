// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0qSTYnOSxVwEzoVhw_J00WJkuG9dycbs",
  authDomain: "android-app-8ef53.firebaseapp.com",
  projectId: "android-app-8ef53",
  storageBucket: "android-app-8ef53.appspot.com",  // <-- fixed typo here
  messagingSenderId: "343002181544",
  appId: "1:343002181544:web:2b0643796bff8bfdfa379d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
