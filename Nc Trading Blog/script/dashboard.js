import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAvdaynosEcO18OHFpe2wmybNkj0O2PIzE",
  authDomain: "nc-traders-hub.firebaseapp.com",
  projectId: "nc-traders-hub",
  storageBucket: "nc-traders-hub.appspot.com",
  messagingSenderId: "404963701947",
  appId: "1:404963701947:web:163bbce75ff88b719d659e",
  measurementId: "G-FW808KSCG0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get the logout button
const logoutBtn = document.getElementById('logout-btn');

// Log Out functionality
logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    // Successfully signed out
    alert('Sign-Out Successful!');
    window.location.href = 'index.html'; // Redirect to homepage after sign out
  }).catch((error) => {
    // Handle errors
    console.error('Error signing out:', error);
    alert(`Error: ${error.message}`);
  });
});
