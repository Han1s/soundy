// https://github.com/dan-sproutward/nextjs-auth-with-firebase/blob/main/lib/useFirebaseAuth.jsx

import { createContext, useContext, ReactNode } from "react";
import useFirebaseAuth, { FormattedUser } from "../lib/useFirebaseAuth";
import { UserCredential } from "firebase/auth";

interface AuthUserContextType {
  authUser: FormattedUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

const authUserContext = createContext<AuthUserContextType>({
  authUser: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  logOut: async () => {},
});

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuthUserContext = () => useContext(authUserContext);
