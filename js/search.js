document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  // Keyboard shortcut '/' to focus search
  document.addEventListener('keydown', function(event) {
    if (event.key === '/' &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA') {
      event.preventDefault();
      searchInput.focus();
    }
  });

  // Handle keys in search input
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      searchInput.value = '';
      searchResults.innerHTML = '';
      searchInput.blur();
    } else if (event.key === 'ArrowDown') {
      const firstLink = searchResults.querySelector('a');
      if (firstLink) {
        event.preventDefault();
        firstLink.focus();
      }
    }
  });

  // Handle keys in search results (delegation)
  searchResults.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      searchInput.value = '';
      searchResults.innerHTML = '';
      searchInput.focus();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const links = Array.from(searchResults.querySelectorAll('a'));
      const index = links.indexOf(document.activeElement);

      if (index !== -1) {
        let nextIndex;
        if (event.key === 'ArrowDown') {
          nextIndex = index + 1;
        } else {
          nextIndex = index - 1;
        }

        if (nextIndex >= 0 && nextIndex < links.length) {
          links[nextIndex].focus();
        } else if (nextIndex < 0) {
          searchInput.focus();
        }
      }
    }
  });

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
