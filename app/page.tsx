"use client";

import Spinner from "@/components/LoadingSpinner/LoadingSpinner";
import YoutubeCard from "@/components/YoutubeCard/YoutubeCard";
import { db, getSounds } from "@/firebase/config";
import { Grid } from "@mui/material";
import { DocumentData } from "firebase/firestore/lite";
import { useRouter } from "next/navigation";
import * as React from "react";

const Home = () => {
  const [loading, setLoading] = React.useState(true);
  const [sounds, setSounds] = React.useState<DocumentData[]>([]);

  React.useEffect(() => {
    getSounds(db).then((firebaseSounds) => setSounds(firebaseSounds));
    setLoading(false);
  }, []);

  let soundSection = <Spinner />;
  if (!loading) {
    soundSection = (
      <Grid container spacing={2}>
        {sounds.map((card) => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={card.source}>
            <YoutubeCard source={card.source} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return soundSection;
};

export default Home;
