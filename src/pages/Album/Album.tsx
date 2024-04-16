import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, LoadType, SongType } from '../../types';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading/Loading';
import MusicCard from '../../components/MusicCard/MusicCard';
import './Album.css';
import SearchCard from '../../components/SearchCard/SearchCard';

function Album({ loadProps } : { loadProps: LoadType }) {
  const { load, setLoad } = loadProps;
  const { id } = useParams();

  const [songs, setSongs] = useState<SongType[]>([]);
  const [album, setAlbum] = useState<(AlbumType)>();
  // const [favorite, setFavorite] = useState(false);

  // const addFavorite = () => {
  //   setFavorite(!favorite);
  // };

  /* Verifica se o id não é undefined, faz o fetch do album
  e suas musicas e separa o objeto do album do objeto das musicas */
  useEffect(() => {
    const getData = async () => {
      if (id) {
        setLoad(true);
        const albumAndSongs = await getMusics(id);
        setLoad(false);

        setAlbum(albumAndSongs[0]);
        // Verifica o tipo do elemento, para saber se é musica ou não. E add nos songs.
        albumAndSongs.map((element) => {
          if (element && 'trackId' in element) {
            setSongs((prevSongs) => [...prevSongs, element]);
          }
          /* porque precisa do return? */
          return songs;
        });
      }
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            { ...song }
            // addFavorite={ addFavorite }
          />
        ))}
      </aside>
    </section>
  );
}

export default Album;
