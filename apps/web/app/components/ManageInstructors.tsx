'use client'
import React, { useState } from 'react'

function ManageInstructors() {
    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
        emailVerified?: string;
    }

    const [instructors, setInstructors] =
    useState<User[]>([]);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState<User |
    null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch all instructors on component mount
    React.useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        .then((res) => res.json())
        .then((data: User[]) => {
            // Filter only users with role "INSTRUCTOR"
            const instructorUsers = data.filter((user) =>
                user.role === 'INSTRUCTOR');
                setInstructors(instructorUsers);
                setLoading(false);
        });
    }, []);

      // Handle search by ID
    const handleSearch = () => {
        if (!searchId) return;


    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${searchId}`)
        .then((res) => res.json())
        .then((data) => {
            setSearchResult(data);
        })
        .catch(() => {
            setSearchResult(null);
            alert('Instructor not found');
        });
    };

    if (loading) {
        return <div>Loading instructors...</div>;
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
                    onChange={(e) =>
                        setSearchId(e.target.value)}
            />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Search Result */}
            {searchResult && (
                <div className="search-result">
                    <h3>Search Result:</h3>
                    <p><strong>Name:</strong>
                    {searchResult.name}</p>
                    <p><strong>Email:</strong>
                    {searchResult.email}</p>
                    <p><strong>Role:</strong>
                    {searchResult.role}</p>
                </div>
            )}

            {/* All Instructors List */}
            <h3>All Instructors ({instructors.length})</h3>
            <table className="students-table">
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
                            <td>{instructor.emailVerified ?'✅ Verified' : '❌ Not Verified'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageInstructors;