/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import './Favorites.css';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import { LoadType, SongType } from '../../types';
import Loading from '../../components/Loading/Loading';
import MusicCard from '../../components/MusicCard/MusicCard';

function Favorites({ loadProps, favoritesProps }: {
  loadProps: LoadType;
  favoritesProps: {
    favorites: SongType[];
    setFavorites: React.Dispatch<React.SetStateAction<SongType[]>>;
  }
}) {
  const { load, setLoad } = loadProps;
  const { favorites, setFavorites } = favoritesProps;

  useEffect(() => {
    const getData = async () => {
      setLoad(true);
      const favoriteSongsList = await getFavoriteSongs();
      setLoad(false);
      const list = favoriteSongsList.map((song) => ({ ...song, favorite: true }));
      setFavorites(list);
    };
    getData();
  }, []);

  const handleCheck = async (music: SongType) => {
    setLoad(true);
    const result = favorites.filter((element) => element.trackId !== music.trackId);
    await removeSong(music);
    setFavorites(result);
    setLoad(false);
  };

  if (load) return <Loading />;

  return (
    <main className="music-list centered favorites-main">
      <h2>Músicas Favoritas</h2>
      <hr />
      {favorites.map((song) => (
        <MusicCard
          key={ song.trackId }
          songData={ song }
          onCheck={ handleCheck }
          isFavorite
        />
      ))}
    </main>
  );
}

export default Favorites;
