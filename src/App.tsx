import { Routes, Route, Navigate } from 'react-router-dom';
import { Garage, Winners } from './pages';
import { Layout } from './ui/layout/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/async-race" element={<Layout />}>
          <Route index element={<Garage />} />
          <Route path="winners" element={<Winners />} />
          <Route path="*" element={<Navigate to="/async-race" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
