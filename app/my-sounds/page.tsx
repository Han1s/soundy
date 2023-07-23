"use client";

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import SoundsList from "@/components/SoundsList/SoundsList";
import { useAuthUserContext } from "@/context/AuthUserContext";
import { getUserSounds } from "@/firebase/config";
import { withLogin } from "@/lib/withLogin";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const MySoundsPage = () => {
  const [isFetching, setIsFetching] = React.useState(true);
  const [sounds, setSounds] = React.useState<DocumentData[]>([]);

  const { authUser, loading } = useAuthUserContext();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/sign-up");
    }
  }, [authUser, loading]);

  React.useEffect(() => {
    getUserSounds().then((firebaseSounds) => {
      setSounds(firebaseSounds);
      setIsFetching(false);
    });
  }, []);

  let soundSection = <LoadingSpinner />;
  if (!isFetching) {
    soundSection = <SoundsList sounds={sounds} />;
  }

  return soundSection;
};

export default withLogin(MySoundsPage);
