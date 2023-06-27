"use client";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import Copyright from "@/components/Copyright/Copyright";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import styles from './styles';

interface AuthFormProps {
  authType: "sign-in" | "sign-up";
}

const AuthForm = ({ authType }: AuthFormProps) => {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    let authentication;
    if (authType === "sign-in") {
      authentication = signInWithEmailAndPassword;
    } else {
      authentication = createUserWithEmailAndPassword;
    }

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    authentication(
      auth,
      data.get("email") as string,
      data.get("password") as string
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (authType === "sign-up") {
          window.alert("account created");
        } else if (authType === "sign-in") {
          router.replace("/");
        }
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(errorMessage);
        // ..
      });
  };

  let switchLink = null;
  let title = "";
  if (authType === "sign-in") {
    switchLink = (
      <Link component={NextLink} href="sign-up" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    );
    title = "Sign In";
  } else if (authType === "sign-up") {
    switchLink = (
      <Link component={NextLink} href="sign-in" variant="body2">
        {"Already have an account? Sign In"}
      </Link>
    );
    title = "Sign up";
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={styles.outerBox}
      >
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={styles.innerBox}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={styles.button}
          >
            {title}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>{switchLink}</Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={styles.copyright} />
    </Container>
  );
};

export default AuthForm;
