import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/Loading/Loading';
import { AlbumType } from '../../types';
import './Search.css';
import SearchCard from '../../components/SearchCard/SearchCard';

function Search() {
  const [data, setData] = useState<AlbumType[] | null>(null);
  const [name, setName] = useState('');
  const [searchedName, setSearchedName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name.length > 1) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const getAlbums = await searchAlbumsAPI(name);

    setLoading(false);
    if (getAlbums.length > 0) setSearchedName(name);
    setData(getAlbums);
    setName('');
  };

  if (loading) return <Loading />;
  if (data?.length === 0) return <h2>Nenhum álbum foi encontrado</h2>;

  return (
    <>
      <form className='search-form' onSubmit={handleSubmit}>

        <label className='form-label' htmlFor="artist"></label>
        <input
          placeholder='Nome do Artista'
          className='form-control search-input'
          type="text"
          data-testid="search-artist-input"
          value={name}
          id="artist"
          name="artist"
          onChange={({ target }) => setName(target.value)}
        />

        <button
          className='btn btn-primary'
          type="submit"
          data-testid="search-artist-button"
          disabled={isDisabled}
        >
          Pesquisar
        </button>

      </form>
      {/* Se o artista existe retorna esse h2 */}
      {searchedName && (
        <h2 className='title'>
          Resultado de álbuns de:
          {' '}
          {searchedName}
        </h2>)}
      <section className='albuns'>
        {/* Card dos albuns */}
        {data?.map(({ collectionId, collectionName, artistName, artworkUrl100 }) => (
          <SearchCard
            key={collectionId}
            collectionId={collectionId}
            collectionName={collectionName}
            artistName={artistName}
            artworkUrl100={artworkUrl100} />
        ))}
      </section>
    </>
  );
}

export default Search;
