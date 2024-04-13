import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../../types';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';

function Album() {
  const { id } = useParams();
  const [songs, setSongs] = useState<SongType[]>([]);
  const [artist, setArtist] = useState<(AlbumType)>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        setLoading(true);
        const album = await getMusics(id);
        setLoading(false);

        setArtist(album[0]);

        album.map((element) => {
          if (element && 'trackId' in element) {
            setSongs((prevSongs) => [...prevSongs, element]);
          }
          return album;
        });
      }
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <Loading />;

  return (
    <>
      {artist && (
        <section>
          <p data-testid="artist-name">{artist.artistName}</p>
          <p data-testid="album-name">{artist.collectionName}</p>
        </section>
      )}
      {songs.map((song) => (
        <MusicCard
          key={ song.trackId }
          { ...song }
        />
      ))}
    </>
  );
}

export default Album;
