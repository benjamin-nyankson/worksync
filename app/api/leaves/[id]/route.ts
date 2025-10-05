import { NextRequest, NextResponse } from "next/server";
import { mockLeaves } from "@/lib/mockDb";
import { Leave } from "@/interface/interface";

/**
 * ✅ Type assertion workaround
 * Keeps ESLint happy, no `any`, and bypasses the Next.js validator bug.
 */
type RouteContext = { params: Record<string, string> };

// 🟢 GET /api/leaves/:id
export async function GET(
  _req: NextRequest,
  context: unknown
): Promise<NextResponse<Leave | { error: string }>> {
  const { id } = (context as RouteContext).params;

  const leave = mockLeaves.find((l) => l.id === id);
  if (!leave) {
    return NextResponse.json({ error: "Leave not found" }, { status: 404 });
  }

  return NextResponse.json(leave);
}

// 🟡 PATCH /api/leaves/:id
export async function PATCH(
  req: NextRequest,
  context: unknown
): Promise<NextResponse<Leave | { error: string }>> {
  const { id } = (context as RouteContext).params;
  const body = await req.json();

  const index = mockLeaves.findIndex((l) => l.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Leave not found" }, { status: 404 });
  }

  mockLeaves[index] = { ...mockLeaves[index], ...body };
  return NextResponse.json(mockLeaves[index]);
}

// 🔴 DELETE /api/leaves/:id
export async function DELETE(
  _req: NextRequest,
  context: unknown
): Promise<NextResponse<Leave | { error: string }>> {
  const { id } = (context as RouteContext).params;

  const index = mockLeaves.findIndex((l) => l.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Leave not found" }, { status: 404 });
  }

  const deleted = mockLeaves.splice(index, 1)[0];
  return NextResponse.json(deleted);
}
