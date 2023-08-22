"use client";

import { Card, CardMedia, CardActions, IconButton } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { addFavoriteSound, auth, db } from "@/firebase/config";
import styles from "./styles";

interface YoutubeCard {
  source: string;
}

const YoutubeCard = ({ source }: YoutubeCard) => {
  const link = `https://www.youtube.com/embed/${source}?frameborder=0`;

  const toggleFavoriteHandler = () => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      window.alert("You have to log in to add favorites");
    }

    addFavoriteSound(db, userId + source, { uid: userId as string, source });

    console.log("toggleFavoriteHandler");
  };

  return (
    <Card>
      <CardActions sx={styles.cardActions}>
        <IconButton onClick={toggleFavoriteHandler}>
          <StarOutlineIcon color="primary" />
        </IconButton>
      </CardActions>
      <CardMedia src={link} component={"iframe"} sx={styles.cardMedia} />
    </Card>
  );
};

export default YoutubeCard;
