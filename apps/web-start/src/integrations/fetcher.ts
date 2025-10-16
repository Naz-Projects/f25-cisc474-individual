export function backendFetcher<T>(endpoint: string): () => 
  Promise<T> {
    return () => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL ||
  'http://localhost:3000';
      return fetch(backendUrl + endpoint).then((res) =>
  res.json());
    };
  }