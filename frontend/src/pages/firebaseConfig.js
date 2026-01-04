// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "college-hackathon-52056.firebaseapp.com",
  projectId: "college-hackathon-52056",
  storageBucket: "college-hackathon-52056.firebasestorage.app",
  messagingSenderId: "1087543632620",
  appId: "1:1087543632620:web:53c04c41eaf1a31b953bc9"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Function to get the Token
export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "VAPID_KEY" 
      });
      return token;
    } else {
      console.log("Notification permission denied.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
    return null;
  }
};