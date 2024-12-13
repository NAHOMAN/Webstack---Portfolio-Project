document.addEventListener("DOMContentLoaded", () => {
    const readMoreButtons = document.querySelectorAll(".read-more");
    const goBackButtons = document.querySelectorAll(".go-back");
    const hiddenDetails = document.querySelectorAll(".hidden-details");
  
    readMoreButtons.forEach(button => {
      button.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        document.querySelector(targetId).style.display = "block";
      });
    });
  
    goBackButtons.forEach(button => {
      button.addEventListener("click", function () {
        hiddenDetails.forEach(detail => detail.style.display = "none");
      });
    });
  });
  