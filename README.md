# Multimedia-project

# 💪 Men Strength Training

A clean, beginner-friendly **front-end fitness web application** that helps users explore strength training exercises, watch tutorials, and build a personalized workout profile - all using **HTML, CSS, and Vanilla JavaScript**.

> 📌 This project is fully client-side and uses **LocalStorage** for authentication and data persistence.

---

## 🔥 Features

### ✅ Authentication (Client-Side)

* Register / Login / Logout
* Persistent sessions using `localStorage`
* Auto-updating navigation based on auth state
* Protected profile page (redirects if not logged in)


---

### 🏋️ Exercise Library

* Predefined strength training exercises

* Each exercise includes:

  * Name & description
  * Difficulty level
  * Target muscle group
  * Image preview
  * Video tutorial
  * Step-by-step instructions

* Responsive exercise grid

* Click-to-open modal for full details

---

### 🧩 Exercise Modal

* Full exercise breakdown
* Embedded video player
* Execution steps
* Muscle group & difficulty badges
* Add exercise directly to user profile

---

### 👤 User Profile

* Displays:

  * Name & email
  * Join date
  * Account status

* Personal workout list:

  * Sets × reps
  * Optional notes
  * Remove exercises

* Exercises stored per user:

  ```
  localStorage key: exercises_user@email.com
  ```

---

### 🏠 Landing Page

* Motivational hero section
* About section for beginners
* Call-to-action buttons
* Gym-inspired modern UI

---

## 🧱 Tech Stack

* **HTML5**
* **CSS3** (Responsive, animations, modals)
* **Vanilla JavaScript (ES6)**
* **LocalStorage API**


---

## 📁 Project Structure

```
project-root/
│
├── css/
│   └── style.css
│
├── js/
│   ├── auth.js
│   ├── exercises.js
│   └── profile.js
│
├── pages/
│   ├── index.html
│   ├── exercises.html
│   ├── login.html
│   ├── register.html
│   └── profile.html
│
├── img/
├── videos/
└── README.md
```



---

## 🏁 Conclusion

**Men Strength Training** is a realistic front-end application that demonstrates:

* Clean UI structure
* Stateful logic without backend
* Practical JavaScript usage
* Product-oriented thinking

---

💪 *A strong body builds a strong mind.*
