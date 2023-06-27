"use client";

import AddIcon from "@mui/icons-material/Add";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import StarIcon from "@mui/icons-material/Star";
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
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "@mui/material";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

const drawerWidth = 240;

const endpoints = [
  {
    text: "All Sounds",
    icon: <LibraryMusicIcon />,
    url: "/",
    targetSegment: null,
  },
  {
    text: "Favorites",
    icon: <StarIcon />,
    url: "/favorites",
    disabled: true,
    targetSegment: "favorites",
  },
  {
    text: "Add a Sound",
    icon: <AddIcon />,
    url: "/add",
    targetSegment: "add",

    
  },
];

const Template = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  const activeSegment = useSelectedLayoutSegment();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      //do your logged in user crap here
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  if (
    activeSegment &&
    ["sign-in", "sign-up"].includes(activeSegment as string)
  ) {
    return children;
  }

  const signInHandler = () => {
    router.replace("/sign-in");
  };

  const signOutHandler = () => {
    auth
      .signOut()
      .then(function () {
        router.replace("/");
      })
      .catch(function (error) {
        // An error happened
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Soundy
          </Typography>
          {/* <Link href={"/sign-in"} passHref style={{ textDecoration: 'none' }}> */}
          <Button
            onClick={loggedIn ? signOutHandler : signInHandler}
            color="inherit"
          >
            {loggedIn ? "logout" : "login"}
          </Button>
          {/* </Link> */}
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
              <Link
                key={endpoint.text}
                style={{ textDecoration: "none", color: "inherit" }}
                href={endpoint.url}
              >
                <ListItem disablePadding disabled={endpoint?.disabled}>
                  <ListItemButton
                    selected={activeSegment === endpoint.targetSegment}
                  >
                    <ListItemIcon>{endpoint.icon}</ListItemIcon>
                    <ListItemText primary={endpoint.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Template;
