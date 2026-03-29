import { PrismaClient, ServiceType } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.proposalAddOn.deleteMany();
  await prisma.proposal.deleteMany();
  await prisma.addOn.deleteMany();
  await prisma.package.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.client.deleteMany();

  // ─── Wedding Packages ───────────────────────────────
  await prisma.package.createMany({
    data: [
      {
        serviceType: ServiceType.WEDDING,
        name: "Wedding Package 1 — Full Coverage",
        price: 300000,
        deliverables: [
          "All-day photography (2 photographers)",
          "Highlight video with drone footage",
          "Rehearsal dinner coverage",
          "Ceremony livestream",
          "Engagement session",
        ],
        sortOrder: 1,
      },
      {
        serviceType: ServiceType.WEDDING,
        name: "Wedding Package 2 — Photo & Video",
        price: 200000,
        deliverables: [
          "All-day photography (2 photographers)",
          "Engagement session",
          "Highlight video",
        ],
        sortOrder: 2,
      },
      {
        serviceType: ServiceType.WEDDING,
        name: "Wedding Package 3 — Photography",
        price: 150000,
        deliverables: [
          "6-hour photography (1 photographer)",
          "Engagement session",
        ],
        sortOrder: 3,
      },
    ],
  });

  // ─── Wedding Add-ons ────────────────────────────────
  await prisma.addOn.createMany({
    data: [
      {
        serviceType: ServiceType.WEDDING,
        name: "HD Livestreaming w/ Pro Sound",
        price: 35000,
      },
      {
        serviceType: ServiceType.WEDDING,
        name: "Family Portraits Session",
        price: 20000,
      },
      {
        serviceType: ServiceType.WEDDING,
        name: "Wedding Day Details & Prep Coverage",
        price: 20000,
      },
      {
        serviceType: ServiceType.WEDDING,
        name: "Rehearsal Coverage",
        price: 20000,
      },
      {
        serviceType: ServiceType.WEDDING,
        name: "Engagement Session (Standalone)",
        price: 20000,
      },
    ],
  });

  // ─── Placeholder packages for other divisions ──────
  await prisma.package.create({
    data: {
      serviceType: ServiceType.LIVE_SOUND,
      name: "Live Sound — Standard Event",
      price: 0,
      deliverables: [
        "Full PA system",
        "Sound engineer for event duration",
        "Setup and teardown",
      ],
      sortOrder: 1,
      description: "Pricing TBD — configure in Settings",
    },
  });

  await prisma.package.create({
    data: {
      serviceType: ServiceType.SPEAKING_BOOK,
      name: "Speaking Engagement — Standard",
      price: 0,
      deliverables: [
        "Keynote presentation",
        "Q&A session",
        "Signed copy of DREAM/BIG",
      ],
      sortOrder: 1,
      description: "Pricing TBD — configure in Settings",
    },
  });

  console.log("Seed complete.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
