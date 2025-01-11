import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD7bP59A9S0Memvfa8E4rEkj1kFsMcDCuU",
  authDomain: "y-comb.firebaseapp.com",
  projectId: "y-comb",
  storageBucket: "y-comb.firebasestorage.app",
  messagingSenderId: "80025607693",
  appId: "1:80025607693:web:812bca944eba7992e83f44",
  measurementId: "G-NQ03F4W6E5"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadImage(file: File): Promise<string> {
  const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// Initialize Firebase services
export const firebaseApp = app;