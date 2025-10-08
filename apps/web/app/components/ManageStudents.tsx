'use client'
import React, { useState } from 'react'
function ManageStudents() {
    interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    emailVerified?: string;
    }
    const [students, setStudents] = useState<User[]>([]);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState<User |
    null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch all students on component mount
    React.useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        .then((res) => res.json())
        .then((data: User[]) => {  
            const studentUsers = data.filter((user) =>  // Remove
            user.role === 'USER');
            setStudents(studentUsers);
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
            alert('User not found');
        });
    };

    if (loading) {
        return <div>Loading students...</div>;
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
            <button onClick={handleSearch}>Search</button>
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
                {students.map((student: any) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.emailVerified ? '✅ Verified' :
                            '❌ Not Verified'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}

export default ManageStudents;