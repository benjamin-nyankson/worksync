import { NextResponse } from "next/server";
import { mockLeaves } from "@/lib/mockDb";

type Params = { params: { id: string } };

export async function PATCH(req: Request, { params }: Params) {
  const { id } = params;
  const body = await req.json();

  const leaveIndex = mockLeaves.findIndex((l) => l.id === id);
  if (leaveIndex === -1) {
    return NextResponse.json({ error: "Leave not found" }, { status: 404 });
  }

  // merge updates into existing leave
  mockLeaves[leaveIndex] = {
    ...mockLeaves[leaveIndex],
    ...body,
  };

  return NextResponse.json(mockLeaves[leaveIndex]);
}


export async function DELETE(_: Request, { params }: Params) {
  const { id } = params;

  const leaveIndex = mockLeaves.findIndex((l) => l.id === id);
  if (leaveIndex === -1) {
    return NextResponse.json({ error: "Leave not found" }, { status: 404 });
  }

  const deleted = mockLeaves.splice(leaveIndex, 1)[0];
  return NextResponse.json({ message: "Leave deleted", deleted });
}
