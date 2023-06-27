"use client";

import { addSound, db } from "@/firebase/config";
import { Button, Container, TextField } from "@mui/material";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";

const Page = () => {
  const [value, setValue] = useState("");

  const getVideoId = (url: string) => {
    const videoId = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return videoId[2] !== undefined
      ? videoId[2].split(/[^0-9a-z_\-]/i)[0]
      : videoId[0];
  };

  const uploadHandler = () => {
    const source = getVideoId(value);

    console.log(source);
    console.log(serverTimestamp());

    addSound(db, source, { date: serverTimestamp(), source })
      .then(() => {
        window.alert("sound successfully added");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <Container>
      <TextField
        placeholder="insert video link"
        id="standard-name"
        type="text"
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

export default Page;
