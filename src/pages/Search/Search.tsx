/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import SearchCard from '../../components/SearchCard/SearchCard';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/Loading/Loading';
import { LoadType, SearchType } from '../../types';
import './Search.css';

function Search({ searchProps, loadProps }: {
  searchProps: SearchType,
  loadProps: LoadType
}) {
  const { search, setSearch, searched, setSearched } = searchProps;
  const { load, setLoad } = loadProps;

  const [name, setName] = useState('');

  /* Procura os albuns na API e verifica existe algum album */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoad(true);
    const getAlbums = await searchAlbumsAPI(name);
    setLoad(false);

    setSearched(name);
    setSearch(getAlbums);
    setName('');
  };

  if (load) return <Loading />;

  return (
    <>
      {/* Formulário de pesquisa do artista ou banda */}
      <form className="search-form" onSubmit={ handleSubmit }>

        <label className="form-label" htmlFor="artist" />
        <input
          placeholder="Nome do Artista"
          className="form-control search-input shadow-none"
          type="text"
          data-testid="search-artist-input"
          value={ name }
          id="artist"
          name="artist"
          onChange={ ({ target }) => setName(target.value) }
        />

        <button
          className="btn btn-primary btn-lg"
          type="submit"
          data-testid="search-artist-button"
          disabled={ name.length < 2 }
        >
          Pesquisar
        </button>

      </form>

      {/* Se o artista existe retorna esse h2 */}
      {(search && search?.length > 0) && (
        <h2 className="title">
          Resultado de álbuns de:
          {' '}
          {searched}
        </h2>)}

      {search?.length === 0
         && <h2 className="centered">Nenhum álbum foi encontrado</h2>}

      {/* Section com card dos albuns */}
      <section className="albums">
        {search?.map(({ collectionId, collectionName, artistName, artworkUrl100 }) => (
          <SearchCard
            key={ collectionId }
            collectionId={ collectionId }
            collectionName={ collectionName }
            artistName={ artistName }
            artworkUrl100={ artworkUrl100 }
          />
        ))}
      </section>
    </>
  );
}

export default Search;
