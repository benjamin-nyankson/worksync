import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id: string;
  email: string;
  role: "Admin" | "User";
  exp: number;
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  return decoded.exp * 1000 < Date.now();
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user_data");
  window.location.href = "/login"; // redirect to login
}
