import { initializeApp, FirebaseError } from 'firebase/app';
import config from "../../config/firebase.json"
import { getAuth, signInWithPopup, GoogleAuthProvider, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, NextOrObserver, signOut } from "firebase/auth"
import { createUserDoc } from './firestore.helper'
import { ISignUp } from '../../routes/signup/signup';
import { getFirestore } from "firebase/firestore";
import { ISignIn } from "../../routes/auth";


const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId,
}

export const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth(app)
export const db = getFirestore()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export async function createUser(userData: ISignUp) {
  const { displayName, email, password } = userData

  if (!email || !password) return

  try {
    const createdUser = await createUserWithEmailAndPassword(auth, email, password)
    const userDoc = await createUserDoc(createdUser.user, { displayName })
    console.log(userDoc)
  } catch (error) {
    console.error(`Error creating user`, error)
  }
}

export async function signIn(userData: ISignIn) {
  const { email, password } = userData
  if (!email || !password) return

  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    const { code, message, name } = error as FirebaseError
    return {
      code,
      message,
      name
    }
  }
}

export function AuthListener(cb: NextOrObserver<User>) {
  return onAuthStateChanged(auth, cb)
}

export async function logOut() {
  return await signOut(auth)
}