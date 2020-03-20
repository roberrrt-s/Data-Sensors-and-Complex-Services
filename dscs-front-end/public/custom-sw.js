self.addEventListener("push", event => {
  const data = event.data.json();
  console.log("New notification", data);
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
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  const action = event.action;
  if(action !== 'remind-later') {
    const urlToOpen = event.notification.data.url;
    const promiseChain = clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(windowClients => {
        let matchingClient = null;

        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          if (windowClient.url === urlToOpen) {
            matchingClient = windowClient;
            break;
          }
        }

        if (matchingClient) {
          return matchingClient.focus();
        } else {
          return clients.openWindow(urlToOpen);
        }
      });

    event.waitUntil(promiseChain);
  }
});
// self.addEventListener('notificationclose', function(event) {
//   const dismissedNotification = event.notification;
//   const promiseChain = notificationCloseAnalytics();
//   event.waitUntil(promiseChain);
// });
