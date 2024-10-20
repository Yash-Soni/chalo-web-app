import React, { useState, useCallback, useEffect, useRef} from 'react'
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Marker } from '@react-google-maps/api'
import { useParams, Link } from 'react-router-dom'
import { STOPS as PotentialStops } from '../../data/stops.js'

// type Libraries = ("places" | "drawing" | "geometry" | "localContext" | "visualization")[]
const API_KEY = 'AIzaSyDpz_ggxD2_HwAsxzpKJgKhHgx9RC8hnD4'
const libraries = ['places']

const Alert = ({ title, children, variant = 'info' }) => (
  <div className={`p-4 mb-4 rounded-md ${variant === 'error' ? 'bg-red-50 text-red-800' : 'bg-blue-50 text-blue-800'}`}>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <div>{children}</div>
  </div>
)

const ShowRoute = () => {
  const params = useParams()
  const routeId = params.routeId
  const routes = JSON.parse(localStorage.getItem('routes'))
  
  const routeData = Array.isArray(routes) ? routes?.filter((route) =>  route?.id?.toString() === routeId.toString()) : []
  // console.log('routeData in show routes', routeData, routes?.filter((route) => route.id === routeId), routeId, routes);
  const origin = routeData[0]?.origin
  const destination = routeData[0]?.destination

  const mapStyles = {
    height: "40vh",
    width: '100%'
  }

  const center = {
    lat: 22.726571, 
    lng: 75.880980 // ex: Janjeerwala Square
  }

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: libraries
  })

  const mapRef = useRef(null)
  const [directions, setDirections] = useState(null)
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0)
  const [stopsOnRoute, setStopsOnRoute] = useState([])

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = null
  }, [])

  const isPointOnPath = useCallback((point, path, tolerance) => {
    for (let i = 0; i < path.length - 1; i++) {
      const segment = new window.google.maps.Polyline({
        path: [path[i], path[i + 1]]
      });
      if (window.google.maps.geometry.poly.isLocationOnEdge(point, segment, tolerance)) {
        return true;
      }
    }
    return false;
  }, [])

  const identifyStopsOnRoute = useCallback((route) => {
    const path = route.overview_path
    const originLatLng = new window.google.maps.LatLng(origin.lat, origin.lng)
    const destinationLatLng = new window.google.maps.LatLng(destination.lat, destination.lng)
    const routeLength = window.google.maps.geometry.spherical.computeLength(path)

    const stopsWithDistances = PotentialStops.map(stop => {
      const stopLatLng = new window.google.maps.LatLng(stop.lat, stop.lng)
      const distanceFromStart = window.google.maps.geometry.spherical.computeDistanceBetween(originLatLng, stopLatLng)
      // const distanceToEnd = window.google.maps.geometry.spherical.computeDistanceBetween(stopLatLng, destinationLatLng)
      return { ...stop, distance: distanceFromStart }
    }).filter(stop => {
      const stopLatLng = new window.google.maps.LatLng(stop.lat, stop.lng)
      return isPointOnPath(stopLatLng, path, 0.001) &&
              stop.distance < routeLength &&
              stop.distance + window.google.maps.geometry.spherical.computeDistanceBetween(stopLatLng, destinationLatLng) <= routeLength * 1.1 // Allow for some deviation from the route
    }).sort((a, b) => a.distance - b.distance)

    setStopsOnRoute(stopsWithDistances)
  }, [origin, destination, isPointOnPath])

  const fetchDirections = useCallback(() => {
    if(isLoaded && !directions) {
      const directionsService = new window.google.maps.DirectionsService()

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          // waypoints: middleWaypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result)
            // console.log('Result route: ', result);
            
            identifyStopsOnRoute(result.routes[0])
          } else {
            setError('Error fetching directions')
          }
        }
      )
    }
  }, [isLoaded, identifyStopsOnRoute])

  useEffect(() => {
    if(isLoaded) {
      fetchDirections()
    }
  }, [isLoaded, fetchDirections])

  useEffect(() => {
    if(directions && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds()
      bounds.extend(new window.google.maps.LatLng(origin.lat, origin.lng))
      bounds.extend(new window.google.maps.LatLng(destination.lat, destination.lng))
      stopsOnRoute.forEach(stop => bounds.extend(new window.google.maps.LatLng(stop.lat, stop.lng)))
      mapRef.current.fitBounds(bounds)
    }
  }, [directions, stopsOnRoute])

  useEffect(() => {
    if (loadError && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount(prevCount => prevCount + 1)
        window.location.reload()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [loadError, retryCount])

  if (loadError) {
    return (
      <Alert title="Error loading Google Maps" variant="error">
        <p>{loadError.message}</p>
        {retryCount < 3 && (
          <p>Retrying in 5 seconds... (Attempt {retryCount + 1}/3)</p>
        )}
        {retryCount >= 3 && (
          <p>Max retries reached. Please check your internet connection and API key.</p>
        )}
      </Alert>
    )
  }

  if(!isLoaded) {
    return <>Loading...</>
  }

  return (isLoaded ? (
    <>
      <p>Show Routes:</p>
      {/* <LoadScript googleMapsApiKey='AIzaSyDpz_ggxD2_HwAsxzpKJgKhHgx9RC8hnD4'> */}

        <GoogleMap 
          mapContainerStyle={mapStyles}
          zoom={10}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {directions && (
            <DirectionsRenderer 
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: '#008000',
                  strokeOpacity: 1,
                  strokeWeight: 6,
                },
                suppressMarkers: true
              }}
            />
          )}
          <Marker position={origin} label='A' />
          <Marker position={destination} label='B' />
          {stopsOnRoute.map((stop, index) => (
            <Marker key={stop.label} position={{ lat: stop.lat, lng: stop.lng}} label={(index+1).toString()} />
          ))}
        </GoogleMap>
        <Link to={`/edit/${routeId}`}>Edit Route</Link>
        <p>Stops: </p>
        {stopsOnRoute.length > 0 &&
          stopsOnRoute.map((stop, index) => {
            // console.log('Stops: ', stop);
            
          return(
          <div style={{paddingLeft: '10px'}}>
            {index === 0 && 
              <div>
                <span><strong>Starting from: {stop.label}</strong></span>
              </div>
            }
            {index === stopsOnRoute.length-1 && 
              <span><strong>Destination: {stop.label}</strong></span>
            }
            {index !== 0 && index !== stopsOnRoute.length-1 && 
              <p style={{ paddingLeft: '10px'}}>{stop.label}</p>
            }
          </div>)}
        )}
      {/* </LoadScript> */}
    </>) : <></>
  )
}

export default ShowRoute