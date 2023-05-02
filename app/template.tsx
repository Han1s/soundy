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

const drawerWidth = 240;

const endpoints = [
  {
    text: "All Sounds",
    icon: <LibraryMusicIcon />,
    url: "/",
  },
  {
    text: "Favorites",
    icon: <StarIcon />,
    url: "/favorites",
    disabled: true,
  },
  {
    text: "Add a Sound",
    icon: <AddIcon />,
    url: "/add",
  },
];

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex" }}>
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
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                href={endpoint.url}
              >
                <ListItem
                  key={endpoint.text}
                  disablePadding
                  disabled={endpoint?.disabled}
                >
                  <ListItemButton>
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
