import { NavLink } from 'react-router-dom'
import './Navbar.css'

export function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">HOME</NavLink>
      <NavLink to="/portfolio" className="nav-link">PORTFOLIO</NavLink>
      <NavLink to="/connect" className="nav-link">CONNECT</NavLink>
    </nav>
  )
}
