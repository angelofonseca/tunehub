/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Album from './pages/Album/Album';
import Favorites from './pages/Favorites/Favorites';
import Profile from './pages/Profile/Profile';
import Edit from './pages/Profile/Edit/Edit';
import NotFound from './pages/NotFound/NotFound';
import Layout from './components/Layout/Layout';
import { AlbumType } from './types';

function App() {
  const [search, setSearch] = useState<AlbumType[] | null>(null);
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
        <Route path="/album/:id" element={ <Album loadProps={ { load, setLoad } } /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="profile/edit" element={ <Edit /> } />
        <Route path="/*" element={ <NotFound /> } />
      </Route>
    </Routes>
  );
}

export default App;
