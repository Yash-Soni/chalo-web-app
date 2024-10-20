import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import StopInput from './StopInput'

const Form = () => {

  const initialValues = {
    name: '',
    origin: null,
    destination: null,
    direction: 'Up',
    status: 'Active',
    stops: []
  }

  const [ formValues, setFormValues] = useState(initialValues)
  const params = useParams()
  const routeId = params.routeId

  useEffect(() => {
    if(routeId) {
      const routes = JSON.parse(localStorage.getItem('routes'))
      const route = routes.filter(item => item.id?.toString() === routeId?.toString())
      // console.log('route id from params: ', routeId, route[0]);
      if(route) {
        setFormValues(route[0])
      }
    }
  }, [routeId])  

  const handleOrigin = (stop) => {
    setFormValues({ ...formValues, origin: stop})
  }

  const handleDestination = (stop) => {
    setFormValues({ ...formValues, destination: stop})
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleAddRoute = (e) => {
    e.preventDefault()
    const routes = JSON.parse(localStorage.getItem('routes') || [])
    if(routeId) {
      const updatedRoute = { ...formValues, name: `${formValues.origin.label} - to - ${formValues.destination.label}`}
      const updatedRoutes = routes.map(route => route.id === routeId ? {...route, updatedRoute} : route)
      localStorage.setItem('routes', JSON.stringify(updatedRoutes))
    } else {
      const newRoute = {...formValues, id: new Date().getTime(), name: `${formValues.origin.label} - to - ${formValues.destination.label}`}
      localStorage.setItem('routes', JSON.stringify([...routes, newRoute]))
      // console.log('Add routes: ', localStorage.getItem('routes'), newRoute);
    }
  }  

  return (
    <>
      <div className='inputs'> 
        <StopInput input={formValues?.origin ? formValues.origin.label : ''} handleInput={handleOrigin} inputType='origin' />
        <StopInput focus={true} input={formValues?.destination ? formValues.destination.label : ''} handleInput={handleDestination} inputType='destination' />

        <select 
          required
          value={formValues?.direction}
          name='direction'
          onChange={handleChange}
          defaultValue=''
        >
          <option value='Up'>Up</option>
          <option value='Down'>Down</option>
        </select>

        <select 
          required
          value={formValues?.status}
          name='status'
          onChange={handleChange}
          defaultValue=''
        >
          <option value='Active'>Active</option>
          <option value='Inactive'>Inactive</option>
        </select>
        
        <button className='primary-btn' onClick={e => handleAddRoute(e)}>{routeId ? 'Edit' : 'Add'} Route</button>
      </div>
    </>
  )
}

export default Form