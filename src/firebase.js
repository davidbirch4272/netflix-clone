import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB516UEKKaxE-AkNtEDZqU_0j8Ynik4d48",
  authDomain: "netflix-clone10021972.firebaseapp.com",
  projectId: "netflix-clone10021972",
  storageBucket: "netflix-clone10021972.firebasestorage.app",
  messagingSenderId: "699244149462",
  appId: "1:699244149462:web:c64a181089d6492a8d6777"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth }

export default db;


