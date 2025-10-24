import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'
  const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    // Only use Auth0 on client side
    const auth0Context = typeof window !== 'undefined' ? useAuth0() : { isAuthenticated: false, isLoading: true }
    const { isAuthenticated, isLoading} = auth0Context

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <Link to="/" className="logo">
            <div className="logo-icon">C</div>
            <span className="logo-text">Codify</span>
          </Link>

          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#Contact">Contact</a></li>
          </ul>

          <div className="nav-buttons">
            {isLoading ? (
              <div>Loading...</div>
            ) : isAuthenticated ? (
              <>
                <Link to="/home" className="btn-login">Dashboard</Link>
                <LogoutButton />
              </>
            ) : (
              <LoginButton />
            )}
          </div>

          <button className="mobile-menu-btn">
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>
    )
  }

  export default Navbar