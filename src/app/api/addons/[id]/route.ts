import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// PATCH /api/addons/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();

  const addon = await prisma.addOn.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.price !== undefined && { price: body.price }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.active !== undefined && { active: body.active }),
    },
  });

  return NextResponse.json(addon);
}
