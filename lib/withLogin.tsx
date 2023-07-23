"use client";

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useAuthUserContext } from "@/context/AuthUserContext";
import { HtmlProps } from "next/dist/shared/lib/html-context";
import { useRouter } from "next/navigation";

export const withLogin = (Component: React.ElementType) => {
  return function WithLogin(props: any) {
    const authCtx = useAuthUserContext();
    const router = useRouter();

    if (authCtx.loading && !authCtx.authUser) {
      return <LoadingSpinner />;
    }

    if (!authCtx.loading && !authCtx.authUser) {
        router.replace("/sign-in");
        return <LoadingSpinner />
    }

    return <Component {...props} />;
  };
};
