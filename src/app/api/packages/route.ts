import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ServiceType } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/auth";

// GET /api/packages — Admin: list packages
export async function GET(request: NextRequest) {
  const serviceType = request.nextUrl.searchParams.get("serviceType");
  const activeOnly = request.nextUrl.searchParams.get("activeOnly") !== "false";

  const where: Record<string, unknown> = {};
  if (activeOnly) where.active = true;
  if (serviceType && Object.values(ServiceType).includes(serviceType as ServiceType)) {
    where.serviceType = serviceType;
  }

  const packages = await prisma.package.findMany({
    where,
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(packages);
}

// POST /api/packages — Admin: create package
export async function POST(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();

  const pkg = await prisma.package.create({
    data: {
      serviceType: body.serviceType,
      name: body.name,
      price: body.price,
      description: body.description || null,
      deliverables: body.deliverables || [],
      sortOrder: body.sortOrder || 0,
    },
  });

  return NextResponse.json(pkg, { status: 201 });
}
