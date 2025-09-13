'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import './login.css'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Add authentication logic here
    console.log('Login attempt:', formData)
    
    // Simulate loading for now
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard for demo purposes
      window.location.href = '/dashboard'
    }, 1500)
  }

  return (
    <div className="login-container">
      {/* Background Elements */}
      <div className="login-bg">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      {/* Header */}
      <header className="login-header">
        <Link href="/" className="logo">
          <div className="logo-icon">C</div>
          <span className="logo-text">Codify</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="login-card">
          <div className="login-content">
            <div className="login-header-text">
              <h1>Welcome Back!</h1>
              <p>Sign in to continue your programming journey</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <Link href="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit" 
                className={`login-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="social-login">
              <button className="social-btn google-btn">
                <div className="social-icon">G</div>
                Continue with Google
              </button>
            </div>

            <div className="signup-prompt">
              <p>Don't have an account? <Link href="/signup">Sign up here</Link></p>
            </div>
          </div>
        </div>

        {/* Side Content */}
        <div className="login-side">
          <div className="side-content">
            <h2>Master Programming with AI</h2>
            <p>
              Join thousands of students learning programming through our intelligent platform with personalized feedback and automated testing.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">🤖</span>
                AI-Powered Learning Assistant
              </div>
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                Instant Code Evaluation
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                Progress Tracking & Analytics
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginPage