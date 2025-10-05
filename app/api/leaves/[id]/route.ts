import { NextResponse } from "next/server";
import { mockLeaves } from "@/lib/mockDb";
import type { Leave } from "@/interface/interface";

// ✅ Correct: context contains params synchronously
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const leave = mockLeaves.find((l) => l.id === params.id);
  if (!leave) {
    return NextResponse.json({ error: "Leave not found" }, { status: 404 });
  }
  return NextResponse.json(leave);
}

// ✅ Update or patch a leave request
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  const index = mockLeaves.findIndex((l) => l.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Leave not found" }, { status: 404 });
  }

  mockLeaves[index] = { ...mockLeaves[index], ...body };

  return NextResponse.json(mockLeaves[index]);
}

// ✅ Delete a leave
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const index = mockLeaves.findIndex((l) => l.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Leave not found" }, { status: 404 });
  }

  const deleted = mockLeaves.splice(index, 1)[0];
  return NextResponse.json(deleted);
}
