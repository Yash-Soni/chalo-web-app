import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div>
        <NavLink to='/' className='header'>Chalo</NavLink>
      </div>
    </>
  )
}

export default Header