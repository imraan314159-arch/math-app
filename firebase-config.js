// Import the Firebase modules you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOGEA--xSTgxUwTGLnt__P6twu5zta0Rc",
  authDomain: "algebruh-d156a.firebaseapp.com",
  projectId: "algebruh-d156a",
  storageBucket: "algebruh-d156a.appspot.com",
  messagingSenderId: "325434204279",
  appId: "1:325434204279:web:93057eaa7a0b3d9e5da672",
  measurementId: "G-88RCTDRWZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
