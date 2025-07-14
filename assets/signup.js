import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZmdxr-Wgaa1mJtd4i7ZDQk3p3nmm8Ytc",
  authDomain: "mytube-9d6a1.firebaseapp.com",
  projectId: "mytube-9d6a1",
  storageBucket: "mytube-9d6a1.appspot.com",
  messagingSenderId: "337339653708",
  appId: "1:337339653708:web:2a208f4b4bfaec4e7d9ee9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("signup-form")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = e.target.querySelector('input[type="email"]').value;
  const password = e.target.querySelector('input[type="password"]').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("✅ تم إنشاء الحساب بنجاح"))
    .catch((error) => alert("❌ فشل التسجيل: " + error.message));
});
