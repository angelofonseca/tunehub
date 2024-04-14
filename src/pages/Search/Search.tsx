import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/Loading/Loading';
import { AlbumType } from '../../types';

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
      <form onSubmit={ handleSubmit }>

        <label htmlFor="artist">Pesquisar</label>
        <input
          type="text"
          data-testid="search-artist-input"
          value={ name }
          id="artist"
          name="artist"
          onChange={ ({ target }) => setName(target.value) }
        />

        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ isDisabled }
        >
          Pesquisar
        </button>

      </form>
      {/* Se o artista existe retorna esse h2 */}
      {searchedName && (
        <h2>
          Resultado de álbuns de:
          {' '}
          {searchedName}
          {' '}
        </h2>)}
      {/* Card dos albuns */}
      {data?.map(({ collectionId, collectionName, artistName }) => (
        <div key={ collectionId }>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            Link do Album
          </Link>
          <p>{collectionName}</p>
          <p>{artistName}</p>
        </div>
      ))}
    </>
  );
}

export default Search;
