import React, { useState, useEffect } from 'react'
import Form from '../Form/Form'
import { useNavigate } from 'react-router-dom'
import CardComponent from '../CardComponent/CardComponent'

const LandingPage = () => {
  const [routes, setRoutes] = useState([])
  const LOCAL_STORAGE = "routes"
  const navigate = useNavigate()

  const addRoute = (route) => {
    const newRoute = {...route, id: new Date().getTime(), name: `${route.origin.label} - to - ${route.destination.label}`}
    // console.log('Route: ', newRoute);

    setRoutes([...routes, newRoute])
  }

  const editRoute = (newRoute) => {
    const updatedRoutes = routes.filter(route => route.id !== newRoute.id)
    setRoutes([...updatedRoutes, newRoute])
  }

  const deleteRoute = (routeID) => {
    const updatedRoutes = routes.filter(route => route.id !== routeID)
    setRoutes([...updatedRoutes])
    localStorage.setItem('routes', JSON.stringify(updatedRoutes))
  }

  useEffect(() => {
    const availableRoutes = JSON.parse(localStorage.getItem('routes'))
    // if(availableRoutes) {
    //   setRoutes(JSON.parse(availableRoutes))
    // }
    console.log('Available routes', availableRoutes, localStorage);
    setRoutes(availableRoutes)

    const handleStorageChange = (e) => {
      if(e.key == LOCAL_STORAGE) {
        setRoutes(JSON.parse(e.newValue))
      }
      console.log('event: ', e);
      
    }
    
    window.addEventListener('storage', handleStorageChange)

    return () => { window.removeEventListener('storage', handleStorageChange)}
  }, [])

  // useEffect(() => {
  //   localStorage.setItem('routes', JSON.stringify(routes))
  //   console.log('stored in local storage: ', routes);
  //   console.log('fetched in local storage: ', localStorage.getItem('routes'));
  // }, [routes])

  const handleNavigate = () => {
    navigate('/routes')
  }

  console.log('Routes: ', routes);

  return (
    <>
      <div>
        {/* <Header /> */}
        <div className='display-routes'>
        <Form />
        <p className='recent-search-text'>Your recent searches {'->'}</p>
        <div className='recent-routes'>
          {routes.length>0 && 
            routes.map(route => (
              <div key={route.id} className='cards'>
                <CardComponent route={route} deleteRoute={deleteRoute} />
              </div>
            ))
          }
        </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage