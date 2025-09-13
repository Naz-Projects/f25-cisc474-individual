'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import './instructor-dashboard.css'

const InstructorDashboard = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('courses')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`instructor-dashboard-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Navigation Header */}
      <header className="dashboard-header">
        <div className="header-content">
          {/* Logo */}
          <Link href="/" className="logo">
            <div className="logo-icon">C</div>
            <span className="logo-text">Codify</span>
          </Link>

          {/* Navigation Tabs - Instructor specific */}
          <nav className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              📚 Courses
            </button>
            <button 
              className={`nav-tab ${activeTab === 'create-assignment' ? 'active' : ''}`}
              onClick={() => setActiveTab('create-assignment')}
            >
              ➕ Create Assignment
            </button>
            <button 
              className={`nav-tab ${activeTab === 'manage' ? 'active' : ''}`}
              onClick={() => setActiveTab('manage')}
            >
              ⚙️ Manage
            </button>
            <button 
              className={`nav-tab ${activeTab === 'grade' ? 'active' : ''}`}
              onClick={() => setActiveTab('grade')}
            >
              📊 Grade
            </button>
            <button 
              className={`nav-tab ${activeTab === 'announcements' ? 'active' : ''}`}
              onClick={() => setActiveTab('announcements')}
            >
              📢 Send Announcement
            </button>
          </nav>

          {/* User Profile & Controls */}
          <div className="header-controls">
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="user-profile">
              <div className="user-avatar">👨‍🏫</div>
              <span className="user-name">Dr. Bart</span>
            </div>
          </div>
        </div>
      </header>


          {/* Placeholder sections for other tabs */}
          {activeTab === 'create-assignment' && (
            <section className="create-assignment-section">
              <h2>Create New Assignment</h2>
              <div className="placeholder-content">
                <p>➕ Assignment creation interface will be implemented here.</p>
                <p>Instructors will be able to create programming assignments with requirements, test cases, and due dates.</p>
              </div>
            </section>
          )}

          {activeTab === 'manage' && (
            <section className="manage-section">
              <h2>Course Management</h2>
              <div className="placeholder-content">
                <p>⚙️ Course management interface will be implemented here.</p>
                <p>Instructors will manage course settings, enrolled students, and course materials.</p>
              </div>
            </section>
          )}

          {activeTab === 'grade' && (
            <section className="grade-section">
              <h2>Grade Submissions</h2>
              <div className="placeholder-content">
                <p>📊 Grading interface will be implemented here.</p>
                <p>Instructors will review submissions, provide feedback, and assign grades.</p>
              </div>
            </section>
          )}

          {activeTab === 'announcements' && (
            <section className="announcements-section">
              <h2>Send Announcement</h2>
              <div className="placeholder-content">
                <p>📢 Announcement creation interface will be implemented here.</p>
                <p>Instructors will compose and send announcements to their courses.</p>
              </div>
            </section>
          )}
        </div>
  )
}

export default InstructorDashboard