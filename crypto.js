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

// Derive a key and an ID from the seed phrase
async function deriveKeys(seedPhrase) {
    const seedBuffer = str2ab(seedPhrase);
    
    // Hash for Document ID
    const hashBuffer = await self.crypto.subtle.digest('SHA-256', seedBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const documentId = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Import key for AES-GCM
    // In a real high-security app we'd use PBKDF2 here, but SHA-256 is sufficient 
    // for a high-entropy 25-word phrase.
    const keyMaterial = await self.crypto.subtle.importKey(
        'raw', 
        hashBuffer, 
        { name: 'AES-GCM' }, 
        false, 
        ['encrypt', 'decrypt']
    );

    return { documentId, key: keyMaterial };
}

// Encrypt data
async function encryptData(text, key) {
    if (!text) return "";
    const iv = self.crypto.getRandomValues(new Uint8Array(12));
    const encoded = str2ab(text);
    
    const ciphertext = await self.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
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
        // Extract IV
        const iv = combined.slice(0, 12);
        // Extract ciphertext
        const ciphertext = combined.slice(12);

        const decrypted = await self.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
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
