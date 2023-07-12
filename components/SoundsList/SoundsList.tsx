import { Grid } from "@mui/material";
import React from "react";
import YoutubeCard from "../YoutubeCard/YoutubeCard";
import { DocumentData } from "firebase/firestore";

interface SoundsListProps {
    sounds: DocumentData[]
}

export default function SoundsList({sounds}: SoundsListProps) {
  return (
    <Grid container spacing={2}>
      {sounds.map((card) => (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={card.source}>
          <YoutubeCard source={card.source} />
        </Grid>
      ))}
    </Grid>
  );
}
