import axios from 'axios';

async function regSw() {
    if ('serviceWorker' in navigator) {
        let url = process.env.PUBLIC_URL + '/sw.js';
        const reg = await navigator.serviceWorker.register(url, { scope: '/' });
        console.log('service config is', { reg });
        return reg;
    }
    throw Error('serviceworker not supported');
}


// Now you can use convertedKey when calling subscribe

async function subscribe(serviceWorkerReg) {

    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    console.log({ subscription });
    console.log("subscription ", subscription);
    if (subscription === null) {
        const publicKeyBase64Url = process.env.REACT_APP_PUBLIC_KEY?.replace(/=/g, '');


        console.log("Checking ..... ###", process.env.REACT_APP_PUBLIC_KEY);
        subscription = await serviceWorkerReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKeyBase64Url),
        });
        axios.post(`${process.env.REACT_APP_API}/subscribea`, { subscription });
    }

}

export { regSw, subscribe };


function urlBase64ToUint8Array(base64String) {
    if (!base64String) {
        throw new Error('Base64 string is undefined or empty.');
    }

    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
