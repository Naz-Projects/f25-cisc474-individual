import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { backendFetcher, mutateBackend } from '../integrations/fetcher';

// DTO Types for CreateAssignment component
type AssignmentOut = {
    id: string;
    title: string;
    description: string | null;
    dueDate: string;
    maxPoints: number | null;
    courseId: string;
    courseName: string;
    courseCode: string;
    createdAt: string;
    updatedAt: string;
};

type AssignmentCreateIn = {
    title: string;
    description?: string | null;
    dueDate: string;
    maxPoints?: number | null;
    courseId: string;
};

type CourseOption = {
    id: string;
    title: string;
    courseCode: string;
};

function CreateAssignment({ instructorId }: { instructorId: string }) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newAssignment, setNewAssignment] = useState<AssignmentCreateIn>({
        title: '',
        description: '',
        dueDate: '',
        maxPoints: undefined,
        courseId: '',
    });
    const [assignments, setAssignments] = useState<AssignmentOut[]>([]);
    const [courses, setCourses] = useState<CourseOption[]>([]);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState<AssignmentOut | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<AssignmentCreateIn>({
        title: '',
        description: '',
        dueDate: '',
        maxPoints: undefined,
        courseId: '',
    });
    const queryClient = useQueryClient();
    React.useEffect(() => {
        setMounted(true);
    }, []);
    React.useEffect(() => {
      // Fetch assignments
    const fetchAssignments = fetch(`${import.meta.env.VITE_BACKEND_URL}/assignments`)
        .then((res) => res.json());

    // Fetch courses for this instructor
    const fetchCourses = fetch(`${import.meta.env.VITE_BACKEND_URL}/courses/instructor/${instructorId}`)
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
}, [instructorId]);

    const createMutation = useMutation({
        mutationFn: (newAssignment: AssignmentCreateIn) => {
            return mutateBackend<AssignmentOut>('/assignments', 'POST', {
                ...newAssignment,
                dueDate: new Date(newAssignment.dueDate).toISOString(),
            });
        },
        onSuccess: (data: AssignmentOut) => {
            // Update cache with new assignment
            queryClient.setQueryData(['assignments', data.id], data);

            // Invalidate assignments list to refetch
            queryClient.invalidateQueries({ queryKey: ['assignments'] });

            // Reset form
            setShowCreateForm(false);
            setNewAssignment({
                title: '',
                description: '',
                dueDate: '',
                maxPoints: undefined,
                courseId: '',
            });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<AssignmentCreateIn> }) => {
            return mutateBackend<AssignmentOut>(`/assignments/${id}`, 'PATCH', {
                ...data,
                dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
            });
        },
        onSuccess: (data: AssignmentOut) => {
            // Update cache with updated assignment
            queryClient.setQueryData(['assignments', data.id], data);

            // Invalidate assignments list to refetch
            queryClient.invalidateQueries({ queryKey: ['assignments'] });

            // Reset edit state
            setEditingId(null);
            setEditForm({
                title: '',
                description: '',
                dueDate: '',
                maxPoints: undefined,
                courseId: '',
            });
        },
    });
    

    // Handle search by ID
    const handleSearch = () => {
        if (!searchId) return;

        fetch(`${import.meta.env.VITE_BACKEND_URL}/assignments/${searchId}`)
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
            {/* Create Assignment Button */}
            <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
>
                {showCreateForm ? 'Cancel' : '+ Create New Assignment'}
            </button>
            {/* Create Assignment Form */}
            {showCreateForm && (
                <div style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9'
            }}>
                    <h3>Create New Assignment</h3>

                    {/* Loading State */}
                    {createMutation.isPending ? (
                        <div>Creating assignment...</div>
                    ) : (
                        <>
                            {/* Error State */}
                            {createMutation.isError ? (
                                <div style={{ color: 'red', marginBottom: '15px' }}>
                                    Error creating assignment: {createMutation.error.message}
                                </div>
                            ) : null}

                            {/* Success State */}
                            {createMutation.isSuccess ? (
                                <div style={{ color: 'green', marginBottom: '15px' }}>
                                    Assignment created successfully! ID: {createMutation.data.id}
                                </div>
                            ) : null}

                            <hr />

                            {/* Form Fields */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={newAssignment.title}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                                <textarea
                                    value={newAssignment.description || ''}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Course *</label>
                                <select
                                    required
                                    value={newAssignment.courseId}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, courseId: e.target.value })}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                >
                                    <option value="">Select a course</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.courseCode} - {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Due Date *</label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={newAssignment.dueDate}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Max Points</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={newAssignment.maxPoints || ''}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, maxPoints: e.target.value ? Number(e.target.value) : undefined })}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>

                            {/* Buttons - using onClick instead of form onSubmit */}
                            <button 
                                onClick={() => {
                                    if (newAssignment.title && newAssignment.courseId && newAssignment.dueDate) {
                                        createMutation.mutate(newAssignment);
                                    } else {
                                        alert('Please fill in all required fields');
                                    }
                                }}
                                style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius:
            '4px', cursor: 'pointer', marginRight: '10px' }}
                            >
                                Create Assignment
                            </button>
                            <button 
                                onClick={() => setShowCreateForm(false)}
                                style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            )}

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
            {/* Edit Assignment Form */}
            {editingId && (
                <div style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#fff3cd'
            }}>
                    <h3>Edit Assignment (ID: {editingId})</h3>

                    {/* Loading State */}
                    {updateMutation.isPending ? (
                        <div>Updating assignment...</div>
                    ) : (
                        <>
                            {/* Error State */}
                            {updateMutation.isError ? (
                                <div style={{ color: 'red', marginBottom: '15px' }}>
                                    Error updating assignment: {updateMutation.error.message}
                                </div>
                            ) : null}

                            {/* Success State */}
                            {updateMutation.isSuccess ? (
                                <div style={{ color: 'green', marginBottom: '15px' }}>
                                    Assignment updated successfully!
                                </div>
                            ) : null}

                            <hr />

                            {/* Form Fields */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                                <textarea
                                    value={editForm.description || ''}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px'
            }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Course *</label>
                                <select
                                    required
                                    value={editForm.courseId}
                                    onChange={(e) => setEditForm({ ...editForm, courseId: e.target.value })}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                >
                                    <option value="">Select a course</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.courseCode} - {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Due Date *</label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={editForm.dueDate}
                                    onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Max Points</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={editForm.maxPoints || ''}
                                    onChange={(e) => setEditForm({ ...editForm, maxPoints: e.target.value ? Number(e.target.value) : undefined
            })}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>

                            {/* Buttons */}
                            <button 
                                onClick={() => {
                                    if (editForm.title && editForm.courseId && editForm.dueDate) {
                                        updateMutation.mutate({ id: editingId, data: editForm });
                                    } else {
                                        alert('Please fill in all required fields');
                                    }
                                }}
                                style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius:
            '4px', cursor: 'pointer', marginRight: '10px' }}
                            >
                                Save Changes
                            </button>
                            <button 
                                onClick={() => setEditingId(null)}
                                style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius:
            '4px', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                        </>
                    )}
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
                        <th>Actions</th>
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
                            <td>
                                <button 
                                    onClick={() => {
                                        setEditingId(assignment.id);
                                        setEditForm({
                                            title: assignment.title,
                                            description: assignment.description,
                                            dueDate: new Date(assignment.dueDate).toISOString().slice(0, 16),
                                            maxPoints: assignment.maxPoints,
                                            courseId: assignment.courseId,
                                        });
                                    }}
                                    style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#2196F3', color: 'white', border: 'none',
                borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Edit
                                </button>
                                <button 
                                    style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px',
                cursor: 'pointer' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CreateAssignment;
