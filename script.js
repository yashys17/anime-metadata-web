async function searchAnime() {
  const query = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("animeResult");

  if (query === "") {
    resultDiv.innerHTML = "<p>Please enter an anime name.</p>";
    resultDiv.style.display = "block";
    return;
  }

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=1`);
    const data = await response.json();

    if (data.data.length === 0) {
      resultDiv.innerHTML = "<p>No anime found with that name.</p>";
    } else {
      const anime = data.data[0];
      resultDiv.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h2>${anime.title}</h2>
        <p>${anime.synopsis || "No summary available."}</p>
      `;
    }

    resultDiv.style.display = "block";
  } catch (error) {
    resultDiv.innerHTML = "<p>Error fetching data. Try again later.</p>";
    resultDiv.style.display = "block";
    console.error(error);
  }
}
