/**
 * ObaPay Presentation IndexedDB Storage & Image Probing
 */

let db = null;

function initDB() {
    return new Promise((resolve) => {
        const request = indexedDB.open('ObaPayPresentationDB', 1);
        request.onupgradeneeded = (e) => {
            const database = e.target.result;
            if (!database.objectStoreNames.contains('screenshots')) {
                database.createObjectStore('screenshots', { keyPath: 'key' });
            }
        };
        request.onsuccess = (e) => {
            db = e.target.result;
            resolve(db);
        };
        request.onerror = () => resolve(null);
    });
}

async function saveScreenshotToDB(key, dataUrl) {
    if (!db) await initDB();
    if (!db) return;
    return new Promise((resolve) => {
        const tx = db.transaction('screenshots', 'readwrite');
        const store = tx.objectStore('screenshots');
        store.put({ key, dataUrl, updatedAt: new Date().toISOString() });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
    });
}

async function getScreenshotFromDB(key) {
    if (!db) await initDB();
    if (!db) return null;
    return new Promise((resolve) => {
        const tx = db.transaction('screenshots', 'readonly');
        const store = tx.objectStore('screenshots');
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result ? req.result.dataUrl : null);
        req.onerror = () => resolve(null);
    });
}

async function getAllScreenshotsFromDB() {
    if (!db) await initDB();
    if (!db) return [];
    return new Promise((resolve) => {
        const tx = db.transaction('screenshots', 'readonly');
        const store = tx.objectStore('screenshots');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
    });
}

function probeImageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}
