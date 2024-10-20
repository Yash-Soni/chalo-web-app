import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Form from '../Form'
import { useNavigate } from 'react-router-dom'
import ShowRoute from '../Map/ShowRoute'

const LandingPage = () => {
  const [routes, setRoutes] = useState([])
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()

  const addRoute = (route) => {
    const newRoute = {...route, id: new Date().getTime(), name: `${route.origin.label}-${route.destination.label}`}
    console.log('Route: ', newRoute);

    
    setRoutes([...routes, newRoute])
  }

  const editRoute = (newRoute) => {
    const updatedRoutes = routes.filter(route => route.id !== newRoute.id)
    setRoutes([...updatedRoutes, newRoute])
  }

  const deleteRoute = (removeRoute) => {
    const updatedRoutes = routes.filter(route => route.id !== removeRoute.id)
    setRoutes([...updatedRoutes])
  }

  useEffect(() => {
    const availableRoutes = JSON.parse(localStorage.getItem('routes')) || []
    setRoutes(availableRoutes)
  }, [])

  useEffect(() => {
    localStorage.setItem('routes', JSON.stringify(routes))
    console.log('local storage: ', localStorage.getItem('routes'));
    
  }, [routes])

  const handleNavigate = () => {
    navigate('/routes')
  }

  return (
    <>
      <div>
        <Header />
        <Form routes={routes} setRoutes={setRoutes} addRoute={addRoute} />
        {/* <ShowRoute /> */}
        {routes.length>0 && 
          <p onClick={handleNavigate}>Your recent searches</p>
        }
      </div>
    </>
  )
}

export default LandingPage