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

// Simple email and password validation
const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
const isValidPassword = (password) => password.length >= 6;

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
  const username = document.getElementById("sign-up-username").value;
  const email = document.getElementById("sign-up-email").value;
  const password = document.getElementById("sign-up-password").value;

  // Validate input fields
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!isValidPassword(password)) {
    alert("Password must be at least 6 characters.");
    return;
  }

  console.log("Attempting to sign up with email:", email);

  // Show loading state
  signUpSubmit.disabled = true;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User created successfully:", userCredential.user);
      alert("Sign-Up Successful!");
      signUpForm.reset(); // Clear input fields
      modal.classList.add("hidden");
    })
    .catch((error) => {
      let errorMessage = error.message;

      // Specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "The email address is already in use by another account.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "The password is too weak.";
      }

      console.error("Sign-Up error:", error);
      alert(`Error: ${errorMessage}`);
    })
    .finally(() => {
      signUpSubmit.disabled = false; // Re-enable submit button
    });
});

// Firebase Sign-In
signInSubmit.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission to avoid page refresh
  const email = document.getElementById("sign-in-email").value;
  const password = document.getElementById("sign-in-password").value;

  // Validate input fields
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!isValidPassword(password)) {
    alert("Password must be at least 6 characters.");
    return;
  }

  console.log("Attempting to sign in with email:", email);

  // Show loading state
  signInSubmit.disabled = true;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed in successfully:", userCredential.user);
      alert("Sign-In Successful!");
      signInForm.reset(); // Clear input fields
      modal.classList.add("hidden");
    })
    .catch((error) => {
      let errorMessage = error.message;

      // Specific Firebase errors
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No user found with this email.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password.";
      }

      console.error("Sign-In error:", error);
      alert(`Error: ${errorMessage}`);
    })
    .finally(() => {
      signInSubmit.disabled = false; // Re-enable submit button
    });
});
