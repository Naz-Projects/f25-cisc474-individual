import { useAuth0 } from '@auth0/auth0-react';

// Helper to get the backend URL
function getBackendUrl(): string {
  let backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (!backendUrl) {
    backendUrl = (typeof window !== 'undefined' && window.location.hostname.includes('workers.dev'))
      ? 'https://f25-cisc474-individual-xjk9.onrender.com'
      : 'http://localhost:3000';
  }

  return backendUrl;
}

// Hook for authenticated fetching - use this in your components
export function useBackendFetch() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const backendFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const backendUrl = getBackendUrl();

    // Get token if user is authenticated
    let token: string | undefined;
    if (isAuthenticated) {
      try {
        token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    }

    // Add Authorization header if we have a token
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(backendUrl + endpoint, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }

    return response.json();
  };

  return { backendFetch };
}

// Legacy backendFetcher for non-authenticated queries (keep for backward compatibility)
export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return () =>
    fetch(getBackendUrl() + endpoint).then((res) =>
      res.json(),
    );
}

// Mutation helper that uses authentication
export async function mutateBackend<T>(
  getToken: () => Promise<string | undefined>,
  endpoint: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  body?: unknown,
): Promise<T> {
  const backendUrl = getBackendUrl();

  const token = await getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(backendUrl + endpoint, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Failed to ${method} ${endpoint}`);
  }

  return response.json();
}