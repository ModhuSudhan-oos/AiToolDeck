// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDdvkBUD9LQFEjrPo9Qvfq9p_wzXZxbJuo",
  authDomain: "aitooldeck.firebaseapp.com",
  projectId: "aitooldeck",
  storageBucket: "aitooldeck.firebasestorage.app",
  messagingSenderId: "1011178093109",
  appId: "1:1011178093109:web:e4addc124941d8acc10f7c",
  measurementId: "G-VRGP9NXDC2"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Elements
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("adminEmail");
const loginPassword = document.getElementById("adminPassword");
const submitForm = document.getElementById("submitForm");

// Admin Login
loginBtn?.addEventListener("click", () => {
  const email = loginEmail.value;
  const password = loginPassword.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("✅ Logged in as Admin");
      submitForm.style.display = "block";
    })
    .catch((error) => {
      alert("❌ Login failed: " + error.message);
    });
});

// Tool Submission
submitForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const toolName = document.getElementById("toolName").value;
  const toolDesc = document.getElementById("toolDesc").value;
  const toolCategory = document.getElementById("toolCategory").value;
  const toolTag = document.getElementById("toolTag").value;
  const toolLink = document.getElementById("toolLink").value;
  const toolImage = document.getElementById("toolImage").value;

  db.collection("tools").add({
    name: toolName,
    description: toolDesc,
    category: toolCategory,
    tag: toolTag,
    link: toolLink,
    image: toolImage,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("✅ Tool added successfully!");
    submitForm.reset();
  })
  .catch((error) => {
    alert("❌ Error: " + error.message);
  });
});