this.addEventListener('activate', function (event) {
    console.log('service worker activated');
});
this.addEventListener('push', async function (event) {

    console.log('notifications will be displayed here');
    const message = await event.data.json();
    console.log({ event });
    let { title, description } = message;
    console.log({ message });
    await event.waitUntil(
        this.registration.showNotification("Title: Alert", {
            body: "weather ",
            vibrate: [300, 100, 400] // Vibrate 300ms, pause 100ms, then vibrate 400ms
        })
    );
});