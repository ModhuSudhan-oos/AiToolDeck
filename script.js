const db = firebase.firestore();
const toolContainer = document.getElementById("toolContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function renderTools(tools) {
  toolContainer.innerHTML = "";
  if (tools.length === 0) {
    toolContainer.innerHTML = "<p>No tools found.</p>";
    return;
  }
  tools.forEach(tool => {
    const card = document.createElement("div");
    card.classList.add("tool-card");
    card.innerHTML = `
      <img src="${tool.image}" alt="${tool.name}" />
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <div class="tool-tags">🏷️ ${tool.category.toUpperCase()} | 💰 ${tool.tag}</div>
      <a href="${tool.link}" target="_blank">🔗 Visit Tool</a>
    `;
    toolContainer.appendChild(card);
  });
}

function loadTools() {
  db.collection("tools").orderBy("createdAt", "desc").get().then(snapshot => {
    const tools = [];
    snapshot.forEach(doc => tools.push(doc.data()));
    applyFilters(tools);
  });
}

function applyFilters(tools) {
  const keyword = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const filtered = tools.filter(tool =>
    tool.name.toLowerCase().includes(keyword) &&
    (selectedCategory === "" || tool.category === selectedCategory)
  );
  renderTools(filtered);
}

searchInput.addEventListener("input", () => loadTools());
categoryFilter.addEventListener("change", () => loadTools());
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
loadTools();