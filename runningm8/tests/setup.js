import Vue from 'vue'
import Vuetify from 'vuetify'
import {initializeApp} from "firebase/app";
const firebaseConfig = {
  apiKey: 'AIzaSyCKCgRobI7CgOdmLBImjziw2Q4EC69_XPE',
  authDomain: 'runningfeet-45b38.firebaseapp.com',
  projectId: 'runningfeet-45b38',
  storageBucket: 'runningfeet-45b38.appspot.com',
  messagingSenderId: '39938111341',
  appId: '1:39938111341:web:b3a782dd994ec251624c64'
}
initializeApp(firebaseConfig)
Vue.use(Vuetify)
