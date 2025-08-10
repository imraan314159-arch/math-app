const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const links = document.querySelectorAll(".tab-link");
const title = document.getElementById("tab-title");
const content = document.getElementById("tab-content");

const tabContents = {
  home: "Welcome to the Math App! Select a topic from the sidebar.",
  integers: "Integers are whole numbers and their opposites.",
  distributivity: "Distributivity is a rule for multiplying over addition.",
  exponents: "Exponents represent repeated multiplication.",
  factorization: "Factorization is breaking numbers into their factors.",
  graphs: "Graphs represent data or functions visually.",
  profile: "User profile: View your progress and settings.",
  patterns: "Patterns are sequences that follow a rule."
};

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const tab = link.getAttribute("data-tab");
    title.textContent = link.textContent;
    content.innerHTML = `<p>${tabContents[tab]}</p>`;
  });
});


const auth = firebase.auth();

document.getElementById("profile-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) return alert("Not signed in");

  const uid = user.uid;

  const profileData = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    age: document.getElementById("age").value,
    school: document.getElementById("school").value,
    grade: document.getElementById("grade").value
  };

  db.collection("profiles").doc(uid).set(profileData)
    .then(() => {
      alert("Profile saved!");
      showProfile(profileData);
    })
    .catch(err => alert("Error saving: " + err.message));
});

function showProfile(data) {
  const display = document.getElementById("profile-display");
  display.innerHTML = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Surname:</strong> ${data.surname}</p>
    <p><strong>Age:</strong> ${data.age}</p>
    <p><strong>School:</strong> ${data.school}</p>
    <p><strong>Grade:</strong> ${data.grade}</p>
  `;
}

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("profile-section").style.display = "block";

    // Load existing profile
    db.collection("profiles").doc(user.uid).get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        document.getElementById("name").value = data.name || "";
        document.getElementById("surname").value = data.surname || "";
        document.getElementById("age").value = data.age || "";
        document.getElementById("school").value = data.school || "";
        document.getElementById("grade").value = data.grade || "";
        showProfile(data);
      }
    });
  } else {
    document.getElementById("profile-section").style.display = "none";
  }
});


import { auth } from './firebase-config.js';      // your initialized Firebase Auth
import { getDatabase, ref, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const db = getDatabase();

function loadUserProfile() {
  const user = auth.currentUser;
  if (!user) {
    alert("User not signed in");
    return;
  }

  const userRef = ref(db, 'profiles/' + user.uid);
  
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        document.getElementById("name").value = data.name || "";
        document.getElementById("surname").value = data.surname || "";
        document.getElementById("age").value = data.age || "";
        document.getElementById("school").value = data.school || "";
        document.getElementById("grade").value = data.grade || "";
      } else {
        console.log("No profile data found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// Listen for auth state changes, then load profile if signed in
onAuthStateChanged(auth, user => {
  if (user) {
    loadUserProfile();
  } else {
    // User signed out — clear or hide profile form if you want
  }
});
