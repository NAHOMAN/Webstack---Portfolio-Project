document.addEventListener("DOMContentLoaded", function () {
    const readMoreButtons = document.querySelectorAll(".read-more-btn");
  
    readMoreButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const fullText = button.previousElementSibling; // The hidden content
        if (fullText.classList.contains("hidden")) {
          fullText.classList.remove("hidden");
          button.textContent = "Read Less";
        } else {
          fullText.classList.add("hidden");
          button.textContent = "Read More";
        }
      });
    });
  });
  