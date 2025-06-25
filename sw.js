// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyBAcd8XMjlzeuWLkWYWZrn4SOWMiKN-qFE",
    authDomain: "with-code-example.firebaseapp.com",
    projectId: "with-code-example",
    messagingSenderId: "922329790485",
    appId: "1:922329790485:web:f67575d3951b5ef109761c"
});

const messaging = firebase.messaging();

// 🔽 Show custom notification in background
messaging.onBackgroundMessage(function (payload) {
    console.log("Background message received: ", payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon || "https://withcodeexample.com/content/images/size/w256h256/2025/05/wce-logo-512-1.png",
        data: {
            url: payload.data.url || "https://withcodeexample.com"
        },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// 🖱️ Click event handler
self.addEventListener("notificationclick", function (event) {
    event.notification.close(); // Close the notification
    console.log(event.notification)
    const targetUrl = event.notification.data.url;

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
            for (const client of clientList) {
                // If the site is already open, focus it
                if (client.url === targetUrl && "focus" in client) {
                    return client.focus();
                }
            }
            // Otherwise, open a new tab
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
