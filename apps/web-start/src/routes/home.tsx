import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from '../components/LogoutButton';

export const Route = createFileRoute('/home')({
component: Home,
});

function Home() {
const { user, isLoading } = useAuth0();

if (isLoading) {
    return <div>Loading...</div>;
}

return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
    <h1>Welcome to Your Dashboard!</h1>

    <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h2>Your Profile</h2>
        {user && (
        <div>
            <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
            <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
            <p><strong>Email Verified:</strong> {user.email_verified ? 'Yes' : 'No'}</p>
        </div>
        )}
    </div>

    <div style={{ marginTop: '30px' }}>
        <h2>Quick Links</h2>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <Link to="/dashboard" style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', textDecoration: 'none',
borderRadius: '4px' }}>
            Student Dashboard
        </Link>
        <Link to="/instructor-dashboard" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', 
textDecoration: 'none', borderRadius: '4px' }}>
            Instructor Dashboard
        </Link>
        <Link to="/admin-dashboard" style={{ padding: '10px 20px', backgroundColor: '#FF9800', color: 'white', textDecoration: 
'none', borderRadius: '4px' }}>
            Admin Dashboard
        </Link>
        </div>
    </div>

    <div style={{ marginTop: '30px' }}>
        <LogoutButton />
    </div>
    </div>
);
}