/* Service worker ของแอประบบเบิก OT
 * เก็บเฉพาะ "ตัวแอป" (หน้าเปิด ไอคอน) ไว้ในเครื่อง เพื่อให้เปิดแอปได้เร็วและขึ้นข้อความได้แม้ไม่มีเน็ต
 * ข้อมูล OT จริงอยู่ที่ Apps Script เสมอ — ไม่เก็บข้อมูลผู้ใช้ไว้ในเครื่อง */
const CACHE = 'ot-app-v1';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// ไฟล์ของแอปเอง: ใช้เวอร์ชันล่าสุดจากเน็ตก่อน ถ้าออฟไลน์ใช้ที่เก็บไว้
// ไฟล์จากที่อื่น (Apps Script / Google): ไม่ยุ่ง ปล่อยผ่านตามปกติ
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
