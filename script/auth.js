import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvdaynosEcO18OHFpe2wmybNkj0O2PIzE",
  authDomain: "nc-traders-hub.firebaseapp.com",
  projectId: "nc-traders-hub",
  storageBucket: "nc-traders-hub.appspot.com",
  messagingSenderId: "404963701947",
  appId: "1:404963701947:web:163bbce75ff88b719d659e",
  measurementId: "G-FW808KSCG0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const modal = document.getElementById("auth-modal");
const signUpForm = document.getElementById("sign-up-form");
const signInForm = document.getElementById("sign-in-form");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

// Show/Hide Modals
document.getElementById("sign-up-btn").addEventListener("click", () => {
  modal.classList.remove("hidden");
  signUpForm.classList.remove("hidden");
  signInForm.classList.add("hidden");
});

document.getElementById("sign-in-btn").addEventListener("click", () => {
  modal.classList.remove("hidden");
  signInForm.classList.remove("hidden");
  signUpForm.classList.add("hidden");
});

document.getElementById("close-modal").addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Display Success Message
function showSuccessMessage(message) {
  successMessage.textContent = message;
  successMessage.classList.remove("hidden");
  successMessage.classList.add("show");

  setTimeout(() => {
    successMessage.classList.remove("show");
    successMessage.classList.add("hidden");
  }, 3000);
}

// Display Error Message
function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  errorMessage.classList.add("show");

  setTimeout(() => {
    errorMessage.classList.remove("show");
    errorMessage.classList.add("hidden");
  }, 3000);
}

// Firebase Sign-Up
document.getElementById("sign-up-submit").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("sign-up-email").value;
  const password = document.getElementById("sign-up-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      showSuccessMessage("Sign-Up Successful! Welcome!");
      modal.classList.add("hidden");
    })
    .catch((error) => {
      console.error("Sign-Up Error:", error);
      showErrorMessage(`Sign-Up Error: ${error.message}`);
    });
});

// Firebase Sign-In
document.getElementById("sign-in-submit").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("sign-in-email").value;
  const password = document.getElementById("sign-in-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      showSuccessMessage("Sign-In Successful! ...");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 3000);
    })
    .catch((error) => {
      console.error("Sign-In Error:", error);
      showErrorMessage(`Sign-In Error: ${error.message}`);
    });
});

// Firebase Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      showSuccessMessage("You have successfully logged out.");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    })
    .catch((error) => {
      console.error("Logout Error:", error);
      showErrorMessage(`Logout Error: ${error.message}`);
    });
});
