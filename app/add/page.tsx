"use client";

import { addSound } from "@/firebase/config";
import { Button, Container, TextField } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/firebase/config";
import { withLogin } from "@/lib/withLogin";

const AddPage = () => {
  const [value, setValue] = useState("");

  const router = useRouter();

  const getVideoId = (url: string) => {
    const videoId = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return videoId[2] !== undefined
      ? videoId[2].split(/[^0-9a-z_\-]/i)[0]
      : videoId[0];
  };

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      router.replace("/sign-in");
    }
  });

  const uploadHandler = () => {
    const source = getVideoId(value);

    addSound(source, { date: serverTimestamp(), source })
      .then(() => {
        window.alert("sound successfully added");
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  return (
    <Container>
      <TextField
        placeholder="insert video link"
        id="video-upload-field"
        type="url"
        fullWidth
        label="Youtube Link"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        InputProps={{
          endAdornment: <Button onClick={uploadHandler}>Upload</Button>,
        }}
      />
    </Container>
  );
};

export default withLogin(AddPage);
