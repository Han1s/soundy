import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from "./styles";

export default function LoadingSpinner() {
  return (
    <Box sx={styles.spinnerContainer}>
      <CircularProgress />
    </Box>
  );
}
