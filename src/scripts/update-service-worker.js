// update-service-worker.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceWorkerPath = path.join(__dirname, 'dist', 'service-worker.js'); // Path to the original service worker

fs.readdir(__dirname, (err, files) => {
    if (err) throw new Error(`Could not read dist directory: ${err}`);

    // Filter out files to cache
    const urlsToCache = files.filter(file => /\.(html|js|css|png|jpg|jpeg|webp|svg|ico|json)$/.test(file))
        .map(file => `/assets/${file}`); // Adjust this if your build puts assets in different subfolders

    // Generate the code snippet to update the urlsToCache array
    const cacheCodeSnippet = `const urlsToCache = ${JSON.stringify(urlsToCache, null, 2)};`;

    // Read the existing service worker file
    fs.readFile(serviceWorkerPath, 'utf8', (readErr, serviceWorkerContent) => {
        if (readErr) throw new Error(`Could not read service worker file: ${readErr}`);

        // Replace the urlsToCache array in the service worker file
        const updatedServiceWorkerContent = serviceWorkerContent.replace(
            /const urlsToCache = \[.*?\];/s,
            cacheCodeSnippet
        );

        // Write the updated service worker back to the file system
        fs.writeFile(serviceWorkerPath, updatedServiceWorkerContent, 'utf8', (writeErr) => {
            if (writeErr) throw new Error(`Could not write to service worker file: ${writeErr}`);
            console.log('Service worker updated with cached URLs.');
        });
    });
});
