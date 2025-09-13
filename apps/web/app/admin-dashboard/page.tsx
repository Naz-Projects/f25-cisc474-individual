'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import './admin-dashboard.css'

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('manage-students')
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={`admin-dashboard-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Navigation Header */}
      <header className="dashboard-header">
        <div className="header-content">
          {/* Logo */}
          <Link href="/" className="logo">
            <div className="logo-icon">C</div>
            <span className="logo-text">Codify</span>
          </Link>

          {/* Navigation Tabs - Admin specific */}
          <nav className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'manage-students' ? 'active' : ''}`}
              onClick={() => setActiveTab('manage-students')}
            >
              👥 Manage Students
            </button>
            <button 
              className={`nav-tab ${activeTab === 'manage-instructors' ? 'active' : ''}`}
              onClick={() => setActiveTab('manage-instructors')}
            >
              👨‍🏫 Manage Instructors
            </button>
            <button 
              className={`nav-tab ${activeTab === 'manage-courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('manage-courses')}
            >
              📚 Manage Courses
            </button>
            <button 
              className={`nav-tab ${activeTab === 'usage-reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('usage-reports')}
            >
              📊 Usage Reports
            </button>
            <button 
              className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </nav>

          {/* User Profile & Controls */}
          <div className="header-controls">
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="user-profile">
              <div className="user-avatar">👨‍💼</div>
              <span className="user-name">Admin</span>
            </div>
          </div>
        </div>
      </header>

    </div>
  )
}

export default AdminDashboard