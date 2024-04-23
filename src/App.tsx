import { Routes, Route } from 'react-router-dom';
import { Garage, Winners } from './pages';
import { Layout } from './ui/layout/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Garage />} />
          <Route path="winners" element={<Winners />} />
          <Route path="*" element={<Garage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
