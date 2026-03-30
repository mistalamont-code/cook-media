/**
 * One-time setup script to create:
 * 1. "Cook Media" root folder in Google Drive
 * 2. "Cook Media — Invoices" spreadsheet
 * 3. "Cook Media — Contracts" spreadsheet
 *
 * Run: npx tsx scripts/setup-google.ts
 */

import "dotenv/config";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oauth2Client });
const sheets = google.sheets({ version: "v4", auth: oauth2Client });

async function createDriveFolder() {
  console.log("\n📁 Creating 'Cook Media' root folder in Google Drive...");

  const res = await drive.files.create({
    requestBody: {
      name: "Cook Media",
      mimeType: "application/vnd.google-apps.folder",
    },
    fields: "id, webViewLink",
  });

  console.log(`   Folder ID: ${res.data.id}`);
  console.log(`   Link: ${res.data.webViewLink}`);
  return res.data.id!;
}

async function createSheet(title: string, headers: string[]) {
  console.log(`\n📊 Creating '${title}' spreadsheet...`);

  const res = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title },
      sheets: [
        {
          properties: { title: "Sheet1" },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: headers.map((h) => ({
                    userEnteredValue: { stringValue: h },
                    userEnteredFormat: {
                      textFormat: { bold: true },
                      backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 },
                    },
                  })),
                },
              ],
            },
          ],
        },
      ],
    },
  });

  const id = res.data.spreadsheetId!;
  console.log(`   Sheet ID: ${id}`);
  console.log(`   Link: https://docs.google.com/spreadsheets/d/${id}`);
  return id;
}

async function main() {
  console.log("🚀 Setting up Google Workspace for Cook Media...\n");

  // 1. Drive folder
  const folderId = await createDriveFolder();

  // 2. Invoices sheet
  const invoicesId = await createSheet("Cook Media — Invoices", [
    "Date",
    "Client",
    "Service",
    "Package",
    "Amount",
    "Retainer",
    "Balance",
    "Status",
    "Paid Date",
  ]);

  // 3. Contracts sheet
  const contractsId = await createSheet("Cook Media — Contracts", [
    "Date",
    "Client",
    "Service",
    "Contract Type",
    "Status",
    "Signed Date",
    "Drive Link",
  ]);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("✅ Setup complete! Add these to your .env file:\n");
  console.log(`GOOGLE_DRIVE_ROOT_FOLDER_ID="${folderId}"`);
  console.log(`GOOGLE_INVOICES_SHEET_ID="${invoicesId}"`);
  console.log(`GOOGLE_CONTRACTS_SHEET_ID="${contractsId}"`);
  console.log("\n" + "=".repeat(60));
}

main().catch((err) => {
  console.error("❌ Setup failed:", err.message);
  process.exit(1);
});
