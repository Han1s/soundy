// Import the functions you need from the SDKs you need
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
  query,
  where,
  orderBy,
  getDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyVjEoDbi_xwxXReB5pPns-rBfHhrJPrI", // TODO: switch to env
  authDomain: "authentication-628fb.firebaseapp.com", // TODO: switch to env
  databaseURL:
    "https://authentication-628fb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "authentication-628fb",
  storageBucket: "authentication-628fb.appspot.com",
  messagingSenderId: "959292263110",
  appId: "1:959292263110:web:cad2efdc41664cebfc65c7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// get auth
export const auth = getAuth(app);

// get db
export const db = getFirestore(app);

const soundsRef = collection(db, "sounds");
const userFavoritesRef = collection(db, "userFavorites");

export const getSounds = () => {
  const q = query(soundsRef, orderBy("date", "desc"));

  return getDocs(q).then((snapshot) => snapshot.docs.map((doc) => doc.data()));
};

export const getSound = (videoId: string) => {
  const docRef = doc(db, "sounds", videoId);

  return getDoc(docRef);
};

export const addSound = (id: string, sound: SoundType) => {
  const soundRef = doc(db, "sounds", id);

  return setDoc(soundRef, { ...sound, uid: auth.currentUser!.uid });
};

export const getUserSounds = () => {
  const q = query(soundsRef, where("uid", "==", auth.currentUser?.uid));

  return getDocs(q).then((snapshot) => snapshot.docs.map((doc) => doc.data()));
};

export const getUserFavorites = () => {
  const q = query(userFavoritesRef, where("uid", "==", auth.currentUser?.uid));

  return getDocs(q).then((snapshot) => snapshot.docs.map((doc) => doc.data()));
};

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
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
