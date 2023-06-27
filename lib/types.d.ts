import { Timestamp } from "firebase/firestore/lite";

type SoundType {
  date: FieldValue;
  source: string;
}

type FavoriteSoundType {
  uid: string;
  source: string;
}
