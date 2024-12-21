document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("postsContainer");

  fetch("json/blog posts.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((posts) => {
      postsContainer.innerHTML = ''; // Clear existing posts
      posts.forEach((post) => {
        const article = document.createElement("article");
        article.classList.add("blog-post");
        article.innerHTML = `
          <img src="${post.image}" alt="${post.title}" class="post-image">
          <h3>${post.title}</h3>
          <p class="preview-text">${post.preview}</p>
          <p class="full-text hidden">${post.fullText}</p>
          <button class="read-more-btn">Read More</button>
        `;
        postsContainer.appendChild(article);
      });

      // Add event listeners for "Read More" buttons
      document.querySelectorAll(".read-more-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const fullText = button.previousElementSibling;
          fullText.classList.toggle("hidden");
          button.innerText = fullText.classList.contains("hidden") ? "Read More" : "Read Less";
        });
      });
    })
    .catch((error) => {
      console.error("Error loading blog posts:", error);
      postsContainer.innerHTML = `<p>Unable to load posts at this time.</p>`;
    });
});

document.querySelector('a[href="#blog"]').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('#blog').scrollIntoView({
    behavior: 'smooth'
  });
});