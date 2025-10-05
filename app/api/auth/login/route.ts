import { NextResponse } from "next/server";
import { users } from "@/lib/mockDb";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({
    apiKey: "mock-api-key",
    token: "mock-jwt-token",
    role: user.role,
    user,
  });
}
