// crypto.js

// Generate 25 random words
function generateSeedPhrase() {
    const phrase = [];
    const array = new Uint32Array(25);
    self.crypto.getRandomValues(array);
    for (let i = 0; i < 25; i++) {
        const index = array[i] % WORDLIST.length;
        phrase.push(WORDLIST[index]);
    }
    return phrase.join(' ');
}

// Convert string to ArrayBuffer
function str2ab(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

// Convert ArrayBuffer to base64 string
function ab2base64(buf) {
    let binary = '';
    const bytes = new Uint8Array(buf);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// Convert base64 string to ArrayBuffer
function base642ab(base64) {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

// -------------------------------------------------------
// LEGACY key derivation — kept ONLY for data migration.
// Uses raw SHA-256 hash as both document ID and AES key.
// -------------------------------------------------------
async function deriveKeysLegacy(seedPhrase) {
    const seedBuffer = str2ab(seedPhrase);

    // Legacy Document ID = SHA-256(seed)
    const hashBuffer = await self.crypto.subtle.digest('SHA-256', seedBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const documentId = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Legacy AES key = raw import of the same hash
    const key = await self.crypto.subtle.importKey(
        'raw', hashBuffer, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']
    );

    return { documentId, key };
}

// -------------------------------------------------------
// NEW key derivation — PBKDF2 + domain separation.
// Document ID and encryption key are derived from
// completely independent inputs.
// -------------------------------------------------------
async function deriveKeys(seedPhrase) {
    const seedBuffer = str2ab(seedPhrase);

    // Domain-separated Document ID:
    // SHA-256("syncpad-docid:" + seedPhrase)
    const idInput = str2ab('syncpad-docid:' + seedPhrase);
    const idHash = await self.crypto.subtle.digest('SHA-256', idInput);
    const idArray = Array.from(new Uint8Array(idHash));
    const documentId = idArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // PBKDF2 key derivation for AES-GCM
    const baseKey = await self.crypto.subtle.importKey(
        'raw', seedBuffer, 'PBKDF2', false, ['deriveKey']
    );

    const salt = str2ab('syncpad-v1-key-salt');
    const key = await self.crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );

    return { documentId, key };
}

// Encrypt data
async function encryptData(text, key) {
    if (!text) return "";
    const iv = self.crypto.getRandomValues(new Uint8Array(12));
    const encoded = str2ab(text);
    
    const ciphertext = await self.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encoded
    );

    // Combine IV and ciphertext for storage
    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.length);

    return ab2base64(combined.buffer);
}

// Decrypt data
async function decryptData(base64String, key) {
    if (!base64String) return "";
    try {
        const combined = new Uint8Array(base642ab(base64String));
        const iv = combined.slice(0, 12);
        const ciphertext = combined.slice(12);

        const decrypted = await self.crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            ciphertext
        );

        const decoder = new TextDecoder();
        return decoder.decode(decrypted);
    } catch (e) {
        console.error("Decryption failed:", e);
        return "";
    }
}
