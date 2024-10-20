import './App.css';
import { Routes, Route } from 'react-router-dom'
import ShowRoute from './component/Map/ShowRoute';
import LandingPage from './component/LandingPage/LandingPage';
import Header from './component/Header';
import { useState } from 'react';
import Form from './component/Form/Form';
import AllRoutes from './component/AllRoutes';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='edit/:routeId' element={<Form />} />
        <Route path='routes' element={<AllRoutes />} />
        <Route path='routes/:routeId' element={<ShowRoute />} />
      </Routes>
      {/* <ShowRoute /> */}
    </>
  );
}

export default App;
