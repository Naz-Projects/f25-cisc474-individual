import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { backendFetcher, mutateBackend } from '../integrations/fetcher';
import { useAuth0 } from '@auth0/auth0-react';
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
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState<AssignmentOut | null>(null);
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
    // Only use Auth0 on client side
    const auth0Context = typeof window !== 'undefined' ? useAuth0() : { getAccessTokenSilently: async () => undefined };
    const { getAccessTokenSilently } = auth0Context;
    const getToken = async () => {
        try {
            return await getAccessTokenSilently({
            authorizationParams: {
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            },
            });
        } catch (error) {
            console.error('Error getting token:', error);
            return undefined;
        }
    };
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch assignments using React Query
    const { data: assignmentsData = [], isLoading: assignmentsLoading } = useQuery({
        queryKey: ['assignments'],
        queryFn: backendFetcher<AssignmentOut[]>('/assignments'),
        initialData: [],
    });

    // Fetch courses using React Query
    const { data: coursesData = [], isLoading: coursesLoading } = useQuery({
        queryKey: ['courses', 'instructor', instructorId],
        queryFn: backendFetcher<CourseOption[]>(`/courses/instructor/${instructorId}`),
        initialData: [],
    });

    // Update local state when data changes

    const createMutation = useMutation({
        mutationFn: (newAssignment: AssignmentCreateIn) => {
            return mutateBackend<AssignmentOut>(getToken, '/assignments', 'POST', {
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
            return mutateBackend<AssignmentOut>(getToken, `/assignments/${id}`, 'PATCH', {
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

    const deleteMutation = useMutation({
        mutationFn: (id: string) => {
            return mutateBackend<void>(getToken, `/assignments/${id}`, 'DELETE');
        },
        onSuccess: async (_, deletedId) => {
            // Optimistically update the cache by removing the deleted assignment
            queryClient.setQueryData<AssignmentOut[]>(['assignments'], (oldData) => {
                if (!oldData) return [];
                return oldData.filter((assignment) => assignment.id !== deletedId);
            });

            // Force an immediate refetch instead of just invalidating
            await queryClient.refetchQueries({ queryKey: ['assignments'] });
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
        const course = coursesData.find(c => c.id === courseId);
        return course ? course.title : 'Unknown Course';
    };

    if (!mounted || assignmentsLoading || coursesLoading) {
        return <div>Loading assignments...</div>;
    }

    return (
        <div className="manage-section" style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '25px' }}>Manage Assignments</h2>
            {/* Create Assignment Button */}
            <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                style={{ marginBottom: '30px', padding: '12px 24px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
>
                {showCreateForm ? 'Cancel' : '+ Create New Assignment'}
            </button>
            {/* Create Assignment Form */}
            {showCreateForm && (
                <div style={{ border: '1px solid #ddd', padding: '30px', marginBottom: '30px', borderRadius: '8px', backgroundColor: '#f9f9f9'
            }}>
                    <h3 style={{ marginBottom: '20px' }}>Create New Assignment</h3>

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
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={newAssignment.title}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Description</label>
                                <textarea
                                    value={newAssignment.description || ''}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px', fontSize: '14px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Course *</label>
                                <select
                                    required
                                    value={newAssignment.courseId}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, courseId: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' }}
                                >
                                    <option value="">Select a course</option>
                                    {coursesData.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.courseCode} - {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Due Date *</label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={newAssignment.dueDate}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Max Points</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={newAssignment.maxPoints || ''}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, maxPoints: e.target.value ? Number(e.target.value) : undefined })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' }}
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
                <div style={{ border: '1px solid #ddd', padding: '30px', marginBottom: '30px', borderRadius: '8px', backgroundColor: '#fff3cd'
            }}>
                    <h3 style={{ marginBottom: '20px' }}>Edit Assignment (ID: {editingId})</h3>

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
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Description</label>
                                <textarea
                                    value={editForm.description || ''}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px', fontSize: '14px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Course *</label>
                                <select
                                    required
                                    value={editForm.courseId}
                                    onChange={(e) => setEditForm({ ...editForm, courseId: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' }}
                                >
                                    <option value="">Select a course</option>
                                    {coursesData.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.courseCode} - {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Due Date *</label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={editForm.dueDate}
                                    onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Max Points</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={editForm.maxPoints || ''}
                                    onChange={(e) => setEditForm({ ...editForm, maxPoints: e.target.value ? Number(e.target.value) : undefined })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' }}
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
            <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '40px' }}>
                <h3 style={{ marginTop: '0', marginBottom: '20px' }}>All Assignments ({assignmentsData.length})</h3>
                <table className="students-table" style={{ marginBottom: '0', border: '1px solid #ddd', borderCollapse: 'collapse', width: '100%', backgroundColor: 'white' }}>
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
                    {assignmentsData.map((assignment) => (

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
                                    onClick={() => {
                                        if (window.confirm(`Are you sure you want to delete "${assignment.title}"? This action cannot be undone.`)) {
                                            deleteMutation.mutate(assignment.id);
                                        }
                                    }}
                                    disabled={deleteMutation.isPending}
                                    style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor:
                                'pointer', opacity: deleteMutation.isPending ? 0.6 : 1 }}
                                >
                                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default CreateAssignment;