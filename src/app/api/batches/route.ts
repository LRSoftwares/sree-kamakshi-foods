import { NextRequest, NextResponse } from "next/server";
import { getSheetData, appendRow, updateCell, SPREADSHEET_ID } from "@/lib/sheets";

export async function GET() {
  if (!SPREADSHEET_ID) {
    return NextResponse.json(
      { error: "Google Sheets not configured" },
      { status: 503 }
    );
  }

  const data = await getSheetData("Batches!A:F");
  if (!data || data.length <= 1) {
    return NextResponse.json({ today: null, history: [] });
  }

  const headers = data[0];
  const batches = data.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] || "";
    });
    return obj;
  });

  const today = new Date().toISOString().split("T")[0];
  const todayBatch = batches.find((b) => b.date === today);

  return NextResponse.json({
    today: todayBatch || null,
    history: batches.reverse(),
  });
}

export async function POST() {
  if (!SPREADSHEET_ID) {
    return NextResponse.json(
      { error: "Google Sheets not configured" },
      { status: 503 }
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const batchId = `B-${today}`;

  const success = await appendRow("Batches", [
    batchId,
    today,
    30,
    0,
    "19:00",
    "open",
  ]);

  if (!success) {
    return NextResponse.json(
      { error: "Failed to create batch" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { id: batchId, date: today, capacity: 30, filled: 0, status: "open" },
    { status: 201 }
  );
}

export async function PATCH(request: NextRequest) {
  if (!SPREADSHEET_ID) {
    return NextResponse.json(
      { error: "Google Sheets not configured" },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { batchId, field, value } = body;

  const data = await getSheetData("Batches!A:F");
  if (!data) {
    return NextResponse.json(
      { error: "Could not read batches" },
      { status: 500 }
    );
  }

  const headers = data[0];
  const colIndex = headers.indexOf(field);
  const rowIndex = data.findIndex((row) => row[0] === batchId);

  if (colIndex === -1 || rowIndex === -1) {
    return NextResponse.json(
      { error: "Batch or field not found" },
      { status: 404 }
    );
  }

  const colLetter = String.fromCharCode(65 + colIndex);
  const success = await updateCell(
    `Batches!${colLetter}${rowIndex + 1}`,
    value
  );

  if (!success) {
    return NextResponse.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
