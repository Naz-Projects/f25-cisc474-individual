'use client'
import React, { useState } from 'react'
function ManageCourses() {
    interface Course {
        id: string;
        title: string;
        description: string;
        instructorID: string;
        dayOfWeek: string;
        startTime: string;
        endTime: string;
        location: string;
    }

    const [courses, setCourses] = useState<Course[]>([]);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState<Course |
    null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch all courses on component mount
    React.useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`)
        .then((res) => res.json())
        .then((data) => {
            setCourses(data);
            setLoading(false);
        });
    }, []);

    // Handle search by ID
    const handleSearch = () => {
        if (!searchId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${searchId}`)
        .then((res) => res.json())
        .then((data) => {
            setSearchResult(data);
        })
        .catch(() => {
            setSearchResult(null);
            alert('Course not found');
        });
    };

    if (loading) {
        return <div>Loading courses...</div>;
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
            <button onClick={handleSearch}>Search</button>
        </div>

        {/* Search Result */}
        {searchResult && (
            <div className="search-result">
                <h3>Search Result:</h3>
                <p><strong>Title:</strong> {searchResult.title}</p>
                <p><strong>Description:</strong>
                {searchResult.description}</p>
                <p><strong>Schedule:</strong>
                {searchResult.dayOfWeek} {searchResult.startTime} -
                {searchResult.endTime}</p>
                <p><strong>Location:</strong>
                {searchResult.location}</p>
            </div>
        )}

        {/* All Courses List */}
        <h3>All Courses ({courses.length})</h3>
        <table className="students-table">
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
                <td>{course.dayOfWeek}
                {course.startTime}-{course.endTime}</td>
                <td>{course.location}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
}

export default ManageCourses;