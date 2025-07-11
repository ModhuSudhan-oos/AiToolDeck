// ✅ Firebase Config (same as firebase.js এ ছিলো)
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
const db = firebase.firestore();

// ✅ Show tools from Firestore
const toolContainer = document.getElementById("toolContainer");

function displayTools(toolList) {
  toolContainer.innerHTML = "";

  if (toolList.length === 0) {
    toolContainer.innerHTML = "<p>No tools found.</p>";
    return;
  }

  toolList.forEach((tool) => {
    const card = document.createElement("div");
    card.classList.add("tool-card");

    card.innerHTML = `
      <img src="${tool.image}" alt="${tool.name}" style="width:100%; border-radius:10px; max-height:160px; object-fit:cover;" />
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <div class="tool-tags">🏷️ ${tool.category.toUpperCase()} | 💰 ${tool.tag}</div>
      <a href="${tool.link}" target="_blank" style="display:inline-block;margin-top:10px;padding:8px 12px;background:#4f46e5;color:white;border-radius:8px;text-decoration:none;">🔗 Visit Tool</a>
    `;
    toolContainer.appendChild(card);
  });
}

// ✅ Fetch tools on page load
db.collection("tools").orderBy("createdAt", "desc").get().then((snapshot) => {
  const tools = [];
  snapshot.forEach((doc) => {
    tools.push(doc.data());
  });
  displayTools(tools);
}).catch((error) => {
  console.error("Error getting tools:", error);
  toolContainer.innerHTML = "<p>Failed to load tools.</p>";
});