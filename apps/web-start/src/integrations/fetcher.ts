
export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return () =>
    fetch(import.meta.env.VITE_BACKEND_URL + endpoint).then((res) =>
      res.json(),
    );
}


export async function mutateBackend<T>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  body?: unknown,
): Promise<T> {
  // Use environment variable, or detect production vs local
  let backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (!backendUrl) {
    backendUrl = (typeof window !== 'undefined' && window.location.hostname.includes('workers.dev'))
      ? 'https://f25-cisc474-individual-xjk9.onrender.com'
      : 'http://localhost:3000';
  }

  const response = await fetch(backendUrl + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Failed to ${method} ${endpoint}`);
  }

  return response.json();
}

