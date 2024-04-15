import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { LoadType } from '../../types';

function Layout({ loadProps } : { loadProps: LoadType }) {
  return (
    <>
      <Header loadProps={ loadProps } />
      <Outlet />
    </>
  );
}

export default Layout;
