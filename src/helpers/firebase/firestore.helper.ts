import { User, UserCredential } from "firebase/auth"
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore"

export const db = getFirestore()

export async function createUserDoc(userAuth: User) {
  const userRef = doc(db, "users", userAuth.uid)

  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    const { displayName, email } = userAuth
    const data = {
      displayName,
      email,
      createdAt: serverTimestamp(),
    }

    try {
      return await setDoc(userRef, data)
    } catch (error) {
      console.error(`Error creating doc`, error)
    }
  }
  return userRef
}
