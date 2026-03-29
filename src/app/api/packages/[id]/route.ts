import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// PATCH /api/packages/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();

  const pkg = await prisma.package.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.price !== undefined && { price: body.price }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.deliverables !== undefined && { deliverables: body.deliverables }),
      ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
      ...(body.active !== undefined && { active: body.active }),
    },
  });

  return NextResponse.json(pkg);
}
