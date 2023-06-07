import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { About, Home, NotFoundPage } from '../../Pages';
import { User } from '../../Pages/User/User';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/page/:page', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/user/:userId', element: <User /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export { router };
