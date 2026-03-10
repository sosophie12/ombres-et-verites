/**
 * Service Worker — Ombres & Vérités PWA
 * Enables offline play and app-like experience
 */

const CACHE_NAME = 'ombres-verites-v3.1';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './js/engine/Utils.js',
    './js/engine/AudioManager.js',
    './js/engine/StateManager.js',
    './js/engine/SaveManager.js',
    './js/engine/SceneRenderer.js',
    './js/systems/DialogueSystem.js',
    './js/systems/ClueSystem.js',
    './js/systems/DeductionBoard.js',
    './js/systems/SceneExplorer.js',
    './js/data/CaseData.js',
    './js/data/CaseData2.js',
    './js/data/CaseData3.js',
    './js/data/CaseData4.js',
    './js/ui/MenuManager.js',
    './js/ui/Notebook.js',
    './js/ui/MapView.js',
    './js/Game.js',
    './icons/icon-72.png',
    './icons/icon-96.png',
    './icons/icon-128.png',
    './icons/icon-144.png',
    './icons/icon-152.png',
    './icons/icon-192.png',
    './icons/icon-384.png',
    './icons/icon-512.png',
    // Scene images
    './images/scenes/mansion_entrance.jpg',
    './images/scenes/living_room.jpg',
    './images/scenes/study.jpg',
    './images/scenes/kitchen.jpg',
    './images/scenes/garden.jpg',
    './images/scenes/bedroom.jpg',
    './images/scenes/office.jpg',
    './images/scenes/theatre_entrance.jpg',
    './images/scenes/theatre_stage.jpg',
    './images/scenes/backstage.jpg',
    './images/scenes/theatre_office.jpg',
    './images/scenes/island_dock.jpg',
    './images/scenes/lighthouse.jpg',
    './images/scenes/lighthouse_top.jpg',
    './images/scenes/keeper_house.jpg',
    './images/scenes/boathouse.jpg',
    './images/scenes/museum_entrance.jpg',
    './images/scenes/museum_gallery.jpg',
    './images/scenes/museum_security.jpg',
    './images/scenes/museum_office.jpg',
    './images/scenes/museum_workshop.jpg'
];

// Install — cache all game assets
self.addEventListener('install', event => {
    console.log('[SW] Installing Service Worker v2.0...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Caching app assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate — clean old caches
self.addEventListener('activate', event => {
    console.log('[SW] Activating Service Worker...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch — cache-first strategy (perfect for a game with static assets)
self.addEventListener('fetch', event => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request).then(networkResponse => {
                    // Cache new resources dynamically (e.g., Google Fonts)
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return networkResponse;
                });
            })
            .catch(() => {
                // Offline fallback — return index for navigation requests
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            })
    );
});
