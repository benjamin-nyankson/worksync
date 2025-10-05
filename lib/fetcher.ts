export const fetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const headers = new Headers(options?.headers);

  const apiKey = localStorage.getItem("worksync_api_key");
  const token = localStorage.getItem("worksync_jwt");

  if (apiKey) headers.set("x-api-key", apiKey);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) throw new Error("Network error");
  return res.json();
};
