import { Sound } from "@/lib/types";
import axios from "axios";
import { parse } from "path";

const FIREBASE_URL =
  "https://authentication-628fb-default-rtdb.europe-west1.firebasedatabase.app/";

export const postSound = (sound: { sound: string }) => {
  axios
    .post(FIREBASE_URL + "sounds.json", sound)
    .then((res) => console.log("added", res));
};

export const getSounds = () => {
  return axios.get(FIREBASE_URL + "sounds.json");
};
