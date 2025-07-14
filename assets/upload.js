import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZmdxr-Wgaa1mJtd4i7ZDQk3p3nmm8Ytc",
  authDomain: "mytube-9d6a1.firebaseapp.com",
  projectId: "mytube-9d6a1",
  storageBucket: "mytube-9d6a1.appspot.com",
  messagingSenderId: "337339653708",
  appId: "1:337339653708:web:2a208f4b4bfaec4e7d9ee9"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

document.getElementById("upload-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = document.getElementById("video-file").files[0];
  const title = document.getElementById("title").value;

  if (!file || !title) return alert("يرجى إدخال العنوان واختيار ملف فيديو.");

  const storageRef = ref(storage, 'videos/' + Date.now() + '-' + file.name);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    alert("✅ تم رفع الفيديو بنجاح!\nالرابط:\n" + url);
  } catch (error) {
    alert("❌ فشل رفع الفيديو: " + error.message);
  }
});
