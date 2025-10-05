import { NextResponse } from "next/server";
import { mockLeaves, users } from "@/lib/mockDb";
import { randomUUID } from "crypto";
import { Leave } from "@/interface/interface";

export async function GET() {
  return NextResponse.json(mockLeaves);
}

export async function POST(req: Request) {
  const { userId, leaveType, startDate, endDate, reason, noOfDays } =
    await req.json();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const newLeave: Leave = {
    id: randomUUID(),
    userId,
    employeeName: user.name,
    leaveType,
    startDate,
    endDate,
    status: "Pending" as const,
    noOfDays,
    reason,
  };

  mockLeaves.push(newLeave);
  return NextResponse.json(newLeave);
}

 