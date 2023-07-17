"use client";

import { useAuthUserContext } from "@/context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { authUser, loading } = useAuthUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/sign-in");
    }
  }, [authUser, loading]);

  return <div>TODO: Favorites</div>;
};

export default Page;
