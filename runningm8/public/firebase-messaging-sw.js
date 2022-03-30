importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCKCgRobI7CgOdmLBImjziw2Q4EC69_XPE',
  authDomain: 'runningfeet-45b38.firebaseapp.com',
  projectId: 'runningfeet-45b38',
  storageBucket: 'runningfeet-45b38.appspot.com',
  messagingSenderId: '39938111341',
  appId: '1:39938111341:web:b3a782dd994ec251624c64'
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title
  const notificationOptions = {
    body: payload.body
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions)
})
