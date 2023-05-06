import { Timestamp } from "firebase/firestore/lite";

export interface SoundType {
  source: string;
  date: Timestamp;
  id?: string;
}
