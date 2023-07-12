import { useState, useEffect } from "react";
import { app } from "../firebase/config";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  NextOrObserver,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";

const formatAuthUser = (user: User) => ({
  uid: user.uid,
  email: user.email,
});

interface FormattedUser {
    uid: string;
    email: string | null;
}

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<FormattedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const authStateChanged = async (authState: User) => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);

    var formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser);

    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Success. The user is created in firebase");
        router.push("/logged_in");
      })
      .catch((error) => {
        window.alert(error.message);
      });

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth).then(clear);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged as NextOrObserver<User>);
    return unsubscribe;
  }, []);

  return {
    authUser,
    loading,
    signIn,
    signUp,
    logOut,
  };
}
