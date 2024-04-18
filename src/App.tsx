/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Album from './pages/Album/Album';
import Favorites from './pages/Favorites/Favorites';
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/Profile/Edit/ProfileEdit';
import NotFound from './pages/NotFound/NotFound';
import Layout from './components/Layout/Layout';
import { AlbumType, SongType } from './types';

function App() {
  const [search, setSearch] = useState<AlbumType[] | null>(null);
  const [favorites, setFavorites] = useState<SongType[]>([]);
  const [searched, setSearched] = useState('');
  const [load, setLoad] = useState(false);

  return (
    <Routes>
      <Route path="/" element={ <Login loadProps={ { load, setLoad } } /> } />
      <Route path="/" element={ <Layout loadProps={ { load, setLoad } } /> }>
        <Route
          path="/search"
          element={ <Search
            searchProps={ { search, setSearch, searched, setSearched } }
            loadProps={ { load, setLoad } }
          /> }
        />
        <Route
          path="/album/:id"
          element={ <Album
            loadProps={ { load, setLoad } }
            favoritesProps={ { favorites, setFavorites } }
          /> }
        />
        <Route
          path="/favorites"
          element={ <Favorites
            loadProps={ { load, setLoad } }
            favoritesProps={ { favorites, setFavorites } }
          /> }
        />
        <Route path="/profile" element={ <Profile loadProps={ { load, setLoad } } /> } />
        <Route
          path="/profile/edit"
          element={ <ProfileEdit /> }
        />
        <Route path="/*" element={ <NotFound /> } />
      </Route>
    </Routes>
  );
}

export default App;
