import { NextRequest, NextResponse } from "next/server";
import { getSheetData, updateCell, SPREADSHEET_ID } from "@/lib/sheets";

export async function GET() {
  if (!SPREADSHEET_ID) {
    return NextResponse.json(
      { error: "Google Sheets not configured" },
      { status: 503 }
    );
  }

  const data = await getSheetData("Products!A:J");
  if (!data || data.length <= 1) {
    return NextResponse.json([]);
  }

  const headers = data[0];
  const products = data.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] || "";
    });
    return obj;
  });

  return NextResponse.json(products);
}

export async function PATCH(request: NextRequest) {
  if (!SPREADSHEET_ID) {
    return NextResponse.json(
      { error: "Google Sheets not configured" },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { productId, field, value } = body;

  const data = await getSheetData("Products!A:J");
  if (!data) {
    return NextResponse.json(
      { error: "Could not read products" },
      { status: 500 }
    );
  }

  const headers = data[0];
  const colIndex = headers.indexOf(field);
  if (colIndex === -1) {
    return NextResponse.json({ error: "Invalid field" }, { status: 400 });
  }

  const rowIndex = data.findIndex((row) => row[0] === productId);
  if (rowIndex === -1) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  const colLetter = String.fromCharCode(65 + colIndex);
  const success = await updateCell(
    `Products!${colLetter}${rowIndex + 1}`,
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
