# SyncPad & Clipboard

SyncPad is a secure, end-to-end encrypted Chrome extension that allows you to sync your clipboard history and notes across multiple devices.

## Features

- **End-to-End Encryption:** Your data is encrypted locally using AES-GCM (256-bit) before it ever leaves your browser. 
- **BIP39 Seed Phrase:** Securely link devices using a 25-word recovery phrase.
- **Clipboard Sync:** Easily push your current clipboard to your synced devices.
- **Notepad:** Create, edit, and delete notes that instantly sync across your group.
- **Modern UI:** Designed with a sleek, dark-mode Shadcn UI aesthetic.
- **Privacy First:** Data is stored in your own Supabase instance.

## Getting Started

### Prerequisites

1. A [Supabase](https://supabase.com) account to host the database.
2. Google Chrome or any Chromium-based browser.

### Supabase Setup

1. Create a new Supabase project.
2. In the SQL Editor, run the following to create the required table:
   ```sql
   CREATE TABLE sync_data (
     id TEXT PRIMARY KEY,
     clipboard TEXT,
     notepad TEXT,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
3. To protect against unauthorized deletion (vandalism), enable Row Level Security (RLS) with these policies:
   ```sql
   ALTER TABLE sync_data ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Anon can select" ON sync_data FOR SELECT USING (true);
   CREATE POLICY "Anon can insert" ON sync_data FOR INSERT WITH CHECK (true);
   CREATE POLICY "Anon can update" ON sync_data FOR UPDATE USING (true) WITH CHECK (true);
   -- Note: DELETE is intentionally omitted so rows cannot be deleted via the API.
   ```

### Extension Setup

1. Clone or download this repository.
2. Open `config.js` and add your Supabase URL and Anon Key:
   ```javascript
   const SUPABASE_URL = "https://your-project.supabase.co";
   const SUPABASE_ANON_KEY = "your-anon-key";
   ```
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable **Developer mode** in the top right corner.
5. Click **Load unpacked** and select the folder containing this extension.

## Usage

- **Master Device:** On your first device, click **"Create New Account"**. This will generate a secure 25-word phrase. Keep this safe!
- **Slave Device:** On your other devices, click **"Link Existing Device"** and enter the 25-word phrase from your master device.

Once linked, anything you "Push" from the Clipboard tab or save in the Notepad tab will be securely encrypted and synced across all your devices.

## Security

SyncPad uses robust cryptographic practices:
- **PBKDF2 Key Derivation:** Your 25-word phrase is passed through PBKDF2 with 100,000 iterations to generate the AES-GCM encryption key.
- **Domain Separation:** The document ID used to retrieve your data is hashed independently from your encryption key, ensuring that knowing the ID provides no advantage in decrypting the data.
- **14-Day TTL:** Old clipboard entries and notes are automatically purged locally before syncing to keep your payload lean.
