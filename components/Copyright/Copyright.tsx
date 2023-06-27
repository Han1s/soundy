import { Link, Typography } from "@mui/material";
import NextLink from "next/link";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link component={NextLink} href="/" variant="body2">
        {"Soundy"}
      </Link>
      {" " + new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
