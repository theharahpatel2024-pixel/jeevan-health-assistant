import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD49xWM2pHmF6LbIKuqgDfNwgYNec4-TRU",
  authDomain: "jeevan-health-assistant.firebaseapp.com",
  projectId: "jeevan-health-assistant",
  storageBucket: "jeevan-health-assistant.firebasestorage.app",
  messagingSenderId: "674828037843",
  appId: "1:674828037843:web:cdc1b0d3a25f34e2eb6e26"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
