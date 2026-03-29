import { google } from "googleapis";
import { getAuthenticatedClient } from "./auth";

const INVOICES_SHEET_ID = process.env.GOOGLE_INVOICES_SHEET_ID;
const CONTRACTS_SHEET_ID = process.env.GOOGLE_CONTRACTS_SHEET_ID;

interface InvoiceRow {
  date: string;
  clientName: string;
  serviceType: string;
  packageName: string;
  amount: string;
  retainer: string;
  balance: string;
  status: string;
  paidDate?: string;
}

interface ContractRow {
  date: string;
  clientName: string;
  serviceType: string;
  contractType: string;
  status: string;
  signedDate?: string;
  driveLink?: string;
}

/** Append a row to the Invoices sheet */
export async function appendInvoiceRow(row: InvoiceRow): Promise<boolean> {
  const auth = getAuthenticatedClient();

  if (!auth || !INVOICES_SHEET_ID) {
    console.log(`[Sheets Stub] Would append invoice row:`, row);
    return false;
  }

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: INVOICES_SHEET_ID,
    range: "Sheet1!A:I",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        row.date,
        row.clientName,
        row.serviceType,
        row.packageName,
        row.amount,
        row.retainer,
        row.balance,
        row.status,
        row.paidDate || "",
      ]],
    },
  });

  return true;
}

/** Append a row to the Contracts sheet */
export async function appendContractRow(row: ContractRow): Promise<boolean> {
  const auth = getAuthenticatedClient();

  if (!auth || !CONTRACTS_SHEET_ID) {
    console.log(`[Sheets Stub] Would append contract row:`, row);
    return false;
  }

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: CONTRACTS_SHEET_ID,
    range: "Sheet1!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        row.date,
        row.clientName,
        row.serviceType,
        row.contractType,
        row.status,
        row.signedDate || "",
        row.driveLink || "",
      ]],
    },
  });

  return true;
}

/** Update a specific cell in the Invoices sheet (find row by client name + date, update status) */
export async function updateInvoiceStatus(
  clientName: string,
  date: string,
  newStatus: string
): Promise<boolean> {
  const auth = getAuthenticatedClient();

  if (!auth || !INVOICES_SHEET_ID) {
    console.log(`[Sheets Stub] Would update invoice status for ${clientName} on ${date} to ${newStatus}`);
    return false;
  }

  const sheets = google.sheets({ version: "v4", auth });

  // Get all rows to find the matching one
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: INVOICES_SHEET_ID,
    range: "Sheet1!A:I",
  });

  const rows = res.data.values;
  if (!rows) return false;

  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] === date && rows[i][1] === clientName) {
      // Update status column (H = column 8)
      await sheets.spreadsheets.values.update({
        spreadsheetId: INVOICES_SHEET_ID,
        range: `Sheet1!H${i + 1}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[newStatus]] },
      });
      return true;
    }
  }

  return false;
}
