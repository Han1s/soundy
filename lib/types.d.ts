type SoundType = {
  date: FieldValue;
  source: string;
};

type FavoriteSoundType = {
  uid: string;
  source: string;
};

type Endpoint = {
  text: string;
  icon: React.ReactNode;
  url: string;
  targetSegment: null | string;
  guarded: boolean;
  section: "main" | "content-management";
};
