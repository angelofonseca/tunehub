export type AlbumType = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

export type UserType = {
  name: string;
  email: string;
  image: string;
  description: string;
};

export type SongType = {
  trackId: number,
  trackName: string,
  previewUrl: string,
};

export type SearchType = {
  search: AlbumType[] | null;
  setSearch: (value: React.SetStateAction<AlbumType[] | null>) => void;
  searched: string;
  setSearched: React.Dispatch<React.SetStateAction<string>>;
};

export type LoadType = {
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AlbumCardType = {
  artistName: string;
  collectionName: string;
  collectionId: number;
  artworkUrl100: string;
};
