import {FirebaseError, initializeApp} from "firebase/app"
import {GoogleAuthProvider,GithubAuthProvider, TwitterAuthProvider,signInWithPopup,
    signOut,
    Auth
} from "firebase/auth";
import {
    initializeFirestore,
    Firestore
} from "firebase/firestore";
import {toast} from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBBmEqyJo5nc0217oL7RrvtY14nV13DEtI",
    authDomain: "runningm8-f8d0a.firebaseapp.com",
    projectId: "runningm8-f8d0a",
    storageBucket: "runningm8-f8d0a.appspot.com",
    messagingSenderId: "243738888876",
    appId: "1:243738888876:web:c576e62ad0091c34d96d09",
    measurementId: "G-7V3YFGL839"

}
const app = initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider()
const twitterProvider = new TwitterAuthProvider();
const onError = (error: FirebaseError) => {
    switch(error.code){
        case 'auth/wrong-password':
            toast.error('Please provide a valid password.');
            break;
        case 'auth/user-not-found':
            toast.error('Please check the Email.');
            break;
        case 'auth/email-already-in-use':
            toast.error('Email already in Use.');
            break;
        case 'auth/account-exists-with-different-credential':
            toast.error('Email known through other provider.');
            break;
        case 'auth/weak-password':
            toast.error('Please provide a stronger password.')
            break;
        case 'auth/invalid-email':
            toast.error('Please provide a valid email.')
            break;
        case 'auth/too-many-requests':
            toast.error('Too many attempts. Account is temporarily blocked.')
            break;
        default:
            toast.error('Something went wrong')
    }
}
const signUpWithGoogle = async (auth: Auth, db: Firestore, callBack: Function) => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        callBack(user.uid, user.displayName, user.email, 'google', user.photoURL)
    } catch (err) {
        console.log(err)
        onError(err as FirebaseError)
    }
};
const signUpWithGitHub = async (auth: Auth, db: Firestore, callBack: Function) => {
    try {
        const res = await signInWithPopup(auth, githubAuthProvider);
        const user = res.user;
        //@ts-ignore
        callBack(user.uid, user.reloadUserInfo.screenName, user.email,'github', user.photoURL, )
    } catch (err) {
        onError(err as FirebaseError)
    }
};
const signUpWithTwitter = async (auth: Auth, db: Firestore, callBack: Function) => {
    try {
        const res = await signInWithPopup(auth, twitterProvider);
        const user = res.user;
        callBack(user.uid, user.displayName, user.email, 'twitter', user.photoURL)
    } catch (err) {
        onError(err as FirebaseError)
    }
};
const signInWithGoogle = async (auth: Auth, db: Firestore, callBack: Function) => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        callBack(user.uid)

    } catch (err) {
        onError(err as FirebaseError)
    }
};
const signInWithGitHub = async (auth: Auth, db: Firestore, callBack: Function) => {
    try {
        const res = await signInWithPopup(auth, githubAuthProvider);
        const user = res.user;
        callBack(user.uid)

    } catch (err) {
        console.log(err)
        onError(err as FirebaseError)
    }
};
const signInWithTwitter = async (auth: Auth, db: Firestore, callBack: Function) => {
    try {
        const res = await signInWithPopup(auth, twitterProvider);
        const user = res.user;
        callBack(user.uid)

    } catch (err) {
        onError(err as FirebaseError)
    }
};
const logout = async (auth:Auth) => {
    await signOut(auth)
}
initializeFirestore(app, {
    ignoreUndefinedProperties: true
})

export {app, signUpWithGoogle, signUpWithGitHub, signUpWithTwitter, signInWithGoogle, signInWithTwitter, signInWithGitHub, onError, logout}
// const auth = getAuth(app)
// const db = getFirestore(app)
//
// const googleProvider = new GoogleAuthProvider();
// const signUpWithGoogle = async () => {
//     try {
//         const res = await signInWithPopup(auth, googleProvider);
//         const user = res.user;
//         const q = query(collection(db, "users"), where("uid", "==", user.uid));
//         const docs = await getDocs(q);
//         if (docs.docs.length === 0) {
//             await addDoc(collection(db, "users"), {
//                 uid: user.uid,
//                 name: user.displayName,
//                 authProvider: "google",
//                 email: user.email,
//             });
//         }
//     } catch (err) {
//         console.error(err);
//         // @ts-ignore
//         alert(err.message);
//     }
// };
// const logInWithEmailAndPassword = async (email:string, password:string) => {
//     try {
//         await signInWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//         console.error(err);
//         // @ts-ignore
//         alert(err.message);
//     }
// };
// const registerWithEmailAndPassword = async (name:string, email:string, password:string) => {
//     try {
//         const res = await createUserWithEmailAndPassword(auth, email, password);
//         const user = res.user;
//         console.log(user)
//         await addDoc(collection(db, "users"), {
//             uid: user.uid,
//             name,
//             authProvider: "local",
//             email,
//         });
//     } catch (err) {
//         console.error(err);
//         // @ts-ignore
//         alert(err.message);
//     }
// };
// const sendPasswordReset = async (email:string) => {
//     try {
//         await sendPasswordResetEmail(auth, email);
//         alert("Password reset link sent!");
//     } catch (err) {
//         console.error(err);
//         // @ts-ignore
//         alert(err.message);
//     }
// };
// const logout = () => {
//     signOut(auth);
// };

