import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import '../styles/instructor-dashboard.css';
import CreateAssignment from '../components/CreateAssignment';
import { backendFetcher } from '../integrations/fetcher';
import { useQuery } from '@tanstack/react-query';
export const Route = createFileRoute('/instructor-dashboard')({
  component: InstructorDashboard,
});
interface Assignment {
  id: string;
  title: string;
  description: string | null;
  dueDate: string;
  maxPoints: number | null;
  courseId: string;
}
interface Announcement {
  id: string;
  title: string;
  content: string;
  courseId: string;
  instructorId: string;
  createdAt: string;
}

interface Instructor {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
}

interface Course {
  id: string;
  title: string;
  courseCode: string;
  description: string | null;
  instructorID: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  location: string;
  instructor: Instructor;
  assignments: Assignment[];
  announcements: Announcement[];
  _count: {
    enrollments: number;
    assignments: number;
  };
}
function InstructorDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('courses');
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const instructorId = 'instructor_bart_003';

  const { data: coursesData, isLoading, error } = useQuery({
    queryKey: ['instructorCourses', instructorId],
    queryFn: backendFetcher<Course[]>(`/courses/instructor/${instructorId}`),
  });

  // Transform backend data for the UI
  const courses = coursesData?.map((course) => ({
    id: course.id,
    name: course.title,
    code: course.courseCode,
    instructor: course.instructor.name || 'Unknown',
    enrolledStudents: course._count.enrollments,
    assignments: course._count.assignments,
    pendingGrades: 0, // We'll add this later when we have submissions
    announcements: course.announcements.length,
    nextDeadline: course.assignments[0]
      ? `${course.assignments[0].title} Due - ${new Date(course.assignments[0].dueDate).toLocaleDateString()}`
      : 'No upcoming deadlines',
  })) || [];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!mounted) {
    return null;
  }
  if (isLoading) {
    return (
      <div className="instructor-dashboard-container">
        <p>Loading Dr. Bart's courses...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="instructor-dashboard-container">
        <p>Error loading courses. Please try again.</p>
      </div>
    );
  }

  return (
    <div className={`instructor-dashboard-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Navigation Header */}
      <header className="dashboard-header">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
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

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Dashboard Header */}
          <div className="dashboard-title">
            <h1>Instructor Dashboard</h1>
            <p>Manage your courses, assignments, and student progress from here.</p>
          </div>

          {/* Courses Grid */}
          {activeTab === 'courses' && (
            <section className="courses-section">
              <div className="section-header">
                <h2>My Courses</h2>
                <span className="course-count">{courses.length} courses</span>
              </div>

              <div className="courses-grid">
                {courses.map((course) => (
                  <div key={course.id} className="course-card instructor-view">
                    <div className="course-header">
                      <h3 className="course-name">{course.name}</h3>
                      <span className="course-code">{course.code}</span>
                    </div>

                    <div className="course-info">
                      <p className="instructor">👨‍🏫 {course.instructor}</p>

                      <div className="course-stats">
                        <div className="stat-item">
                          <span className="stat-number">
                            {course.enrolledStudents}
                          </span>
                          <span className="stat-label">Students</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">{course.assignments}</span>
                          <span className="stat-label">Assignments</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">
                            {course.pendingGrades}
                          </span>
                          <span className="stat-label">Pending Grades</span>
                        </div>
                      </div>

                      <div className="next-deadline">
                        <span className="deadline-label">Next Deadline:</span>
                        <span className="deadline-text">{course.nextDeadline}</span>
                      </div>
                    </div>

                    <div className="course-actions">
                      <button className="btn-manage-course">Manage Course</button>
                      <button className="btn-view-grades">View Grades</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Placeholder sections for other tabs */}
          {activeTab === 'create-assignment' && <CreateAssignment />}

          {activeTab === 'manage' && (
            <section className="manage-section">
              <h2>Course Management</h2>
              <div className="placeholder-content">
                <p>⚙️ Course management interface will be implemented here.</p>
                <p>
                  Instructors will manage course settings, enrolled students, and
                  course materials.
                </p>
              </div>
            </section>
          )}

          {activeTab === 'grade' && (
            <section className="grade-section">
              <h2>Grade Submissions</h2>
              <div className="placeholder-content">
                <p>📊 Grading interface will be implemented here.</p>
                <p>
                  Instructors will review submissions, provide feedback, and assign
                  grades.
                </p>
              </div>
            </section>
          )}

          {activeTab === 'announcements' && (
            <section className="announcements-section">
              <h2>Send Announcement</h2>
              <div className="placeholder-content">
                <p>📢 Announcement creation interface will be implemented here.</p>
                <p>
                  Instructors will compose and send announcements to their courses.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
