"use client";

import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      router.replace("/sign-in");
    }
  });

  return <div>TODO: Favorites</div>;
};

export default Page;
