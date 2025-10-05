import { NextResponse } from "next/server";
import { users } from "@/lib/mockDb";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const exists = users.find((u) => u.email === email);

  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = {
    id: randomUUID(),
    name,
    email,
    password,
    role: "user" as const,
  };
  users.push(newUser);

  return NextResponse.json({
    apiKey: "mock-api-key",
    token: "mock-jwt-token",
    role: newUser.role,
  });
}
