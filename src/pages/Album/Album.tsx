import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, LoadType, SongType } from '../../types';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading/Loading';
import MusicCard from '../../components/MusicCard/MusicCard';
import './Album.css';
import SearchCard from '../../components/SearchCard/SearchCard';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

function Album({ loadProps, favoritesProps }: {
  loadProps: LoadType;
  favoritesProps: {
    favorites: SongType[],
    setFavorites: React.Dispatch<React.SetStateAction<SongType[]>> }
}) {
  const { load, setLoad } = loadProps;
  const { favorites, setFavorites } = favoritesProps;
  // const { favorites, setFavorites } = favoritesProps;
  const { id } = useParams();

  const [songs, setSongs] = useState<SongType[]>([]);
  const [album, setAlbum] = useState<(AlbumType)>();

  /* Verifica se o id não é undefined, faz o fetch do album
  e suas musicas e separa o objeto do album do objeto das musicas */
  useEffect(() => {
    const getData = async () => {
      if (id) {
        setLoad(true);
        const albumAndSongs = await getMusics(id);
        const favoriteSongs = await getFavoriteSongs();
        setLoad(false);

        const getAlbum = albumAndSongs[0];
        setAlbum(getAlbum);

        const getSongsList = albumAndSongs.slice(1) as SongType[];
        setFavorites(favoriteSongs);
        setSongs(getSongsList);
      }
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckBox = (music: SongType) => {
    // setLoad(true);
    const check = favorites.some((element) => element.trackId === music.trackId);
    let result = [];
    if (check) {
      removeSong(music);
      result = favorites.filter((element) => element.trackId !== music.trackId);
    } else {
      result = [...favorites, music];
      addSong(music);
    }
    // setLoad(false);
    setFavorites(result);
  };

  if (load) return <Loading />;

  /* Renderiza os card do album e cards das respectivas musicas */
  return (
    <section className="album-section">
      {album && (
        <SearchCard
          artistName={ album.artistName }
          artworkUrl100={ album.artworkUrl100 }
          collectionName={ album.collectionName }
          collectionId={ album.collectionId }
          key={ album.collectionId }
        />
      )}
      <aside className="music-list bg-dark">
        {songs.map((song) => (
          <MusicCard
            key={ song.trackId }
            songData={ song }
            onCheck={ handleCheckBox }
            isFavorite={ favorites.some((element) => element.trackId === song.trackId) }
          />
        ))}
      </aside>
    </section>
  );
}

export default Album;
