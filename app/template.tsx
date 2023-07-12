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
import { Button, Divider } from "@mui/material";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import SideNavigationList from "@/components/SideNavigationList/SideNavigationList";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

const drawerWidth = 240;

const endpoints: Endpoint[] = [
  {
    text: "All Sounds",
    icon: <LibraryMusicIcon />,
    url: "/",
    targetSegment: null,
    guarded: false,
    section: "main",
  },
  {
    text: "Favorites",
    icon: <StarIcon />,
    url: "/favorites",
    targetSegment: "favorites",
    guarded: true,
    section: "main",
  },
  {
    text: "Add a Sound",
    icon: <AddIcon />,
    url: "/add",
    targetSegment: "add",
    guarded: true,
    section: "content-management",
  },
  {
    text: "My Sounds",
    icon: <QueueMusicIcon />,
    url: "/my-sounds",
    targetSegment: "my-sounds",
    guarded: true,
    section: "content-management",
  },
];

const Template = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  const activeSegment = useSelectedLayoutSegment();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
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
    signOut(auth)
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
          <Button
            onClick={loggedIn ? signOutHandler : signInHandler}
            color="inherit"
          >
            {loggedIn ? "logout" : "login"}
          </Button>
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
          <SideNavigationList
            endpoints={endpoints.filter(
              (endpoint) => endpoint.section === "main"
            )}
            loggedIn={loggedIn}
            activeSegment={activeSegment}
          />
          <Divider />
          <SideNavigationList
            endpoints={endpoints.filter(
              (endpoint) => endpoint.section === "content-management"
            )}
            loggedIn={loggedIn}
            activeSegment={activeSegment}
          />
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
