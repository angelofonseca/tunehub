/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import './Favorites.css';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import { FavoritesType, LoadType, SongType } from '../../types';
import Loading from '../../components/Loading/Loading';
import MusicCard from '../../components/MusicCard/MusicCard';

function Favorites({ loadProps, favoritesProps }: {
  loadProps: LoadType;
  favoritesProps: FavoritesType;
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
    if (favorites) {
      favorites.map((song) => {
        if (music.trackId === song.trackId) {
          removeSong(song);
        }
        return song;
      });
      const test = await getFavoriteSongs();
      console.log(test);

      const test2 = test.map((song) => ({ ...song, favorite: true }));
      setFavorites(test2);
    }
  };

  if (load) return <Loading />;

  return (
    <div>
      {favorites?.map((song) => (
        <MusicCard
          key={ song.trackId }
          songData={ song }
          onCheck={ handleCheck }
        />
      ))}
    </div>
  );
}

export default Favorites;
