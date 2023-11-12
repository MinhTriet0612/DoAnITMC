// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import "@firebase/firestore";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA1U2ESSTkOCiXBdGQhBKYchg9UDBmSfSI",
	authDomain: "react-https-b7ed8.firebaseapp.com",
	databaseURL: "https://react-https-b7ed8-default-rtdb.firebaseio.com",
	projectId: "react-https-b7ed8",
	storageBucket: "react-https-b7ed8.appspot.com",
	messagingSenderId: "945850565302",
	appId: "1:945850565302:web:f55c2b2d68c2dfeee91c17",
	measurementId: "G-N5L4WZ5M34",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
// connectFirestoreEmulator(db, "127.0.0.1", 8080);
