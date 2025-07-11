// Firebase থেকে Tools লোড করবে
const toolContainer = document.getElementById("toolContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let allTools = [];

// Firestore থেকে ডেটা লোড
function loadToolsFromFirebase() {
  firebase.firestore().collection("tools")
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => {
      allTools = snapshot.docs.map(doc => doc.data());
      displayTools(allTools);
    })
    .catch((error) => {
      console.error("Error loading tools:", error);
      toolContainer.innerHTML = "<p>Failed to load tools.</p>";
    });
}

// Tool কার্ড ডিসপ্লে ফাংশন
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
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <div class="tool-tags">🏷️ ${tool.category.toUpperCase()} | 💰 ${tool.tag}</div>
    `;
    toolContainer.appendChild(card);
  });
}

// সার্চ ও ক্যাটাগরি ফিল্টার
function filterTools() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = allTools.filter((tool) => {
    const matchSearch = tool.name.toLowerCase().includes(searchTerm) ||
                        tool.description.toLowerCase().includes(searchTerm);
    const matchCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  displayTools(filtered);
}

// ইভেন্ট লিসেনার
searchInput?.addEventListener("input", filterTools);
categoryFilter?.addEventListener("change", filterTools);

// লোড চালু করো
window.addEventListener("DOMContentLoaded", loadToolsFromFirebase);
