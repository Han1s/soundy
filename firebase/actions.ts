import axios from "axios";

const FIREBASE_URL =
  "https://authentication-628fb-default-rtdb.europe-west1.firebasedatabase.app/";

export const postSound = (sound: { source: string }) => {
  return axios.post(FIREBASE_URL + "sounds.json", sound);
};

export const getSounds = () => {
  return axios.get(FIREBASE_URL + "sounds.json");
};
