import { google } from "googleapis";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");

function getEnvVar(name) {
  const match = envContent.match(new RegExp(`^${name}=(.+)$`, "m"));
  return match ? match[1] : "";
}

const SHEET_ID = getEnvVar("GOOGLE_SHEET_ID");
const credentials = JSON.parse(getEnvVar("GOOGLE_SERVICE_ACCOUNT_KEY"));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const TABS = [
  {
    title: "Orders",
    headers: [
      "batch_id", "name", "phone", "whatsapp", "email", "address",
      "product_id", "product_name", "size", "quantity", "garlic",
      "spice_level", "oil_preference", "delivery_method", "delivery_cost",
      "total", "status", "created_at"
    ],
  },
  {
    title: "Products",
    headers: [
      "id", "name", "description", "price_250g", "price_500g", "price_1kg",
      "enabled", "garlic_option", "spice_levels", "oil_preferences"
    ],
    seedData: [
      [
        "gongura-pickle", "Gongura Pickle",
        "Traditional Andhra Gongura Pickle made using handpicked Gongura leaves, premium spices, and fresh ingredients.",
        "180", "320", "600", "true", "true",
        "Mild,Regular,Extra Spicy",
        "Default Recipe,Groundnut Oil,Gingelly Oil"
      ],
    ],
  },
  {
    title: "Batches",
    headers: ["id", "date", "capacity", "filled", "closing_time", "status"],
    seedData: [
      [`B-${new Date().toISOString().split("T")[0]}`, new Date().toISOString().split("T")[0], "30", "0", "19:00", "open"],
    ],
  },
  {
    title: "Customers",
    headers: [
      "name", "phone", "whatsapp", "email", "total_orders",
      "total_spent", "last_order_date", "favourite_product"
    ],
  },
];

async function setup() {
  console.log("Setting up Google Sheet...\n");

  // Get existing sheet info
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const existingSheets = spreadsheet.data.sheets.map((s) => s.properties.title);
  console.log("Existing tabs:", existingSheets.join(", "));

  // Create missing tabs
  const requests = [];
  for (const tab of TABS) {
    if (!existingSheets.includes(tab.title)) {
      requests.push({
        addSheet: { properties: { title: tab.title } },
      });
      console.log(`  Creating tab: ${tab.title}`);
    } else {
      console.log(`  Tab exists: ${tab.title}`);
    }
  }

  if (requests.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: { requests },
    });
  }

  // Write headers and seed data
  for (const tab of TABS) {
    const values = [tab.headers];
    if (tab.seedData) {
      values.push(...tab.seedData);
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${tab.title}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });
    console.log(`  Wrote headers for: ${tab.title} (${tab.headers.length} columns)`);
  }

  // Rename default "Sheet1" if it exists and isn't needed
  const updatedSpreadsheet = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const sheet1 = updatedSpreadsheet.data.sheets.find((s) => s.properties.title === "Sheet1");
  if (sheet1) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          { deleteSheet: { sheetId: sheet1.properties.sheetId } },
        ],
      },
    });
    console.log("  Removed default Sheet1");
  }

  console.log("\n✅ Google Sheet setup complete!");
  console.log(`   Sheet: https://docs.google.com/spreadsheets/d/${SHEET_ID}`);
  console.log("   Tabs: Orders, Products, Batches, Customers");
  console.log("   Gongura Pickle product seeded.");
}

setup().catch((err) => {
  console.error("❌ Setup failed:", err.message);
  if (err.message.includes("403") || err.message.includes("forbidden")) {
    console.error("\n   Make sure you shared the Google Sheet with:");
    console.error("   google-sheets-service@sreekamakshi-sheets.iam.gserviceaccount.com");
  }
  process.exit(1);
});
