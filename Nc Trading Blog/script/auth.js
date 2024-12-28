import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

// Get Modal and Buttons
const modal = document.getElementById("auth-modal");
const signUpBtn = document.getElementById("sign-up-btn");
const signInBtn = document.getElementById("sign-in-btn");
const closeModal = document.getElementById("close-modal");
const signUpForm = document.getElementById("sign-up-form");
const signInForm = document.getElementById("sign-in-form");
const signUpSubmit = document.getElementById("sign-up-submit");
const signInSubmit = document.getElementById("sign-in-submit");

// Event: Open Sign-Up Modal
signUpBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  signUpForm.classList.remove("hidden");
  signInForm.classList.add("hidden");
  console.log("Sign-Up modal opened");
});

// Event: Open Sign-In Modal
signInBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  signInForm.classList.remove("hidden");
  signUpForm.classList.add("hidden");
  console.log("Sign-In modal opened");
});

// Event: Close Modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  console.log("Modal closed");
});

// Firebase Sign-Up
signUpSubmit.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission to avoid page refresh
  const email = document.getElementById("sign-up-email").value;
  const password = document.getElementById("sign-up-password").value;

  console.log("Attempting to sign up with email:", email);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User created successfully:", userCredential.user);
      alert("Sign-Up Successful!");
      modal.classList.add("hidden");
    })
    .catch((error) => {
      console.error("Sign-Up error:", error);
      alert(`Error: ${error.message}`);
    });
});

// Firebase Sign-In
signInSubmit.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission to avoid page refresh
  const email = document.getElementById("sign-in-email").value;
  const password = document.getElementById("sign-in-password").value;

  console.log("Attempting to sign in with email:", email);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed in successfully:", userCredential.user);
      alert("Sign-In Successful!");

      // Redirect to the Dashboard
      window.location.href = "dashboard.html"; 
    })
    .catch((error) => {
      console.error("Sign-In error:", error);
      alert(`Error: ${error.message}`);
    });
});
