import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyCKCgRobI7CgOdmLBImjziw2Q4EC69_XPE',
  authDomain: 'runningfeet-45b38.firebaseapp.com',
  projectId: 'runningfeet-45b38',
  storageBucket: 'runningfeet-45b38.appspot.com',
  messagingSenderId: '39938111341',
  appId: '1:39938111341:web:b3a782dd994ec251624c64'
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

export const messaging = getMessaging(firebaseApp)

getToken(messaging, { vapidKey: 'BJsNdLy59BKjf27eAzKT4JO5RgLVsYY4XB2Yazf9HOHpP5Dd2P8YUbzEkfQWG90_XPAFrG7X7LLiGU2RN0BA08Q' })
  .then((currentToken) => {
    if (currentToken) {
      console.log('Push enabled ', currentToken)
    } else {
      console.log('no token')
    }
  }).catch((err) => {
    console.log('error', err)
  })
onMessage(messaging, (payload) => {
  console.log('message', payload)
})
