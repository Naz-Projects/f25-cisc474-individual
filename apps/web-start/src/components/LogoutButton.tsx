import { useAuth0 } from '@auth0/auth0-react';

  export function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <button 
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
            }}
        >
        Log Out
        </button>
    );
}