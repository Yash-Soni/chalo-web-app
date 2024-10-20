import './App.css';
import { Routes, Route } from 'react-router-dom'
import { RouteProvider } from './component/RouteContext';
import ShowRoute from './component/Map/ShowRoute';
import LandingPage from './component/LandingPage/LandingPage';
import Header from './component/Header';
import Form from './component/Form/Form';
import AllRoutes from './component/AllRoutes';

function App() {

  return (
    <RouteProvider>
      <Header />
      <Routes>
        <Route path='/chalo-web-app' element={<LandingPage />} />
        <Route path='edit/:routeId' element={<Form />} />
        <Route path='routes' element={<AllRoutes />} />
        <Route path='routes/:routeId' element={<ShowRoute />} />
      </Routes>
      {/* <ShowRoute /> */}
    </RouteProvider>
  );
}

export default App;
