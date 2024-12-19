document.addEventListener("DOMContentLoaded", () => {
  // Feature 1: "Read More" and "Go Back" Functionality
  const readMoreButtons = document.querySelectorAll(".read-more");
  const goBackButtons = document.querySelectorAll(".go-back");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.target);
      if (target) {
        target.style.display = "block"; // Show the details
        button.closest("article").style.display = "none"; // Hide the blog post
      }
    });
  });

  goBackButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const hiddenDetails = document.querySelectorAll(".hidden-details");
      hiddenDetails.forEach((detail) => (detail.style.display = "none")); // Hide all details
      document.querySelectorAll(".blog article").forEach((post) => {
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
  const navLinks = document.querySelectorAll("header nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 60; // Adjust for fixed header
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
  const images = document.querySelectorAll(".post-image, .about-image, .contact-image");

  images.forEach((image) => {
    image.style.transition = "transform 0.3s ease-in-out";
    image.addEventListener("mouseover", () => {
      image.style.transform = "scale(1.05)";
    });
    image.addEventListener("mouseout", () => {
      image.style.transform = "scale(1)";
    });
  });

  // Feature 5: Load Blog Posts Dynamically
  const postsContainer = document.querySelector(".blog .posts");

  fetch("/data/posts.json")
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const article = document.createElement("article");
        article.innerHTML = `
          <img src="${post.image}" alt="${post.title}" class="post-image">
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <button class="read-more" data-target="#${post.id}">Read More</button>
          <div id="${post.id}" class="hidden-details">
            <h3>${post.detailsTitle}</h3>
            <p>${post.details}</p>
            <button class="go-back">Go Back</button>
          </div>
        `;
        postsContainer.appendChild(article);
      });
    })
    .catch((error) => {
      console.error("Error loading blog posts:", error);
      postsContainer.innerHTML = `<p>Unable to load posts at this time.</p>`;
    });
});
// Feature 6: sign up and sign in Effect
document.addEventListener("DOMContentLoaded", () => {
  const signUpBtn = document.getElementById("sign-up-btn");
  const signInBtn = document.getElementById("sign-in-btn");
  const authModal = document.getElementById("auth-modal");
  const closeBtn = document.querySelector(".auth-modal .close");
  const signUpForm = document.getElementById("sign-up-form");
  const signInForm = document.getElementById("sign-in-form");

  signUpBtn.addEventListener("click", () => {
    authModal.style.display = "block";
    signUpForm.style.display = "block";
    signInForm.style.display = "none";
  });

  signInBtn.addEventListener("click", () => {
    authModal.style.display = "block";
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    authModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == authModal) {
      authModal.style.display = "none";
    }
  });
});
// Feature 7: readmore Effect
document.addEventListener("DOMContentLoaded", () => {
  const readMoreAboutBtn = document.getElementById("read-more-about");
  const readLessAboutBtn = document.getElementById("read-less-about");
  const aboutDetails = document.getElementById("about-details");

  readMoreAboutBtn.addEventListener("click", () => {
    aboutDetails.style.display = "block";
    readMoreAboutBtn.style.display = "none";
  });

  readLessAboutBtn.addEventListener("click", () => {
    aboutDetails.style.display = "none";
    readMoreAboutBtn.style.display = "inline-block";
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const ctaButton = document.querySelector(".cta-button");

  ctaButton.addEventListener("click", () => {
    window.scrollTo({
      top: document.querySelector("#about").offsetTop,
      behavior: "smooth",
    });
  });
});
// Feature 8: meau-toggle Effect
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector("header nav ul");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  const navLinks = document.querySelectorAll("header nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }

      if (window.innerWidth <= 768) {
        navMenu.classList.remove("active");
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scroll for "Get Started" Button
  const ctaButton = document.querySelector(".cta-button");

  ctaButton.addEventListener("click", () => {
    window.scrollTo({
      top: document.querySelector("#about").offsetTop,
      behavior: "smooth",
    });
  });

  // Fade-in Animation for Hero Content
  const heroContent = document.querySelector(".hero-content");

  window.addEventListener("scroll", () => {
    const heroSection = document.querySelector(".hero");
    const heroPosition = heroSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;

    if (heroPosition < screenPosition) {
      heroContent.classList.add("fade-in");
    }
  });
});
