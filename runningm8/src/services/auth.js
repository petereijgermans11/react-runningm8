import {
  getAuth,
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import router from '../router'
// export use Auth that contains all info needed
export function useAuth () {
  // set auth and provider for all functions
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  let currentUser = auth.currentUser
  // subscribe to auth
  auth.onAuthStateChanged(async function (user) {
    currentUser = auth.currentUser
    if (user) {
      await login()
    }
  })
  // Login and set login in sessionstorage.
  async function login (event) {
    await setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // In memory persistence will be applied to the signed in Google user
        // even though the persistence was set to 'none' and a page redirect
        // occurred.
        // Give a event because I encountered a bug with it randomly opening the popup window. So only if its clicked
        // it will now open.
        if (!auth.currentUser && event === 'click') {
          return signInWithPopup(auth, provider).then(() => {
            router.go()
          })
        }
      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode + errorMessage)
      })
  }
  async function checkIfLoggedIn () {
    await login()
    return !!currentUser
  }
  // Return userId to check your schemas
  async function getCurrentUserId () {
    return currentUser.uid
  }
  async function logout () {
    await signOut(auth).then(() => {
      router.go()
    })
    return false
  }
  return {
    currentUser,
    login,
    checkIfLoggedIn,
    getCurrentUserId,
    logout
  }
}
