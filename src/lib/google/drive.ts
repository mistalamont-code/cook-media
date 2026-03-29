import { google } from "googleapis";
import { getAuthenticatedClient } from "./auth";
import { Readable } from "stream";

const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

/** Create a folder in Google Drive. Returns the folder ID. */
export async function createFolder(name: string, parentId?: string): Promise<string | null> {
  const auth = getAuthenticatedClient();

  if (!auth) {
    console.log(`[Drive Stub] Would create folder: ${name} under ${parentId || "root"}`);
    return null;
  }

  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.create({
    requestBody: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId || ROOT_FOLDER_ID || "root"],
    },
    fields: "id",
  });

  return res.data.id || null;
}

/**
 * Create a client folder structure in Drive:
 * Cook Media / [Year] / [Client Name] / {Proposals, Contracts, Deliverables}
 */
export async function createClientFolders(clientName: string): Promise<{
  rootId: string | null;
  proposalsId: string | null;
  contractsId: string | null;
  deliverablesId: string | null;
}> {
  const year = new Date().getFullYear().toString();

  // Find or create year folder
  const yearFolderId = await findOrCreateFolder(year, ROOT_FOLDER_ID || undefined);

  // Create client folder under year
  const clientFolderId = await createFolder(clientName, yearFolderId || undefined);

  if (!clientFolderId) {
    return { rootId: null, proposalsId: null, contractsId: null, deliverablesId: null };
  }

  // Create subfolders
  const [proposalsId, contractsId, deliverablesId] = await Promise.all([
    createFolder("Proposals", clientFolderId),
    createFolder("Contracts", clientFolderId),
    createFolder("Deliverables", clientFolderId),
  ]);

  return { rootId: clientFolderId, proposalsId, contractsId, deliverablesId };
}

/** Find a folder by name under a parent, or create it if it doesn't exist */
async function findOrCreateFolder(name: string, parentId?: string): Promise<string | null> {
  const auth = getAuthenticatedClient();

  if (!auth) {
    console.log(`[Drive Stub] Would find or create folder: ${name}`);
    return null;
  }

  const drive = google.drive({ version: "v3", auth });
  const parent = parentId || ROOT_FOLDER_ID || "root";

  const res = await drive.files.list({
    q: `name='${name}' and '${parent}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id)",
    pageSize: 1,
  });

  if (res.data.files && res.data.files.length > 0) {
    return res.data.files[0].id || null;
  }

  return createFolder(name, parentId);
}

/** Upload a file to Google Drive. Returns the file ID. */
export async function uploadFile(
  name: string,
  mimeType: string,
  content: Buffer,
  folderId: string
): Promise<string | null> {
  const auth = getAuthenticatedClient();

  if (!auth) {
    console.log(`[Drive Stub] Would upload file: ${name} to folder ${folderId}`);
    return null;
  }

  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.create({
    requestBody: {
      name,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: Readable.from(content),
    },
    fields: "id, webViewLink",
  });

  return res.data.id || null;
}

/** Get a sharing link for a Drive file */
export async function getShareLink(fileId: string): Promise<string | null> {
  const auth = getAuthenticatedClient();
  if (!auth) return null;

  const drive = google.drive({ version: "v3", auth });

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  const res = await drive.files.get({
    fileId,
    fields: "webViewLink",
  });

  return res.data.webViewLink || null;
}
