import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div className='header'>
        <div>
          <NavLink to='/'>Chalo</NavLink>
        </div>
      </div>
    </>
  )
}

export default Header