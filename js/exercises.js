// =============================================
// EXERCISES DATA
// =============================================

const exercises = [
  {
    id: 1,
    name: "Bench Press",
    description:
      "The bench press is a compound exercise that primarily targets the chest, shoulders, and triceps.",
    image: "../img/1.jpg",
    video: "../videos/1.mp4",
    level: "Beginner",
    target: "Chest",
    steps: [
      "Lie flat on the bench with feet on the floor",
      "Grip the bar slightly wider than shoulder width",
      "Lower the bar to your chest in a controlled motion",
      "Press the bar back up to starting position",
      "Keep your core tight throughout the movement",
    ],
  },
  {
    id: 2,
    name: "Squat",
    description:
      "The squat is a fundamental lower body exercise that builds strength in the legs, glutes, and core.",
    image: "../img/2.jpg",
    video: "../videos/2.mp4",
    level: "Beginner",
    target: "Legs",
    steps: [
      "Stand with feet shoulder-width apart",
      "Keep chest up and core engaged",
      "Lower down by bending knees and hips",
      "Go down until thighs are parallel to ground",
      "Push through heels to return to start",
    ],
  },
  {
    id: 3,
    name: "Deadlift",
    description:
      "The deadlift is one of the best full-body exercises, targeting the back, legs, and core.",
    image: "../img/3.jpg",
    video: "../videos/3.mp4",
    level: "Intermediate",
    target: "Back",
    steps: [
      "Stand with feet hip-width apart, bar over mid-foot",
      "Bend at hips and knees to grip the bar",
      "Keep back straight and chest up",
      "Drive through heels to lift the bar",
      "Stand tall, then lower bar with control",
    ],
  },
  {
    id: 4,
    name: "Pull-ups",
    description:
      "Pull-ups are an excellent upper body exercise that primarily targets the back and biceps.",
    image: "../img/4.jpg",
    video: "../videos/4.mp4",
    level: "Intermediate",
    target: "Back",
    steps: [
      "Hang from bar with hands shoulder-width apart",
      "Engage your core and pull shoulder blades down",
      "Pull yourself up until chin is over the bar",
      "Lower yourself down with control",
      "Repeat without swinging",
    ],
  },
  {
    id: 5,
    name: "Overhead Press",
    description:
      "The overhead press builds strong shoulders and improves upper body strength.",
    image: "../img/5.jpg",
    video: "../videos/5.mp4",
    level: "Beginner",
    target: "Shoulders",
    steps: [
      "Stand with feet shoulder-width apart",
      "Hold bar at shoulder height",
      "Press bar straight overhead",
      "Lock out arms at the top",
      "Lower bar back to shoulders with control",
    ],
  },
  {
    id: 6,
    name: "Bicep Curl",
    description:
      "Bicep curls are an isolation exercise that targets the biceps and builds arm strength.",
    image: "../img/6.jpg",
    video: "../videos/6.mp4",
    level: "Beginner",
    target: "Arms",
    steps: [
      "Stand with feet shoulder-width apart",
      "Hold dumbbells with palms facing forward",
      "Keep elbows close to your sides",
      "Curl the weights up to shoulder level",
      "Lower dumbbells back down with control",
    ],
  },
];

// =============================================
// DISPLAY EXERCISES
// =============================================

function displayExercises() {
  const grid = document.getElementById("exercisesGrid");

  grid.innerHTML = exercises
    .map(
      (exercise) => `
    <div class="exercise-card" onclick="openModal(${exercise.id})">
      <img src="${exercise.image}" alt="${exercise.name}">
      <div class="exercise-card-content">
        <h3>${exercise.name}</h3>
        <p>${exercise.description.substring(0, 80)}...</p>
        <div class="exercise-meta">
          <span class="badge">${exercise.level}</span>
          <span class="badge">${exercise.target}</span>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// =============================================
// MODAL FUNCTIONALITY
// =============================================

let currentExercise = null;

function openModal(id) {
  currentExercise = exercises.find((ex) => ex.id === id);
  if (!currentExercise) return;
  const exercise = currentExercise;

  document.getElementById("modalTitle").textContent = exercise.name;
  document.getElementById("modalDesc").textContent = exercise.description;

  const videoElement = document.getElementById("modalVideo");
  const sourceElement = videoElement.querySelector("source");
  sourceElement.src = exercise.video;
  videoElement.load();

  document.getElementById("modalLevel").textContent = exercise.level;
  document.getElementById("modalTarget").textContent = exercise.target;

  const stepsList = document.getElementById("modalSteps");
  stepsList.innerHTML = exercise.steps
    .map((step) => `<li>${step}</li>`)
    .join("");

  document.getElementById("detailsModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("detailsModal").classList.remove("active");
  const videoElement = document.getElementById("modalVideo");
  videoElement.pause();
  videoElement.currentTime = 0;
  document.body.style.overflow = "auto";
  currentExercise = null;
}

// =============================================
// ADD TO PROFILE FUNCTIONALITY
// =============================================

function addExerciseToProfile() {
  // Check if user is logged in
  if (typeof getCurrentUser !== "function") {
    alert("Please login to add exercises to your profile.");
    window.location.href = "login.html";
    return;
  }

  const user = getCurrentUser();
  if (!user) {
    alert("Please login to add exercises to your profile.");
    window.location.href = "login.html";
    return;
  }

  if (!currentExercise) {
    alert("No exercise selected.");
    return;
  }

  // Get user's exercises
  const key = `exercises_${user.email}`;
  let userExercises = JSON.parse(localStorage.getItem(key)) || [];

  // Check if exercise already exists
  const exists = userExercises.some((ex) => ex.name === currentExercise.name);
  if (exists) {
    alert("This exercise is already in your profile!");
    return;
  }

  // Prompt for sets and reps
  const sets = prompt("Enter number of sets:", "3");
  if (!sets) return;

  const reps = prompt("Enter number of reps:", "10");
  if (!reps) return;

  const notes = prompt("Enter notes (optional):", "");

  // Add exercise to user's profile
  userExercises.push({
    name: currentExercise.name,
    sets: sets,
    reps: reps,
    notes: notes,
    addedDate: new Date().toISOString(),
  });

  // Save to localStorage
  localStorage.setItem(key, JSON.stringify(userExercises));

  alert("Exercise added to your profile successfully!");
  closeModal();
}

// =============================================
// EVENT LISTENERS
// =============================================

document.addEventListener("DOMContentLoaded", function () {
  displayExercises();

  document
    .getElementById("closeModalBtn")
    .addEventListener("click", closeModal);
  document
    .getElementById("modalCloseBtn")
    .addEventListener("click", closeModal);

  document
    .getElementById("detailsModal")
    .addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal();
      }
    });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Add to Profile button
  const addToProfileBtn = document.getElementById("addToProfileBtn");
  if (addToProfileBtn) {
    addToProfileBtn.addEventListener("click", addExerciseToProfile);
  }
});
