// https://github.com/dan-sproutward/nextjs-auth-with-firebase/blob/main/lib/useFirebaseAuth.jsx

import { createContext, useContext, ReactNode } from "react";
import useFirebaseAuth, { FormattedUser } from "../lib/useFirebaseAuth";
import { UserCredential } from "firebase/auth";
import { getUserFavorites } from "@/firebase/config";

interface AuthUserContextType {
  authUser: FormattedUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<UserCredential | void>;
  logOut: () => Promise<void>;
  favorites: string[];
}

const authUserContext = createContext<AuthUserContextType>({
  authUser: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  logOut: async () => {},
  favorites: [],
});

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const auth = useFirebaseAuth();

  // getUserFavorites().then((res) => console.log(res));

  return (
    <authUserContext.Provider value={{ ...auth, favorites: [] }}>
      {children}
    </authUserContext.Provider>
  );
}

export const useAuthUserContext = () => useContext(authUserContext);
