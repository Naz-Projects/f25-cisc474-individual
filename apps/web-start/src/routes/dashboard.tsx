import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { backendFetcher } from '../integrations/fetcher';
import '../styles/dashboard.css';

// Type definitions for our data
interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  maxPoints: number | null;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface Instructor {
  id: string;
  name: string;
  email: string;
}

interface Course {
  id: string;
  title: string;
  courseCode: string;
  description: string | null;
  instructor: Instructor;
  assignments: Assignment[];
  announcements: Announcement[];
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  location: string;
  _count: {
    enrollments: number;
  };
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: string;
  enrolledAt: string;
  course: Course;
}

export const Route = createFileRoute('/dashboard')({
  component: StudentDashboard,
});

function StudentDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('courses');

  // TODO: In production, get userId from authentication
  // For now, we'll use the seeded user ID
  const userId = 'user_nazmul_001';

  // Fetch user's enrolled courses from backend
  const { data: enrollments, isLoading, error } = useQuery({
    queryKey: ['userCourses', userId],
    queryFn: backendFetcher<Enrollment[]>(`/enrollments/user/${userId}/courses`),
  });

  // Transform backend data to match our UI format
  const courses = enrollments?.map(enrollment => {
    const course = enrollment.course;
    const nextAssignment = course.assignments[0]; // Already sorted by dueDate

    return {
      id: course.id,
      name: course.title,
      courseCode: enrollment.course.courseCode,
      instructor: course.instructor.name,
      progress: 0, // TODO: Calculate based on submitted assignments
      assignments: course.assignments.length,
      announcements: course.announcements.length,
      nextDeadline: nextAssignment
        ? `${nextAssignment.title} - ${formatDate(nextAssignment.dueDate)}`
        : 'No upcoming assignments'
    };
  }) || [];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  // Helper function to format dates nicely
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className={`dashboard-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <h2>Loading your courses...</h2>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`dashboard-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
          <h2>Error loading courses</h2>
          <p>Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Navigation Header */}
      <header className="dashboard-header">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
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
                      <span className="course-code">{course.courseCode}</span>
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
              <h2>My Schedule</h2>
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
  );
}
