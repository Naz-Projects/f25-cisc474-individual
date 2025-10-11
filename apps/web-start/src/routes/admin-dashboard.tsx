import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { backendFetcher } from '../integrations/fetcher';
import '../styles/admin-dashboard.css';

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified?: string;
}

// Route definition
export const Route = createFileRoute('/admin-dashboard')({
  component: AdminDashboard,
});

// Main component
function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('manage-students');
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={`admin-dashboard-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Navigation Header */}
      <header className="dashboard-header">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
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

      {/* Main Content Area */}
      <main className="dashboard-content">
        {activeTab === 'manage-students' && <ManageStudents />}
        {activeTab === 'manage-instructors' && <ManageInstructors />}
        {activeTab === 'manage-courses' && <ManageCourses />}
        {activeTab === 'usage-reports' && (
          <div className="placeholder-content">
            <p>📊 Usage Reports Coming Soon...</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="placeholder-content">
            <p>⚙️ Settings Coming Soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}

// ManageStudents component with React Query
function ManageStudents() {
  const [searchId, setSearchId] = useState('');

  // Fetch all users using React Query
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: backendFetcher<User[]>('/users'),
  });

  // Filter students
  const students = users.filter((user) => user.role === 'USER');

  // Handle search by ID
  const { data: searchResult } = useQuery({
    queryKey: ['user', searchId],
    queryFn: backendFetcher<User>(`/users/${searchId}`),
    enabled: searchId.length > 0, // Only run when searchId exists
  });

  if (isLoading) {
    return <div>Loading students...</div>;
  }

  if (error) {
    return <div>Error loading students</div>;
  }

  return (
    <div className="manage-section">
      <h2>Manage Students</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Student ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="search-result">
          <h3>Search Result:</h3>
          <p><strong>Name:</strong> {searchResult.name}</p>
          <p><strong>Email:</strong> {searchResult.email}</p>
          <p><strong>Role:</strong> {searchResult.role}</p>
        </div>
      )}

      {/* All Students List */}
      <h3>All Students ({students.length})</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.emailVerified ? '✅ Verified' : '❌ Not Verified'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ManageCourses component
function ManageCourses() {
  const [searchId, setSearchId] = useState('');

  interface Course {
    id: string;
    title: string;
    description: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    location: string;
  }

  // Fetch all courses
  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: backendFetcher<Course[]>('/courses'),
  });

  // Search specific course
  const { data: searchResult } = useQuery({
    queryKey: ['course', searchId],
    queryFn: backendFetcher<Course>(`/courses/${searchId}`),
    enabled: searchId.length > 0,
  });

  if (isLoading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error loading courses</div>;
  }

  return (
    <div className="manage-section">
      <h2>Manage Courses</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Course ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="search-result">
          <h3>Search Result:</h3>
          <p><strong>Title:</strong> {searchResult.title}</p>
          <p><strong>Description:</strong> {searchResult.description}</p>
          <p><strong>Schedule:</strong> {searchResult.dayOfWeek} {searchResult.startTime} - {searchResult.endTime}</p>
          <p><strong>Location:</strong> {searchResult.location}</p>
        </div>
      )}

      {/* All Courses List */}
      <h3>All Courses ({courses.length})</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Schedule</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.dayOfWeek} {course.startTime}-{course.endTime}</td>
              <td>{course.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ManageInstructors component
function ManageInstructors() {
  const [searchId, setSearchId] = useState('');

  // Fetch all users
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: backendFetcher<User[]>('/users'),
  });

  // Filter instructors
  const instructors = users.filter((user) => user.role === 'INSTRUCTOR');

  // Search specific user
  const { data: searchResult } = useQuery({
    queryKey: ['user', searchId],
    queryFn: backendFetcher<User>(`/users/${searchId}`),
    enabled: searchId.length > 0,
  });

  if (isLoading) {
    return <div>Loading instructors...</div>;
  }

  if (error) {
    return <div>Error loading instructors</div>;
  }

  return (
    <div className="manage-section">
      <h2>Manage Instructors</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Instructor ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="search-result">
          <h3>Search Result:</h3>
          <p><strong>Name:</strong> {searchResult.name}</p>
          <p><strong>Email:</strong> {searchResult.email}</p>
          <p><strong>Role:</strong> {searchResult.role}</p>
        </div>
      )}

      {/* All Instructors List */}
      <h3>All Instructors ({instructors.length})</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.id}>
              <td>{instructor.id}</td>
              <td>{instructor.name}</td>
              <td>{instructor.email}</td>
              <td>{instructor.emailVerified ? '✅ Verified' : '❌ Not Verified'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
