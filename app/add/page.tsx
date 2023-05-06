"use client";

import { addSound, db } from "@/firebase/config";
import { Button, Container, TextField } from "@mui/material";
import { Timestamp } from "firebase/firestore/lite";
import { useState } from "react";

const Page = () => {
  const [value, setValue] = useState("");

  const uploadHandler = () => {
    let source = "";
    if (!isValid(value)) {
      window.alert("This is not a valid link, please try again.");
      return;
    }

    source = value.match(/(?<=\=).+?(?=\&)/)![0] as string;

    addSound(db, { source, date: Timestamp.fromDate(new Date()) }).then(() => {
      window.alert("sound successfully added");
    });
  };

  const isValid = (link: string) => {
    if (!link.includes("www.youtube.com/watch?v=")) {
      return false;
    }

    const matches = link.match(/(?<=\=).+?(?=\&)/);

    if (!matches || !matches[0]) {
      return false;
    }

    return true;
  };

  return (
    <Container>
      <TextField
        placeholder="https://www.youtube.com/watch?v=..."
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
