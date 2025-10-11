'use client'
import React, { useState } from 'react'

function CreateAssignment() {
    interface Assignment {
        id: string;
        title: string;
        description: string;
        dueDate: string;
        maxPoints: number;
        courseId: string;
    }

    interface Course {
        id: string;
        title: string;
    }

    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState<Assignment | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted on client
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch assignments and courses on component mount
    React.useEffect(() => {
        // Fetch assignments
        const fetchAssignments = fetch(`${process.env.NEXT_PUBLIC_API_URL}/assignments`)
            .then((res) => res.json());

        // Fetch courses
        const fetchCourses = fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`)
            .then((res) => res.json());

        // Wait for both to complete
        Promise.all([fetchAssignments, fetchCourses])
            .then(([assignmentsData, coursesData]) => {
                console.log('Assignments:', assignmentsData);
                console.log('Courses:', coursesData);
                setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
                setCourses(Array.isArray(coursesData) ? coursesData : []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // Handle search by ID
    const handleSearch = () => {
        if (!searchId) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/assignments/${searchId}`)
            .then((res) => res.json())
            .then((data) => {
                setSearchResult(data);
            })
            .catch(() => {
                setSearchResult(null);
                alert('Assignment not found');
            });
    };

    // Helper function to get course title by courseId
    const getCourseName = (courseId: string) => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.title : 'Unknown Course';
    };

    if (!mounted || loading) {
        return <div>Loading assignments...</div>;
    }

    return (
        <div className="manage-section">
            <h2>Manage Assignments</h2>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter Assignment ID..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Search Result */}
            {searchResult && (
                <div className="search-result">
                    <h3>Search Result:</h3>
                    <p><strong>Title:</strong> {searchResult.title}</p>
                    <p><strong>Description:</strong> {searchResult.description}</p>
                    <p><strong>Course:</strong> {getCourseName(searchResult.courseId)}</p>
                    <p><strong>Due Date:</strong> {new Date(searchResult.dueDate).toLocaleDateString()}</p>
                    <p><strong>Max Points:</strong> {searchResult.maxPoints}</p>
                </div>
            )}

            {/* All Assignments List */}
            <h3>All Assignments ({assignments.length})</h3>
            <table className="students-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Course</th>
                        <th>Due Date</th>
                        <th>Max Points</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment) => (
                        <tr key={assignment.id}>
                            <td>{assignment.id}</td>
                            <td>{assignment.title}</td>
                            <td>{getCourseName(assignment.courseId)}</td>
                            <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                            <td>{assignment.maxPoints || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CreateAssignment;
