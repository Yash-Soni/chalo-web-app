import { useState, useEffect } from 'react'
import StopInput from './StopInput'

const Form = ({addRoute}) => {
  // const [origin, setOrigin] = useState({ label: ''})
  // const [destination, setDestination] = useState({ label: ''})

  const initialValues = {
    name: '',
    origin: {},
    destination: {},
    direction: '',
    status: '',
    stops: []
  }
  const [ formValues, setFormValues] = useState(initialValues)

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

  const handleAddRoute = () => {
    addRoute(formValues)
  }

  return (
    <>
      <div className='inputs'> 
        <StopInput handleInput={handleOrigin} inputType='origin' />
        <StopInput focus={true} handleInput={handleDestination} inputType='destination' />

        <select 
          required
          value={formValues.direction}
          name='direction'
          onChange={handleChange}
          defaultValue=''
        >
          <option value='up'>Up</option>
          <option value='down'>Down</option>
        </select>

        <select 
          required
          value={formValues.direction}
          name='status'
          onChange={handleChange}
          defaultValue=''
        >
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </select>
        
        <button className='primary-btn' onClick={handleAddRoute}>Add Route</button>
      </div>
    </>
  )
}

export default Form