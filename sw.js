const C='sms-v1',F=['./','index.html','manifest.json','icon.svg','config.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));return r}).catch(()=>caches.match(e.request)))});
// Push في الخلفية: يحتاج FCM + Cloud Function (المرحلة 2)
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(_){}e.waitUntil(self.registration.showNotification(d.title||'Stability',{body:d.body||'',icon:'icon.svg',tag:d.tag}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.openWindow('./index.html'))});
