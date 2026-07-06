# SyncPad & Clipboard Sync Extension

SyncPad is a highly secure, end-to-end encrypted Chrome extension that allows you to seamlessly sync your clipboard history and personal notes across multiple devices (Windows, Mac, Linux) via your own Supabase instance.

![SyncPad Icon](icon128.png)

## ✨ Key Features

### 🛡️ Uncompromising Security
*   **End-to-End Encryption (E2EE):** All your clipboard items and notes are encrypted locally in your browser using **AES-GCM (256-bit)** before they are sent to the server. The server (Supabase) only ever sees ciphertext.
*   **PBKDF2 Key Derivation:** Your encryption key is securely derived from your 25-word recovery phrase using **PBKDF2** (100,000 iterations, SHA-256 salt).
*   **Cryptographic Domain Separation:** The Document ID used to query the database and the AES key used to encrypt the data are derived using different salts, ensuring that knowing the database ID gives zero hints about the encryption key.
*   **BIP39 Seed Phrase Authentication:** No usernames or passwords. Devices are linked using a generated 25-word seed phrase (similar to hardware crypto wallets) providing ~275 bits of entropy.

### 📝 Smart Syncing & UI
*   **Shadcn UI Dark Mode:** The interface is built from scratch utilizing the modern, minimalist Shadcn UI design system (Zinc/Slate palette, Glassmorphism, highly responsive layout).
*   **Clipboard Management:** Instantly push your current clipboard to all connected devices. Hover over any clipboard item to quickly **Copy** or **Delete** it.
*   **Advanced Notepad:** Create persistent notes (up to 10,000 characters). Hover over notes to **Copy**, **Edit**, or **Delete** them.
*   **Race-Condition Protection (Fetch-before-Push):** Ensures you never accidentally overwrite data from another device. The extension quietly fetches the absolute latest state from the server fractions of a second before pushing your new changes, guaranteeing perfect merges.
*   **Automated 14-Day TTL:** To keep your sync payloads lean and fast, any clipboard or note item older than 14 days is automatically pruned locally before every push.

---

## 🚀 Getting Started

### 1. Supabase Setup (Your Server)
You need a free [Supabase](https://supabase.com) account to act as the sync relay.

1.  Create a new project.
2.  Go to the **SQL Editor** and run the following script to create the table and secure it against vandalism:

```sql
-- Create the sync table
CREATE TABLE sync_data (
  id TEXT PRIMARY KEY,
  clipboard TEXT,
  notepad TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE sync_data ENABLE ROW LEVEL SECURITY;

-- Allow anyone with the anon key to read (data is encrypted anyway)
CREATE POLICY "Anon can select" ON sync_data FOR SELECT USING (true);
-- Allow inserting new sync groups
CREATE POLICY "Anon can insert" ON sync_data FOR INSERT WITH CHECK (true);
-- Allow updating existing sync groups
CREATE POLICY "Anon can update" ON sync_data FOR UPDATE USING (true) WITH CHECK (true);

-- IMPORTANT: DELETE policy is omitted. 
-- No one can delete an entire row via the API, preventing malicious data wipes.
```

### 2. Extension Configuration
1.  Clone this repository to your local machine.
2.  Open `config.js` (create it if it doesn't exist) and enter your Supabase URL and Anon Key:
    ```javascript
    const SUPABASE_URL = "https://your-project.supabase.co";
    const SUPABASE_ANON_KEY = "your-anon-key";
    ```
3.  *(Note: `config.js` is included in `.gitignore` to prevent you from accidentally committing your keys to a public repo).*

### 3. Installation in Chrome
1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** (toggle in the top right).
3.  Click **Load unpacked** and select the folder containing this extension.

---

## 💻 Usage Instructions

### Setting up the Master Device
1.  Click the SyncPad icon in your Chrome toolbar.
2.  Click **"Create New Account"**.
3.  The extension will generate a secure 25-word phrase and automatically log you in. 
4.  **Save this phrase!** You can view it anytime by clicking the **Settings (⚙️)** gear icon in the app.

### Linking Slave Devices
1.  On your second device (laptop, work computer, etc.), install the extension the same way.
2.  Click **"Link Existing Device"**.
3.  Paste the 25-word phrase from your Master Device.
4.  You are now synced!

### Under the Hood
*   **Migrations:** If you were using v1 (which used raw SHA-256 for keys), the extension includes an automatic v1→v2 migration script. It will transparently decrypt your old data and re-encrypt it using the new PBKDF2 standards upon first load.
*   **Background Ping:** A background service worker pings your Supabase instance every 3 days. This ensures your Supabase project does not get paused for inactivity on the free tier.
