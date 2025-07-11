const firebaseConfig = {
  apiKey: "AIzaSyDdvkBUD9LQFEjrPo9Qvfq9p_wzXZxbJuo",
  authDomain: "aitooldeck.firebaseapp.com",
  projectId: "aitooldeck",
  storageBucket: "aitooldeck.appspot.com",
  messagingSenderId: "1011178093109",
  appId: "1:1011178093109:web:e4addc124941d8acc10f7c",
  measurementId: "G-VRGP9NXDC2"
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById("submitForm").style.display = "block";
  } else {
    document.getElementById("loginBtn").onclick = () => {
      const email = document.getElementById("adminEmail").value;
      const password = document.getElementById("adminPassword").value;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          document.getElementById("submitForm").style.display = "block";
        })
        .catch(err => alert("Login Failed: " + err.message));
    };
  }
});

document.getElementById("submitForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const data = {
    name: document.getElementById("toolName").value,
    description: document.getElementById("toolDesc").value,
    link: document.getElementById("toolLink").value,
    image: document.getElementById("toolImage").value,
    category: document.getElementById("toolCategory").value,
    tag: document.getElementById("toolTag").value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  firebase.firestore().collection("tools").add(data)
    .then(() => alert("Tool Added Successfully!"))
    .catch(err => alert("Error adding tool: " + err.message));
});