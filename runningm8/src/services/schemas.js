import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  deleteDoc,
  where
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useAuth } from './auth'
const db = getFirestore()
export async function getSchemas () {
  const schemasRef = collection(db, 'schemas')
  const q = query(schemasRef, where('user', '==', await useAuth().getCurrentUserId()))
  const querySnapshot = await getDocs(q)
  return querySnapshot
}
export async function getSchemaById (id) {
  const q = doc(db, 'schemas', id)
  const querySnapshot = await getDoc(q)
  if (querySnapshot.data().user === await useAuth().getCurrentUserId()) {
    return querySnapshot.data()
  } else {
    return null
  }
}
export async function updateSchema (id, name, activities) {
  await setDoc(doc(db, 'schemas', id), {
    name: name,
    activities: activities,
    timestamp: serverTimestamp(),
    user: getAuth().currentUser.uid
  }).then(() => {
    return true
  }).catch(() => {
    return false
  })
}
export async function createSchema (name, activities) {
  await addDoc(collection(db, 'schemas'), {
    name: name,
    activities: activities,
    timestamp: serverTimestamp(),
    user: getAuth().currentUser.uid
  }).then(() => {
    return true
  }).catch(() => {
    return false
  })
}
export async function deleteSchema (id) {
  await deleteDoc(doc(db, 'schemas', id))
    .then(() => {
      return true
    }).catch((error) => {
      console.log(error)
      return false
    })
}
