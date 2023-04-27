import Card from "@mui/material/Card";

interface YoutubeCard {
  source: string;
  showControls: boolean;
}

const YoutubeCard = ({ source, showControls }: YoutubeCard) => {
  return (
    <iframe
      width="100%"
      height="100%"
      frameBorder={0}
      src={`${source}${showControls ? "" : "?controls=0"}`}
      title="YouTube video player"
      allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
  );
};

export default YoutubeCard;
