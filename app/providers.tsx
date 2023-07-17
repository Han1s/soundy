"use client";

import { AuthUserProvider } from "@/context/AuthUserContext";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Providers = ({ children }: Props) => {
  return (
    <AuthUserProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AuthUserProvider>
  );
};

export default Providers;
