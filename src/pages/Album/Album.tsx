import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, FavoritesType, LoadType, SongType } from '../../types';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading/Loading';
import MusicCard from '../../components/MusicCard/MusicCard';
import './Album.css';
import SearchCard from '../../components/SearchCard/SearchCard';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

function Album({ loadProps, favoritesProps }: {
  loadProps: LoadType;
  favoritesProps: FavoritesType;
}) {
  const { load, setLoad } = loadProps;
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
        console.log(favoriteSongs);

        const newSongsList = getSongsList.map((element) => {
          if (favoriteSongs?.find((music) => music.trackId === element.trackId)) {
            return { ...element, favorite: true };
          }
          return { ...element, favorite: false };
        });
        setSongs(newSongsList);
      }
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckBox = (music: SongType) => {
    const songsList = songs.map((song) => {
      if (music.trackId === song.trackId) {
        if (song.favorite) {
          removeSong(song);
        } else {
          addSong(song);
        }
        return { ...song, favorite: !song.favorite };
      }
      return song;
    });
    setSongs(songsList);
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
      <aside className="aside-music-list">
        {songs.map((song) => (
          <MusicCard
            key={ song.trackId }
            songData={ song }
            onCheck={ handleCheckBox }
          />
        ))}
      </aside>
    </section>
  );
}

export default Album;
