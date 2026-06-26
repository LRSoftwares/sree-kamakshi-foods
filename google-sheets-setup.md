# Google Sheets Setup for Sree Kamakshi Foods

## Step 1: Create a Google Sheet

Create a new Google Sheet with the following tabs (sheets):

### Sheet 1: "Orders"
Headers (Row 1):
```
batch_id | name | phone | whatsapp | email | address | product_id | product_name | size | quantity | garlic | spice_level | oil_preference | delivery_method | delivery_cost | total | status | created_at
```

### Sheet 2: "Products"
Headers (Row 1):
```
id | name | description | price_250g | price_500g | price_1kg | enabled | garlic_option | spice_levels | oil_preferences
```

Sample data (Row 2):
```
gongura-pickle | Gongura Pickle | Traditional Andhra Gongura Pickle... | 180 | 320 | 600 | true | true | Mild,Regular,Extra Spicy | Default Recipe,Groundnut Oil,Gingelly Oil
```

### Sheet 3: "Batches"
Headers (Row 1):
```
id | date | capacity | filled | closing_time | status
```

### Sheet 4: "Customers"
Headers (Row 1):
```
name | phone | whatsapp | email | total_orders | total_spent | last_order_date | favourite_product
```

## Step 2: Create a Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable the **Google Sheets API**
4. Go to **Credentials** → **Create Credentials** → **Service Account**
5. Download the JSON key file
6. Copy the entire JSON content and set it as `GOOGLE_SERVICE_ACCOUNT_KEY` in `.env.local`

## Step 3: Share the Spreadsheet

1. Copy the service account email from the JSON key (the `client_email` field)
2. Open your Google Sheet
3. Click **Share** and add the service account email as an Editor
4. Copy the Spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
5. Set `GOOGLE_SHEET_ID` in `.env.local`

## Step 4: Update .env.local

```
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
GOOGLE_SHEET_ID=your_spreadsheet_id_here
```
