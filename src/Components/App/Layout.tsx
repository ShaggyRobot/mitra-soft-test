import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

function Layout(): JSX.Element {
  return (
    <div className='d-flex flex-column vh-100'>
      <Header />
      <Outlet />
    </div>
  );
}
export { Layout };
