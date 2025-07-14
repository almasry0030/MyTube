
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZmdxr-Wgaa1mJtd4i7ZDQk3p3nmm8Ytc",
  authDomain: "mytube-9d6a1.firebaseapp.com",
  projectId: "mytube-9d6a1",
  storageBucket: "mytube-9d6a1.appspot.com",
  messagingSenderId: "337339653708",
  appId: "1:337339653708:web:2a208f4b4bfaec4e7d9ee9",
  measurementId: "G-DM0BMVHB0M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
