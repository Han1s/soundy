"use client";

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import SoundsList from "@/components/SoundsList/SoundsList";
import YoutubeCard from "@/components/YoutubeCard/YoutubeCard";
import { getSounds } from "@/firebase/config";
import { Grid } from "@mui/material";
import { DocumentData } from "firebase/firestore/lite";
import * as React from "react";

const Home = () => {
  const [loading, setLoading] = React.useState(true);
  const [sounds, setSounds] = React.useState<DocumentData[]>([]);

  React.useEffect(() => {
    getSounds().then((firebaseSounds) => {
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

export default Home;
