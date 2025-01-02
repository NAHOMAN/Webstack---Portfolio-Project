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
  // Disable the logout button to prevent multiple clicks
  logoutBtn.disabled = true;

  // Clear any previous messages
  successMessage.textContent = "";
  errorMessage.textContent = "";

  signOut(auth)
    .then(() => {
      // Show success message
      successMessage.textContent = "Sign-Out Successful!";
      successMessage.classList.remove("hidden");
      successMessage.classList.add("show");

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        successMessage.classList.remove("show");
        successMessage.classList.add("hidden");
        window.location.href = 'index.html';
      }, 2000);
    })
    .catch((error) => {
      // Show error message
      console.error('Error signing out:', error);
      errorMessage.textContent = `Error signing out: ${error.message}`;
      errorMessage.classList.remove("hidden");
      errorMessage.classList.add("show");

      // Hide error message after 3 seconds
      setTimeout(() => {
        errorMessage.classList.remove("show");
        errorMessage.classList.add("hidden");
      }, 3000);
    })
    .finally(() => {
      // Re-enable the logout button
      logoutBtn.disabled = false;
    });
});

// Elements for Updating Profile
const updateProfileBtn = document.getElementById("update-profile-btn");
const userNameInput = document.getElementById("user-name-input");
const userPhotoInput = document.getElementById("user-photo-input");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

// Update Profile Functionality
updateProfileBtn.addEventListener("click", () => {
  const user = auth.currentUser;

  if (!user) {
    alert("No user is signed in!");
    return;
  }

  const updatedName = userNameInput.value.trim();
  const updatedPhotoURL = userPhotoInput.value.trim();

  if (!updatedName && !updatedPhotoURL) {
    alert("Please enter a name or photo URL to update.");
    return;
  }

  updateProfile(user, {
    displayName: updatedName || user.displayName,
    photoURL: updatedPhotoURL || user.photoURL,
  })
    .then(() => {
      // Update UI
      document.getElementById("user-name").textContent = updatedName || user.displayName;
      document.getElementById("user-photo").src = updatedPhotoURL || "default-photo.jpg";

      // Show Success Message
      successMessage.textContent = "Profile updated successfully!";
      successMessage.classList.remove("hidden");
      successMessage.classList.add("show");

      // Hide the message after 3 seconds
      setTimeout(() => {
        successMessage.classList.remove("show");
        successMessage.classList.add("hidden");
      }, 3000);
    })
    .catch((error) => {
      // Show Error Message
      console.error("Error updating profile:", error);
      errorMessage.textContent = `Error: ${error.message}`;
      errorMessage.classList.remove("hidden");
      errorMessage.classList.add("show");

      // Hide the message after 3 seconds
      setTimeout(() => {
        errorMessage.classList.remove("show");
        errorMessage.classList.add("hidden");
      }, 3000);
    });
});

// Update Profile Functionality
updateProfileBtn.addEventListener("click", () => {
  const user = auth.currentUser;

  if (!user) {
    alert("No user is signed in!");
    return;
  }

  const updatedName = userNameInput.value.trim();
  const updatedPhotoURL = userPhotoInput.value.trim();

  if (!updatedName && !updatedPhotoURL) {
    alert("Please enter a name or photo URL to update.");
    return;
  }

  updateProfile(user, {
    displayName: updatedName || user.displayName,
    photoURL: updatedPhotoURL || user.photoURL,
  })
    .then(() => {
      // Show success message
      successMessage.textContent = "Profile updated successfully!";
      successMessage.classList.remove("hidden");
      successMessage.classList.add("show");

      // Refresh the displayed user info
      document.getElementById("user-name").textContent = user.displayName || "No Name";
      document.getElementById("user-photo").src = user.photoURL || "default-photo.jpg";

      // Hide the success message after 3 seconds
      setTimeout(() => {
        successMessage.classList.remove("show");
        successMessage.classList.add("hidden");
      }, 3000);
    })
    .catch((error) => {
      // Show error message
      console.error("Error updating profile:", error);
      errorMessage.textContent = `Error: ${error.message}`;
      errorMessage.classList.remove("hidden");
      errorMessage.classList.add("show");

      // Hide the error message after 3 seconds
      setTimeout(() => {
        errorMessage.classList.remove("show");
        errorMessage.classList.add("hidden");
      }, 3000);
    });
});
// Function to display feedback messages
function showMessage(element, message, type = "success") {
  element.textContent = message;
  element.classList.remove("hidden");
  element.classList.add("show", type === "error" ? "error" : "success");

  setTimeout(() => {
    element.classList.remove("show");
    element.classList.add("hidden");
  }, 3000);
}

// Log Out functionality
logoutBtn.addEventListener("click", () => {
  logoutBtn.disabled = true;
  showMessage(successMessage, "", "success"); // Clear messages

  signOut(auth)
    .then(() => {
      showMessage(successMessage, "Sign-Out Successful!");
      setTimeout(() => window.location.href = "index.html", 2000);
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      showMessage(errorMessage, `Error signing out: ${error.message}`, "error");
    })
    .finally(() => {
      logoutBtn.disabled = false;
    });
});

// Update Profile Functionality
updateProfileBtn.addEventListener("click", () => {
  const user = auth.currentUser;

  if (!user) {
    showMessage(errorMessage, "No user is signed in!", "error");
    return;
  }

  const updatedName = userNameInput.value.trim();
  const updatedPhotoURL = userPhotoInput.value.trim();

  if (!updatedName && !updatedPhotoURL) {
    showMessage(errorMessage, "Please enter a name or photo URL to update.", "error");
    return;
  }

  updateProfile(user, { displayName: updatedName || user.displayName, photoURL: updatedPhotoURL || user.photoURL })
    .then(() => {
      document.getElementById("user-name").textContent = updatedName || "No Name";
      document.getElementById("user-photo").src = updatedPhotoURL || "default-photo.jpg";
      showMessage(successMessage, "Profile updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      showMessage(errorMessage, `Error: ${error.message}`, "error");
    });
});
// Get references to the Edit Profile button and Update Profile section
const editProfileBtn = document.getElementById('edit-profile-btn');
const updateProfileSection = document.getElementById('update-profile-section');

// Toggle visibility of the Update Profile section when the Edit Profile button is clicked
editProfileBtn.addEventListener('click', () => {
  // Toggle the 'hidden' class to show/hide the update profile section
  updateProfileSection.classList.toggle('hidden');

  // Optionally, change the button text based on the visibility of the Update Profile section
  if (updateProfileSection.classList.contains('hidden')) {
    editProfileBtn.textContent = 'Edit Profile'; // Show "Edit Profile" when hidden
  } else {
    editProfileBtn.textContent = 'Cancel'; // Show "Cancel" when the section is visible
  }
});

// Example: Handling profile update form submission
updateProfileBtn.addEventListener('click', () => {
  const userName = document.getElementById('user-name-input').value;
  const userPhotoURL = document.getElementById('user-photo-input').value;

  // Basic validation
  if (!userName && !userPhotoURL) {
    alert("Please enter a name or photo URL to update.");
    return;
  }

  // Assuming 'updateProfile' is a function that updates the user profile
  updateProfile(userName, userPhotoURL);
});

// Mock updateProfile function (replace this with actual logic)
function updateProfile(name, photoURL) {
  // Example: Update the user profile info
  console.log("Profile Updated", { name, photoURL });

  // Show success message
  const successMessage = document.getElementById('success-message');
  successMessage.textContent = "Profile updated successfully!";
  successMessage.classList.remove('hidden');

  // Hide success message after 3 seconds
  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 3000);
}
