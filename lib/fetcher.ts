export const fetcher = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const headers = new Headers(options?.headers);

  const apiKey = localStorage.getItem("api_key");
  const token = localStorage.getItem("token");

  if (apiKey) headers.set("x-api-key", apiKey);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}${endpoint}`, { ...options, headers });

  if (!res.ok) throw new Error("Network error");
  return res.json();
};
