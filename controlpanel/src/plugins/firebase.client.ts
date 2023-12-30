import { FirebaseApp, initializeApp } from 'firebase/app'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
    const configure = useRuntimeConfig().public
    const firebaseConfigure = {
        apiKey: configure.FIREBASE_API_KEY,
        authDomain: configure.FIREBASE_AUTH_DOMAIN,
        projectId: configure.FIREBASE_PROJECT_ID,
        storageBucket: configure.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: configure.FIREBASE_MESSAGING_SENDERID,
        appId: configure.FIREBASE_APPID,
    }
    const app: FirebaseApp = initializeApp(firebaseConfigure)

    const isEmulating = configure.ENV === 'local'
    console.log('isEmulating=', isEmulating)
    if (isEmulating) {
        const auth = getAuth()
        connectAuthEmulator(auth, 'http://' + configure.FIREBASE_LOCAL_HOST + ':' + configure.FIREBASE_LOCAL_AUTH_PORT)
        const firestore = getFirestore()
        connectFirestoreEmulator(firestore, configure.FIREBASE_LOCAL_HOST, <number><unknown>configure.FIREBASE_LOCAL_FIRESTORE_PORT)
        const functions = getFunctions(app, 'asia-northeast1')
        connectFunctionsEmulator(functions, configure.FIREBASE_LOCAL_HOST, <number><unknown>configure.FIREBASE_LOCAL_FUNCTION_PORT)
        const storage = getStorage()
        connectStorageEmulator(storage, configure.FIREBASE_LOCAL_HOST , <number><unknown>configure.FIREBASE_LOCAL_STORAGE_PORT)
    }
    return {
        provide: {
            firebaseApp: app,
        }
    }
})
