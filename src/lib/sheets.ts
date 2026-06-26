import { google } from "googleapis";

function getAuth() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!credentials) return null;

  try {
    const parsed = JSON.parse(credentials);
    return new google.auth.GoogleAuth({
      credentials: parsed,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } catch {
    return null;
  }
}

function getSheets() {
  const auth = getAuth();
  if (!auth) return null;
  return google.sheets({ version: "v4", auth });
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || "";

export async function getSheetData(
  range: string
): Promise<string[][] | null> {
  const sheets = getSheets();
  if (!sheets || !SPREADSHEET_ID) return null;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range,
  });

  return (response.data.values as string[][]) || [];
}

export async function appendRow(
  sheetName: string,
  values: (string | number)[]
): Promise<boolean> {
  const sheets = getSheets();
  if (!sheets || !SPREADSHEET_ID) return false;

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });

  return true;
}

export async function updateCell(
  range: string,
  value: string
): Promise<boolean> {
  const sheets = getSheets();
  if (!sheets || !SPREADSHEET_ID) return false;

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[value]],
    },
  });

  return true;
}

export async function findRowByValue(
  sheetName: string,
  column: string,
  searchValue: string
): Promise<{ rowIndex: number; data: string[] } | null> {
  const data = await getSheetData(`${sheetName}!A:Z`);
  if (!data) return null;

  for (let i = 0; i < data.length; i++) {
    const colIndex = column.charCodeAt(0) - 65;
    if (data[i][colIndex] === searchValue) {
      return { rowIndex: i + 1, data: data[i] };
    }
  }

  return null;
}

export { SPREADSHEET_ID };
