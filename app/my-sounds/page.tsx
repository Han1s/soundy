"use client";

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import SoundsList from "@/components/SoundsList/SoundsList";
import { auth, getSounds, getUserSounds } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";

const MySoundsPage = () => {
  const [loading, setLoading] = React.useState(true);
  const [sounds, setSounds] = React.useState<DocumentData[]>([]);

  const router = useRouter();

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      router.replace("/sign-in");
    }
  });

  React.useEffect(() => {
    getUserSounds().then((firebaseSounds) => {
      setSounds(firebaseSounds);
      setLoading(false);
    });
  }, []);

  let soundSection = <LoadingSpinner />;
  if (!loading) {
    soundSection = <SoundsList sounds={sounds} />;
  }

  return soundSection;
};

export default MySoundsPage;
