import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: Import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: Import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: Import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: Import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: Import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase with custom settings
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication
export const auth = getAuth(app)

// Initialize Firestore
export const db = getFirestore(app)

export default app 