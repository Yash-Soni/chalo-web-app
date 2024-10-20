import React, { useState, useEffect, createContext, useContext } from 'react'
import Form from '../Form/Form'
import CardComponent from '../CardComponent/CardComponent'
import { useRoutes } from '../RouteContext'

const LandingPage = () => {
  const { routes } = useRoutes()

  // console.log('Routes: ', routes);
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
                <CardComponent route={route} />
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