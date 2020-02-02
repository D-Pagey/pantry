console.log('heeleellloo mofo');

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: 'AIzaSyC9i-t5MTjGUWOVMZaHio34RFw5SZUXHUw',
    authDomain: 'pantry-fcdad.firebaseapp.com',
    projectId: 'pantry-fcdad',
    messagingSenderId: 943696754732,
    appId: '1:943696754732:web:c580984e2764dc7f'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
