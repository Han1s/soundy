"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

interface YoutubeCard {
  source: string;
}

const YoutubeCard = ({ source }: YoutubeCard) => {
  const link = `https://www.youtube.com/embed/${source}?frameborder=0`;

  return (
    <Card>
      <CardMedia
        src={link}
        component={"iframe"}
        sx={{
          height: "100%",
          width: "100%",
          aspectRatio: "16 / 9",
          border: "none",
        }}
      />
      <CardActions>
        <StarOutlineIcon color="primary" />
      </CardActions>
    </Card>
  );
};

export default YoutubeCard;
