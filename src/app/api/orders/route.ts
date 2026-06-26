import { NextRequest, NextResponse } from "next/server";
import { getSheetData, appendRow, findRowByValue, updateCell, SPREADSHEET_ID } from "@/lib/sheets";
import { generateBatchId } from "@/lib/utils";

export async function GET(request: NextRequest) {
  if (!SPREADSHEET_ID) {
    return NextResponse.json(
      { error: "Google Sheets not configured. Set GOOGLE_SHEET_ID." },
      { status: 503 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const batchId = searchParams.get("batch_id");

  const data = await getSheetData("Orders!A:R");
  if (!data || data.length <= 1) {
    return NextResponse.json([]);
  }

  const headers = data[0];
  const rows = data.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] || "";
    });
    return obj;
  });

  if (batchId) {
    const found = rows.find((r) => r.batch_id === batchId);
    return NextResponse.json(found || null);
  }

  const status = searchParams.get("status");
  const filtered =
    status && status !== "all"
      ? rows.filter((r) => r.status === status)
      : rows;

  return NextResponse.json(filtered.reverse());
}

export async function POST(request: NextRequest) {
  if (!SPREADSHEET_ID) {
    return NextResponse.json(
      { error: "Google Sheets not configured" },
      { status: 503 }
    );
  }

  const body = await request.json();
  const orderId = generateBatchId();
  const now = new Date().toISOString();

  const row = [
    orderId,
    body.name,
    body.phone,
    body.whatsapp,
    body.email || "",
    body.address || "",
    body.productId,
    body.productName || "",
    body.size,
    body.quantity,
    body.garlic,
    body.spiceLevel,
    body.oilPreference,
    body.deliveryMethod,
    body.deliveryCost || 0,
    body.total,
    "received",
    now,
  ];

  const success = await appendRow("Orders", row);

  if (!success) {
    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 }
    );
  }

  return NextResponse.json({ batchId: orderId }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!SPREADSHEET_ID) {
    return NextResponse.json(
      { error: "Google Sheets not configured" },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { orderId, status: newStatus } = body;

  const result = await findRowByValue("Orders", "A", orderId);
  if (!result) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const statusColIndex = 16; // Column Q (0-indexed = 16)
  const colLetter = String.fromCharCode(65 + statusColIndex);
  const success = await updateCell(
    `Orders!${colLetter}${result.rowIndex}`,
    newStatus
  );

  if (!success) {
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }

  return NextResponse.json({ orderId, status: newStatus });
}
