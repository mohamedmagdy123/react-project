import React from 'react'
import { Link } from 'react-router-dom'
// import './Navbar.css'

export default function Navbar() {
  return (
    <nav className='p-2 d-flex flex-md-row flex-coloumn justify-content-between'>
      <div className="left-nav  flex-md-row flex-coloumn d-flex align-items-center">
        <h1 className='m-0 pe-3'>Noxe</h1>
        <ul className='list-unstyled m-0 d-flex '>
          <li className='px-2'><Link to="home">Home</Link></li>
          <li className='px-2'><Link to="movies">Movies</Link></li>
          <li className='px-2'><Link to="tv">Tv</Link></li>
          <li className='px-2'><Link to="people">People</Link></li>
        </ul>
      </div>
      <div className="right-nav flex-md-row flex-coloumn d-flex align-items-center">
        <div className="social-icons">
          <i className="fab fa-facebook-f mx-1"></i>
          <i className="fab fa-twitter mx-1"></i>
          <i className="fab fa-youtube mx-1"></i>
          <i className="fab fa-instagram mx-1"></i>
        </div>
        <ul className='list-unstyled m-0 d-flex '>
          <li className='px-2'><Link to="login">Login</Link></li>
          <li className='px-2'><Link to="/">Register</Link></li>
          <li className='px-2'><span>Log out</span></li>

        </ul>
      </div>
    </nav>
  )
}
