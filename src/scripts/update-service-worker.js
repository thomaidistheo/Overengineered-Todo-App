// Using ESM syntax
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Construct __dirname equivalent since it's not available in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist'); // Adjust according to actual path
const serviceWorkerPath = path.join(distPath, 'service-worker.js');

async function updateServiceWorker() {
    try {
        const files = await fs.readdir(distPath);

        const urlsToCache = files
            .filter(file => /\.(html|js|css|png|jpg|jpeg|webp|svg|ico|json)$/.test(file))
            .map(file => `/assets/${file}`); // Adjust this if your build puts assets in different subfolders

        const cacheCodeSnippet = `const urlsToCache = ${JSON.stringify(urlsToCache, null, 2)};`;

        let serviceWorkerContent = await fs.readFile(serviceWorkerPath, 'utf8');
        serviceWorkerContent = serviceWorkerContent.replace(/const urlsToCache = \[.*?\];/s, cacheCodeSnippet);

        await fs.writeFile(serviceWorkerPath, serviceWorkerContent, 'utf8');
        console.log('Service worker updated with cached URLs.');
    } catch (error) {
        console.error(`Failed to update service worker: ${error}`);
    }
}

updateServiceWorker();
