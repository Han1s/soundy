"use client";

import Spinner from "@/components/LoadingSpinner/LoadingSpinner";
import YoutubeCard from "@/components/YoutubeCard/YoutubeCard";
import { getSounds } from "@/firebase/actions";
import { SoundType } from "@/lib/types";
import AddIcon from "@mui/icons-material/Add";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import StarIcon from "@mui/icons-material/Star";
import { Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Home = () => {
  const [loading, setLoading] = React.useState(true);
  const [sounds, setSounds] = React.useState<SoundType[]>([]);

  React.useEffect(() => {
    getSounds().then((res) => {
      const sounds: SoundType[] = [];

      Object.keys(res.data).forEach((key) => {
        sounds.push({ ...res.data[key], id: key });
      });

      setSounds(sounds);
      setLoading(false);
    });
  }, []);

  let soundSection = <Spinner />;
  if (!loading) {
    soundSection = (
      <Grid container spacing={2}>
        {sounds.map((card) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ aspectRatio: "16 / 9" }}
            key={card.source}
          >
            <YoutubeCard source={card.source} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return soundSection;
};

export default Home;
