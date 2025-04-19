import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4PUSpNhbd4GUWOnwEw8Yd3WixX4cY3lY",
  authDomain: "trackwise-169bf.firebaseapp.com",
  projectId: "trackwise-169bf",
  storageBucket: "trackwise-169bf.firebasestorage.app",
  messagingSenderId: "515702881596",
  appId: "1:515702881596:web:dbc374d6533eb077a5b239",
  measurementId: "G-BY0DL32XMD"
}

// Initialize Firebase with custom settings
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication
export const auth = getAuth(app)

// Initialize Firestore
export const db = getFirestore(app)

export default app 