document.addEventListener("DOMContentLoaded", () => {
  // Feature 1: "Read More" and "Go Back" Functionality
  const readMoreButtons = document.querySelectorAll(".read-more");
  const goBackButtons = document.querySelectorAll(".go-back");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.target);
      target.style.display = "block"; // Show the details
      button.parentElement.style.display = "none"; // Hide the blog post
    });
  });

  goBackButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const hiddenDetails = document.querySelectorAll(".hidden-details");
      hiddenDetails.forEach((detail) => (detail.style.display = "none")); // Hide all details
      document.querySelectorAll(".posts article").forEach((post) => {
        post.style.display = "block"; // Show all blog articles again
      });
    });
  });

  // Feature 2: Back to Top Button
  const backToTop = document.createElement("button");
  backToTop.innerText = "↑ Back to Top";
  backToTop.id = "back-to-top";
  backToTop.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    display: none;
    z-index: 1000;
  `;
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Feature 3: Interactive Navbar with Active State
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 50; // Adjust for fixed header
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // Feature 4: Image Hover Zoom Effect
  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.style.transition = "transform 0.3s ease-in-out";
    image.addEventListener("mouseover", () => {
      image.style.transform = "scale(1.05)";
    });
    image.addEventListener("mouseout", () => {
      image.style.transform = "scale(1)";
    });
  });
});
