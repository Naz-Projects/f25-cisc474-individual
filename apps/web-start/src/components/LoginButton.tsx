import { useAuth0 } from '@auth0/auth0-react';

export function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return (
        <button 
        onClick={() => loginWithRedirect()}
        style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
        }}
        >
        Log In
        </button>
    );
}