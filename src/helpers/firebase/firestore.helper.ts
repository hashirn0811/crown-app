import { User } from "firebase/auth"
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore"

import { db } from "./firebase.helper"

export async function createUserDoc(userAuth: User, otherData: object) {
  const userRef = doc(db, "users", userAuth.uid)

  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    const { displayName, email } = userAuth
    const data = {
      displayName,
      email,
      createdAt: serverTimestamp(),
      ...otherData
    }

    try {
      return await setDoc(userRef, data)
    } catch (error) {
      console.error(`Error creating doc`, error)
    }
  }
  return userRef
}
