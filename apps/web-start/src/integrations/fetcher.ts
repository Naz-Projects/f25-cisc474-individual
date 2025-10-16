export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return () => {
    // Determine backend URL based on environment
    let backendUrl = import.meta.env.VITE_BACKEND_URL;

    // If running in Cloudflare Workers (production), use production backend
    if (!backendUrl && typeof window !== 'undefined') {
      backendUrl = window.location.hostname.includes('workers.dev') ||
              window.location.hostname.includes('pages.dev')
        ? 'https://f25-cisc474-individual-xjk9.onrender.com'
        : 'http://localhost:3000';
    }

    // Fallback to localhost for development
    backendUrl = backendUrl || 'http://localhost:3000';

    return fetch(backendUrl + endpoint).then((res) => res.json());
  };
}
