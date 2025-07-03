document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  fetch("/search.json")
    .then(response => response.json())
    .then(data => {
      const idx = lunr(function() {
        this.ref("url");
        this.field("title");
        this.field("description");
        this.field("tags");

        data.forEach(doc => {
          this.add(doc);
        });
      });

      function renderResults(results) {
        searchResults.innerHTML = "";
        if (results.length === 0) {
          const li = document.createElement("li");
          li.textContent = "No results found.";
          searchResults.appendChild(li);
          return;
        }
        results.slice(0, 3).forEach(result => {
          const item = data.find(doc => doc.url === result.ref);
          const li = document.createElement("li");
          li.innerHTML = `<a href="${item.url}">${item.title}</a> - ${item.description}`;
          searchResults.appendChild(li);
        });
      }

      // Do not show any results by default
      searchResults.innerHTML = "";

      searchInput.addEventListener("input", function() {
        const query = searchInput.value.trim();
        if (query.length === 0) {
          searchResults.innerHTML = "";
          return;
        }
        const results = idx.search(query);
        renderResults(results);
      });
    });
});
