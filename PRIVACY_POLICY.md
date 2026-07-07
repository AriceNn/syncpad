# Privacy Policy for SyncPad

**Last Updated:** July 2026

SyncPad ("we", "our", or "us") is deeply committed to protecting your privacy. We built this extension with a privacy-first, zero-knowledge architecture. This Privacy Policy explains how your data is handled when you use the SyncPad Chrome Extension.

## 1. Information We Process

### Clipboard and Notepad Data
To provide our core synchronization service, SyncPad requires access to your clipboard and the notes you type into the extension. **However, we do not collect or read this data.** 
All your clipboard history and notes are **End-to-End Encrypted (AES-GCM)** locally on your device before they are transmitted over the internet. We cannot see, read, analyze, or monetize your plaintext data under any circumstances.

### Authentication Data
We do not ask for your name, email address, phone number, or any traditional login credentials. Instead, SyncPad uses a locally generated 25-word **Setup Phrase** to link your devices. This phrase acts as your decryption key and is stored strictly on your local device. It is never sent to our servers.

## 2. How Data is Stored

The encrypted, unreadable ciphertext of your clipboard and notes is temporarily stored on our backend infrastructure (hosted via Vercel/Supabase) solely to facilitate synchronization to your other linked devices. Because the data is end-to-end encrypted, it is mathematically impossible for us, our server providers, or any third party to decrypt it.

## 3. Third-Party Sharing

We stand by a strict "No Selling, No Sharing" rule. We **do not** sell, rent, trade, or transfer any user data (encrypted or otherwise) to third-party advertising networks, data brokers, or analytics companies. Your data is used exclusively for the single purpose of the extension: securely syncing your own content across your own devices.

## 4. Permissions Required

- **`storage`**: Used to securely save your 25-word Setup Phrase and preferences locally on your hard drive.
- **`clipboardRead` / `clipboardWrite`**: Used to read text you copy and write synced text back into your clipboard.
- **`alarms`**: Used to silently ping the backend to keep your sync active in real-time.

## 5. Your Rights

Since we do not hold any identifiable personal information or readable data, you remain in complete control. You can stop syncing and delete your local data at any time by simply uninstalling the extension or clicking "Logout" within the extension's settings.

## 6. Contact Us

If you have any questions or concerns about this Privacy Policy, please contact the developer via our GitHub repository.
