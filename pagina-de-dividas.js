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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Check user authentication status
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, retrieve debts
        loadDebts(user.uid);
    } else {
        // No user is signed in, redirect to login
        window.location.href = "index.html";
    }
});

// Load debts from Firestore
function loadDebts(userId) {
    const debtsContainer = document.getElementById("debtsContainer");
    db.collection("debts").where("userId", "==", userId).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const debt = doc.data();
                const debtItem = document.createElement("div");
                debtItem.textContent = `Dívida: ${debt.amount}, Descrição: ${debt.description}`;
                debtsContainer.appendChild(debtItem);
            });
        })
        .catch((error) => {
            console.error("Error loading debts:", error);
        });
}

// Logout function
document.getElementById("logoutButton").addEventListener("click", () => {
    auth.signOut().then(() => {
        window.location.href = "index.html"; // Redirect to login page after logout
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});
