// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
  authDomain: "dividas1-fed53.firebaseapp.com",
  projectId: "dividas1-fed53",
  storageBucket: "dividas1-fed53.appspot.com",
  messagingSenderId: "350859669404",
  appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
  measurementId: "G-7HGSN6TC3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth and Firestore
const auth = getAuth();
const db = getFirestore();

// Function to register a new user
async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Send email verification
    await sendEmailVerification(user);
    alert("Verifique seu email para confirmar a conta.");
  } catch (error) {
    console.error("Error registering user: ", error);
    alert(error.message);
  }
}

// Function to add a new debt
async function addDebt(userId, debtAmount) {
  try {
    const docRef = await addDoc(collection(db, "dividas"), {
      userId: userId,
      amount: debtAmount,
      createdAt: new Date()
    });
    console.log("Debt added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding debt: ", error);
  }
}

// Example usage
document.getElementById("registerButton").addEventListener("click", async () => {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  await registerUser(email, password);
});

document.getElementById("addDebtButton").addEventListener("click", async () => {
  const userId = auth.currentUser.uid;
  const debtAmount = document.getElementById("debtInput").value;
  await addDebt(userId, debtAmount);
});
