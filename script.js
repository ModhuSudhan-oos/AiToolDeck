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

const loginBtn = document.getElementById("loginBtn");