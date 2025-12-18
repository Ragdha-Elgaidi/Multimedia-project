// =============================================
// SIMPLE PROFILE PAGE
// =============================================

// Load user information when page loads
window.addEventListener("DOMContentLoaded", function () {
  loadProfile();
});

function loadProfile() {
  // Get current user
  const user = getCurrentUser();

  // If no user, redirect to login
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Display user name
  document.getElementById("userName").textContent = user.name;
  document.getElementById("userNameDisplay").textContent = user.name;

  // Display user email
  document.getElementById("userEmail").textContent = user.email;
  document.getElementById("userEmailDisplay").textContent = user.email;

  // Display user initial (first letter of name)
  document.getElementById("userInitial").textContent = user.name.charAt(0).toUpperCase();

  // Display join date
  if (user.joinDate) {
    const date = new Date(user.joinDate);
    const monthYear = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    document.getElementById("joinDate").textContent = monthYear;

    const fullDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    document.getElementById("joinDateDisplay").textContent = fullDate;
  }
}
