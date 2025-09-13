'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import './dashboard.css'

const StudentDashboard = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('courses')

  // Mock data for demonstration
  const courses = [
    {
      id: 1,
      name: 'Introduction to Programming',
      code: 'CISC 108',
      instructor: 'Dr. Smith',
      progress: 85,
      assignments: 3,
      announcements: 2,
      nextDeadline: 'Assignment 4 - Oct 15, 2024'
    },
    {
      id: 2,
      name: 'Data Structures',
      code: 'CISC 220',
      instructor: 'Prof. Johnson',
      progress: 72,
      assignments: 5,
      announcements: 1,
      nextDeadline: 'Project 2 - Oct 20, 2024'
    },
    {
      id: 3,
      name: 'Web Techchnologies',
      code: 'CISC 474',
      instructor: 'DR. Bart',
      progress: 90,
      assignments: 2,
      announcements: 0,
      nextDeadline: 'Final Project - Dec 1, 2025'
    },
    {
      id: 4,
      name: 'Database Systems',
      code: 'CISC 437',
      instructor: 'Prof. Gibbons',
      progress: 78,
      assignments: 4,
      announcements: 3,
      nextDeadline: 'Exam - Sept 30, 2025'
    },
    {
      id: 5,
      name: 'Senior Design',
      code: 'CISC 498',
      instructor: 'Proffessor Armando',
      progress: 65,
      assignments: 6,
      announcements: 1,
      nextDeadline: 'Team Project - Oct 25, 2025'
    }
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Navigation Header */}
      <header className="dashboard-header">
        <div className="header-content">
          {/* Logo */}
          <Link href="/" className="logo">
            <div className="logo-icon">C</div>
            <span className="logo-text">Codify</span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              📚 Courses
            </button>
            <button 
              className={`nav-tab ${activeTab === 'assignments' ? 'active' : ''}`}
              onClick={() => setActiveTab('assignments')}
            >
              📝 Assignments
            </button>
            <button 
              className={`nav-tab ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              📅 Schedule
            </button>
            <button 
              className={`nav-tab ${activeTab === 'announcements' ? 'active' : ''}`}
              onClick={() => setActiveTab('announcements')}
            >
              📢 Announcements
            </button>
          </nav>

          {/* User Profile & Controls */}
          <div className="header-controls">
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="user-profile">
              <div className="user-avatar">👤</div>
              <span className="user-name">Nazmul Hossain</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Dashboard Header */}
          <div className="dashboard-title">
            <h1>Student Dashboard</h1>
            <p>Welcome back! Here's an overview of your courses and assignments.</p>
          </div>

          {/* Courses Grid */}
          {activeTab === 'courses' && (
            <section className="courses-section">
              <div className="section-header">
                <h2>My Courses</h2>
                <span className="course-count">{courses.length} enrolled</span>
              </div>

              <div className="courses-grid">
                {courses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-header">
                      <h3 className="course-name">{course.name}</h3>
                      <span className="course-code">{course.code}</span>
                    </div>
                    
                    <div className="course-info">
                      <p className="instructor">👨‍🏫 {course.instructor}</p>
                      
                      <div className="progress-section">
                        <div className="progress-header">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="course-stats">
                        <div className="stat-item">
                          <span className="stat-number">{course.assignments}</span>
                          <span className="stat-label">Assignments</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">{course.announcements}</span>
                          <span className="stat-label">Announcements</span>
                        </div>
                      </div>

                      <div className="next-deadline">
                        <span className="deadline-label">Next Deadline:</span>
                        <span className="deadline-text">{course.nextDeadline}</span>
                      </div>
                    </div>

                    <div className="course-actions">
                      <button className="btn-view-course">View Course</button>
                      <button className="btn-assignments">Assignments</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Placeholder sections for other tabs */}
          {activeTab === 'assignments' && (
            <section className="assignments-section">
              <h2>All Assignments</h2>
              <div className="placeholder-content">
                <p>📝 Assignment management interface will be implemented here.</p>
                <p>Students will be able to view all assignments across courses, filter by status, and submit work.</p>
              </div>
            </section>
          )}

          {activeTab === 'schedule' && (
            <section className="schedule-section">
              <h2>My Sche
                   dule</h2>
              <div className="placeholder-content">
                <p>📅 Calendar and schedule interface will be implemented here.</p>
                <p>Students will see due dates, class times, and important deadlines.</p>
              </div>
            </section>
          )}

          {activeTab === 'announcements' && (
            <section className="announcements-section">
              <h2>Recent Announcements</h2>
              <div className="placeholder-content">
                <p>📢 Announcements feed will be implemented here.</p>
                <p>Students will see important updates from all their courses.</p>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default StudentDashboard