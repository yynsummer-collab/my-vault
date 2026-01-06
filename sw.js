const CACHE_NAME = 'vault-v2';
// 暂时只保留核心文件，排除外部链接，看能否启动成功
const ASSETS = [
  './实验记录.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', e => {
  self.skipWaiting(); // 强制跳过等待，直接激活
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('正在缓存资源...');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', e => {
  console.log('SW 已激活');
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});