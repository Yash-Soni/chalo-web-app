import React, { createContext, useState, useContext, useEffect } from 'react';

const RouteContext = createContext();

export const useRoutes = () => useContext(RouteContext);

export const RouteProvider = ({ children }) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const storedRoutes = JSON.parse(localStorage.getItem('routes') || '[]');
    setRoutes(storedRoutes);
  }, []);

  const addRoute = (newRoute) => {
    // const newRoute = {...route, id: new Date().getTime(), name: `${route.origin.label} - to - ${route.destination.label}`}
    const updatedRoutes = [...routes, newRoute];
    setRoutes(updatedRoutes);
    localStorage.setItem('routes', JSON.stringify(updatedRoutes));
  };

  const updateRoute = (updatedRoute) => {
    const updatedRoutes = routes.map(route => 
      route.id === updatedRoute.id ? updatedRoute : route
    );
    setRoutes(updatedRoutes);
    localStorage.setItem('routes', JSON.stringify(updatedRoutes));
  };

  const deleteRoute = (routeID) => {    
    const updatedRoutes = routes.filter(route => route.id !== routeID)
    setRoutes([...updatedRoutes])
    localStorage.setItem('routes', JSON.stringify(updatedRoutes))
  }

  return (
    <RouteContext.Provider value={{ routes, addRoute, updateRoute, deleteRoute }}>
      {children}
    </RouteContext.Provider>
  );
};