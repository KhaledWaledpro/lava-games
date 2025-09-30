document.getElementById("search").addEventListener("keyup", function() {
    let query = this.value.toLowerCase();
    let games = document.querySelectorAll(".game");

    games.forEach(game => {
        let title = game.querySelector("label").textContent.toLowerCase();
        let desc = game.querySelector("p").textContent.toLowerCase();

        if (title.includes(query) || desc.includes(query)) {
            game.style.display = "block"; // يظهر اللعبة
        } else {
            game.style.display = "none"; // يخفي اللعبة
        }
    });
});

async function loadGames() {
  try {
    const res = await fetch("https://feeds.gamepix.com/v2/json?sid=27XLX&order=pubdate&pagination=96&page=1");
    const data = await res.json();

    const container = document.getElementById("games");
    container.innerHTML = "";

    data.items.forEach(item => {
      const title = item.title || "No title";

      // الوصف
      let description = item.content_text || "";
      if (!description && item.content_html) {
        description = item.content_html.replace(/<[^>]*>/g, '').trim();
        description = description.length > 120 ? description.substring(0, 120) + "..." : description;
      }
      if (!description) description = "No description available.";

      // الصورة
      const image = item.icon || (item.media && item.media[0] && item.media[0].url) || "https://via.placeholder.com/120";

      // الرابط
      const url = item.url || "#";

      // إنشاء الكارت
      const card = document.createElement("div");
      card.className = "game";

      card.innerHTML = `
        <label>${title}</label>
        <img src="${image}" alt="${title}">
        <p>${description}</p>
        <a href="${url}" target="_blank" class="play-btn">PLAY NOW</a>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading games:", err);
  }
}

loadGames();

