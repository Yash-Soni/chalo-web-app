import './App.css';
import { Routes, Route } from 'react-router-dom'
import ShowRoute from './component/Map/ShowRoute';
import LandingPage from './component/LandingPage';
import Header from './component/Header';
import { useState } from 'react';
import Form from './component/Form';
import AllRoutes from './component/AllRoutes';

function App() {
  const [destination, setDestination] = useState('')

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='search' element={<Form />} />
        <Route path='routes' element={<AllRoutes />} />
        <Route path='routes/:routeId' element={<ShowRoute />} />
      </Routes>
      {/* <ShowRoute /> */}
    </>
  );
}

export default App;
