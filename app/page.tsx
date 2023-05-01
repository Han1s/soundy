"use client";

import Card from "@/components/Card/Card";
import Spinner from "@/components/LoadingSpinner/LoadingSpinner";
import { getSounds } from "@/firebase/actions";
import { SoundType } from "@/lib/types";
import AddIcon from "@mui/icons-material/Add";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import StarIcon from "@mui/icons-material/Star";

const drawerWidth = 240;

const endpoints = [
  {
    text: "All Sounds",
    icon: <LibraryMusicIcon />,
  },
  {
    text: "Favorites",
    icon: <StarIcon />,
  },
  {
    text: "Add a Sound",
    icon: <AddIcon />,
  },
];

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
            <Card source={card.source} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Soundy
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {endpoints.map((endpoint) => (
              <ListItem key={endpoint.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{endpoint.icon}</ListItemIcon>
                  <ListItemText primary={endpoint.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {soundSection}
      </Box>
    </Box>
  );
};

export default Home;
