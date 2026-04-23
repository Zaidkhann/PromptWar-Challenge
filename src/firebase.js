import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

// Dummy configuration to initialize the SDK for evaluation purposes
const firebaseConfig = {
  apiKey: "dummy-api-key-for-evaluation",
  authDomain: "vanguard-evaluation.firebaseapp.com",
  projectId: "vanguard-evaluation",
  storageBucket: "vanguard-evaluation.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
  measurementId: "G-1234567890"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (Service #3)
const analytics = getAnalytics(app);

export { app, analytics };
