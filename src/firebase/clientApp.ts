import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import 'firebase/firestore'

export const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const app = initializeApp(clientCredentials)
export const auth = getAuth(app)

export async function signUp(email: string, password: string) {
  let user = null
  let error = null
  try {
    user = (await createUserWithEmailAndPassword(auth, email, password)).user
  } catch (e) {
    error = e as Error
  }

  return { user, error }
}

export async function signIn(email: string, password: string) {
  let user = null
  let error = null
  try {
    user = (await signInWithEmailAndPassword(auth, email, password)).user
  } catch (e) {
    error = e as Error
  }

  return { user, error }
}
