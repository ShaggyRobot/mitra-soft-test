import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from '../../Pages/Home/Home';
import { About } from '../../Pages/About/About';
import { NotFoundPage } from '../../Pages/404/404';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
