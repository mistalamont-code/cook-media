/**
 * Set up the full Google Drive folder structure for Cook Media.
 *
 * Cook Media/
 * ├── 2026/
 * │   └── (client folders created automatically when clients are added)
 * ├── Invoices/
 * ├── Contracts/
 * ├── Proposals/
 * ├── Templates/
 * │   ├── Contract Templates/
 * │   └── Proposal Templates/
 * └── Deliverables/
 *     ├── Weddings/
 *     ├── Events/
 *     └── Speaking/
 *
 * Run: npx tsx scripts/setup-drive-folders.ts
 */

import "dotenv/config";
import { google } from "googleapis";

const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID!;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oauth2Client });

async function createFolder(name: string, parentId: string): Promise<string> {
  // Check if folder already exists
  const existing = await drive.files.list({
    q: `name='${name}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id)",
    pageSize: 1,
  });

  if (existing.data.files && existing.data.files.length > 0) {
    console.log(`   ✓ ${name} (already exists)`);
    return existing.data.files[0].id!;
  }

  const res = await drive.files.create({
    requestBody: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId],
    },
    fields: "id",
  });

  console.log(`   + ${name}`);
  return res.data.id!;
}

async function main() {
  console.log("📁 Setting up Cook Media Drive folder structure...\n");
  console.log("Cook Media/");

  // Year folder
  const year = new Date().getFullYear().toString();
  const yearId = await createFolder(year, ROOT_FOLDER_ID);

  // Top-level organizational folders
  const invoicesId = await createFolder("Invoices", ROOT_FOLDER_ID);
  const contractsId = await createFolder("Contracts", ROOT_FOLDER_ID);
  const proposalsId = await createFolder("Proposals", ROOT_FOLDER_ID);
  const templatesId = await createFolder("Templates", ROOT_FOLDER_ID);
  const deliverablesId = await createFolder("Deliverables", ROOT_FOLDER_ID);

  // Template subfolders
  console.log("\n   Templates/");
  await createFolder("Contract Templates", templatesId);
  await createFolder("Proposal Templates", templatesId);

  // Deliverables by service type
  console.log("\n   Deliverables/");
  await createFolder("Weddings", deliverablesId);
  await createFolder("Events", deliverablesId);
  await createFolder("Speaking", deliverablesId);

  console.log("\n" + "=".repeat(50));
  console.log("✅ Drive folder structure is ready!\n");
  console.log("Your folder: https://drive.google.com/drive/folders/" + ROOT_FOLDER_ID);
  console.log("\nWhen a client is booked, the app will auto-create:");
  console.log(`  Cook Media / ${year} / [Client Name] / Proposals, Contracts, Deliverables`);
  console.log("=".repeat(50));
}

main().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
