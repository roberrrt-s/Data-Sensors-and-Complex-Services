self.addEventListener('push', event => {
  const data = event.data.json()
  console.log('New notification', data)
  const options = {
    // Visual Options
    body: data.body,
    icon: data.icon,
    image: data.image,
    badge: data.badge,
    vibrate: data.vibrate,
    sound: data.sound,
    dir: data.dir,

    // Behavioural Options
    tag: data.tag,
    data: data.data,
    requireInteraction: data.requireInteraction,
    renotify: data.renotify,
    silent: data.silent,

    // Both Visual & Behavioural Options
    actions: data.actions,

    // Information Option. No visual affect.
    timestamp: data.timestamp
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
})
