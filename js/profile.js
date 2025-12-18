// =============================================
// SIMPLE PROFILE PAGE
// =============================================

// Load user information when page loads
window.addEventListener("DOMContentLoaded", function () {
  loadProfile();
  loadExercises();
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
  document.getElementById("userInitial").textContent = user.name
    .charAt(0)
    .toUpperCase();

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

// =============================================
// EXERCISES MANAGEMENT
// =============================================

// Get user exercises from localStorage
function getUserExercises() {
  const user = getCurrentUser();
  if (!user) return [];

  const key = `exercises_${user.email}`;
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Save user exercises to localStorage
function saveUserExercises(exercises) {
  const user = getCurrentUser();
  if (!user) return;

  const key = `exercises_${user.email}`;
  localStorage.setItem(key, JSON.stringify(exercises));
}

// Load and display exercises
function loadExercises() {
  const exercises = getUserExercises();
  const container = document.getElementById("exercisesList");

  if (!container) return;

  if (exercises.length === 0) {
    container.innerHTML =
      "<p>No exercises added yet. Add your first exercise!</p>";
    return;
  }

  container.innerHTML = exercises
    .map(
      (exercise, index) => `
    <div class="exercise-item">
      <div class="exercise-details">
        <h3><a href="exercises.html?exercise=${encodeURIComponent(
          exercise.name
        )}" style="color: #1976d2; text-decoration: none;">${
        exercise.name
      }</a></h3>
        <p>${exercise.sets} sets × ${exercise.reps} reps</p>
        ${
          exercise.notes
            ? `<p class="exercise-notes">📝 ${exercise.notes}</p>`
            : ""
        }
      </div>
      <button onclick="removeExercise(${index})" class="btn-remove">Remove</button>
    </div>
  `
    )
    .join("");
}

// Add a sample exercise (you can modify this to add custom exercises)
function addSampleExercise() {
  const exerciseName = prompt("Enter exercise name:");
  if (!exerciseName) return;

  const sets = prompt("Enter number of sets:", "3");
  const reps = prompt("Enter number of reps:", "10");
  const notes = prompt("Enter notes (optional):", "");

  const exercises = getUserExercises();
  exercises.push({
    name: exerciseName,
    sets: sets || "3",
    reps: reps || "10",
    notes: notes || "",
    addedDate: new Date().toISOString(),
  });

  saveUserExercises(exercises);
  loadExercises();
  alert("Exercise added successfully!");
}

// Remove an exercise
function removeExercise(index) {
  if (!confirm("Are you sure you want to remove this exercise?")) return;

  const exercises = getUserExercises();
  exercises.splice(index, 1);
  saveUserExercises(exercises);
  loadExercises();
  alert("Exercise removed!");
}
