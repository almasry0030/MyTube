// استيراد Firebase SDK من CDN (لو شغال على GitHub Pages)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// إعدادات Firebase الخاصة بمشروعك
const firebaseConfig = {
  apiKey: "AIzaSyCZmdxr-Wgaa1mJtd4i7ZDQk3p3nmm8Ytc",
  authDomain: "mytube-9d6a1.firebaseapp.com",
  projectId: "mytube-9d6a1",
  storageBucket: "mytube-9d6a1.appspot.com",
  messagingSenderId: "337339653708",
  appId: "1:337339653708:web:2a208f4b4bfaec4e7d9ee9",
  measurementId: "G-DM0BMVHB0M"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 💡 مثال: تسجيل مستخدم جديد
document.getElementById("register-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  const password = e.target.querySelector('input[type="password"]').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("تم إنشاء الحساب بنجاح!");
    })
    .catch((error) => {
      alert("خطأ: " + error.message);
    });
});

// 💡 مثال: تسجيل الدخول
document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  const password = e.target.querySelector('input[type="password"]').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("تم تسجيل الدخول!");
    })
    .catch((error) => {
      alert("فشل تسجيل الدخول: " + error.message);
    });
});
