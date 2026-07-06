const translations = {
    en: {
        welcome_title: "Welcome to SyncPad",
        welcome_desc: "Set up this device to start syncing.",
        btn_master: "Create New Account",
        btn_slave: "Link Existing Device",
        slave_desc: "Enter the 25-word phrase from your connected device.",
        slave_placeholder: "Enter 25 words here...",
        slave_error_length: "Invalid phrase length. Must be 25 words.",
        slave_error_invalid: "Invalid phrase.",
        slave_error_word: "Invalid word: ",
        btn_cancel: "Cancel",
        btn_connect: "Connect",
        tab_clipboard: "Clipboard",
        tab_notepad: "Notepad",
        btn_push_clipboard: "Push Current Clipboard",
        btn_new_note: "New Note",
        note_placeholder: "Type your notes here...",
        btn_save_note: "Save Note",
        btn_update_note: "Update Note",
        settings_title: "Settings",
        settings_desc: "Your 25-word recovery phrase. Use this to link other devices.",
        settings_lang: "Language",
        btn_copy_seed: "Copy Phrase",
        btn_close: "Close",
        btn_logout: "Logout",
        msg_synced: "Synced Successfully",
        msg_copied: "Copied!",
        msg_refreshed: "Refreshed"
    },
    tr: {
        welcome_title: "SyncPad'e Hoş Geldiniz",
        welcome_desc: "Senkronizasyona başlamak için bu cihazı kurun.",
        btn_master: "Yeni Hesap Oluştur",
        btn_slave: "Mevcut Cihazı Bağla",
        slave_desc: "Bağlı cihazınızdaki 25 kelimelik şifreyi girin.",
        slave_placeholder: "25 kelimeyi buraya girin...",
        slave_error_length: "Geçersiz uzunluk. 25 kelime olmalıdır.",
        slave_error_invalid: "Geçersiz şifre.",
        slave_error_word: "Geçersiz kelime: ",
        btn_cancel: "İptal",
        btn_connect: "Bağlan",
        tab_clipboard: "Pano",
        tab_notepad: "Not Defteri",
        btn_push_clipboard: "Panoyu Gönder",
        btn_new_note: "Yeni Not",
        note_placeholder: "Notlarınızı buraya yazın...",
        btn_save_note: "Notu Kaydet",
        btn_update_note: "Notu Güncelle",
        settings_title: "Ayarlar",
        settings_desc: "25 kelimelik kurtarma şifreniz. Diğer cihazları bağlamak için bunu kullanın.",
        settings_lang: "Dil",
        btn_copy_seed: "Şifreyi Kopyala",
        btn_close: "Kapat",
        btn_logout: "Çıkış Yap",
        msg_synced: "Başarıyla Senkronize Edildi",
        msg_copied: "Kopyalandı!",
        msg_refreshed: "Yenilendi"
    },
    de: {
        welcome_title: "Willkommen bei SyncPad",
        welcome_desc: "Richten Sie dieses Gerät ein, um mit der Synchronisierung zu beginnen.",
        btn_master: "Neues Konto erstellen",
        btn_slave: "Vorhandenes Gerät verknüpfen",
        slave_desc: "Geben Sie die 25-Wort-Phrase Ihres verbundenen Geräts ein.",
        slave_placeholder: "Geben Sie hier 25 Wörter ein...",
        slave_error_length: "Ungültige Phrasenlänge. Muss 25 Wörter umfassen.",
        slave_error_invalid: "Ungültige Phrase.",
        slave_error_word: "Ungültiges Wort: ",
        btn_cancel: "Abbrechen",
        btn_connect: "Verbinden",
        tab_clipboard: "Zwischenablage",
        tab_notepad: "Notizblock",
        btn_push_clipboard: "Aktuelle Zwischenablage senden",
        btn_new_note: "Neue Notiz",
        note_placeholder: "Geben Sie hier Ihre Notizen ein...",
        btn_save_note: "Notiz speichern",
        btn_update_note: "Notiz aktualisieren",
        settings_title: "Einstellungen",
        settings_desc: "Ihre 25-Wort-Wiederherstellungsphrase. Verwenden Sie diese, um andere Geräte zu verknüpfen.",
        settings_lang: "Sprache",
        btn_copy_seed: "Phrase kopieren",
        btn_close: "Schließen",
        btn_logout: "Abmelden",
        msg_synced: "Erfolgreich synchronisiert",
        msg_copied: "Kopiert!",
        msg_refreshed: "Aktualisiert"
    },
    fr: {
        welcome_title: "Bienvenue sur SyncPad",
        welcome_desc: "Configurez cet appareil pour commencer la synchronisation.",
        btn_master: "Créer un nouveau compte",
        btn_slave: "Lier un appareil existant",
        slave_desc: "Entrez la phrase de 25 mots de votre appareil connecté.",
        slave_placeholder: "Entrez 25 mots ici...",
        slave_error_length: "Longueur de phrase invalide. Doit contenir 25 mots.",
        slave_error_invalid: "Phrase invalide.",
        slave_error_word: "Mot invalide: ",
        btn_cancel: "Annuler",
        btn_connect: "Connecter",
        tab_clipboard: "Presse-papiers",
        tab_notepad: "Bloc-notes",
        btn_push_clipboard: "Envoyer le presse-papiers actuel",
        btn_new_note: "Nouvelle note",
        note_placeholder: "Tapez vos notes ici...",
        btn_save_note: "Enregistrer la note",
        btn_update_note: "Mettre à jour la note",
        settings_title: "Paramètres",
        settings_desc: "Votre phrase de récupération de 25 mots. Utilisez-la pour lier d'autres appareils.",
        settings_lang: "Langue",
        btn_copy_seed: "Copier la phrase",
        btn_close: "Fermer",
        btn_logout: "Se déconnecter",
        msg_synced: "Synchronisé avec succès",
        msg_copied: "Copié !",
        msg_refreshed: "Actualisé"
    }
};

let currentLang = 'en';

function applyLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    
    // Process text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // Keep SVG icons intact inside buttons if they exist
            const svg = el.querySelector('svg');
            if (svg) {
                el.innerHTML = '';
                el.appendChild(svg);
                el.appendChild(document.createTextNode(' ' + translations[lang][key]));
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Process placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}

function getTranslation(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}
