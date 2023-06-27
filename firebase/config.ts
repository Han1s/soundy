// Import the functions you need from the SDKs you need
import { FavoriteSoundType, SoundType } from "@/lib/types";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyVjEoDbi_xwxXReB5pPns-rBfHhrJPrI",
  authDomain: "authentication-628fb.firebaseapp.com",
  databaseURL:
    "https://authentication-628fb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "authentication-628fb",
  storageBucket: "authentication-628fb.appspot.com",
  messagingSenderId: "959292263110",
  appId: "1:959292263110:web:cad2efdc41664cebfc65c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export async function getSounds(db: Firestore) {
  const soundsCol = collection(db, "sounds");
  const soundsSnapshot = await getDocs(soundsCol);
  const soundList = soundsSnapshot.docs.map((doc) => doc.data());
  return soundList;
}

export async function addSound(db: Firestore, id: string, sound: SoundType) {
  console.log("this is the id: ", id);
  console.log(sound);
  try {
    const docRef = await setDoc(doc(db, "sounds", id), sound);
    console.log(docRef);
    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addFavoriteSound(
  db: Firestore,
  id: string,
  favoriteSound: FavoriteSoundType
) {
  try {
    const docRef = await addDoc(
      collection(db, "favoriteSounds", id),
      favoriteSound
    );
    console.log(docRef);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
