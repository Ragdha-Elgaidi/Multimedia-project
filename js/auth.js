// =============================================
// SIMPLE AUTHENTICATION SYSTEM
// =============================================

// STEP 1: Initialize storage
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

// STEP 2: Get all users from storage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// STEP 3: Save users to storage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// STEP 4: Get current logged in user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// STEP 5: Set current user
function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// STEP 6: Clear current user (logout)
function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}

// STEP 7: Show error message
function showError(id, message) {
  const errorElement = document.getElementById(id);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

// STEP 8: Clear all errors
function clearAllErrors() {
  const errors = document.querySelectorAll(".error-message");
  errors.forEach((error) => {
    error.textContent = "";
    error.style.display = "none";
  });
}

// =============================================
// REGISTER FUNCTION
// =============================================
function register(name, email, password, confirmPassword) {
  clearAllErrors();

  // Check if all fields are filled
  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return false;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    showError("confirmPasswordError", "Passwords do not match");
    return false;
  }

  // Check if password is long enough
  if (password.length < 6) {
    showError("passwordError", "Password must be at least 6 characters");
    return false;
  }

  // Get all users
  const users = getUsers();

  // Check if email already exists
  const emailExists = users.find((u) => u.email === email.toLowerCase());
  if (emailExists) {
    showError("emailError", "This email is already registered");
    return false;
  }

  // Create new user
  const newUser = {
    name: name,
    email: email.toLowerCase(),
    password: password,
    joinDate: new Date().toISOString(),
  };

  // Save user
  users.push(newUser);
  saveUsers(users);

  // Auto login
  setCurrentUser({
    name: newUser.name,
    email: newUser.email,
    joinDate: newUser.joinDate,
  });

  return true;
}

// =============================================
// LOGIN FUNCTION
// =============================================
function login(email, password) {
  clearAllErrors();

  // Check if fields are filled
  if (!email || !password) {
    alert("Please enter email and password");
    return false;
  }

  // Get all users
  const users = getUsers();

  // Find user by email
  const user = users.find((u) => u.email === email.toLowerCase());

  // Check if user exists
  if (!user) {
    showError("emailError", "No account found with this email");
    return false;
  }

  // Check if password is correct
  if (user.password !== password) {
    showError("passwordError", "Incorrect password");
    return false;
  }

  // Login successful
  setCurrentUser({
    name: user.name,
    email: user.email,
    joinDate: user.joinDate,
  });

  return true;
}

// =============================================
// LOGOUT FUNCTION
// =============================================
function logout() {
  clearCurrentUser();
  window.location.href = "login.html";
}

// =============================================
// REGISTER PAGE
// =============================================
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (register(name, email, password, confirmPassword)) {
      alert("Registration successful!");
      window.location.href = "profile.html";
    }
  });
}

// =============================================
// LOGIN PAGE
// =============================================
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (login(email, password)) {
      alert("Login successful!");
      window.location.href = "profile.html";
    }
  });
}

// =============================================
// LOGOUT BUTTON
// =============================================
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  });
}

const logoutBtnBottom = document.getElementById("logoutBtnBottom");
if (logoutBtnBottom) {
  logoutBtnBottom.addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  });
}

// =============================================
// PROTECT PROFILE PAGE
// =============================================
if (window.location.pathname.includes("profile.html")) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert("Please login first");
    window.location.href = "login.html";
  }
}
