import fb from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Cloud Firestore through Firebase
fb.initializeApp(firebaseConfig);

export const firebase = fb;

const messaging = fb.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey(
    'BACbATPdC2mrqm7mSvlv9xln-fXSs9-qZEoNgS7svsXlRoPYt7vq7T7asD0C2YwXKZ0dLukM5d2KQolWWZtAJNE'
);

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging
    .getToken()
    .then((currentToken) => {
        if (currentToken) {
            console.log({ currentToken });
        } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
        }
    })
    .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });

messaging.onMessage((payload) => console.log({ config: payload }));

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
    messaging
        .getToken()
        .then((refreshedToken) => {
            console.log('Token refreshed.', refreshedToken);
            // Indicate that the new Instance ID token has not yet been sent to the
            // app server.

            // Send Instance ID token to app server.

            // ...
        })
        .catch((err) => {
            console.log('Unable to retrieve refreshed token ', err);
        });
});
