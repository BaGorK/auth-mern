import { Outlet } from 'react-router-dom';
import { Header } from '../components';

function HomeLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default HomeLayout;
