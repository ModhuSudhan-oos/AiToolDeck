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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();