import { Route, Routes } from 'react-router-dom';

import { About, Home, NotFoundPage } from '../../Pages';

import { Layout } from './Layout';

function App(): JSX.Element {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/page/:page' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
