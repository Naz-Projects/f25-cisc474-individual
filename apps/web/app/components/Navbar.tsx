'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

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
        <Link href="/" className="logo">
          <div className="logo-icon">C</div>
          <span className="logo-text">Codify</span>
        </Link>

        <ul className="nav-links">
          <li><Link href="#features">Features</Link></li>
          <li><Link href="#about">About</Link></li>
          <li><Link href="#pricing">Pricing</Link></li>
        </ul>

        <div className="nav-buttons">
          <Link href="/login" className="btn-login">Login</Link>
          <Link href="/signup" className="btn-signup">Sign Up</Link>
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