import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div>
        <NavLink to='/chalo-web-app' className='header'>Chalo</NavLink>
      </div>
    </>
  )
}

export default Header